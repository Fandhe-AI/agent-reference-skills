---
source: https://developers.cloudflare.com/workers-ai/features/function-calling/, https://developers.cloudflare.com/workers-ai/features/function-calling/traditional/
---

# Function calling

Define `tools` for a model that supports function calling; the model returns the tool name and arguments, and you execute the function yourself (traditional) or let `@cloudflare/ai-utils` do it (embedded).

## Signature / Usage

Adapted (not in the official docs): the official handler returns the caught `Error` object (not a `Response`), assumes `tool_calls[0]` exists, and interpolates the model-provided username into the URL unencoded; this version returns Responses, checks for a tool call, and encodes the path segment. The tool definition is declared once instead of twice; see Notes.

```js
const tools = [
	{
		name: "getGithubUser",
		description:
			"Provides publicly available information about someone with a GitHub account.",
		parameters: {
			type: "object",
			properties: {
				username: {
					type: "string",
					description: "The handle for the GitHub user account.",
				},
			},
			required: ["username"],
		},
	},
];

export default {
	async fetch(request, env, ctx) {
		const response = await env.AI.run(
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				messages: [{ role: "user", content: "Who is Cloudflare on GitHub?" }],
				tools,
			},
		);

		const selected_tool = response.tool_calls?.[0];
		if (!selected_tool) {
			return Response.json(response);
		}
		let res;

		if (selected_tool.name == "getGithubUser") {
			try {
				const username = encodeURIComponent(selected_tool.arguments.username);
				const url = `https://api.github.com/users/${username}`;
				res = await fetch(url, {
					headers: {
						// Github API requires a User-Agent header
						"User-Agent": "cf-fn-calling-example-app",
					},
				}).then((res) => res.json());
			} catch (error) {
				return new Response(String(error), { status: 500 });
			}
		}

		const finalResponse = await env.AI.run(
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				messages: [
					{
						role: "user",
						content: "Who is Cloudflare on GitHub?",
					},
					{
						role: "assistant",
						content: JSON.stringify(selected_tool),
					},
					{
						role: "tool",
						content: JSON.stringify(res),
					},
				],
				tools,
			},
		);
		return new Response(JSON.stringify(finalResponse));
	},
};
```

The model then returns the tool name and arguments, for example:

```json
[
	{
		"arguments": { "latitude": "51.5074", "longitude": "-0.1278" },
		"name": "getWeather"
	}
]
```

## Options / Props

Each entry of `tools`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | — | Tool name. |
| description | string | — | What the tool does. |
| parameters | object | — | JSON Schema (`type: "object"`, `properties`, `required`) for the arguments. |

Response field:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| tool_calls | array | — | Each item has `name` and `arguments`. |

## Notes

- Corrected from the official docs: the original `catch (error) { return error; }` returned a non-Response, tool call presence was assumed, and the username was not URL-encoded. The original also repeated the tools array in both calls and used a browser-style User-Agent string; both were simplified.
- Treat tool arguments as untrusted model output: validate or encode them before using them in URLs or queries.
- Look for models with the function calling property in the catalog; `@hf/nousresearch/hermes-2-pro-mistral-7b` is a fine-tuned Mistral 7B for function calling.
- Embedded function calling (execute function code alongside inference) is Workers-only and described separately. A demo app: https://github.com/craigsdennis/lightbulb-moment-tool-calling/blob/main/src/index.ts
- Vercel AI SDK tool calling API: vercel-ai-sdk; OpenAI / Anthropic function-calling formats: openai-api-core / anthropic-api-tools-mcp.

## Related

- [Embedded function calling](./embedded-function-calling.md)
- [Embedded function calling examples](./embedded-function-calling-examples.md)
- [JSON Mode](./json-mode.md)
