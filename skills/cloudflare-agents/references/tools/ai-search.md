---
source: https://developers.cloudflare.com/agents/tools/ai-search/
---

# AI Search tool

Give an agent retrieval over indexed content (an R2 bucket, a website, or uploaded files) by binding AI Search to the Worker and querying an instance from an agent method.

## Signature / Usage

```ts
import { Agent, callable } from "agents";

type Env = {
	AI_SEARCH: AiSearchNamespace;
};

export class SearchAgent extends Agent<Env> {
	@callable()
	async searchKnowledge(query: string) {
		const instance = this.env.AI_SEARCH.get("my-instance");

		const results = await instance.search({
			messages: [{ role: "user", content: query }],
		});

		return results;
	}
}
```

For answer generation, `chatCompletions()` retrieves relevant content and generates a response in one call:

```ts
const instance = this.env.AI_SEARCH.get("my-instance");

const response = await instance.chatCompletions({
	messages: [{ role: "user", content: "How do I deploy an Agent?" }],
	model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	ai_search_options: {
		retrieval: {
			max_num_results: 5,
		},
	},
});
```

Binding configuration (`ai_search_namespaces`):

```jsonc
{
	"ai_search_namespaces": [
		{
			"binding": "AI_SEARCH",
			"namespace": "default",
			"remote": true
		}
	]
}
```

```toml
[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "default"
remote = true
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `binding` | — | — | Name of the binding exposed on `env` (`AI_SEARCH` above). |
| `namespace` | — | — | AI Search namespace whose instances the agent can access by name. |
| `remote` | boolean | — | `true` queries deployed AI Search instances during local development with `wrangler dev`. |
| `ai_search_options.retrieval.max_num_results` | — | — | Maximum number of retrieved chunks for `chatCompletions()`. |

## Notes

- Use AI Search when an agent should search product docs, support content, user files, or internal knowledge bases, retrieve chunks before calling a model, or rely on managed indexing.
- AI Search itself (instances, indexing, Workers binding reference) is a separate product covered by the cloudflare-ai skill (ai-search; https://developers.cloudflare.com/ai-search/); this page covers only the agent tool.
- The `@callable()` decorator is shown in the official JavaScript example as well; decorator syntax needs a build step that supports it.
- A `@callable()` method is reachable by every connected client. Authenticate connections (routing-authentication reference) before exposing `searchKnowledge`, and do not point a shared instance at content that some users must not read.
- `remote: true` makes local `wrangler dev` queries hit your deployed instances (and your Cloudflare account).

## Related

- [Models](../models/README.md)
- [Web search](./web-search.md)
