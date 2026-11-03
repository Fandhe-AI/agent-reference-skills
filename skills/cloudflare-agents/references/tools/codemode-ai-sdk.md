---
source: https://developers.cloudflare.com/agents/tools/codemode/ai-sdk/
---

# Code Mode with the AI SDK

`@cloudflare/codemode/ai` converts AI SDK tools into one Code Mode tool: stateless via `createCodeTool()`, or durable via `ToolSetConnector` / `toolSetConnector()`.

## Signature / Usage

Install: `npm i @cloudflare/codemode agents ai zod`; add a `worker_loaders` binding named `LOADER` and `nodejs_compat`. Define tools with `execute`:

```ts
import { tool } from "ai";
import { z } from "zod";

export const weatherTools = {
  getWeather: tool({
    description: "Get the weather for a city",
    inputSchema: z.object({
      city: z.string().describe("City name")
    }),
    outputSchema: z.object({
      city: z.string(),
      conditions: z.string()
    }),
    execute: async ({ city }) => ({
      city,
      conditions: "sunny"
    })
  })
};
```

Stateless tool:

```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import { createCodeTool } from "@cloudflare/codemode/ai";
import { generateText, stepCountIs } from "ai";
import { model } from "./model";
import { weatherTools } from "./tools";

export default {
 	async fetch(request, env): Promise<Response> {
 		const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
 		const codemode = createCodeTool({ tools: weatherTools, executor });

 		const response = await generateText({
 			model,
 			prompt: await request.text(),
 			tools: { codemode },
 			stopWhen: stepCountIs(5),
 		});

 		return new Response(response.text);
 	},
} satisfies ExportedHandler<Env>;
```

Namespaced providers:

```ts
const executor = new DynamicWorkerExecutor({ loader: env.LOADER });

const codemode = createCodeTool({
	tools: [
		{ name: "weather", tools: weatherTools },
		{ name: "notifications", tools: notificationTools },
	],
	executor,
});
```

Durable runtime with an AI SDK toolset:

Adapted (not in the official docs): `stopWhen: stepCountIs(5)` is added; without it the AI SDK stops after one step, so the model never sees the tool results it requested. See Notes.

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
} from "@cloudflare/codemode";
import { toolSetConnector } from "@cloudflare/codemode/ai";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { model } from "./model";
import { operationTools } from "./tools";

// Export this manually when the @cloudflare/codemode/vite plugin is not configured.
export { CodemodeRuntime } from "@cloudflare/codemode";

export class OperationsAgent extends AIChatAgent<Env> {
	async onChatMessage() {
		const operations = toolSetConnector(this.ctx, {
			name: "operations",
			instructions: "Use these tools to manage customer requests.",
			tools: operationTools,
		});

		const runtime = createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [operations],
		});

		const result = streamText({
			model,
			messages: await convertToModelMessages(this.messages),
			tools: { codemode: runtime.tool() },
			stopWhen: stepCountIs(5),
		});

		return result.toUIMessageStreamResponse();
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createCodeTool({ tools, executor, description? })` | function | — | `tools` is a `ToolSet` or an array of providers. A custom `description` may include `{{types}}` where generated definitions are inserted. |
| provider `{ name, tools }` | object | `codemode` for a bare ToolSet | Sandbox namespace; names must be unique valid JavaScript identifiers. |
| `aiTools(toolSet)` | function | — | Wraps an AI SDK toolset as a provider for mixing with other packages' providers. |
| `toolSetConnector(ctx, { name?, instructions?, tools })` | function | `name` defaults to `tools` | Returns `new ToolSetConnector(ctx, options)`. |

## Notes

- Corrected from the official docs: the example omitted `stopWhen`, and AI SDK `generateText` / `streamText` stop after a single step by default, so a tool call is executed but no answer is generated from its result; `stopWhen: stepCountIs(5)` (an example limit) lets the model continue after tool results.
- Choose `createCodeTool()` for simple stateless execution (excludes tools with `needsApproval`) or the connector for durable execution (maps `needsApproval` to runtime approval).
- Each sandbox-callable tool needs an `execute` function; client-side or provider-executed tools cannot run through the server-side executor. The connector drops tools without `execute` from types and bindings.
- Approvals: `createCodeTool()` filters out tools where `needsApproval` is `true` or a function (they do not appear and cannot run); `needsApproval: false` stays. `ToolSetConnector` maps `needsApproval` to the durable `requiresApproval` and pauses the run, resumed with `runtime.approve({ executionId })`; a function-valued `needsApproval` is treated as always requiring approval since arguments are unknown beforehand. This uses the Code Mode flow, not the AI SDK per-call approval flow.
- If the Vite plugin is configured, remove the manual `CodemodeRuntime` export.
- Generated code runs in the isolated executor sandbox ([How Code Mode works](./codemode-how-it-works.md)). AI SDK `tool()` / `needsApproval` semantics themselves are in the vercel-ai-sdk skill.
- Optional workspace example: `aiTools(weatherTools)` plus `{ name: "workspace", tools: createAITools({ workspace }) }` (needs `@cloudflare/computer`, see [File system](./filesystem.md)).

## Related

- [Durable runtime](./codemode-durable-runtime.md)
- [Code Mode overview](./codemode-overview.md)
- [TanStack AI](./codemode-tanstack-ai.md)
