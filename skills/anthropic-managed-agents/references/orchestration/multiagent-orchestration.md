<!-- source: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration / last verified: 2026-08-07 -->

# Multiagent orchestration

Coordinate multiple agents within a single session. One agent (the coordinator) delegates to others, each acting in parallel with its own isolated context, improving output quality and time to completion.

## How it works

All agents share the same sandbox, filesystem, and vault credentials, but each runs in its own **session thread** — a context-isolated event stream with its own conversation history. The coordinator reports activity in the **primary thread** (the session-level event stream); additional threads spawn at runtime when the coordinator delegates work. Threads are persistent: the coordinator can send a follow-up to a previously-called agent, which retains its prior turns.

Each agent uses its own configuration (model, system prompt, tools, MCP servers, skills). Session-level agent configuration overrides apply only to the coordinator and its `self` copies; tools, MCP servers, and context are not otherwise shared.

### What to delegate

- **Parallelization** — fan out independent subtasks simultaneously and have the coordinator synthesize results.
- **Specialization** — route to agents with domain-focused system prompts/tools (a security agent, a documentation agent) instead of one agent with every capability.
- **Escalation** — consult a more capable agent/model for a subset of complex subtasks.

## Signature / Usage

```python
coordinator = client.beta.agents.create(
    name="Engineering Lead",
    model="claude-opus-5",
    system="You coordinate engineering work. Delegate code review to the reviewer agent and test writing to the test agent.",
    tools=[{"type": "agent_toolset_20260401"}],
    multiagent={
        "type": "coordinator",
        "agents": [
            {"type": "agent", "id": reviewer_agent.id},
            {"type": "agent", "id": test_writer_agent.id},
        ],
    },
)

session = client.beta.sessions.create(agent=coordinator.id, environment_id=environment.id)
```

## Options / Props

`multiagent.agents` entries accept:

| Entry | Description |
|-------|-------------|
| `{"type": "agent", "id": agent.id}` | References a previously created agent by ID; pinned to its latest version at coordinator-creation time. |
| `{"type": "agent", "id": agent.id, "version": agent.version}` | Pins a specific agent version. |
| `{"type": "self"}` | Allows the coordinator to spawn copies of itself; session-level overrides also apply to these copies. |

- The coordinator's roster is snapshotted at create/update time and does not auto-pick-up later agent updates; update the coordinator to delegate to a newer version.
- Only one level of delegation: an agent with its own `multiagent.agents` roster cannot be referenced (validation error).
- Max 20 unique agents in `multiagent.agents`, but the coordinator can call multiple copies of each.
- Max 25 concurrent threads per session.

## Connect agents to MCP servers

MCP servers are agent-scoped (each agent declares its own servers/tools); vault credentials are session-scoped (`vault_ids` at session creation apply to every thread). To authenticate MCP servers, include a vault credential for every server used across all agents; to limit an agent's access, declare only the servers it needs in its own definition.

## Threads

- **Primary thread** (`/v1/sessions/{session_id}/events/stream`) — condensed view of all activity across threads (start/end of subagent work, blocking events), not full subagent detail.
- **Session threads** — each has its own event stream at `/v1/sessions/{session_id}/threads/{thread_id}/stream` for drilling into a specific agent's activity; accepts the same `event_deltas[]` preview parameter as the session stream.
- Session `status` aggregates thread status: `running` if any thread is `running`.

```python
for thread in client.beta.sessions.threads.list(session.id):
    print(f"[{thread.agent.name}] {thread.status}")

# Interrupt a specific thread (omit session_thread_id to interrupt all)
client.beta.sessions.events.send(
    session.id, events=[{"type": "user.interrupt", "session_thread_id": thread.id}],
)

# Archive an idle thread (frees a slot against the 25-thread limit)
client.beta.sessions.threads.archive(thread.id, session_id=session.id)
```

Archiving requires the thread to be `idle` (a thread parked on `requires_action` counts as idle); a running thread must be interrupted first.

### Primary thread events

| Type | Description |
|------|-------------|
| `session.thread_created` | A thread was created. Includes `session_thread_id`, `agent_name`. |
| `session.thread_status_running` | A thread started activity. |
| `session.thread_status_idle` | The thread's agent is awaiting input; includes `stop_reason`. |
| `session.thread_status_terminated` | A thread was archived or hit a terminal error. |
| `agent.thread_message_received` | A message arrived on this thread from another thread. |
| `agent.thread_message_sent` | This thread sent a message to another thread. |

### Tool permissions and custom tools on subagent threads

If a subagent needs client input (tool permission, custom tool result), the event is cross-posted to the primary thread with `session_thread_id` identifying the originating thread. Post `user.tool_confirmation` (with `tool_use_id`) or `user.custom_tool_result` (with `custom_tool_use_id`); the server routes the response to the correct thread automatically.

## Notes

- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints (`agent-memory-2026-07-22`).

## Related

- [Define your agent](../getting-started/agent-setup.md)
- [Session Event Stream](./events-and-streaming.md)
