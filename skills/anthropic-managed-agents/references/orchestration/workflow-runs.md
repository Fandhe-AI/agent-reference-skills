<!-- source: https://platform.claude.com/docs/en/managed-agents/workflow-runs / last verified: 2026-10-17 -->

# Workflow runs

A **workflow** is a program an agent writes to run many agents and combine what they return; a **workflow run** is one execution of it. **Dynamic workflows** is the feature that lets an agent write workflows and start runs, toggled by the `workflows` setting in the agent's `multiagent` block. The server runs a workflow in the background; its agents work in session threads the server creates. Beta header: `managed-agents-2026-04-01`.

## How it works

- **Workflow run:** executed by the server in the background. A session can have several runs open at once.
- **Phases:** named stages (e.g. "Read the contracts"); follow progress by phase events.
- **Agent threads:** each agent works in its own session thread on a program-written prompt. An agent is inline (defined by the program) or predefined (listed in `predefined_agents` of `workflows`).
- The program can fan out, pass results between agents, repeat and choose, and handle a failed agent (the server usually reruns a failed agent once on a new thread; a handled failure can still end the run `completed`).
- No approval step before a run starts. To review a plan first, tell the agent to describe the run and wait for your go-ahead.
- To stop a run, ask the agent to stop it. No event you send ends a run; archiving the session can.

## Signature / Usage

Run lifecycle events arrive on the session event stream (the primary thread's stream). The run's first event lists its phases:

```json
{
  "type": "workflow_run.created",
  "id": "sevt_01abc...",
  "workflow_run_id": "wrun_01J8XkN5uT3vHpLqRfWdY2",
  "name": "Find change-of-control clauses",
  "description": "Reads each contract and lists those that have the clause.",
  "phases": [
    {
      "id": "wrph_01Kd3a1f3",
      "name": "Read the contracts",
      "description": "Reads each contract for the clause."
    },
    { "id": "wrph_01Kd3b7c9", "name": "Reconcile the findings", "description": null }
  ],
  "processed_at": "2026-10-09T14:01:45Z"
}
```

Phase events name the phase by `workflow_run_phase_id`:

```json
{
  "type": "workflow_run.phase_started",
  "id": "sevt_01def...",
  "workflow_run_id": "wrun_01J8XkN5uT3vHpLqRfWdY2",
  "workflow_run_phase_id": "wrph_01Kd3a1f3",
  "processed_at": "2026-10-09T14:01:46Z"
}
```

The last event reports how the run ended:

```json
{
  "type": "workflow_run.status_ended",
  "id": "sevt_01ghi...",
  "workflow_run_id": "wrun_01J8XkN5uT3vHpLqRfWdY2",
  "result": { "type": "completed" },
  "processed_at": "2026-10-09T14:09:12Z"
}
```

Follow a run (Python; open the stream first, then send the message):

```python
open_runs: dict[str, str] = {}  # workflow_run_id -> run name
phase_names: dict[tuple[str, str], str] = {}  # (run ID, phase ID) -> phase name

with client.beta.sessions.events.stream(session_id) as stream:
    client.beta.sessions.events.send(
        session_id,
        events=[{"type": "user.message", "content": [{"type": "text", "text": "Which contracts in /contracts have a change-of-control clause?"}]}],
    )
    for event in stream:
        match event.type:
            case "workflow_run.created":
                open_runs[event.workflow_run_id] = event.name
                for phase in event.phases:
                    phase_names[event.workflow_run_id, phase.id] = phase.name
            case "workflow_run.status_ended":
                open_runs.pop(event.workflow_run_id, None)
            case "session.status_idle":
                # Done when every run has ended and the agent has finished its turn
                if not open_runs and event.stop_reason.type == "end_turn":
                    break
```

## Options / Props

Run states: a run is **open** from `workflow_run.created` until `workflow_run.status_ended`, running or idle. It starts running or idle; reaching the budget pauses a running run (idle). A running run ends when its workflow finishes, the agent stops it, it fails, its lifetime passes, or the session is archived.

Run events (every `workflow_run.*` event includes `workflow_run_id`, which is `null` only on a `workflow_run.error` when no run was created):

| Event | Meaning |
|-------|---------|
| `workflow_run.created` | Agent started a run. Includes `workflow_run_id` (`wrun_...`), `name`, `description`, `phases` (each `id`, `name`, `description`; always present, can be empty). |
| `workflow_run.status_running` | Run starts executing (can be a while after `created`) and each time it resumes after a budget pause. A resume after an interrupt might not send it. |
| `workflow_run.status_idle` | Run paused (e.g. at the session budget). Does not say why; a pause after an interrupt might not send it. |
| `workflow_run.phase_started`, `workflow_run.phase_ended` | Phase entered/left (or closed by the run's end). Include `workflow_run_phase_id`; the end also has `phase_started_id`. Neither carries the phase name: look it up in `phases` of `created`. |
| `workflow_run.status_ended` | Always the last `workflow_run.*` event of the run. Includes `result`. |
| `workflow_run.error` | Server reports a run error or a refused start. Includes `error` (`type`, `message`). Log it; it is not the run's end. |

`result` values:

| `result` | Meaning |
|----------|---------|
| `{"type": "completed"}` | Workflow finished. Does not say whether the work passed; read the run's threads' events to find failures. |
| `{"type": "stopped"}` | The agent stopped the run, or the session was archived. |
| `error` with `timeout_error` | Run reached its lifetime. |
| `error` with `program_error` | Workflow code failed or broke a rule, or a thread failed/could not be created and the workflow let that end the run. |
| `error` with `thread_limit_error` | Run exceeded the limit on agents a workflow starts. |
| `error` with `unknown_error` | Server could not continue, or run exceeded another server limit. |

An error result looks like `{"type": "error", "error": {"type": "timeout_error", "message": "..."}}`. Treat an unrecognized `result.type` as ended some other way and an unrecognized `error.type` as an error.

Limits:

| Limit | Value |
|-------|-------|
| Threads working at once in one run | 64 (run creates no more until one finishes; not guaranteed) |
| Agents a workflow starts over the run's life | 1,000 (beyond that the run ends with `thread_limit_error`; reruns can make more than 1,000 threads) |
| Run lifetime | 24 hours by default, or the lifetime the agent sets (`timeout_error`) |
| Runs open at once in a session | 10 by default (further start refused; `workflow_run.error` with `max_workflow_runs_error`; idle runs count) |

Run and phase `name` is shortened to 64 characters and `description` to 256.

Requests while a run is open:

| Request | While a run is open |
|---------|---------------------|
| Archive or delete the session | Might return 400 (`error.details.error_code` can be `"workflow_run_open"`); might also succeed. A successful archive ends each open run with `{"type": "stopped"}`, and `workflow_run.status_ended` / open `phase_ended` do not arrive on the stream (list events to read them). |
| Archive one of a run's threads | 400 with `workflow_run_open` unless already archived. The server archives them. |
| Update the session's `agent` | 400 with `workflow_run_open` while any run is open (even paused). Updating the underlying agent is still accepted. A request that also sends other fields (e.g. `budget`) is rejected whole. |
| Answer a tool call / confirmation from a run's thread | Allowed; arrives on the primary stream. Answer as soon as the event arrives, passing the event's `id` as `tool_use_id` / `custom_tool_use_id`. Once the server archived the thread, a result has no effect and can return 400 (check the thread list: `terminated` means too late, drop it). Send each tool result in its own request. |

## Notes

- **A run's threads:** each thread carries the run's `workflow_run_id` (as does its `session.thread_created`); other threads have `null`. `agent` is either a predefined agent (`id` and `version`) or an inline agent (`type` `inline`, no `id`/`version`, workflow-written system prompt, the session agent's model, a subset of its tools/MCP servers/skills; tools keep their permission policies). Threads share the session's sandbox and files (including a mounted memory store) but each has its own conversation history. No event says which phase a thread works in; tell threads apart by `session_thread_id`. The server archives each thread by the end of its run (status stays `terminated` in the list). A run can create more than one thread for the same work, so make tools safe to call twice.
- **Know when the work is done:** an idle alone does not mean done. Done when (1) every run you saw created has its `workflow_run.status_ended`, and (2) after that a `session.status_idle` with `stop_reason` `end_turn` arrives that your own request (e.g. an interrupt) did not cause. A paused run does not keep the session `running`, so the session can go idle (e.g. `budget_reached`) while a run is open. With `retries_exhausted`, a run might still be running; if a run ended and the agent has not read its result, the server starts a new turn by itself.
- **Outcomes:** if you defined an outcome, no evaluation starts while a run is open.
- **Interrupt:** `user.interrupt` with no `session_thread_id` (or the primary thread's ID) stops the agent's turn but ends no run; runs might pause or keep running. A paused run's lifetime keeps passing (can end `timeout_error`). Answer waiting tool calls (deny to cancel a confirmation; send a result with `is_error: true` for a custom tool). While idle with `requires_action`, a `user.message` returns 400. To stop runs, send a `user.message` asking the agent to stop them (result `{"type": "stopped"}`); while idle with `budget_reached`, a `user.message` returns 400 until the budget is raised or removed.
- **Rebuild state after reconnect:** the stream does not replay. List events with a `types` filter (`types[]` in curl, `--type` in CLI) and page via `next_page`; `created` / `status_running` / `status_idle` / `status_ended` give state (a run paused after an interrupt might still show as running), `phase_started` / `phase_ended` rebuild progress. No endpoint lists runs.
- **Cost and budgets:** a run has no price of its own; its model requests count toward the session budget. To total one run's usage, list threads and add `usage` of threads with the run's `workflow_run_id` (archived threads are included). At the budget every open run pauses and the session reports `idle` with `budget_reached` (or `requires_action`); each working thread finishes its in-flight request, so a run can pass the budget by one request per working thread. Raising or removing the budget resumes paused runs unless an interrupt also paused them.
- Run events do not trigger webhooks. Only the agent on the primary thread starts runs; runs do not nest. A run's threads are exempt from the child-thread limit. You do not see the workflow's code, but can ask the agent to print it after the run ended and the session is `idle`.
- Rate limits: reads count toward the Managed Agents read limit (follow the stream instead of polling); model requests count toward Messages API rate limits for each thread's model. A thread's stream may get `session.error` of type `model_rate_limited_error` / `model_overloaded_error`; `retry_status.type` `retrying` means still working, `exhausted` means the thread failed (and the run may end `program_error`).
- Beta feature (`managed-agents-2026-04-01`).

## Related

- [Multiagent orchestration](./multiagent-orchestration.md)
- [Session threads](./session-threads.md)
- [Session Event Stream](./events-and-streaming.md)
- [Subscribe to webhooks](./webhooks.md)
