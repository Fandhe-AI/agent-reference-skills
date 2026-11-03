---
source: https://developers.cloudflare.com/ai-gateway/integrations/aig-workers-ai-binding/
---

# Set up Workers AI with AI Gateway

Tutorial: create a Worker with an AI binding and run a Workers AI model through AI Gateway.

## Signature / Usage

Wrangler configuration:

```jsonc
{
	"ai": {
		"binding": "AI",
	},
}
```

```toml
[ai]
binding = "AI"
```

`src/index.ts`:

```typescript
export interface Env {
	// If you set another name in the [Wrangler configuration file](/workers/wrangler/configuration/) as the value for 'binding',
	// replace "AI" with the variable name you defined.
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		// Specify the gateway label and other options here
		const response = await env.AI.run(
			"@cf/meta/llama-3.1-8b-instruct-fast",
			{
				prompt: "What is the origin of the phrase Hello, World",
			},
			{
				gateway: {
					id: "default", // Uses the default gateway, or replace with your gateway ID
					skipCache: true, // Optional: Skip cache if needed
				},
			},
		);

		// Return the AI response as a JSON object
		return new Response(JSON.stringify(response), {
			headers: { "Content-Type": "application/json" },
		});
	},
} satisfies ExportedHandler<Env>;
```

Commands:

```bash
npm create cloudflare@latest -- hello-ai
cd hello-ai
npx wrangler dev
npx wrangler login
npx wrangler deploy
```

## Notes

- C3 choices: Hello World example, Worker only, TypeScript, git Yes, AGENTS.md Yes, deploy No (until the binding is added).
- `"default"` as the gateway ID auto-creates the default gateway on the first authenticated request; or create one manually and use its ID.
- `wrangler dev` always accesses your Cloudflare account to run AI models and incurs Workers AI usage charges even locally. You are prompted to log in.
- Deploying publishes the Worker at a `workers.dev` URL. The example Worker answers every request with a paid model call and has no authentication, so anyone with the URL can spend your quota; add authentication or rate limiting before sharing it.
- For third-party models, gateway methods, and SDK integration, see [usage-worker-binding-methods.md](./usage-worker-binding-methods.md).

## Related

- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [get-started.md](./get-started.md)
- [features-guardrails.md](./features-guardrails.md)
