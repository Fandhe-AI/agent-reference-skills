<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner / last verified: 2026-08-07 -->

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
    model="claude-opus-5",
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
| max_iterations | int (optional) | Bounds the loop when manually taking over message history |
| stream | boolean (optional) | Enables incremental per-turn streaming; runner yields a stream object per iteration |

## Notes

- Available (beta) in Python, TypeScript, C#, Go, Java, PHP, and Ruby SDKs. Use the manual loop (Handle tool calls) for human-in-the-loop approval, custom logging, or conditional execution instead.
- A tool return value becomes a text content block (string) or multimodal content blocks; encode structured data (JSON, numbers) as a string first.
- Default lifecycle per iteration: send request with current state → yield response message → your loop body runs → if you did not modify message history, the runner auto-appends the assistant message + tool results and continues (or exits if no tool call); if you did modify it (e.g. Python `append_messages()`, TS `setMessagesParams()`/`pushMessages()`, Go `Params` field, Ruby `feed_messages`), the runner uses your state unchanged instead.
- Taking over message history lets you retry a truncated turn (e.g. bump `max_tokens` and resend), inject follow-up messages, or build tool results yourself; always pair with `max_iterations` to bound the loop.
- Automatic client-side compaction is supported (deprecated) in Python/TypeScript/Ruby only, superseded by server-side context editing (available in every SDK). Go/Java/C#/PHP runners have no client-side compaction.
- Tool exceptions are caught and returned to Claude as `is_error: true` results (message only, not full stack trace in the result itself). `ANTHROPIC_LOG=info|debug` enables SDK request/response logging in Python, TypeScript, and Java only.
- Python/TypeScript expose a hook to intercept tool results before they reach Claude (`generate_tool_call_response()` / `generateToolResponse()`), useful for raising on error or adding `cache_control` to large tool results before caching. Other SDKs lack this hook; use the manual take-over pattern or throw a typed error (`BetaToolError` in C#) instead.
- Messages API general streaming/caching mechanics: see anthropic-api-core skill.

## Related

- [handle-tool-calls](./handle-tool-calls.md)
- [strict-tool-use](./strict-tool-use.md)
- [parallel-tool-use](./parallel-tool-use.md)
