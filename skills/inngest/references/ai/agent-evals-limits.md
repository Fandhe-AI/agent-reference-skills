# Agent Evals Limits

Plan Agent Evals usage around score volume, scoring executions, and trace retention.

## Signature / Usage

```typescript
// meta.sessions: at most 5 entries per event; key <= 128 bytes, ID <= 512 bytes
await inngest.send({
  name: "support/ticket.created",
  data: { ticketId: "ticket_123" },
  meta: { sessions: { ticket_id: "ticket_123" } },
});
```

## Options / Props

| Plan (Cloud allowances; check the pricing page for current values) | Scores ingested | Executions | Trace and log history |
|------|-----------------|------------|-----------------------|
| Free | 10,000 included per month | 50,000 included per month | 24 hours |
| Pro | 50,000 included per month, then $1.50 per 1,000 | 1 million included per month, with add-on capacity | 7 days |
| Business | 250,000 included per month | 10 million included per month, with add-on capacity | 14 days |
| Enterprise | Custom | Custom | 90 days |

Field limits:

| Field | Limit |
|-------|-------|
| Score name | 1 to 128 bytes (UTF-8); no control characters or single quotes |
| Score value | A finite number or a boolean |
| Session key | 128 bytes |
| Session ID | 512 bytes |
| Sessions per event | 5 |
| Sessions per batched run | 25 unique key and ID pairs |

## Notes

- A score is one ingested outcome value; each write counts toward monthly usage. Included quantities are allowances, not hard caps; scoring continues under usage-based billing. Allowances and overage terms can change.
- Pricing defines an execution as one function run or one step execution. A deferred scorer runs as its own function, so include its run, steps, and score when estimating.
- A non-batched run can belong to up to 5 sessions. Keys and IDs cannot be empty; IDs must be strings or finite numbers (numbers are converted to strings).
- Session search uses an asynchronous index; it is an investigation view, not a realtime status signal.
- Deferred scorers are experimental, independent function runs with their own retries, concurrency, and steps; `onFailure` and event batching are not supported. Each `defer()` call needs an ID unique within its parent run. There is no separate Agent Evals quota for deferred scorers; normal function and plan limits apply.
- `group.experiment()` selects one variant per run, memoized across retries; each variant callback must call at least one `step.*` tool.
- Scoring is in beta. Agent Evals does not sample scores or cap score spend.

## Related

- [Agent Evals Reference](./agent-evals-reference.md)
- [Manage Eval Costs](./evals-cost-management.md)
- [Agent Evals Experiments](./agent-evals-experiments.md)
