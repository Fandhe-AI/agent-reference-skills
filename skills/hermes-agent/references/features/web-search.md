# Web Search & Extract

Two model-callable web tools backed by multiple providers: `web_search` (ranked results) and `web_extract` (readable content from URLs). Providers are chosen via `hermes tools` or `config.yaml`.

## Signature / Usage

```yaml
# ~/.hermes/config.yaml
web:
  backend: "searxng"            # firecrawl | searxng | brave-free | ddgs | tavily | perplexity | keenable | exa | parallel | xai | nous
  search_backend: "searxng"     # per-capability override for web_search
  extract_backend: "firecrawl"  # per-capability override for web_extract
```

```bash
# ~/.hermes/.env
FIRECRAWL_API_KEY=fc-your-key-here
SEARXNG_URL=http://localhost:8888
```

## Backends

| Provider | Env Var | Search | Extract | Free tier |
|----------|---------|--------|---------|-----------|
| Firecrawl (default) | `FIRECRAWL_API_KEY` (optional); `FIRECRAWL_API_URL` for self-hosted | yes | yes | 500 credits/mo, keyless cloud when selected |
| SearXNG | `SEARXNG_URL` | yes | no | Free (self-hosted) |
| Brave Search | `BRAVE_SEARCH_API_KEY` | yes | no | 2000 queries/mo |
| DDGS (DuckDuckGo) | none | yes | no | Free |
| Exa | `EXA_API_KEY` (optional) | yes | yes | Keyless ring member; 1000 searches/mo with key |
| Parallel | `PARALLEL_API_KEY` (optional) | yes | yes | Keyless ring member |
| Tavily | `TAVILY_API_KEY` (optional) | yes | yes | Opt-in keyless when selected |
| Perplexity | `PERPLEXITY_API_KEY` | yes | yes (query-relevant snippets) | Paid |
| Keenable | `KEENABLE_API_KEY` (optional) | yes | yes | Keyless ring member |
| xAI (Grok) | `XAI_API_KEY` or `hermes auth add xai-oauth` | yes | no | Paid |
| OpenAI Native (Codex) | `hermes auth add openai-codex` | yes | no | Requires ChatGPT/Codex subscription |

## Options / Props

| Key | Default | Description |
|---|---|---|
| `web.extract_char_limit` | `15000` | Per-page budget (clamped 2000-500000); the tool's `char_limit` argument raises it per call |
| `web.extract_timeout` | `120` | Wall-clock seconds per provider dispatch; `0` disables |
| `web.cache_enabled` | `true` | Disable both caches with `false` |
| `web.cache_ttl_minutes` | `20` | Freshness window, clamped 1-1440 |
| `web.cache_exempt_hosts` | `[]` | Hosts always fetched live (exact, `*.` wildcard, or domain suffix) |
| `web.keyless_fallback` | `true` | Keyless free-tier ring when no credentials exist |
| `web.keyless_rescue` | `true` | One-shot retry of a failed call on the keyless ring |
| `web.provider_tier.<name>` | auto | `free` or `paid` pin for Exa, Parallel, Keenable |
| `web.xai.model` / `allowed_domains` / `excluded_domains` / `timeout` | `grok-build-0.1` / — / — / `90` | xAI options (domain lists max 5, mutually exclusive) |

## Notes

- Fresh installs with no credentials get working tools through a keyless round-robin ring (Exa, Parallel, Firecrawl, Keenable) with automatic failover; any configured backend or key wins.
- `web_extract` is deterministic (no LLM): pages over the budget get a head+tail window (~75% / ~25%) plus a `[TRUNCATED]` footer pointing at the full text stored under `~/.hermes/cache/web/` and a `read_file` call; stored text is capped at 2 MB. For live DOM use `browser_navigate` + `browser_snapshot`.
- Caching: `web_search` is memoized per process (identical concurrent searches coalesce); `web_extract` text is shared across processes. Only successes are cached; local development URLs and `security.website_blocklist` matches are never cached.
- Priority per capability: `web.search_backend` / `web.extract_backend`, then `web.backend`, then auto-detect (only when no shared selection has ever been written): Tavily, Perplexity, Exa, Parallel, Firecrawl, Nous Tool Gateway, SearXNG, Brave, DDGS, Nous identity, keyless ring. xAI is never auto-detected.
- SearXNG: enable JSON output (`search.formats: [html, json]` in `settings.yml`; HTTP 403 means JSON is still disabled) and pair with an extract provider. Self-host with `searxng/searxng:latest` on port 8888; public instances at searx.space may disable JSON.
- xAI results are LLM-generated, so validate returned URLs before fetching. OpenAI Native swaps the client-side `web_search` for the provider-executed built-in only on the Codex Responses endpoint.
- Nous subscribers get managed search through the Tool Gateway; install the optional `searxng-search` skill with `hermes skills install official/research/searxng-search`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/web-search (pinned to v0.22.2)

## Related

- [Tool Gateway](./tool-gateway.md)
- [X Search](./x-search.md)
- [Browser](./browser.md)
