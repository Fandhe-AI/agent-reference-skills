# Multi-agent (Agents API)

Multi-agent lets an agent delegate tasks to subagents. Each subagent has its own context and can work in parallel; the main agent coordinates and combines results.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

with client.beta.agents.sessions.create(
    agent={
        "model": "gpt-6-astra",
        "instructions": "Delegate each release to a separate subagent. Ask each to extract customer-visible changes and required migration steps using only its release notes. Wait for both results, then combine them into one release summary with release labels. Do not invent missing details.",
        "multi_agent": {"enabled": True, "max_concurrent_subagents": 2},
    },
    environment={"type": "none"},
    input="Use two subagents, one for each release, and combine their findings into a labeled summary. Release A: Search now supports filtering by date. Existing queries continue to work. Release B: The export endpoint now returns a download URL instead of file bytes. Update clients to fetch that URL.",
    stream=True,
).with_result_collection() as stream:
    for event in stream:
        print(event.model_dump_json())
    result = stream.get_final_result()
print(result.output_text)
```

Attribute a command to an agent (`subagent_id` is `null` for the main agent):

```python
turn = client.beta.agents.sessions.turns.retrieve(
    command.turn_id, session_id=session_id
)
print(turn.subagent_id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent.multi_agent.enabled` | boolean | Enables delegation; the harness supplies tools to create, message, wait for, and interrupt subagents |
| `agent.multi_agent.max_concurrent_subagents` | integer | Max subagents running at once; default `6`, excluding the coordinator; positive integer when enabled |

## Notes

- Use subagents for independent tasks (separate documents, different failure causes) with a clear question and expected result. Keep short tasks and dependent steps in the main agent; agents editing the same files must coordinate.
- To disable delegation omit `multi_agent`, or set `enabled: false` and omit the limit. Settings apply at session creation; stored-agent changes apply to new sessions.
- With `environment.type: "none"`, include the initial `input` in the create request. The coordinator and subagents share one environment filesystem; creating a subagent does not create another environment.
- Subagents inherit configured MCP tools, their credentials and allowed tools, and web search settings, and can use the environment's files and command-line tools. Subagents do not support function tools (nor browser authentication in computer use).
- Observing delegation: `agent.session.subagent.created` gives the new subagent's ID; `agent.session.turn.item.added` / `.done` report coordination items `create_subagent_call`, `send_subagent_input_call`, `wait_for_subagents_call`, `interrupt_subagent_call`. A completed create or wait action does not mean the subagent finished. Coordination items can omit message content; `agent_message` items carry inter-agent text when available, but the stream is not a full transcript. Read the main agent's response for the combined result; use saved items and turns for each subagent's history.
- Distinct from handoffs and agents-as-tools in the Agents SDK (this skill's `orchestration` category).
- Source: https://developers.openai.com/api/docs/guides/agents-api/multi-agent (fetched 2026-10).

## Related

- [Configuring Agents](./configuration.md)
- [Events and Items](./session-events.md)
- [Observability and Usage](./observability.md)
- [Tracing (Agents API)](./tracing.md)
