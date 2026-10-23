// Deterministic offline insights over this app's own milk-bank records.
// Pure functions: no database, network, or AI provider calls. Every result is
// labelled aiGenerated:false so it is never mistaken for a provider draft.
export type InsightRow = Record<string, unknown>;
export interface Insight {
  id: string; title: string; aiGenerated: false; summary: string;
  metrics: { label: string; value: number | boolean }[];
  sections: { title: string; detail: string }[];
  items: { label: string; detail: string }[];
}
const s = (v: unknown) => (v == null ? "" : String(v));
const draft = (rows: InsightRow[]) => rows.filter((r) => s(r.status) === "Draft");

export function donorIntakeGaps(donors: InsightRow[], donations: InsightRow[]): Insight {
  const missingEvidence = donors.filter((d) => !s(d.screeningEvidence).trim());
  const missingConsent = donors.filter((d) => !s(d.consentAt).trim());
  return {
    id: "donor-intake-gaps", title: "Donor intake completeness", aiGenerated: false,
    summary: `${donors.length} donor(s), ${donations.length} donation(s); ${missingEvidence.length} donor(s) missing screening evidence.`,
    metrics: [
      { label: "Donors", value: donors.length },
      { label: "Donations", value: donations.length },
      { label: "Missing screening evidence", value: missingEvidence.length },
      { label: "Missing consent date", value: missingConsent.length },
      { label: "Intake complete", value: missingEvidence.length === 0 && missingConsent.length === 0 },
    ],
    sections: [
      { title: "Screening evidence gaps", detail: missingEvidence.length ? missingEvidence.map((d) => s(d.name) || s(d.id)).join(" · ") : "None reported." },
      { title: "Draft donors", detail: draft(donors).length ? `${draft(donors).length} donor(s) still in Draft.` : "None reported." },
      { title: "How this was produced", detail: "Deterministic check over saved donor and donation records. No AI provider was called." },
    ],
    items: missingEvidence.slice(0, 10).map((d) => ({ label: s(d.name) || s(d.id), detail: "Add screening evidence before pooling." })),
  };
}

export function poolTraceability(pools: InsightRow[], contributions: InsightRow[], runs: InsightRow[]): Insight {
  const pooledIds = new Set(contributions.map((c) => s(c.milkPoolId)));
  const unlinked = pools.filter((p) => !pooledIds.has(s(p.id)));
  const missingCycle = runs.filter((r) => !s(r.cycleEvidence).trim());
  const totalVolume = contributions.reduce((sum, c) => sum + (Number(c.volumeMl) || 0), 0);
  return {
    id: "pool-traceability", title: "Pool traceability & pasteurization evidence", aiGenerated: false,
    summary: `${pools.length} pool(s), ${contributions.length} contribution(s), ${runs.length} run(s); ${unlinked.length} pool(s) without contributions.`,
    metrics: [
      { label: "Pools", value: pools.length },
      { label: "Contributions", value: contributions.length },
      { label: "Pooled volume (mL)", value: totalVolume },
      { label: "Pools without contributions", value: unlinked.length },
      { label: "Runs missing cycle evidence", value: missingCycle.length },
      { label: "Traceability complete", value: unlinked.length === 0 && missingCycle.length === 0 },
    ],
    sections: [
      { title: "Pools without contributions", detail: unlinked.length ? unlinked.map((p) => s(p.poolNumber) || s(p.id)).join(" · ") : "None reported." },
      { title: "Runs missing cycle evidence", detail: missingCycle.length ? missingCycle.map((r) => s(r.title) || s(r.id)).join(" · ") : "None reported." },
      { title: "How this was produced", detail: "Deterministic link check over saved pool, contribution, and run records. No AI provider was called." },
    ],
    items: unlinked.slice(0, 10).map((p) => ({ label: s(p.poolNumber) || s(p.id), detail: "Link at least one donation contribution." })),
  };
}

export function recallReadiness(recalls: InsightRow[], distributions: InsightRow[], labChecks: InsightRow[]): Insight {
  const open = recalls.filter((r) => !["Closed", "Approved"].includes(s(r.status)));
  return {
    id: "recall-readiness", title: "Recall readiness & distribution exceptions", aiGenerated: false,
    summary: `${open.length} open recall record(s), ${distributions.length} distribution(s), ${labChecks.length} lab check(s) on file.`,
    metrics: [
      { label: "Recalls", value: recalls.length },
      { label: "Open recalls", value: open.length },
      { label: "Distributions", value: distributions.length },
      { label: "Lab checks", value: labChecks.length },
      { label: "Has open recall", value: open.length > 0 },
    ],
    sections: [
      { title: "Open recalls", detail: open.length ? open.map((r) => s(r.title) || s(r.id)).join(" · ") : "None reported." },
      { title: "How this was produced", detail: "Deterministic status count over saved recall, distribution, and lab-check records. No AI provider was called." },
    ],
    items: open.slice(0, 10).map((r) => ({ label: s(r.title) || s(r.id), detail: `Recall status: ${s(r.status) || "Not provided"}. Confirm affected distributions.` })),
  };
}

export function buildInsights(data: { donors: InsightRow[]; donations: InsightRow[]; pools: InsightRow[]; contributions: InsightRow[]; runs: InsightRow[]; recalls: InsightRow[]; distributions: InsightRow[]; labChecks: InsightRow[] }) {
  return {
    aiGenerated: false as const,
    source: "deterministic-fallback",
    label: "Offline deterministic insight — no AI provider call (aiGenerated: false)",
    features: [donorIntakeGaps(data.donors, data.donations), poolTraceability(data.pools, data.contributions, data.runs), recallReadiness(data.recalls, data.distributions, data.labChecks)],
  };
}
