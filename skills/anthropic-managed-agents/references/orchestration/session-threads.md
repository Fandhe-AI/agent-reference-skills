<!-- source: https://platform.claude.com/docs/en/managed-agents/session-threads / last verified: 2026-10-16 -->

# Session threads

In a multiagent session, each agent works in its own **session thread**. This page covers listing, interrupting, and archiving threads, the events they send, and how tool permissions work across them. A workflow run creates session threads too. Beta header: `managed-agents-2026-04-01`.

- The session-level event stream (`/v1/sessions/{session_id}/events/stream`) is the **primary thread**: a condensed view of all activity across all threads (start/end of subagent work and blocking events such as tool permission requests).
- Session threads are where you drill into a specific agent's activity.
- Session `status` aggregates all thread activity: if at least one thread is `running`, the session is `running`. A running workflow run can keep the session `running` even while none of its threads is working. When no thread is working and a thread waits on your client, the session is `idle`.
- A session budget is one shared cap across all threads; threads pause independently as the cap is reached, and each thread's cost is priced at its own served model.

## Signature / Usage

List all threads (includes the primary thread):

```bash
curl -fsS "https://api.anthropic.com/v1/sessions/$SESSION_ID/threads" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01"
```

```python
for thread in client.beta.sessions.threads.list(session.id):
    agent = thread.agent
    label = agent.type if agent.type == "advisor" else agent.name
    print(f"[{label}] {thread.status}")
```

Interrupt one thread:

```python
client.beta.sessions.events.send(
    session.id,
    events=[{"type": "user.interrupt", "session_thread_id": thread.id}],
)
```

Archive a thread (only succeeds if `idle`):

```bash
curl -fsS -X POST "https://api.anthropic.com/v1/sessions/$SESSION_ID/threads/$THREAD_ID/archive" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01"
```

## Options / Props

Endpoints and CLI:

| Operation | Endpoint / CLI |
|-----------|----------------|
| List threads | `GET /v1/sessions/{session_id}/threads`, `ant beta:sessions:threads list --session-id` |
| Interrupt | `POST /v1/sessions/{session_id}/events` with `user.interrupt` (+ optional `session_thread_id`) |
| Archive | `POST /v1/sessions/{session_id}/threads/{thread_id}/archive` |
| Thread event stream | `GET /v1/sessions/{session_id}/threads/{thread_id}/stream`, `ant beta:sessions:threads:events stream` |
| Thread event list | `GET /v1/sessions/{session_id}/threads/{thread_id}/events`, `ant beta:sessions:threads:events list` |

Thread fields referenced: `parent_thread_id` is `null` for the primary thread (every other thread is a child); `workflow_run_id` is `null` except on a workflow run's threads. Add `statuses[]` to the list request (repeatable, e.g. `?statuses[]=running&statuses[]=idle`) to filter; omit for all statuses.

Primary thread events:

| Type | Description |
|------|-------------|
| `session.thread_created` | A thread was created. Includes `session_thread_id` and `agent_name`. |
| `session.thread_status_running` | A thread started activity. |
| `session.thread_status_idle` | The thread's agent is awaiting input. Includes `stop_reason`. |
| `session.thread_status_terminated` | A thread terminated and accepts no further input (e.g. archived or unrecoverable error). An advisor thread also terminates when its consultation ends. |
| `agent.thread_message_received` | On the primary thread, a subagent sent the primary agent a report or question. Includes `from_session_thread_id`, `from_agent_name`, `content`. |
| `agent.thread_message_sent` | On the primary thread, the primary agent sent a subagent a task or follow-up. Includes `to_session_thread_id`, `to_agent_name`, `content`. |

Message-direction events are named relative to the thread whose stream they appear on. Advisor consultations emit the same thread events under the reserved name `anthropic.advisor`.

### Tool permissions and custom tools

When a subagent needs permission for a tool call or a custom tool result, the event is cross-posted to the primary thread with `session_thread_id` identifying the originating thread:

```json
{
  "type": "session.thread_status_idle",
  "id": "sevt_01ABC...",
  "session_thread_id": "sthr_01DEF...",
  "agent_name": "code-reviewer",
  "stop_reason": {
    "type": "requires_action",
    "event_ids": ["sevt_01XYZ..."]
  }
}
```

Respond with `user.tool_confirmation` (`tool_use_id`) or `user.custom_tool_result` (`custom_tool_use_id`); the server routes the response to the correct thread. The two copies of the response can have different `id` values: match by `type` and `tool_use_id` / `custom_tool_use_id`, not `id`.

Answer a call when its own invoking event (`agent.tool_use` / `agent.mcp_tool_use`) arrives on the primary stream and its `evaluated_permission` is `"ask"`. The idle event can arrive before the events it lists, and a `user.tool_confirmation` for a not-yet-arrived call can return 400. The following example goes inside the event loop of the tool confirmation handler (see Session Event Stream); `decide(event)` is your own function that shows `event.name` / `event.input` to the user and returns `"allow"` or `"deny"`.

```python
if (
    event.type in ("agent.tool_use", "agent.mcp_tool_use")
    and event.evaluated_permission == "ask"
):
    decision = decide(event)  # "allow" or "deny", based on event.name / event.input
    client.beta.sessions.events.send(
        session.id,
        events=[
            {
                "type": "user.tool_confirmation",
                "tool_use_id": event.id,
                "result": decision,
            }
        ],
    )
```

For a custom tool, send `user.custom_tool_result` (`custom_tool_use_id`) when the cross-posted `agent.custom_tool_use` event arrives.

## Notes

- The official example allows every ID in `stop_reason.event_ids` unconditionally; the example above instead responds on arrival of each call event with an explicit decision, to avoid the arrival-order 400 and to avoid auto-approving calls that `always_ask` / `auto` asked to confirm.
- A session can have at most 25 child threads at a time. Idle threads count until archived; the primary thread does not count. Advisor consultation threads and workflow run threads are exempt.
- Interrupt: omitting `session_thread_id` interrupts every non-archived thread, including the primary. In a session with dynamic workflows an interrupt ends no run, and one naming a run's thread stops nothing.
- Interrupting a subagent thread blocked on `requires_action` closes each pending tool call with an error tool result and re-emits `session.thread_status_idle` with `stop_reason: end_turn` (no model sampling). On a child idle with `end_turn` or `budget_reached` it is a no-op. Naming a terminated thread returns 400. An interrupted child sends no report to the primary agent.
- Archive: a thread parked on `requires_action` counts as idle and can be archived directly; only a running thread must be interrupted first. Archiving frees a slot under the 25-thread limit. The server archives a workflow run's threads itself; you cannot while the run is open.
- Each thread stream accepts the same `event_deltas[]` parameter as the session stream; a child thread's previews never appear on the session-level stream.
- A thread's stream does not replay earlier events, and a run thread's event list can be empty right after `session.thread_created`. Open the stream first, then list events, and skip streamed events whose `id` the list returned.
- A workflow run thread's first `agent.thread_message_received` is the workflow-written prompt; its `from_session_thread_id` is the primary thread's ID and `from_agent_name` is not set. Do not parse the prompt text. No event records the result a thread returned to the workflow.
- Under `auto` permission, nothing in a subagent's thread counts as your intent; when the server denies a call under `auto`, nothing is cross-posted (it appears only on the subagent's thread stream).
- Beta feature (`managed-agents-2026-04-01`).

## Related

- [Multiagent orchestration](./multiagent-orchestration.md)
- [Workflow runs](./workflow-runs.md)
- [Preview responses with event deltas](./event-deltas.md)
- [Session Event Stream](./events-and-streaming.md)
