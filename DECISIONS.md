# DECISIONS.md

## What I Built

I built a Node.js backend service that generates a morning handover from a combination of:

* Structured operational events (`events.json`)
* Free-text night logs (`night-logs.md`)

The service:

1. Ingests and normalizes both data sources into a common event format.
2. Reconciles related events into operational issues.
3. Generates an action-oriented morning handover.
4. Preserves source references for every generated issue and handover item.
5. Exposes the result through a REST API.

The output is structured JSON that could later be rendered in a dashboard, Slack message, email, or other operational tooling.

---

## What I Deliberately Skipped

### Advanced Issue Lifecycle Management

The current implementation focuses on identifying and reconciling operational issues from the provided dataset.

I did not build a complete issue lifecycle system with:

* issue version history
* state transition audit trails
* historical issue analytics

Reason:

The goal of this exercise was to demonstrate reliable handover generation within the time available.

---

### Explicit Conflict Detection

The system preserves source references for every issue and handover item, allowing investigation of the underlying evidence.

However, I did not fully implement automatic contradiction detection that would classify issues into dedicated states such as `CONFLICT`.

Reason:

I prioritized reliable reconciliation and traceability over more advanced operational workflows.

---

### Authentication & Authorization

No authentication layer was added.

Reason:

The challenge focuses on handover generation rather than access control.

---

## Reconciliation Strategy

The service does not treat every event as a separate handover item.

Instead, related events are grouped into operational issues using deterministic matching rules based on available information such as:

* category
* room number
* guest information
* event content

This allows multiple events referring to the same operational problem to be treated as a single issue.

The generated handover classifies issues into:

### Still Open

Issues that remain unresolved after the most recent night shift.

### Newly Resolved

Issues that were previously open and were resolved during the most recent shift.

### New Tonight

Issues first observed during the most recent shift.

This prevents the handover from becoming a chronological replay of events and instead focuses on what the morning manager needs to know.

---

## Grounding & Hallucination Prevention

Grounding was the most important design requirement.

Every issue and handover item maintains references back to its originating source data.

Example:

```json
{
  "statement": "Room 112 AC issue remains unresolved",
  "sources": [
    "evt_0002",
    "evt_0018"
  ]
}
```

This allows every operational statement to be traced back to the original evidence.

The application logic is responsible for:

* issue reconciliation
* issue grouping
* handover categorization

The language model is only used to help interpret and structure free-text night logs.

Operational conclusions are not generated directly by the model.

This approach reduces the risk of unsupported statements appearing in the final handover.

---

## Handling Incomplete Information

Operational data is often incomplete.

Examples include:

* complaints without room numbers
* maintenance reports with missing details
* guest references without identifiers

Rather than inventing missing information, the system preserves available evidence and allows the issue to remain partially specified.

The priority is maintaining correctness and traceability.

---

## Where AI Helped Most

AI was most useful for:

* interpreting free-text night logs
* extracting structured operational information
* handling inconsistent writing styles
* normalizing information into a common event structure

This reduced the amount of custom parsing logic required.

---

## Where AI Got In The Way

AI was less reliable when asked to determine operational state directly.

Tasks such as:

* deciding whether an issue is resolved
* reconciling issue timelines
* prioritizing operational actions

benefit from deterministic application logic and explicit source references.

For that reason, these decisions are handled by the application rather than delegated to the model.

---

## What I Would Do In Hours 3–6

Given additional time, I would:

1. Add confidence scoring for extracted events.
2. Implement automatic contradiction detection.
3. Introduce issue history and state transition tracking.
4. Add automated regression tests using historical handovers.
5. Add Slack and email delivery channels.
6. Add operational dashboards for issue monitoring.

---

## One Thing That Surprised Me

The most difficult part was not parsing text.

The harder problem was preserving operational context across multiple nights while keeping the handover concise, actionable, and grounded in evidence.

The challenge is closer to issue tracking and operational decision support than traditional text summarization.
