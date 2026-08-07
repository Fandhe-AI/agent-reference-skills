<!-- source: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration / last verified: 2026-08-07 -->

# Coordinate Multiple Agents in One Session

Configure a coordinator agent that delegates to other agents in the same session, each running in its own context-isolated thread, then monitor threads from the primary event stream.

```python
client = Anthropic()

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

List and control threads once the coordinator has delegated work:

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

## Notes

- All agents in the roster share the same sandbox, filesystem, and vault credentials, but each runs in its own session thread with isolated conversation history; the coordinator's own activity appears in the primary thread (`/v1/sessions/{session_id}/events/stream`), while each subagent thread has its own stream at `/v1/sessions/{session_id}/threads/{thread_id}/stream`.
- `multiagent.agents` entries are `{"type": "agent", "id": ...}` (optionally pinned with `"version"`) or `{"type": "self"}` to let the coordinator spawn copies of itself. Only one level of delegation is allowed — an agent with its own `multiagent.agents` roster cannot be referenced. Max 20 unique agents in the roster, max 25 concurrent threads per session.
- The coordinator's roster is snapshotted at create/update time; update the coordinator to delegate to a newer agent version.
- Archiving a thread requires it to be `idle` (a thread parked on `requires_action` counts as idle); a running thread must be interrupted first.
- Example from the Claude API (platform.claude.com) `managed-agents/multiagent-orchestration` page.
