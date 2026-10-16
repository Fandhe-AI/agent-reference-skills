<!-- source: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration / last verified: 2026-10-17 -->

# Coordinate Multiple Agents in One Session

Configure an agent with the `multiagent_20261001` type that delegates to listed subagents (and optionally consults an advisor) in the same session, each subagent running in its own context-isolated thread, then monitor threads from the primary event stream.

```python
client = Anthropic()

lead_agent = client.beta.agents.create(
    name="Engineering Lead",
    model="claude-opus-5-5",
    system="You coordinate engineering work. Delegate code review to the reviewer agent and test writing to the test agent.",
    tools=[
        {"type": "agent_toolset_20260401"},
    ],
    multiagent={
        "type": "multiagent_20261001",
        "subagents": {
            "type": "enabled",
            "predefined_agents": [
                {"type": "agent", "id": reviewer_agent.id},
                {"type": "agent", "id": test_writer_agent.id},
            ],
        },
    },
)

session = client.beta.sessions.create(
    agent=lead_agent.id,
    environment_id=environment.id,
)
```

Add an advisor the primary thread can consult mid-turn (an `advisor` setting has exactly `type` and `model`):

```python
agent = client.beta.agents.create(
    name="Backend engineer",
    model="claude-sonnet-5",
    system="You implement backend features end to end. Consult the advisor before major backend design decisions.",
    multiagent={
        "type": "multiagent_20261001",
        "advisor": {"type": "enabled", "model": "claude-opus-5-5"},
    },
)
```

List and control threads once the agent has delegated work:

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

- `multiagent_20261001` has three settings: `subagents`, `workflows`, and `advisor`. `subagents` and `workflows` are enabled by default (each with `inline_agents` enabled); `advisor` is disabled by default. The two examples above leave the others at their defaults, so the agents can also define inline subagents and start workflow runs; set a setting to `{"type": "disabled"}` to turn it off.
- The older `coordinator` type (`multiagent={"type": "coordinator", "agents": [...]}`) is still accepted by the API, but an agent with it cannot start workflow runs or define subagents (inline agents) itself. To move an agent, update it with a whole `multiagent` block of the new type, listing agents in `subagents.predefined_agents` and re-sending `advisor`; the update replaces the whole block, so anything left out takes its default (empty list, advisor disabled). Existing sessions are unchanged; create a new session afterwards.
- All agents share the same sandbox, filesystem, and vault credentials, but each runs in its own session thread; the primary thread's stream is `/v1/sessions/{session_id}/events/stream`, and each subagent thread has its own stream at `/v1/sessions/{session_id}/threads/{thread_id}/stream`.
- Up to 20 unique agents per `predefined_agents` list (per list, for `subagents` and `workflows` each), and every listed agent must pin the same `inference_geo` as the agent (or none of them pins one), else 400. Archiving a thread requires it to be `idle`; interrupt a running thread first.
- An advisor thread is named `anthropic.advisor`, is exempt from the 25-child-thread limit, and its advice may arrive as a `[{"type": "redacted"}]` placeholder depending on the advisor model; the advisor cannot be listed in `predefined_agents`.
- Example from the Claude API (platform.claude.com) `managed-agents/multiagent-orchestration` page.
