---
source: https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/, https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/get-started/, https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/api-reference/, https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/troubleshooting/
---

# Embedded function calling

Run tool functions alongside inference with `runWithTools` from the `@cloudflare/ai-utils` package (Workers only).

## Signature / Usage

```sh
npm i @cloudflare/ai-utils
```

```ts
import { runWithTools } from "@cloudflare/ai-utils";

type Env = {
	AI: Ai;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const sum = (args: { a: number; b: number }): Promise<string> => {
			const { a, b } = args;
			return Promise.resolve((a + b).toString());
		};
		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			// Model with function calling support
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				// Messages
				messages: [
					{
						role: "user",
						content: "What the result of 123123123 + 10343030?",
					},
				],
				// Definition of available tools the AI model can leverage
				tools: [
					{
						name: "sum",
						description: "Sum up two numbers and returns the result",
						parameters: {
							type: "object",
							properties: {
								a: { type: "number", description: "the first number" },
								b: { type: "number", description: "the second number" },
							},
							required: ["a", "b"],
						},
						// reference to previously defined function
						function: sum,
					},
				],
			},
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

Adapted (not in the official docs): the official troubleshooting snippets use `...` placeholders that are not valid code; this complete handler combines the documented `verbose` and `streamFinalResponse` config options with the `sum` tool above.

```ts
import { runWithTools } from "@cloudflare/ai-utils";

type Env = {
	AI: Ai;
};

export default {
	async fetch(request, env, ctx) {
		const sum = (args: { a: number; b: number }): Promise<string> => {
			const { a, b } = args;
			// Logging from within embedded function invocations
			console.log(`The sum function has been invoked with the arguments a: ${a} and b: ${b}`);
			return Promise.resolve((a + b).toString());
		};

		const response = (await runWithTools(
			env.AI,
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				messages: [
					{ role: "user", content: "What the result of 123123123 + 10343030?" },
				],
				tools: [
					{
						name: "sum",
						description: "Sum up two numbers and returns the result",
						parameters: {
							type: "object",
							properties: {
								a: { type: "number", description: "the first number" },
								b: { type: "number", description: "the second number" },
							},
							required: ["a", "b"],
						},
						function: sum,
					},
				],
			},
			{
				// Enable verbose mode
				verbose: true,
				// Enable response streaming
				streamFinalResponse: true,
			},
		)) as ReadableStream;

		// Set response headers for streaming
		return new Response(response, {
			headers: {
				"content-type": "text/event-stream",
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

`runWithTools(AI Binding, model, input, config)`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| AI Binding | Ai | — | The AI binding, such as `env.AI`. |
| model | BaseAiTextGenerationModels | — | ID of a model that supports function calling, for example `@hf/nousresearch/hermes-2-pro-mistral-7b`. |
| input.messages | RoleScopedChatInput[] | — | Messages. |
| input.tools | AiTextGenerationToolInputWithFunction[] | — | Tool definitions plus the `function` to run. |
| config.streamFinalResponse | boolean | — | Optional. Stream the final response. |
| config.maxRecursiveToolRuns | number | — | Optional. |
| config.strictValidation | boolean | — | Optional. |
| config.verbose | boolean | — | Optional. Emits logs for function calls and input/output statistics. |
| config.trimFunction | boolean | — | Optional. Pass `autoTrimTools` to choose the right tools (using an LLM) before inference, reducing input tokens. |

`createToolsFromOpenAPISpec(spec, config)`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| spec | string | — | OpenAPI spec as JSON or YAML, or a URL to a remote spec. |
| config | Config | — | Optional configuration. |
| config.overrides | ConfigRule[] | — | Optional; for example to add `Authorization` or `User-Agent` headers. |
| config.matchPatterns | RegExp[] | — | Optional. |
| config.options | { verbose?: boolean } | — | Optional. |

## Notes

- Only supported via Cloudflare Workers, not the REST API.
- `runWithTools` steps: send messages, function-calling prompt and tools to Workers AI; the model selects tools and arguments; the Worker executes the function; the result is sent back; Workers AI returns the final response.
- Charges: standard inference (for example tokens) plus Worker resources consumed (CPU time) while the embedded functions run.
- Performance: shorten prompts, reduce the number of tools, stream the final response.
- A `BadInput` error can mean inputs exceed the model's context window; reduce input tokens.
- Logging inside tool functions works like any Worker (`console.log`).
- Package source: https://github.com/cloudflare/ai-utils
- Corrected from the official docs: the troubleshooting page showed `...` placeholders that are not valid TypeScript; the second snippet is a complete composition of its documented options.

## Related

- [Function calling](./function-calling.md)
- [Embedded function calling examples](./embedded-function-calling-examples.md)
- [Streaming](./streaming.md)
