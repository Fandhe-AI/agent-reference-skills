---
source: https://developers.cloudflare.com/ai-search/agent-sdks/, https://developers.cloudflare.com/ai-search/agent-sdks/ai-sdk/, https://developers.cloudflare.com/ai-search/agent-sdks/langchain/, https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/
---

# Agent and framework integrations

Use an AI Search instance from the Vercel AI SDK (`ai-search-provider`), LangChain (`langchain-cloudflare`), or the Cloudflare Agents SDK. These guides cover using an instance; create and manage instances with the binding, REST API, or Wrangler.

## Signature / Usage

Vercel AI SDK (requires `ai@^6`; `npm i ai ai-search-provider`):

```ts
import { createAISearchNamespace } from "ai-search-provider";
import { generateText } from "ai";

const aiSearch = createAISearchNamespace({ binding: env.AI_SEARCH });

const { text, sources } = await generateText({
	model: aiSearch.get("knowledge-base").chat({
		ai_search_options: {
			// "hybrid" ranks results from both the vector and keyword indexes.
			retrieval: { retrieval_type: "hybrid", max_num_results: 5 },
		},
	}),
	messages: [{ role: "user", content: "How does caching work?" }],
});
```

LangChain retriever (`pip install -U langchain-cloudflare cloudflare`):

```python
from langchain_cloudflare import CloudflareAISearchRetriever

retriever = CloudflareAISearchRetriever(
    account_id=ACCOUNT_ID,
    api_token=API_TOKEN,
    instance_name=INSTANCE_NAME,
    namespace=NAMESPACE,
    retrieval_type="hybrid",  # query both the vector and keyword indexes
    k=5,  # maximum number of results to return (capped at 50)
)

docs = retriever.invoke("How do I configure Workers AI?")
```

Agent tool pattern (search as a tool the model chooses to call):

```ts
search_knowledge_base: tool({
	description: "Search the knowledge base for relevant content.",
	inputSchema: z.object({
		query: z.string().describe("The user's question or search terms"),
	}),
	execute: async ({ query }) => {
		const instance = this.env.AI_SEARCH.get(INSTANCE_NAME);
		return await instance.search({
			query,
			ai_search_options: { retrieval: { max_num_results: 5 } },
		});
	},
}),
```

## Notes

- AI SDK provider: `instance.chat()` retrieves and generates in one call and returns chunks as AI SDK `sources`; `toUIMessageStreamResponse({ sendSources: true })` streams them before text. The `create()` method is on the namespace binding, not the provider client. For search-as-a-tool with Workers AI, use `workers-ai-provider@^3` because v4 needs AI SDK v7 while the provider requires v6. The SDK itself: vercel-ai-sdk skill.
- LangChain: the retriever only searches; create instances and upload files with the Cloudflare Python SDK. `k` maps to `max_num_results` (cap 50); metadata carries `score` and `filename`; wrap with `create_retriever_tool` for agents. Python 3.10 or later; token needs AI Search:Edit and Run (plus Workers AI for `ChatCloudflareWorkersAI`).
- Cloudflare Agents SDK: the guide builds an `AIChatAgent` that provisions an instance and exposes `search()` and a save tool; it needs the namespace binding (it calls `create()` at runtime), the Durable Object class listed in `new_sqlite_classes`, and `nodejs_compat`. The agent code is not reproduced here; see the cloudflare-agents skill (agents-sdk; https://developers.cloudflare.com/agents/) and https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/.
- The tool snippet above is the `search_knowledge_base` fragment from the Agents SDK guide (inside the agent class, `this.env` and `INSTANCE_NAME` are in scope); it is not standalone.

## Related

- [Search](./search.md)
- [Items (Workers binding)](./items-workers-binding.md)
- [Get started: Python SDK](./get-started-python-sdk.md)
