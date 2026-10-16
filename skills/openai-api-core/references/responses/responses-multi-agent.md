# Multi-agent

Beta Responses API feature that lets a model spawn and coordinate subagents in parallel, synthesizing their work into a final response. Available with GPT-6.1 Sol and all GPT-5.6 models via raw `POST /v1/responses` requests (not the separate Agents SDK).

## Signature / Usage

```python
response = client.beta.responses.create(
    model="gpt-6.1-sol",
    input="Review the pull-request diff below with three agents: correctness, security, missing tests...",
    multi_agent={
        "enabled": True,
        "max_concurrent_subagents": 3,
    },
    betas=["responses_multi_agent=v1"],
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| multi_agent.enabled | boolean | false | Makes the root agent (`/root`) eligible to spawn a tree of subagents sharing the request's model and tools |
| multi_agent.max_concurrent_subagents | integer | 3 | Max subagents active at once across the whole tree (children, grandchildren, ...), excluding the root agent; no fixed upper bound or depth limit |
| betas | array | — | Must include `"responses_multi_agent=v1"` for HTTP/SDK; use header `OpenAI-Beta: responses_multi_agent=v1` for raw HTTP/WebSocket |

## Notes

- Use when a task splits into independent, bounded workstreams (parallel codebase exploration, comparing proposals, multi-source research); prefer a single agent when steps are tightly sequential or share mutable state.
- Six hosted collaboration actions appear as `multi_agent_call` items (`spawn_agent`, `send_message`, `followup_task`, `wait_agent`, `interrupt_agent`, `list_agents`) — do not execute these yourself or submit outputs for them; the API executes them and returns `multi_agent_call_output`.
- New output item types: `multi_agent_call`, `multi_agent_call_output`, `agent_message` (encrypted inter-agent message); each carries an `agent.agent_name` (e.g. `/root`, `/root/reviewer`).
- WebSocket mode (`response.inject` events) is recommended for tool-heavy/long-running workflows — it lets your app inject function outputs into an active response without waiting for the whole response to complete. HTTP mode requires a full new request once all outstanding function calls are collected.
- Limitations: `/responses/compact` is unsupported when Multi-agent is enabled (with `multi_agent.enabled: true`, automatic server-side compaction is applied implicitly even without `context_management`, independently per agent; an explicit `context_management.compact_threshold` overrides the threshold); `reasoning.summary` and `max_tool_calls` are also unsupported.
- `max_concurrent_subagents` defaults to `3`, which is the recommended setting.
- Multi-agent is still beta (`betas=["responses_multi_agent=v1"]` / `client.beta.responses.create`); item schemas may change.
- In Multi-agent mode, do not combine async tools (`async: true`) with parallel tool calls (see [Async tool calling](../structured-streaming/async-tool-calling.md)).
- This is the Responses API's own Multi-agent mode, distinct from the Agents API multi-agent guide (`guides/agents-api/multi-agent`), which is covered by the openai-agents skill.
- Developer-defined `function_call` items from any agent in the tree must still be executed and answered by your application like normal function calling.

## Related

- [compaction](./compaction.md)
