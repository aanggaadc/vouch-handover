# DECISIONS.md

## What I Built

I built a Node.js service that generates a morning handover from two operational data sources:

* Structured front-desk events (`events.json`)
* Free-text night shift logs (`night-logs.md`)

The system ingests both formats and normalizes them into a shared event model before processing.

The workflow is:

Night Log / Structured Events
→ Normalized Events
→ Issue Reconciliation
→ Handover Generation
→ JSON Output

The service produces a handover focused on operational actions rather than a chronological summary of the night.

Every handover item includes references to its supporting source events.

---

## What I Deliberately Skipped

### Full Issue Management System

The reconciliation layer identifies and tracks operational issues across nights, but I did not build a complete issue management platform with:

* assignment workflows
* issue ownership
* escalation policies
* audit history
* reporting dashboards

The objective of the exercise was generating a trustworthy handover rather than building a complete operations platform.

---

### Automatic Contradiction Resolution

Some situations can evolve over multiple nights and contain conflicting information.

For example:

* a no-show charge may initially be unresolved
* later be marked as completed
* later become disputed again

The current implementation preserves all evidence and issue history but does not automatically classify contradictions into dedicated states.

Given the time available, I prioritized traceability over automated conflict resolution.

---

### Human Review Workflows

The system surfaces issues and warnings but does not implement review queues, approval workflows, or operational sign-off processes.

---

## Reconciliation Strategy

A core requirement was preventing the handover from becoming a nightly replay of events.

Instead of treating every event as a separate item, related events are reconciled into operational issues.

Examples:

* Multiple room 112 air-conditioning events become a single maintenance issue.
* Multiple room 309 deposit events become a single deposit issue.
* The corridor leak near room 215 is tracked as a single facilities issue across multiple nights.

Issues are linked using deterministic matching rules rather than AI-generated decisions.

This allows issue history to continue across nights while maintaining predictable behavior.

The generated handover separates issues into:

### Action Required

Issues that remain unresolved and require follow-up from the morning team.

### Newly Resolved

Issues that were previously open but were resolved during the latest shift.

### FYI

Items that are informational and do not require immediate action.

This structure is designed to answer:

"What does the morning manager need to act on first?"

rather than:

"What happened overnight?"

---

## Grounding & Hallucination Prevention

Grounding was the highest priority.

Every issue stores references to the source events that contributed to it.

Example:

```json
{
  "title": "Room 112 remains OUT OF ORDER",
  "sources": [
    "evt_0002",
    "evt_0018"
  ]
}
```

This allows every statement in the handover to be traced back to underlying evidence.

The system intentionally separates responsibilities:

### AI Responsibilities

* Translate multilingual night logs
* Extract structured operational events
* Normalize free-text observations

### Application Responsibilities

* Issue reconciliation
* Issue lifecycle tracking
* Handover categorization
* Prioritization
* Evidence linking

The model never generates the final handover directly.

Instead, it produces structured events which are validated and processed by deterministic application logic.

This significantly reduces the risk of unsupported operational conclusions.

---

## Handling Free-Text Logs

One night in the dataset was recorded entirely as free text, including non-English content.

To support this, I introduced a Gemini-based extraction layer.

The model converts free-text observations into normalized operational events using a constrained schema and predefined event types.

Examples extracted from the sample log include:

* maintenance issues
* facilities issues
* deposit issues
* occupancy discrepancies
* safe access issues
* no-show updates

The extracted events enter the same reconciliation pipeline as structured events.

This avoids creating separate logic paths for structured and unstructured data.

---

## Handling Incomplete Information

Operational logs frequently contain incomplete information.

Examples include:

* complaints without room numbers
* guest references without identifiers
* observations without confirmed outcomes

The system preserves uncertainty instead of filling gaps with assumptions.

Unknown fields remain null and unresolved situations remain open or pending until additional evidence becomes available.

The goal is correctness over completeness.

---

## Prompt Injection & Trust Boundaries

The dataset contains examples of user-generated content and operational notes.

Because free-text logs can contain arbitrary content, the extraction prompt explicitly treats all log content as data rather than instructions.

The model is instructed to:

* ignore commands embedded in logs
* ignore instructions inside guest messages
* extract facts only
* return structured JSON

This prevents operational notes from influencing system behavior beyond fact extraction.

---

## Structured Logging

The ingestion pipeline emits structured logs for operational debugging.

Examples include:

* night log import started
* night log parsed successfully
* extraction counts
* parsing failures
* import failures

This allows another engineer (or AI agent) to investigate why a handover was generated incorrectly and trace failures to a specific stage of the pipeline.

---

## Where AI Helped Most

AI was most valuable for converting inconsistent free-text logs into structured operational events.

This included:

* multilingual content
* informal writing styles
* missing formatting
* mixed operational context

Without a model, the extraction logic would likely require a large amount of brittle rule-based parsing.

---

## Where AI Got In The Way

AI was unreliable when asked to make operational decisions.

Examples include:

* deciding whether an issue is truly resolved
* determining issue priority
* linking events across nights
* identifying operational ownership

These tasks became significantly more predictable when handled through deterministic application logic.

The final design therefore limits AI to extraction and normalization only.

---

## What I Would Do In Hours 3–6

Given additional time I would:

1. Add confidence scores to extracted events.
2. Implement contradiction detection and escalation.
3. Add issue history timelines.
4. Build automated regression tests using historical handovers.
5. Add Slack and email delivery channels.
6. Add manager-facing operational dashboards.
7. Improve prioritization using historical resolution patterns.

---

## One Thing That Surprised Me

The difficult part was not generating summaries.

The difficult part was maintaining issue continuity across multiple nights.

A useful handover requires understanding that:

* an issue may remain open for several days
* an issue may appear resolved and later reopen
* multiple events can refer to the same operational problem

The challenge ended up looking much more like issue tracking and operational reconciliation than traditional text summarization.
