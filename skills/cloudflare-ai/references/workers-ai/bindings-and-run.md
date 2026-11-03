---
source: https://developers.cloudflare.com/workers-ai/configuration/bindings/, https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/, https://developers.cloudflare.com/workers-ai/get-started/
---

# Workers AI binding and env.AI.run()

Create an `ai` binding in the Wrangler file, then call `env.AI.run(model, input, options)` to run a model from a Worker.

## Signature / Usage

```jsonc
{
	"ai": {
		"binding": "AI" // i.e. available in your Worker on env.AI
	}
}
```

```toml
[ai]
binding = "AI"
```

```ts
export interface Env {
	// If you set another name in the Wrangler config file as the value for 'binding',
	// replace "AI" with the variable name you defined.
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const response = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
			messages: [
				{
					role: "system",
					content: "You are a helpful assistant.",
				},
				{
					role: "user",
					content: "What is the origin of the phrase Hello, World",
				},
			],
			chat_template_kwargs: {
				enable_thinking: false,
			},
		});

		return Response.json(response);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

`async env.AI.run(model, input, options)` takes a model as the first parameter and an object as the second parameter. The third argument is documented on other pages of this category (see Related); the table below collects every option named in the source.

### Arguments

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model | string | — | Required. The model to run, for example `@cf/meta/llama-3.1-8b-instruct`. |
| input | object | — | Model-specific input object (second parameter). |
| options | object | — | Optional third argument (see "Third-argument options"). |

### Input keys seen in the source

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| stream | boolean | — | Returns a stream of results as they are available. |
| messages | array | — | Scoped prompt: list of `{ role, content }` messages. |
| prompt | string | — | Unscoped prompt. |
| raw | boolean | — | Skips applying the default chat template (see Prompting). |
| lora | string | — | Fine-tune `id` or `name` to apply (see LoRA pages). |
| chat_template_kwargs | object | — | Model chat-template arguments, for example `{ enable_thinking: false }`. |
| response_format | object | — | JSON Mode request (see JSON Mode). |
| tools | array | — | Function-calling tool definitions. |
| requests | array | — | Batch API: array of individual inference requests (with `queueRequest: true`). |
| request_id | string | — | Batch API: poll an earlier queued request. |

### Third-argument options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| queueRequest | boolean | — | Batch API: queue the request for asynchronous processing. |
| rejectIfBusy | boolean | — | Fail the synchronous request instead of waiting in a capacity queue. |
| extraHeaders | object | — | Extra request headers, for example `x-session-affinity` for prompt caching. |

## Notes

- Streaming: `stream: true` in the input returns a stream; respond with `content-type: text/event-stream` (see Streaming).
- Pages Functions: configure the Workers AI binding in the Cloudflare dashboard (see the cloudflare-pages skill (functions: bindings; https://developers.cloudflare.com/pages/).
- Local development: using Workers AI always accesses your Cloudflare account to run models and incurs usage charges even with `wrangler dev`; log in when prompted. Wrangler configuration keys and `remote` bindings are covered by the cloudflare-wrangler skill.
- Wrangler file keys (`ai`) and Worker runtime APIs generally are covered by cloudflare-wrangler and cloudflare-workers.
- The dashboard "LLM Chat App" template and `npm create cloudflare@latest -- [<DIRECTORY>] --type=pre-existing` are described in the dashboard getting-started page.
- Model IDs shown in the catalog (https://developers.cloudflare.com/workers-ai/models/) are the source of truth for inputs and outputs per model.

## Related

- [Streaming](./streaming.md)
- [REST API](./rest-api.md)
- [Getting started: dashboard](./get-started-dashboard.md)
- [Reject busy requests](./reject-if-busy.md)
- [Batch API](./batch-api.md)
- [Prompt caching](./prompt-caching.md)
