export interface PageConfig {
  label: string;
  href: string;
  description: string;
  entities: string[];
  workflows: string[];
}

export interface EntityConfig {
  name: string;
  label: string;
  fields: Array<{ name: string; kind: "string" | "number" | "boolean" | "date" }>;
}

export interface WorkflowConfig {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  fields: string[];
}

export const appConfig = {
  "slug": "ai-donor-milk-bank-traceability",
  "title": "Donor Milk Bank Traceability",
  "tagline": "Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills.",
  "accent": "rose"
};
export const pages: PageConfig[] = [
  {
    "label": "Intake & registers",
    "href": "/registers",
    "description": "Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills.",
    "entities": [
      "MilkBankProgram",
      "MilkDonor",
      "MilkDonation"
    ],
    "workflows": [
      "donor-packet-completeness",
      "donation-intake-reconciliation"
    ]
  },
  {
    "label": "Operational records",
    "href": "/workflow",
    "description": "Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills.",
    "entities": [
      "MilkPool",
      "PoolContribution",
      "PasteurizationRun"
    ],
    "workflows": [
      "pool-traceability-review",
      "processing-evidence-summary"
    ]
  },
  {
    "label": "Review & delivery",
    "href": "/delivery",
    "description": "Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills.",
    "entities": [
      "MilkLabCheck",
      "MilkDistribution",
      "MilkRecall"
    ],
    "workflows": [
      "distribution-exception-draft",
      "recall-drill-communication-draft"
    ]
  },
  {
    "label": "Tasks & requirements",
    "href": "/operations",
    "description": "Assignments, versioned rules and document requirements.",
    "entities": [
      "OperationalTask",
      "RuleVersion",
      "DocumentRequirement"
    ],
    "workflows": [
      "evidence-completeness-review",
      "operations-handoff-draft"
    ]
  }
];
export const entities: Record<string, EntityConfig> = {
  "MilkBankProgram": {
    "name": "MilkBankProgram",
    "label": "Milk Bank Program",
    "fields": [
      {
        "name": "name",
        "kind": "string"
      },
      {
        "name": "facility",
        "kind": "string"
      },
      {
        "name": "licenseReference",
        "kind": "string"
      },
      {
        "name": "coordinator",
        "kind": "string"
      },
      {
        "name": "reportingStart",
        "kind": "date"
      },
      {
        "name": "reportingEnd",
        "kind": "date"
      },
      {
        "name": "status",
        "kind": "string"
      }
    ]
  },
  "MilkDonor": {
    "name": "MilkDonor",
    "label": "Milk Donor",
    "fields": [
      {
        "name": "name",
        "kind": "string"
      },
      {
        "name": "donorCode",
        "kind": "string"
      },
      {
        "name": "consentAt",
        "kind": "date"
      },
      {
        "name": "screeningEvidence",
        "kind": "string"
      },
      {
        "name": "reviewDueAt",
        "kind": "date"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "MilkDonation": {
    "name": "MilkDonation",
    "label": "Milk Donation",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "milkDonorId",
        "kind": "string"
      },
      {
        "name": "collectedAt",
        "kind": "date"
      },
      {
        "name": "receivedAt",
        "kind": "date"
      },
      {
        "name": "volumeMl",
        "kind": "number"
      },
      {
        "name": "containerNumber",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "MilkPool": {
    "name": "MilkPool",
    "label": "Milk Pool",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "poolNumber",
        "kind": "string"
      },
      {
        "name": "pooledAt",
        "kind": "date"
      },
      {
        "name": "volumeMl",
        "kind": "number"
      },
      {
        "name": "operator",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "PoolContribution": {
    "name": "PoolContribution",
    "label": "Pool Contribution",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "milkDonationId",
        "kind": "string"
      },
      {
        "name": "milkPoolId",
        "kind": "string"
      },
      {
        "name": "volumeMl",
        "kind": "number"
      },
      {
        "name": "addedAt",
        "kind": "date"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "PasteurizationRun": {
    "name": "PasteurizationRun",
    "label": "Pasteurization Run",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "milkPoolId",
        "kind": "string"
      },
      {
        "name": "startedAt",
        "kind": "date"
      },
      {
        "name": "endedAt",
        "kind": "date"
      },
      {
        "name": "equipment",
        "kind": "string"
      },
      {
        "name": "cycleEvidence",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "MilkLabCheck": {
    "name": "MilkLabCheck",
    "label": "Milk Lab Check",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "milkPoolId",
        "kind": "string"
      },
      {
        "name": "sampledAt",
        "kind": "date"
      },
      {
        "name": "laboratory",
        "kind": "string"
      },
      {
        "name": "testName",
        "kind": "string"
      },
      {
        "name": "resultText",
        "kind": "string"
      },
      {
        "name": "evidence",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "MilkDistribution": {
    "name": "MilkDistribution",
    "label": "Milk Distribution",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "milkPoolId",
        "kind": "string"
      },
      {
        "name": "dispatchedAt",
        "kind": "date"
      },
      {
        "name": "recipient",
        "kind": "string"
      },
      {
        "name": "volumeMl",
        "kind": "number"
      },
      {
        "name": "receipt",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "MilkRecall": {
    "name": "MilkRecall",
    "label": "Milk Recall",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "milkPoolId",
        "kind": "string"
      },
      {
        "name": "initiatedAt",
        "kind": "date"
      },
      {
        "name": "reason",
        "kind": "string"
      },
      {
        "name": "coordinator",
        "kind": "string"
      },
      {
        "name": "responseEvidence",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "OperationalTask": {
    "name": "OperationalTask",
    "label": "Operational Task",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "owner",
        "kind": "string"
      },
      {
        "name": "priority",
        "kind": "string"
      },
      {
        "name": "startAt",
        "kind": "date"
      },
      {
        "name": "dueAt",
        "kind": "date"
      },
      {
        "name": "done",
        "kind": "boolean"
      },
      {
        "name": "notes",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "RuleVersion": {
    "name": "RuleVersion",
    "label": "Rule Version",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "jurisdiction",
        "kind": "string"
      },
      {
        "name": "version",
        "kind": "string"
      },
      {
        "name": "effectiveAt",
        "kind": "date"
      },
      {
        "name": "expiresAt",
        "kind": "date"
      },
      {
        "name": "sourceUrl",
        "kind": "string"
      },
      {
        "name": "requirementText",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  },
  "DocumentRequirement": {
    "name": "DocumentRequirement",
    "label": "Document Requirement",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "category",
        "kind": "string"
      },
      {
        "name": "requiredBy",
        "kind": "date"
      },
      {
        "name": "sourceReference",
        "kind": "string"
      },
      {
        "name": "evidenceReference",
        "kind": "string"
      },
      {
        "name": "reviewNotes",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "milkBankProgramId",
        "kind": "string"
      }
    ]
  }
};
export const workflows: WorkflowConfig[] = [
  {
    "slug": "donor-packet-completeness",
    "title": "Donor packet completeness",
    "description": "Donor packet completeness using selected milk bank program records and supplied evidence.",
    "prompt": "Donor packet completeness for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "donation-intake-reconciliation",
    "title": "Donation intake reconciliation",
    "description": "Donation intake reconciliation using selected milk bank program records and supplied evidence.",
    "prompt": "Donation intake reconciliation for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "pool-traceability-review",
    "title": "Pool traceability review",
    "description": "Pool traceability review using selected milk bank program records and supplied evidence.",
    "prompt": "Pool traceability review for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "processing-evidence-summary",
    "title": "Processing evidence summary",
    "description": "Processing evidence summary using selected milk bank program records and supplied evidence.",
    "prompt": "Processing evidence summary for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "distribution-exception-draft",
    "title": "Distribution exception draft",
    "description": "Distribution exception draft using selected milk bank program records and supplied evidence.",
    "prompt": "Distribution exception draft for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "recall-drill-communication-draft",
    "title": "Recall drill communication draft",
    "description": "Recall drill communication draft using selected milk bank program records and supplied evidence.",
    "prompt": "Recall drill communication draft for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "evidence-completeness-review",
    "title": "Evidence completeness review",
    "description": "Evidence completeness review using selected milk bank program records and supplied evidence.",
    "prompt": "Evidence completeness review for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "operations-handoff-draft",
    "title": "Operations handoff draft",
    "description": "Operations handoff draft using selected milk bank program records and supplied evidence.",
    "prompt": "Operations handoff draft for Donor Milk Bank Traceability. Operational scope: Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills. Specific AI scope: Extract screening and batch evidence and flag missing records; qualified staff authorize release. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  }
];
export function findPage(href:string){return pages.find(p=>p.href===href);}
