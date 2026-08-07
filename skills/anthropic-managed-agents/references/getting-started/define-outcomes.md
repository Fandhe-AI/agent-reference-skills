<!-- source: https://platform.claude.com/docs/en/managed-agents/define-outcomes / last verified: 2026-08-07 -->

# Define outcomes

Tell the agent what "done" looks like and let it iterate until it gets there. Defining an outcome provisions a *grader* (a separate context window) to evaluate the artifact against a rubric; the grader's explanation is fed back to the agent for the next iteration.

## Create a rubric

A rubric is a required markdown document with explicit, gradeable per-criterion scoring (for example "The CSV contains a price column with numeric values" rather than "The data looks good").

```markdown
# DCF Model Rubric

## Revenue Projections
- Uses historical revenue data from the last 5 fiscal years
- Projects revenue for at least 5 years forward

## Output Quality
- All figures are in a single .xlsx file with clearly labeled sheets
```

Pass it inline on `user.define_outcome`, or upload through the Files API for reuse across sessions.

## Signature / Usage

```python
session = client.beta.sessions.create(
    agent=agent.id, environment_id=environment.id, title="Financial analysis on Costco",
)

client.beta.sessions.events.send(
    session_id=session.id,
    events=[{
        "type": "user.define_outcome",
        "description": "Build a DCF model for Costco in .xlsx",
        "rubric": {"type": "text", "content": RUBRIC},
        # or: "rubric": {"type": "file", "file_id": rubric.id},
        "max_iterations": 5,  # optional; default 3, max 20
    }],
)
```

You can also pass a single `user.define_outcome` event in `initial_events` at session creation to start work in one call.

## Options / Props

| Field | Description |
|-------|-------------|
| `description` | What the outcome should be. |
| `rubric` | `{"type": "text", "content": ...}` or `{"type": "file", "file_id": ...}`. Required. |
| `max_iterations` | Optional, default 3, max 20. |

## Outcome events

- `agent.*` events show progress toward the outcome.
- `span.outcome_evaluation_start` / `_ongoing` / `_end` are emitted only for outcome-oriented sessions.
- `user.message` events can steer the agent as it progresses (not required — the agent works toward the outcome on its own).
- `user.interrupt` pauses the current outcome and marks `span.outcome_evaluation_end.result` as `interrupted`.

`span.outcome_evaluation_end.result` values:

| Result | Next |
|--------|------|
| `satisfied` | Session transitions to `idle`. |
| `needs_revision` | Agent starts a new iteration cycle. |
| `max_iterations_reached` | One final acknowledgment turn, then `idle`. No further evaluation. |
| `failed` | Session transitions to `idle` (rubric doesn't apply, or description/rubric contradict). |
| `interrupted` | Session interrupted while an outcome was active. |

Only one outcome runs at a time; chain outcomes by sending a new `user.define_outcome` after the prior `span.outcome_evaluation_end`.

## Check outcome status

```python
session = client.beta.sessions.retrieve(session.id)
for outcome in session.outcome_evaluations:
    print(f"{outcome.outcome_id}: {outcome.result}")
```

## Retrieve deliverables

The agent writes output files to `/mnt/session/outputs/` inside the sandbox. Once idle, fetch them through the Files API scoped by `scope_id=<session_id>` (requires the `managed-agents-2026-04-01` beta header on the files request).

```python
files = client.beta.files.list(scope_id=session.id, betas=["managed-agents-2026-04-01"])
content = client.beta.files.download(files.data[0].id)
```

## Notes

- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints, which use `agent-memory-2026-07-22`.

## Related

- [Define your agent](./agent-setup.md)
- [Session Event Stream](../orchestration/events-and-streaming.md)
