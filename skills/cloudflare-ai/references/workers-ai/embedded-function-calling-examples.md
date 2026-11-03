---
source: https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/fetch/, https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/kv/, https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/examples/openapi/
---

# Embedded function calling examples

Three embedded function calling patterns: calling an external API with `fetch()`, writing to KV, and generating tools from an OpenAPI spec.

## Signature / Usage

fetch() handler (5-day forecast). Adapted (not in the official docs): the `numDays` property type was `'numDays'`, which is not a JSON Schema type; changed to `'number'`.

```ts
import { runWithTools } from '@cloudflare/ai-utils';

type Env = {
	AI: Ai;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const getWeather = async (args: { numDays: number }) => {
			const { numDays } = args;
      // Location is extracted from request based on
      // https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties
      const lat = request.cf?.latitude
      const long = request.cf?.longitude

      // Interpolate values for external API call
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,precipitation_sum&timezone=GMT&forecast_days=${numDays}`
			);
			return response.text();
		};
		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			// Model with function calling support
			'@hf/nousresearch/hermes-2-pro-mistral-7b',
			{
				// Messages
				messages: [
					{
						role: 'user',
						content: 'What the weather like the next 5 days? Respond as text',
					},
				],
				// Definition of available tools the AI model can leverage
				tools: [
					{
						name: 'getWeather',
						description: 'Get the weather for the next [numDays] days',
						parameters: {
							type: 'object',
							properties: {
								numDays: { type: 'number', description: 'number of days for the weather forecast' },
							},
							required: ['numDays'],
						},
						// reference to previously defined function
						function: getWeather,
					},
				],
			}
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

KV API. Adapted (not in the official docs): `KV.put()` returns `undefined`, so the original message interpolated `undefined`; the message no longer includes the return value. A fail-closed bearer check (`ADMIN_TOKEN`) guards the handler because it performs a KV write and an inference call.

```ts
import { runWithTools } from "@cloudflare/ai-utils";

type Env = {
	AI: Ai;
	KV: KVNamespace;
	// Secret: `npx wrangler secret put ADMIN_TOKEN` (local dev: .dev.vars, gitignored)
	ADMIN_TOKEN: string;
};

export default {
	async fetch(request, env, ctx) {
		// Fail closed: this handler writes to KV, so reject unless the token matches.
		if (
			!env.ADMIN_TOKEN ||
			request.headers.get("Authorization") !== `Bearer ${env.ADMIN_TOKEN}`
		) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Define function
		const updateKvValue = async ({
			key,
			value,
		}: {
			key: string;
			value: string;
		}) => {
			await env.KV.put(key, value);
			return "Successfully updated key-value pair in database";
		};

		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				messages: [
					{ role: "system", content: "Put user given values in KV" },
					{ role: "user", content: "Set the value of banana to yellow." },
				],
				tools: [
					{
						name: "KV update",
						description: "Update a key-value pair in the database",
						parameters: {
							type: "object",
							properties: {
								key: {
									type: "string",
									description: "The key to update",
								},
								value: {
									type: "string",
									description: "The value to update",
								},
							},
							required: ["key", "value"],
						},
						function: updateKvValue,
					},
				],
			},
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

Verify the KV write (local by default):

```sh
npx wrangler kv key get banana --binding KV --local
```

Tools from an OpenAPI spec:

```ts
import { createToolsFromOpenAPISpec, runWithTools } from '@cloudflare/ai-utils';

type Env = {
	AI: Ai;
};

const APP_NAME = 'cf-fn-calling-example-app';

export default {
	async fetch(request, env, ctx) {
		const toolsFromOpenAPISpec = [
			// You can pass the OpenAPI spec link or contents directly
			...(await createToolsFromOpenAPISpec(
				'https://gist.githubusercontent.com/mchenco/fd8f20c8f06d50af40b94b0671273dc1/raw/f9d4b5cd5944cc32d6b34cad0406d96fd3acaca6/partial_api.github.com.json',
				{
					overrides: [
						{
							matcher: ({ url }) => {
								return url.hostname === 'api.github.com';
							},
							// for all requests on *.github.com, we'll need to add a User-Agent.
							values: {
								headers: {
									'User-Agent': APP_NAME,
								},
							},
						},
					],
				}
			)),
		];

		const response = await runWithTools(
			env.AI,
			'@hf/nousresearch/hermes-2-pro-mistral-7b',
			{
				messages: [
					{
						role: 'user',
						content: 'Who is cloudflare on Github and how many repos does the organization have?',
					},
				],
				tools: toolsFromOpenAPISpec,
			}
		);

		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| KV | KVNamespace | — | KV example only: binding to a provisioned KV namespace, declared in the Wrangler file. |
| overrides[].matcher | function | — | OpenAPI example: receives `{ url }` (and `method`) and selects requests to modify. |
| overrides[].values.headers | object | — | OpenAPI example: headers added to matched requests. |

## Notes

- Corrected from the official docs: `type: 'numDays'` in the fetch example, and the `${response}` of `KV.put()` in the KV example (it is `undefined`).
- Adapted from the official docs: the KV example gained the `ADMIN_TOKEN` bearer check (the original was an open endpoint that writes to KV on every request); send `Authorization: Bearer <token>` when calling it.
- The KV example needs a provisioned KV namespace and a `KV` binding; KV itself is covered by cloudflare-storage.
- The KV tool name `"KV update"` is kept as in the source; the sources do not state naming constraints for tool names.
- The spec URL in the OpenAPI example is a third-party gist; the model decides which GitHub endpoints are called, so do not point such tools at APIs where write access or credentials are exposed without validation.
- The `User-Agent` header is required by the GitHub API.

## Related

- [Embedded function calling](./embedded-function-calling.md)
- [Function calling](./function-calling.md)
