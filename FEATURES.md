# Donor Milk Bank Traceability

Trace donor intake through pooled lots, pasteurization, laboratory checks, inventory, distribution and recall drills.

## Implemented records

- **Milk Bank Program**: name, facility, license Reference, coordinator, reporting Start, reporting End, status.
- **Milk Donor**: name, donor Code, consent At, screening Evidence, review Due At, status.
- **Milk Donation**: title, collected At, received At, volume Ml, container Number, status.
- **Milk Pool**: title, pool Number, pooled At, volume Ml, operator, status.
- **Pool Contribution**: title, volume Ml, added At, status.
- **Pasteurization Run**: title, started At, ended At, equipment, cycle Evidence, status.
- **Milk Lab Check**: title, sampled At, laboratory, test Name, result Text, evidence, status.
- **Milk Distribution**: title, dispatched At, recipient, volume Ml, receipt, status.
- **Milk Recall**: title, initiated At, reason, coordinator, response Evidence, status.
- **Operational Task**: title, owner, priority, start At, due At, done, notes, status.
- **Rule Version**: title, jurisdiction, version, effective At, expires At, source Url, requirement Text, status.
- **Document Requirement**: title, category, required By, source Reference, evidence Reference, review Notes, status.

## AI workflows

- Donor packet completeness: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Donation intake reconciliation: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Pool traceability review: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Processing evidence summary: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Distribution exception draft: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Recall drill communication draft: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Evidence completeness review: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Operations handoff draft: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.

## Calculations

- Milk pool volume traceability: Reconcile pooled input, distributed volume and measured remaining stock; release and screening are separate.
- Milk Bank Program evidence checklist: Check source presence against an explicitly supplied document list; reviewer assesses adequacy.
- Operational deadline queue: Compute overdue items from entered dates and completed flags; no external notifications.

## Workspace features

Role-based login and account management; validated create/edit/delete; required parent and sibling relationships; search and pagination; atomic JSON imports; CSV/JSON exports; optimistic concurrency; two independent human reviews; immutable source-text uploads with independent review; dated task calendar; aggregate reports; searchable audit trail; model catalog and administrator AI settings; configured HTTPS connectors with approval, idempotency and receipt checks.

## Integration boundaries

A finite working scope, not every conceivable feature. No production regulator, insurer, carrier, court, university or clinical integration is preconfigured. Source uploads support text/CSV/JSON/Markdown, not OCR/PDF parsing. AI produces drafts and cannot authorize clinical handling, adjudicate rights, select recipients or jurors, establish eligibility, certify regulatory compliance or send submissions. Live external execution requires a configured adapter and independent human approval of the current record. Calculations use supplied rules and units; example rules are fictional.
