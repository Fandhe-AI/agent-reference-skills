<!-- source: https://platform.claude.com/docs/en/managed-agents/migration / last verified: 2026-08-07 -->

# Migration

Move an existing agent built on the Messages API or the Claude Agent SDK to Claude Managed Agents. Claude Managed Agents replaces your hand-written agent loop with managed infrastructure.

## From a Messages API agent loop

If you built an agent by calling `messages.create` in a `while` loop, executing tool calls yourself, and appending results to conversation history, most of that code goes away.

| Before | After |
|--------|-------|
| You maintain the conversation history array and pass it back on every turn. | The session stores history server-side. Send events, receive events. |
| You iterate `tool_use` content blocks, run each tool, and loop back with `tool_result` messages. | Pre-built tools run inside the sandbox automatically. You only handle custom tools through `agent.custom_tool_use` events. |
| You provision your own sandbox for running agent-generated code. | The session sandbox handles code execution, file operations, and bash. |
| You decide when the loop is done. | The session emits `session.status_idle` when the agent has nothing more to do. |

## Signature / Usage

```python
# Before (Messages API loop, simplified)
messages = [{"role": "user", "content": task}]
while True:
    response = client.messages.create(
        model="claude-opus-5", max_tokens=1024, messages=messages, tools=tools,
    )
    messages.append({"role": "assistant", "content": response.content})
    if response.stop_reason == "end_turn":
        break
    for block in response.content:
        if block.type == "tool_use":
            result = execute_tool(block.name, block.input)
            messages.append({
                "role": "user",
                "content": [{"type": "tool_result", "tool_use_id": block.id, "content": result}],
            })

# After (Claude Managed Agents)
agent = client.beta.agents.create(
    name="Task Runner", model="claude-opus-5",
    tools=[{"type": "agent_toolset_20260401"}],
)
session = client.beta.sessions.create(
    agent={"type": "agent", "id": agent.id, "version": agent.version},
    environment_id=environment.id,
)
with client.beta.sessions.events.stream(session.id) as stream:
    client.beta.sessions.events.send(
        session.id,
        events=[{"type": "user.message", "content": [{"type": "text", "text": task}]}],
    )
    for event in stream:
        if event.type == "session.status_idle":
            break
```

### What you still control

- System prompt and model — same fields, now on the agent definition.
- Custom tools — still declared with JSON Schema; execution moves from inline handling to responding to `agent.custom_tool_use` events.
- Context — still injectable via system prompt, file resources, or skills.

## From the Claude Agent SDK

The Agent SDK executes in a process you operate; Managed Agents runs in Anthropic's infrastructure. Migration is mostly mapping SDK configuration objects to their API-side equivalents.

| Agent SDK | Managed Agents |
|-----------|-----------------|
| `ClaudeAgentOptions(...)` constructed per run | `client.beta.agents.create(...)` once; the agent is persisted and versioned server-side |
| `async with ClaudeSDKClient(...)` or `query(...)` | `client.beta.sessions.create(...)` then send and receive events |
| `@tool`-decorated functions dispatched automatically | Declare as `{"type": "custom", ...}` on the agent; handle `agent.custom_tool_use` events and reply with `user.custom_tool_result` |
| Built-in tools run in your process against your filesystem | `{"type": "agent_toolset_20260401"}` runs the same tools inside the session sandbox against `/workspace` |
| `cwd`, `add_dirs` point at local paths | Upload or mount files as session resources |
| `system_prompt` and the `CLAUDE.md` hierarchy | A single `system` string on the agent; each update produces a new server-side version |
| `mcp_servers` configured and authenticated in one place | Declare servers on the agent; provide credentials through a vault on the session |
| `permission_mode`, `can_use_tool` | Per-tool `permission_policy`; send `user.tool_confirmation` events for `always_ask` tools |

### Features that move to your client

| SDK feature | Managed Agents approach |
|-------------|--------------------------|
| Plan mode | Run a planning-only session first, then a second session to run the plan |
| Output styles, slash commands | Apply in your client before sending `user.message` or after receiving `agent.message` |
| `PreToolUse` / `PostToolUse` hooks | Your client already sees every `agent.custom_tool_use` event before responding; for built-in tools, use `permission_policy: always_ask` |
| `max_turns` | Count turns client-side |

## Migration checklist

1. Create an environment with the networking and runtimes your agent needs.
2. Port your system prompt and tool selection to an agent definition.
3. Replace your loop with `sessions.create` and `sessions.events.stream`.
4. Upload local files through the Files API and mount them as `resources`.
5. Move custom tool handler execution into your event loop as responses to `agent.custom_tool_use` events.
6. Verify with a test session before pointing production traffic at the new flow.

## Migrating between model versions

Updating an agent's `model` field is typically a one-field change that takes effect on the next session you create:

```python
client.beta.agents.update(agent.id, version=agent.version, model="claude-opus-5")
```

Most model-level behavior changes documented in the Messages API migration guide do not require action: `max_tokens` defaults and `thinking` configuration are handled by the runtime and not exposed on the agent definition; assistant message prefilling doesn't exist in the event-based session model; tool argument JSON is parsed before you receive `agent.custom_tool_use` events (structured data, not raw strings).

## Notes

- For direct Messages API calls, see anthropic-api-core. For the self-hosted Claude Agent SDK, see anthropic-agent-sdk.

## Related

- [Define your agent](./agent-setup.md)
- [Session Event Stream](../orchestration/events-and-streaming.md)
