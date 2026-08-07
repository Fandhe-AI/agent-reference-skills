<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript / last verified: 2026-08-07 -->

# TypeScript SDK

Install and configure the Anthropic TypeScript SDK for Node.js, Deno, Bun, and browser environments.

## Signature / Usage

```bash
npm install @anthropic-ai/sdk
```

```typescript
const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
  model: "claude-opus-5"
});

for (const block of message.content) {
  if (block.type === "text") console.log(block.text);
}
```

Streaming with helpers:

```typescript
const stream = anthropic.messages
  .stream({ model: "claude-opus-5", max_tokens: 1024, messages: [{ role: "user", content: "Say hello there!" }] })
  .on("text", (text) => console.log(text));

const message = await stream.finalMessage();
```

Tool helper with Zod:

```typescript
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

const weatherTool = betaZodTool({
  name: "get_weather",
  inputSchema: z.object({ location: z.string() }),
  description: "Get the current weather in a given location",
  run: (input) => `The weather in ${input.location} is foggy and 60°F`
});

const finalMessage = await anthropic.beta.messages.toolRunner({
  model: "claude-opus-5",
  max_tokens: 1000,
  messages: [{ role: "user", content: "What is the weather in San Francisco?" }],
  tools: [weatherTool]
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxRetries` | number | Retry count (default 2) |
| `timeout` | number | Timeout in ms; default 10 min, scales up to 60 min with `max_tokens` for non-streaming |
| `fetch` | function | Custom `fetch` implementation |
| `fetchOptions` | object | Custom `RequestInit` options (e.g. `dispatcher`/`proxy` for proxying) |
| `logLevel` | string | `'debug'` \| `'info'` \| `'warn'` (default) \| `'error'` \| `'off'` |
| `dangerouslyAllowBrowser` | boolean | Enable browser usage (exposes credentials client-side) |

Error codes: 400 `BadRequestError`, 401 `AuthenticationError`, 403 `PermissionDeniedError`, 404 `NotFoundError`, 409 `ConflictError`, 422 `UnprocessableEntityError`, 429 `RateLimitError`, >=500 `InternalServerError`, N/A `APIConnectionError`.

## Notes

- TypeScript >= 4.9. Requires Node.js 20 LTS+, Deno 1.28+, Bun 1.0+, Cloudflare Workers, Vercel Edge Runtime; React Native is not supported.
- ToolError thrown from a tool `run` function can carry structured content (images, etc.) back to the model, unlike a plain `Error`.
- MCP helpers (`@anthropic-ai/sdk/helpers/beta/mcp`): `mcpTools`, `mcpMessages`, `mcpResourceToContent`, `mcpResourceToFile` convert MCP types to Claude API types for local MCP servers; the native `mcp_servers` request parameter is for remote MCP servers by URL.
- File uploads accept `File`, `fetch` `Response`, `fs.ReadStream`, or the `toFile` helper's return value.
- Auto-pagination via `for await...of`, or `.hasNextPage()` / `.getNextPage()`.
- Platform SDKs are separate packages: `@anthropic-ai/vertex-sdk`, `@anthropic-ai/bedrock-sdk` (`AnthropicBedrockMantle` for new projects, `AnthropicBedrock` legacy), `@anthropic-ai/aws-sdk` (beta), `@anthropic-ai/foundry-sdk`.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Python SDK](./sdk-python.md)
- [SDK middleware](./middleware.md)
