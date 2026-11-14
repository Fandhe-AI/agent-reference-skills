<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner / last verified: 2026-11-14 -->

# Tool runner (SDK)

SDK helper (beta) that automatically drives the agentic loop: runs tools when Claude calls them, manages conversation state, and provides type safety.

## Signature / Usage

```python
from anthropic import Anthropic, beta_tool

client = Anthropic()

@beta_tool
def get_weather(location: str, unit: str = "fahrenheit") -> str:
    """Get the current weather in a given location.

    Args:
        location: The city and state, e.g. San Francisco, CA
        unit: Temperature unit, either 'celsius' or 'fahrenheit'
    """
    return "20 C, Sunny"

runner = client.beta.messages.tool_runner(
    model="claude-opus-5-5",
    max_tokens=1024,
    tools=[get_weather],
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
)
final_message = runner.until_done()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| tools | array | SDK-native tool definitions (decorator/helper per language) |
| max_iterations | int (optional) | Bounds the loop (csharp, php: `maxIterations`; java: `.maxIterations()`; go: `MaxIterations`); the runner otherwise loops until Claude returns a message without tool use |
| stream | boolean (optional) | Enables incremental per-turn streaming; runner yields a stream object per iteration |

## Notes

- Available (beta) in Python, TypeScript, C#, Go, Java, PHP, and Ruby SDKs. Use the manual loop (Handle tool calls) for human-in-the-loop approval, custom logging, or conditional execution instead.
- A tool return value becomes a text content block (string) or multimodal content blocks; encode structured data (JSON, numbers) as a string first.
- Default lifecycle per iteration: send request with current state → yield response message → your loop body runs → if you did not modify message history, the runner auto-appends the assistant message + tool results and continues (or exits if no tool call); if you did modify it (e.g. Python `append_messages()`, TS `setMessagesParams()`/`pushMessages()`, Go `Params` field, Ruby `feed_messages`), the runner uses your state unchanged instead.
- Taking over message history lets you retry a truncated turn (e.g. bump `max_tokens` and resend), inject follow-up messages, or build tool results yourself; always pair with `max_iterations` to bound the loop.
- Compaction: the runner supports two kinds. (1) Compaction at a token threshold: add a `compact_20260112` entry to the `edits` array of the runner's `context_management`; the API summarizes at the threshold and the runner sends the summary on later requests. (2) Compaction on demand: call `compact_before_next_turn()` (ruby: `compact_before_next_turn`; typescript, java, php: `compactBeforeNextTurn()`; csharp, go: `CompactBeforeNextTurn()`) and the runner compacts before its next turn. A runner holding a `compact_20260112` entry cannot compact on demand, so use one kind per runner. This replaces the older "automatic client-side compaction (deprecated)" description.
- Tool exceptions are caught and returned to Claude as `is_error: true` results (message only; in Python, exception type and message; never the full stack trace). Only the Python SDK also logs the full exception through `logging`. `ANTHROPIC_LOG=info|debug` enables SDK request/response logging in Python, TypeScript, and Java only; Go, Ruby, C#, PHP do not read it, so outside Python catch and log inside the tool function.
- Python/TypeScript expose a hook to intercept tool results before they reach Claude (`generate_tool_call_response()` / `generateToolResponse()`), useful for raising on error or adding `cache_control` to large tool results before caching. Other SDKs lack this hook; use the manual take-over pattern or throw a typed error (`BetaToolError` in C#) instead.
- Availability: beta on every model and on all supported platforms (Claude API, Bedrock incl. bedrock-runtime, Claude Platform on AWS, Claude Models on Google Cloud, Microsoft Foundry). Managed Agents: the Python, TypeScript and Go SDKs have a separate session tool runner that runs your tools for a session's custom tool calls (the session itself runs the agent loop; beta on Claude API and Claude Platform on AWS).
- Source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner (fetched 2026-11-14)
- Messages API general streaming/caching mechanics: see anthropic-api-core skill.

## Related

- [handle-tool-calls](./handle-tool-calls.md)
- [strict-tool-use](./strict-tool-use.md)
- [parallel-tool-use](./parallel-tool-use.md)
