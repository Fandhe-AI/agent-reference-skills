# Web Search

Hosted `web_search` tool: lets the model search the web for current information and return responses with sourced, clickable inline citations.

## Signature / Usage

```javascript
const response = await client.responses.create({
  model: "gpt-6-astra",
  tools: [{ type: "web_search" }],
  input: "What was a positive news story from today?",
});
```

Domain filtering:

```bash
curl "https://api.openai.com/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "reasoning": { "effort": "low" },
    "tools": [
      {
        "type": "web_search",
        "filters": {
          "allowed_domains": [
            "pubmed.ncbi.nlm.nih.gov",
            "clinicaltrials.gov",
            "www.who.int",
            "www.cdc.gov",
            "www.fda.gov"
          ],
          "blocked_domains": [
            "reddit.com",
            "quora.com",
            "wikipedia.org"
          ]
        }
      }
    ],
    "tool_choice": "auto",
    "include": ["web_search_call.action.sources"],
    "input": "Please perform a web search on how semaglutide is used in the treatment of diabetes."
  }'
```

User location:

```javascript
const response = await openai.responses.create({
  model: "gpt-6-astra",
  tools: [
    {
      type: "web_search",
      user_location: {
        type: "approximate",
        country: "GB",
        city: "London",
        region: "London",
      },
    },
  ],
  input: "What are the best restaurants near me?",
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `search_context_size` | `"low" \| "medium" \| "high"` | Controls how much search result content the model receives |
| `filters.allowed_domains` / `filters.blocked_domains` | `string[]` | Up to 100 allowed or blocked domains |
| `user_location` | object | `{type: "approximate", country, city, region}` for localized results |
| `external_web_access` | `boolean` | Set `false` to restrict to cached results only (disable live internet access) |
| `return_token_budget` | `"default"` \| `"unlimited"` | Extended research: `unlimited` removes the default returned-token budget for the run (increases latency and cost); `default` equals omitting it. `null`, numbers, and other strings are rejected. Applies only to the hosted Responses `web_search` tool with GPT-5+ reasoning models; not to non-reasoning search, Chat Completions search models, or `web_search_preview` |
| `search_content_types` | `string[]` | Set to include `"image"` to enable image search; add `"text"` for supporting text results (e.g. `["image", "text"]`) |
| `image_settings.max_results` | number | Positive number of image results to request |
| `image_settings.caption` | boolean | Ask for short image descriptions when available |

## Notes

- Three search approaches: non-reasoning web search (direct query passthrough), agentic search with reasoning models (model manages searches and decides whether to continue), and deep research (extended investigation, potentially hundreds of sources over several minutes).
- Responses include a `web_search_call` item documenting the search action and a `message` item with inline citations. Inline citations must be made clearly visible and clickable in your UI.
- For new integrations use `web_search`, not the deprecated `web_search_preview` tool type or deprecated search-specific models (e.g. `gpt-4o-search-preview`).

- Image search results: include `web_search_call.results` in `include` and read `web_search_call.results[]`; image results are returned separately from the assistant message. Each `image_result` has `image_url`, `source_website_url`, `thumbnail_url` (when available), and `caption` (when available).
- Migrating from legacy web search: `web_search_preview` in Responses -> migrate to `web_search` (newer controls such as `filters`, `external_web_access`, `return_token_budget`). `gpt-4o-search-preview` / `gpt-4o-mini-search-preview` are deprecated and shut down on 2026-07-23 -> migrate to Responses `web_search`, or use `gpt-5-search-api` if you must stay on Chat Completions. Chat Completions search models always search before responding; Responses search is a tool.
- Limitations: Responses web search context is limited to 128k even when the model context window is larger (for a larger model context window the guide points to `gpt-5.5`). `o4-mini` is deprecated with shutdown 2026-10-23. `web_search_preview` does not support `filters` or `return_token_budget`, and ignores `external_web_access`. With `tool_choice: "auto"` search is optional; use `"required"` or a specific web search tool choice when search must run.

## Related

- [File Search](./file-search.md)
- [Function Tools](./function-tools.md)
