---
source: https://developers.cloudflare.com/agents/tools/web-search/
---

# Web search tool

A `web_search` tool backed by the Cloudflare Web Search API, routed through AI Gateway via the Workers AI binding. The model chooses a query and result count; the application controls provider, gateway, and billing.

## Signature / Usage

Workers AI binding (`"remote": true` bills and runs against your logged-in account in local development):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai": {
    "binding": "AI",
    "remote": true
  }
}
```

```toml
[ai]
binding = "AI"
remote = true
```

AI SDK adapter (Pi Durable: `agents/websearch/pi`; TanStack AI: `agents/websearch/tanstack-ai`):

```ts
import { streamText } from "ai";
import { webSearchTool } from "agents/websearch/ai-sdk";

const tools = {
	web_search: webSearchTool({ binding: env.AI }),
};

const result = streamText({ model, messages, tools });
```

Control cost and provider:

```ts
import { webSearchTool } from "agents/websearch/pi";

const search = webSearchTool({
	binding: env.AI,
	gateway: "research-agent",
	provider: "exa",
	limit: 8,
	maxDescriptionChars: 300,
	timeoutMs: 15_000,
});
```

Search without a model (scheduled job, test, or code outside Workers):

```ts
import { createHTTPWebSearch } from "agents/websearch";

const search = createHTTPWebSearch({
	accountId: env.CF_ACCOUNT_ID,
	apiToken: env.CF_API_TOKEN,
	provider: "linkup",
});

const { items } = await search.search({
	query: "cloudflare agents sdk",
	limit: 3,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `gateway` | string | `"default"` | AI Gateway ID that routes and bills the search. |
| `provider` | string | Platform default | Search provider such as `"exa"`. The model cannot choose or change it. |
| `byokAlias` | string | None | Alias of a provider key stored on the gateway. When set to an alias the gateway lacks, the search fails instead of falling back to credits. |
| `limit` | number | `5` | Results per search; integers 1 to 10. A larger model request is capped, not rejected. |
| `maxDescriptionChars` | number | `600` | Maximum characters per result description in the model's view. `Infinity` passes descriptions whole. |
| `timeoutMs` | number | `30000` | Deadline before a retryable `web_search_timeout` error. |
| `description` | string | Built-in | Replaces the tool description the model sees. |
| `source` | WebSearchSource | — | Custom source (caching, logging, fakes) instead of `binding`; it owns gateway, provider, and billing, so those options are not accepted with it. |
| `name` | string | `web_search` | Tool name (TanStack AI adapter). |

## Notes

- Requires Agents SDK 0.27.0 or later. The Workers AI binding gained web search in workerd 1.20260924.1 (Wrangler 4.141.0, `@cloudflare/vite-plugin` 1.60.2); older runtimes fail with `web_search_unsupported_runtime`.
- The account must be able to pay for searches (AI Gateway credits or a provider key stored on the gateway).
- Invalid `limit`, `maxDescriptionChars`, `timeoutMs`, or `byokAlias` throws a `RangeError` at creation. The model's input is a `query` of 1 to 1,024 characters plus optional positive integer `limit`.
- The model sees a numbered list (title, URL, trimmed description); the application receives the full `WebSearchToolOutput` (`items`, `metadata` with `requestId` and `latencyMs`, `provider`). The API does not paginate.
- Pi tool is `replay: "safe"`; an eviction mid-search reruns it as a second billed search. Results are not cached.
- When wrapping a source, spread it (`...source`) so its `provider` is kept.
- Store the API token (`CF_API_TOKEN`) as a Workers secret, not in Wrangler configuration, and never in tool arguments. Search results are untrusted web content.
- Errors are `WebSearchError` (`status`, `code`, `retryable`, `requestId`); Pi returns `ok: false` in `details`, other adapters throw.
- AI Gateway belongs to the cloudflare-ai skill (ai-gateway; https://developers.cloudflare.com/ai-gateway/); Web Search API docs: https://developers.cloudflare.com/web-search/

## Related

- [Web fetch](./web-fetch.md)
- [Browser](./browser.md)
