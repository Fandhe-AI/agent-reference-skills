---
source: https://developers.cloudflare.com/agents/tools/codemode/
---

# Code Mode overview

Code Mode is an experimental tool-use pattern: the model gets one code-execution tool and writes code that calls configured tools as typed methods, composing, looping, filtering, and shaping results in one sandbox execution instead of one round trip per tool call.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/agents/tools/codemode/how-it-works/

```ts
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
} from "@cloudflare/codemode";

const runtime = createCodemodeRuntime({
	ctx: this.ctx,
	executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
	connectors: [github, repoApi],
});

const tools = { codemode: runtime.tool() };
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Direct tool calls | pattern | — | Best for simple tasks using a small, known tool set. |
| Code Mode | pattern | — | Best for composed or dependent calls, large tool catalogs, loops, branching, filtering, result shaping, or reusable logic. |
| `codemode.search()` / `codemode.describe()` | sandbox API | — | Progressive discovery in connector-based runtimes: find connectors, methods, and saved snippets, then fetch type details only for a chosen target. |

## Notes

- Experimental and may introduce breaking changes; use caution in production.
- Integrations: durable runtime ([codemode-durable-runtime.md](./codemode-durable-runtime.md)), AI SDK ([codemode-ai-sdk.md](./codemode-ai-sdk.md)), TanStack AI ([codemode-tanstack-ai.md](./codemode-tanstack-ai.md)), browser ([codemode-browser.md](./codemode-browser.md)), MCP ([codemode-mcp.md](./codemode-mcp.md)), OpenAPI ([codemode-openapi.md](./codemode-openapi.md)).
- Isolation: generated code runs in an isolated sandbox with no host credentials; external operations go only through connector globals. Details in [How Code Mode works](./codemode-how-it-works.md).
- If model-written code only calls methods you define, Code Mode (Dynamic Worker, faster start) is preferred over a container sandbox; for arbitrary Linux commands use the [Sandbox](./sandbox.md) tool (container products are in the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/)).
- AI SDK `tool()` semantics and `needsApproval` belong to the vercel-ai-sdk skill.

## Related

- [How Code Mode works](./codemode-how-it-works.md)
- [Code Mode API reference](./codemode-api-reference.md)
