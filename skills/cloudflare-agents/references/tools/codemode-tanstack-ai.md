---
source: https://developers.cloudflare.com/agents/tools/codemode/tanstack-ai/
---

# Code Mode with TanStack AI

`@cloudflare/codemode/tanstack-ai` gives TanStack AI's `chat()` one Code Mode tool (`codemode_execute`) so the model can write JavaScript calling your namespaced TanStack AI server tools.

## Signature / Usage

Install: `npm i @cloudflare/codemode @tanstack/ai @tanstack/ai-openai zod`; add a `worker_loaders` binding named `LOADER` and `nodejs_compat`.

```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import {
	createCodeTool,
	tanstackTools,
} from "@cloudflare/codemode/tanstack-ai";
import { chat, toolDefinition, toHttpResponse } from "@tanstack/ai";
import { openaiText } from "@tanstack/ai-openai";
import { z } from "zod";

const getWeather = toolDefinition({
	name: "get_weather",
	description: "Get the current weather for a city",
	inputSchema: z.object({
		city: z.string().meta({ description: "City name" }),
	}),
	outputSchema: z.object({
		city: z.string(),
		temperatureCelsius: z.number(),
		conditions: z.string(),
	}),
}).server(async ({ city }) => ({
	city,
	temperatureCelsius: 22,
	conditions: "sunny",
}));

const findContacts = toolDefinition({
	name: "find_contacts",
	description: "Find contacts for a team",
	inputSchema: z.object({
		team: z.string().meta({ description: "Team name" }),
	}),
	outputSchema: z.array(
		z.object({
			name: z.string(),
			email: z.string(),
		}),
	),
}).server(async ({ team }) => [
	{
		name: `${team} contact`,
		email: "team@example.com",
	},
]);

function startChat(env: Env, prompt: string) {
	const executor = new DynamicWorkerExecutor({ loader: env.LOADER });

	const codeTool = createCodeTool({
		tools: [
			tanstackTools([getWeather], "weather"),
			tanstackTools([findContacts], "directory"),
		],
		executor,
	});

	return chat({
		adapter: openaiText("gpt-4o"),
		messages: [{ role: "user", content: prompt }],
		tools: [codeTool],
	});
}

export default {
	async fetch(request, env): Promise<Response> {
		const prompt = await request.text();
		return toHttpResponse(startChat(env, prompt));
	},
} satisfies ExportedHandler<Env>;
```

Model-written code the tool enables:

```js
async () => {
	const weatherResult = await weather.get_weather({ city: "London" });
	const contacts = await directory.find_contacts({ team: "travel" });
	return { weatherResult, contacts };
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createCodeTool({ tools, executor })` | function | — | Returns a TanStack AI `ServerTool` named `codemode_execute` whose description contains generated types. |
| `tanstackTools(tools, name?)` | function | `codemode` namespace | Converts TanStack AI tools into a provider; tool name becomes the method name, types come from input/output schemas. |

## Notes

- Use distinct namespace names when combining tool groups. Without a name, tools appear as `codemode.get_weather()`.
- Approvals: this integration does not pause for TanStack AI approvals. `tanstackTools()` excludes any tool whose `needsApproval` is `true` or a function (not in types, cannot run); `needsApproval: false` stays available. The durable runtime's `requiresApproval` flow is not used here.
- Generated code runs in the isolated executor sandbox (see [How Code Mode works](./codemode-how-it-works.md)). TanStack AI itself is covered by other skills where present (`toolDefinition` semantics are TanStack AI's, not this SDK's). The example hard-codes the OpenAI adapter and the model name; supply provider keys via secrets.

## Related

- [Code Mode with the AI SDK](./codemode-ai-sdk.md)
- [Code Mode overview](./codemode-overview.md)
