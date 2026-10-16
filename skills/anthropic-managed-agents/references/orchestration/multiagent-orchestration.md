<!-- source: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration / last verified: 2026-10-17 -->

# Multiagent orchestration

Coordinate multiple agents within a single session. The agent a session runs can hand work to other agents with **subagents** or **dynamic workflows**, and can consult an **advisor** model, improving output quality and time to completion.

## Signature / Usage

The `multiagent` block of the agent definition takes a `type`. With `multiagent_20261001`, an agent can use all three approaches together, and each can be turned on or off. `subagents` and `workflows` are enabled by default.

```python
lead_agent = client.beta.agents.create(
    name="Engineering Lead",
    model="claude-opus-5-5",
    system="You coordinate engineering work. Delegate code review to the reviewer agent and test writing to the test agent.",
    tools=[{"type": "agent_toolset_20260401"}],
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

session = client.beta.sessions.create(agent=lead_agent.id, environment_id=environment.id)
```

## Hand work to other agents

| Approach | What happens | Use it when | Consider |
|----------|--------------|-------------|----------|
| Subagents | The agent delegates tasks to its subagents. Each works in its own session thread, which you can list and stream. | The agent should follow up with a subagent after it reports, or it needs specialists that you list, with their own system prompts and tools. | Delegation is one level deep, and a session can have at most 25 child threads at a time, idle ones included. Advisor threads and a workflow run's threads don't count. |
| Dynamic workflows | The agent writes a workflow: a program that runs many agents in phases and combines their results. The server runs it in the background as one workflow run. | Work with many pieces, parallel work, or a long task that should finish sooner (audits, migrations, deep research, cross-checking). | Every agent in a run uses tokens, so set a session budget. Tell the agent in its system prompt when to use a run. |
| Advisor | The session's primary thread consults an advisor model mid-turn for guidance and keeps doing the work itself. | One agent should do the work, with an advisor model's judgment at key moments such as planning or a final review. | Only the primary thread can consult the advisor; consultations are billed at the advisor model's rates. |

- With subagents, the agent determines what happens next and can send follow-ups to a subagent's thread until you archive it.
- With dynamic workflows, context and results pass programmatically between agents. The agent can't send follow-up messages to a run's threads, and the server archives each one by the end of its run.

## Options / Props

`multiagent` with `type: "multiagent_20261001"`:

| Field | Description |
|-------|-------------|
| `subagents` | `{type: "enabled" \| "disabled"}`. Enabled by default. Takes `predefined_agents` (list, empty by default) and `inline_agents` (`{type: "enabled" \| "disabled"}`, enabled by default). |
| `workflows` | `{type: "enabled" \| "disabled"}`. Enabled by default. Takes its own `predefined_agents` list and `inline_agents` setting. |
| `advisor` | `{type: "enabled", model: "<model id>"}`; exactly two fields, `type` and `model`. Disabled by default. |

`subagents.predefined_agents` and `workflows.predefined_agents` are two separate lists; an agent in one is not added to the other. An entry of either list takes one of these forms:

| Entry | Description |
|-------|-------------|
| `{"type": "agent", "id": agent.id}` | References a created agent by ID. Without `version`, pinned to its latest version when the listing agent is created, or when an update sends the list. |
| `{"type": "agent", "id": agent.id, "version": agent.version}` | Pins a specific agent version. |
| `agent.id` (string) | Short for `{"type": "agent", "id": agent.id}`. |
| `{"type": "self"}` | Lists the agent itself, so copies of it can do the work. Session-level agent configuration overrides also apply to these copies; entries referenced by ID are unaffected. |

## Predefined and inline agents

- **Predefined agent:** an agent you already created and list in the `multiagent` block. It uses its own model, system prompt, tools, MCP servers, and skills.
- **Inline agent:** an agent that is not saved. The session's agent (or a workflow) defines it when it hands out the work, and it uses that agent's model, tools, MCP servers, and skills.
- Inline agents are on by default under both `subagents` and `workflows`. To allow only listed agents, set `inline_agents` to `{"type": "disabled"}` under `subagents`, `workflows`, or both.
- A setting with inline agents disabled needs at least one agent in its `predefined_agents`; with an empty list the request fails with a 400 error. On an update, the server checks the settings as they stand after the update.

```json
{
  "multiagent": {
    "type": "multiagent_20261001",
    "subagents": {
      "type": "enabled",
      "inline_agents": { "type": "disabled" },
      "predefined_agents": ["agent_01J8XkN5uT3vHpLqRfWdY2", { "type": "self" }]
    },
    "workflows": {
      "type": "enabled",
      "inline_agents": { "type": "disabled" },
      "predefined_agents": [
        { "type": "agent", "id": "agent_01Lm4cV8yQ2tNs7XbKdR5h", "version": 2 }
      ]
    }
  }
}
```

## Delegate to subagents

All agents share the same sandbox, filesystem, and vault credentials, but each runs in its own **session thread**, a context-isolated event stream with its own conversation history. The session's agent reports activity in the **primary thread** (the session-level event stream); additional threads are spawned at runtime when it delegates work. A workflow run also creates threads. A subagent's thread is persistent: the agent can send a follow-up to a subagent it called earlier, and that subagent retains its previous turns.

Patterns that work well: parallelization (fan out independent subtasks), specialization (domain-focused system prompts and tools), and escalation (consult a more capable agent or model; to consult a model, give the session an advisor).

Rules for agents listed in `subagents.predefined_agents` and `workflows.predefined_agents`:

- **Pinning:** the configuration, including the list, is snapshotted when the agent is created or updated; referenced agents stay pinned and don't pick up later updates. An update that doesn't send the list keeps the pinned versions. To delegate to a newer version, update the agent so the list references that version.
- **One level:** referencing another agent that has `multiagent` set fails with a 400 validation error.
- **Up to 20 agents:** each list can hold up to 20 unique agents (per list). The agent can call multiple copies of each, within the session's thread limit (25 child threads).
- **Inference geography:** the agent and every agent listed in either list must pin the same `inference_geo` in the `model` of the agent definition, or none of them can. A mismatch is rejected with a 400 validation error, both when the agent is saved and when a session-create override changes any of the pins.

### Connect agents to MCP servers

MCP servers are agent-scoped (each agent definition declares its own servers and tools); an inline agent has no definition, so it uses the MCP servers and tools of the session's agent. Vault credentials are session-scoped: `vault_ids` passed at session creation apply to every thread.

- To authenticate MCP servers, include a vault credential for every MCP server used across all agents.
- To limit an agent's access, declare only the servers it needs in its agent definition. You can't limit an inline agent this way; to allow only listed agents, disable `inline_agents` in both `subagents` and `workflows` and list at least one agent in each.
- Agent configuration overrides at session creation can replace the MCP servers of the session's agent and its `self` copies.
- With a `limited` environment, session creation fails with a 400 error when the agent, or an agent listed in `subagents` or `workflows`, declares an MCP server whose host is not in `allowed_hosts`. Setting `allow_mcp_servers` to `true` in the environment's networking turns this check off.

### Threads

Each agent's session thread has its own event stream (`/v1/sessions/{session_id}/threads/{thread_id}/stream`). The primary thread (`/v1/sessions/{session_id}/events/stream`) is a condensed view of all activity. Session `status` aggregates thread status: `running` if any thread is `running`. To list, interrupt, or archive threads, read their events, and handle tool permissions across them, see Session threads.

```python
for thread in client.beta.sessions.threads.list(session.id):
    agent = thread.agent
    label = agent.type if agent.type == "advisor" else agent.name
    print(f"[{label}] {thread.status}")
```

## Dynamic workflows

The agent writes a **workflow**: a program that runs many agents in phases and combines what they return. The server runs it in the background as a **workflow run** while the agent keeps working or ends its turn.

- **How a run starts:** you describe the work in a `user.message`; the agent determines whether and when to start a run, with no additional API call. Permission policies apply to the tools a run's agents call, not to starting the run.
- **Which agents it uses:** inline agents the workflow defines, predefined agents listed in `workflows.predefined_agents`, or both. If you list none, the workflow defines them all. An inline agent uses the model of the session's agent; to use another model for some agents, create them as agents and list them in `workflows.predefined_agents`.
- **How you follow it:** run events arrive on the session's event stream, and each agent in the run works in a session thread you can list, read, and stream. See Workflow runs.

### Turn on dynamic workflows

Set `multiagent.type` to `"multiagent_20261001"` and enable `workflows`. Dynamic workflows and `subagents` are both on by default with this type; for dynamic workflows only, add `"subagents": {"type": "disabled"}`.

```json
{
  "name": "Contract Reviewer",
  "model": "claude-opus-5-5",
  "system": "You review contracts. When you are asked to review more than a few contracts, start a workflow run that reads them in parallel and combines the findings. Review one or two contracts yourself, without a run.",
  "tools": [{"type": "agent_toolset_20260401"}],
  "multiagent": {"type": "multiagent_20261001", "workflows": {"type": "enabled"}}
}
```

### Tell the agent when to use a run

Turning workflows on gives the agent the ability to start runs; it decides when. Guide that choice in the agent's system prompt (name the tasks that call for a run and the small tasks to do itself). You can also guide how a run works: how to split the work, what to do when an agent fails, a time limit, or "plan first" (there's no approval step before a run starts, so nothing enforces a plan-first instruction). Keep runs to the tasks that need them, because every agent in a run uses tokens.

Updating an agent that keeps the `multiagent_20261001` type:

- A setting or field you leave out keeps its stored value; one sent as `null` takes its default (and so does everything inside it). A `predefined_agents` list you send replaces the stored list; a setting sent with a different `type` replaces the stored setting. Every object you send needs its `type`, and an enabled `advisor` needs its `model`.
- Turn workflows off with `{"type": "disabled"}`; sending `null` turns it on (default enabled). The same applies to `subagents`.
- A session copies the setting when created, so later agent changes don't affect existing sessions.
- An agent that has `multiagent` set can't be listed as a subagent of another agent or in another agent's `workflows.predefined_agents`; it can list itself with `{"type": "self"}`.
- The `ant__` tool-name prefix is reserved: if the agent has a custom tool whose name starts with `ant__`, an update fails with 400 until you send `tools` without that name, and a new session is refused with 400 if its agent (or a listed agent) has such a tool.
- Set a session budget at session creation to cap spend, runs included (it can't be added to an existing session). Runs pause when the budget is reached and resume when you raise or remove it, unless an interrupt also paused them.

## Give the session an advisor

An enabled `advisor` setting gives the session's primary thread an advisor: a model it can consult mid-turn for planning, getting unstuck, or reviewing work.

```json
{
  "name": "Backend engineer",
  "model": "claude-sonnet-5",
  "system": "You implement backend features end to end. Consult the advisor before major backend design decisions.",
  "multiagent": {
    "type": "multiagent_20261001",
    "advisor": {"type": "enabled", "model": "claude-opus-5-5"}
  }
}
```

- This example sets only `advisor`; `subagents` and `workflows` keep their defaults (enabled). For an agent that consults an advisor and does all the work itself, set both to `{"type": "disabled"}`.
- An enabled advisor reserves the name `anthropic.advisor`; neither `predefined_agents` list can hold an agent with that name (400 validation error).
- The advisor model must meet a minimum capability bar, and the agent's own model must not be more capable than its advisor (equal capability can pair). An invalid pairing is rejected with 400 when the agent is saved and when a session is created; it is also checked when each consultation starts (a failed check fails that consultation, and the session continues).
- The Managed Agents `advisor` setting has no `max_uses`, `max_tokens`, or `caching` fields, and advice arrives through thread events rather than `advisor_tool_result` blocks.

### How consultations work

Each consultation runs as a platform-spawned thread named `anthropic.advisor` that terminates itself on completion; the advice is delivered to the primary thread as an `agent.thread_message_received` event. Typical order:

1. `session.thread_created`
2. `session.thread_status_running`
3. `agent.thread_message_received` (the advice; `from_agent_name` is `anthropic.advisor`)
4. `session.thread_status_idle` (`stop_reason: end_turn`)
5. `session.thread_status_terminated`

- No `agent.tool_use` events are emitted, and no `agent.thread_message_sent` appears on the session's event stream. The advice delivery is not guaranteed to arrive before the idle and terminated events.
- Whether your client can read the advice is the advisor model's policy. An advisor that returns redacted results delivers a `[{"type": "redacted"}]` placeholder on every client surface (the agent still reads the full advice server-side); the source notes Claude Opus 5.5 returns redacted results and Claude Opus 4.8 returns plaintext. Handle both `text` and `redacted` blocks. Advisor thinking is never surfaced. Clients cannot send `redacted` blocks; an event containing one is rejected with a 400 validation error.
- A failed or interrupted consultation never fails the agent's turn. A session-level `user.interrupt` during a consultation terminates the advisor thread with no advice; a `user.interrupt` with the advisor thread's `session_thread_id` abandons only that consultation.

### Advisor threads

The advisor is not a subagent: `list_agents` doesn't show it and `send_to_agent` can't reach it. Only the primary thread can consult it. Advisor threads are exempt from the 25-child-thread limit and appear in the session's thread list with `agent` = `{"type": "advisor", "model": ...}` and `parent_thread_id` = the primary thread. Consultations are billed at the advisor model's rates, appear in the advisor thread's usage and the session's usage totals, and count against a session budget at the advisor model's list price. Each consultation sends the advisor the primary thread's conversation so far.

### Removing the advisor

Update the agent with `advisor` set to `{"type": "disabled"}`. On an agent that already has the `multiagent_20261001` type, a setting that an update leaves out keeps its stored value (so omitting `advisor` keeps the advisor).

## Move from the `coordinator` type

The `coordinator` type lets an agent delegate to subagents you list and consult an advisor model. The API accepts both types.

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
```

`multiagent.agents` entries for `coordinator`:

| Entry | Description |
|-------|-------------|
| `{"type": "agent", "id": agent.id}` | References a created agent by ID; pinned to its latest version at coordinator-creation time. |
| `{"type": "agent", "id": agent.id, "version": agent.version}` | Pins a specific agent version. |
| `{"type": "self"}` | Allows the coordinator to spawn copies of itself; session-level overrides also apply to these copies. |

- The coordinator's roster is snapshotted at create/update time and does not auto-pick-up later agent updates.
- Only one level of delegation; max 20 unique agents in `multiagent.agents`; max 25 concurrent threads per session.

To move an agent to `multiagent_20261001`, update the agent with a `multiagent` block of that type:

1. Set `type` to `"multiagent_20261001"`.
2. List the agents in `subagents.predefined_agents` (entries keep their current form).
3. If the agent has an advisor, set `advisor` to `{"type": "enabled", "model": "..."}`.
4. Send the whole block in one update.

Omitted `workflows` and `subagents.inline_agents` take their defaults (enabled), so the moved agent can also start workflow runs and define subagents itself; set either to `{"type": "disabled"}` in the same update to keep it off. If the agent has an advisor and no subagents, set `subagents` to `{"type": "disabled"}`. A request that disables `subagents.inline_agents` and lists no agents fails with a 400 error.

## Notes

- `coordinator` is still accepted, but it cannot start workflow runs or define inline agents.
- An update replaces the whole `multiagent` block; what you leave out takes its default (`subagents.predefined_agents` becomes empty, so the agent loses listed subagents; `advisor` becomes disabled). Once the agent has the `multiagent_20261001` type, a setting that a later update leaves out keeps its stored value.
- The update doesn't change sessions that already exist; create a session after the update to use the new block.
- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints (`agent-memory-2026-07-22`).

## Related

- [Define your agent](../getting-started/agent-setup.md)
- [Session Event Stream](./events-and-streaming.md)
- [Session threads](./session-threads.md)
- [Workflow runs](./workflow-runs.md)
