<!-- source: https://platform.claude.com/docs/en/managed-agents/budgets / last verified: 2026-10-17 -->

# Session budgets

Optional hard spend ceiling set when creating a session, enforced at public list rates. The session pauses (goes `idle`) when the cap is reached rather than terminating. Beta header: `managed-agents-2026-04-01`.

## Signature / Usage

```bash
curl -sS --fail-with-body https://api.anthropic.com/v1/sessions \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{
    "agent": "'"$AGENT_ID"'",
    "environment_id": "'"$ENVIRONMENT_ID"'",
    "budget": {
      "type": "limit",
      "max_list_cost": {"amount": "125", "currency": "USD"}
    }
  }'
```

Change the cap with `POST /v1/sessions/$SESSION_ID` and a new `budget`; remove it with `{"budget": null}`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `budget.type` | string | Always `"limit"` |
| `budget.max_list_cost.amount` | string | Whole number of US cents, no leading zeros, greater than zero (`"125"` = $1.25). Decimal forms such as `"25.00"` are rejected |
| `budget.max_list_cost.currency` | string | Uppercase ISO-4217 code; `USD` is the only supported currency |
| `usage.list_cost` | object | Session's consumed list cost (whole cents, rounded) |
| `usage.active_seconds` | number | Running time the runtime cost is priced on |

## Notes

- List cost is priced at public list rates: model tokens at each served model's list price, web searches at $10 USD per 1,000, session running time at $0.08 USD per hour. It is not your contracted price; billed spend may be lower than the cap. Enforcement uses the exact unrounded cost; reported figures are rounded to the nearest cent.
- A budget can only be attached at session creation. Adding one to an existing session without one (or re-adding after removal) returns 400.
- Cap is enforced between model requests. The request in flight when the cap is crossed finishes, so `list_cost` can land a fraction past `max_list_cost` (e.g. cap `"50"`, `list_cost` `"53"`); this is expected. Treat the budget as a bound on new work.
- At the cap, the stream shows `session.thread_status_idle` with `stop_reason` `budget_reached` per thread, then a `session.usage` event, then `session.status_idle` with `stop_reason` `budget_reached`. Open workflow runs also get `workflow_run.status_idle`. A thread whose final request completes its turn can report `end_turn` while the session reports `budget_reached`; use the session-level `stop_reason`.
- While at or over the budget, only `user.tool_confirmation`, `user.tool_result`, `user.custom_tool_result`, and `user.interrupt` are accepted; work-starting events such as `user.message` return 400. A `user.interrupt` while paused is accepted, is not listed in events, and stops nothing.
- Resume by changing or removing the budget via session update; the update automatically resumes the paused work (workflow runs get `workflow_run.status_running`). A run paused by an interrupt stays paused; send a `user.message` asking the agent to continue its runs.
- New `max_list_cost` must be strictly greater than the consumed list cost, otherwise 400 `budget.max_list_cost must be greater than the session's consumed list cost`. Base it on `usage.list_cost`, a cent or more above it, not on the old cap.
- Removing the budget (`"budget": null`; Python `budget=None`, TypeScript `budget: null`, Ruby `budget: nil`, CLI `--budget null`) is one-way: the session cannot be given a new budget. The resulting `session.updated` event carries `budget` as `null`.
- `session.usage` event: snapshot of cumulative usage, `list_cost`, `active_seconds`, `server_tool_use` counts (`web_search_requests` priced per request; `web_fetch_requests` reads `0`, not metered), and `budget` if set. Emitted immediately before every idle transition. Thread retrieval carries per-thread `usage` (`list_cost`, `active_seconds`), rounded independently and excluding running-time cost, so they do not sum exactly to the session figure (the session figure is the enforced one).
- Multiagent sessions: one shared budget across all threads (no per-thread caps), each priced at its own served model; advisor consultations count at the advisor model's rates. A session with one thread at `requires_action` and another at `budget_reached` reports `requires_action`; answering is a settle event the budget does not block.
- Deployments accept the same `budget` object on create/update; the cap is copied onto each session the deployment starts (per run, not cumulative). Changes apply only to sessions started afterward. Unlike sessions, a deployment's budget can be cleared with `null` and set again later.
- A budgeted create is rejected with 400 if the agent, any agent in `predefined_agents` of `subagents` / `workflows`, or the multiagent advisor uses a model with no public list price. If usage later comes to include such a model, the session can pause at `budget_reached` and budget changes are rejected; remove the budget to resume.
- Error summary (all 400): work-starting event at the cap; budget at or below consumed cost; budget added to a budgetless session or re-added after removal; non-whole-cent / zero / negative `amount` or non-`USD` `currency`; model with no list price.
- Distinct from the Messages API task budgets, which are advisory, token-denominated budgets the model uses to self-regulate within one agentic loop.

## Related

- [Start a session](./sessions.md)
- [Session operations](./session-operations.md)
- [Inspect sessions and track usage](./session-observability.md)
