# Streaming API Responses

Streams model output over HTTP using server-sent events (SSE) so the response can be processed incrementally instead of waiting for the full generation to finish.

## Signature / Usage

```python
from openai import OpenAI
client = OpenAI()
stream = client.responses.create(
    model="gpt-5.6",
    input=[{"role": "user", "content": "Say 'double bubble bath' ten times fast."}],
    stream=True,
)
for event in stream:
    print(event)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stream` | boolean | Set to `true` on a Responses API request to enable SSE streaming |

## Notes

- Each SSE event carries a `type` field; SDKs expose typed event instances that can be discriminated on this property.
- Core lifecycle events: `response.created` (emitted once at start), `response.output_text.delta` (emitted repeatedly with partial text), `response.completed` (emitted once at the end), `error` (emitted on failure).
- Additional specialized delta/done events exist for function-call argument streaming, structured-output JSON streaming, file search, and code interpreter — see the full event schema at https://developers.openai.com/api/reference if exhaustive coverage is needed.
- Each official SDK exposes idiomatic consumption: JavaScript uses `for await` async iteration, Python iterates the stream object directly, Go uses `stream.Next()`, C# uses `await foreach`, Ruby uses `stream.each`.
- Streaming makes content moderation harder: moderation scores are only available once the full output has been generated, not on individual deltas, so partial completions may need to be evaluated more conservatively in production.
- This is an OpenAI API (developers.openai.com) guide; it documents the Responses API SSE event stream, not the separate Realtime API (WebSocket/WebRTC) event stream.

## Related

- [Function Calling](./function-calling.md)
- [Structured Outputs](./structured-outputs.md)
