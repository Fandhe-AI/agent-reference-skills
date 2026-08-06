# Web Search

Hosted `web_search` tool: lets the model search the web for current information and return responses with sourced, clickable inline citations.

## Signature / Usage

```javascript
const response = await client.responses.create({
  model: "gpt-5.6",
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
    "model": "gpt-5.6",
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
  model: "gpt-5.6",
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
| `return_token_budget` | `"unlimited"` | Extended research: allow comprehensive multi-search on reasoning models; increases latency and cost |

## Notes

- Three search approaches: non-reasoning web search (direct query passthrough), agentic search with reasoning models (model manages searches and decides whether to continue), and deep research (extended investigation, potentially hundreds of sources over several minutes).
- Responses include a `web_search_call` item documenting the search action and a `message` item with inline citations. Inline citations must be made clearly visible and clickable in your UI.
- For new integrations use `web_search`, not the deprecated `web_search_preview` tool type or deprecated search-specific models (e.g. `gpt-4o-search-preview`).

## Related

- [File Search](./file-search.md)
- [Function Tools](./function-tools.md)
