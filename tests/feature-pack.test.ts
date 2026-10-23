import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
// Insights never read provider keys and never call a provider.
delete process.env.OPENROUTER_API_KEY;
delete process.env.OPENAI_API_KEY;
import { buildInsights, donorIntakeGaps } from "../src/lib/insights";
import { toCsv } from "../src/lib/csv";

test("deterministic milk insights are labelled aiGenerated:false and preserve 0/false/empty", () => {
  const out = buildInsights({
    donors: [{ id: "d1", name: "Donor A", screeningEvidence: "", consentAt: "2026-01-01", status: "Draft" }],
    donations: [], pools: [], contributions: [], runs: [], recalls: [], distributions: [], labChecks: [],
  });
  assert.equal(out.aiGenerated, false);
  assert.equal(out.features.length, 3);
  const gaps = donorIntakeGaps([{ id: "d1", name: "Donor A", screeningEvidence: "", consentAt: "", status: "Draft" }], []);
  assert.equal(gaps.metrics.find((m) => m.label === "Donations")?.value, 0);
  assert.equal(gaps.metrics.find((m) => m.label === "Intake complete")?.value, false);
  assert.ok(gaps.sections.length >= 2);
  const empty = buildInsights({ donors: [], donations: [], pools: [], contributions: [], runs: [], recalls: [], distributions: [], labChecks: [] });
  assert.deepEqual(empty.features[2].items, []);
});

test("CSV helper preserves 0, false, and empty strings", () => {
  const csv = toCsv([{ id: "1", volumeMl: 0, flag: false, note: "" }], ["id", "volumeMl", "flag", "note"]);
  assert.ok(csv.includes("1,0,false,"), csv);
});

test("tasks filters, record status filter, export, and insights are wired", () => {
  assert.ok(existsSync("src/app/api/insights/route.ts"));
  assert.ok(existsSync("src/app/api/export/[entity]/route.ts"));
  const tasks = readFileSync("src/app/api/tasks/route.ts", "utf8");
  assert.match(tasks, /params\.get\("q"\)/);
  assert.match(tasks, /params\.get\("status"\)/);
  const records = readFileSync("src/app/api/records/[entity]/route.ts", "utf8");
  assert.match(records, /params\.get\("status"\)/);
  const page = readFileSync("src/components/DomainPage.tsx", "utf8");
  assert.match(page, /TasksPanel/);
  assert.match(page, /InsightsPanel/);
  assert.match(page, /Filter by status/);
});
