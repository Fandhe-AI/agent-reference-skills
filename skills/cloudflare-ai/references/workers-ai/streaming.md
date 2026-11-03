---
source: https://developers.cloudflare.com/workers-ai/configuration/bindings/
---

# Streaming

Pass `stream: true` to `env.AI.run()` to receive results as they are generated.

## Signature / Usage

```javascript
const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "What is the origin of the phrase 'Hello, World'",
    stream: true
});

return new Response(answer, {
    headers: { "content-type": "text/event-stream" }
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| stream | boolean | — | Returns a stream of results as they are available. |

## Notes

- JSON Mode currently does not support streaming.
- OpenAI-compatible Responses requests (GPT-OSS) must use `stream: false`.
- Embedded function calling can stream only the final response (`streamFinalResponse`).
- Tool-using Vercel AI SDK `streamText` usage lives in the ai-sdk page; the `ai` package API itself belongs to vercel-ai-sdk.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [JSON Mode](./json-mode.md)
- [Embedded function calling](./embedded-function-calling.md)
- [OpenAI compatibility](./openai-compatibility.md)
- [AI SDK](./ai-sdk.md)
