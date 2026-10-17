# Tool Search

Opt-in progressive-disclosure layer: MCP and plugin tools (and explicitly named cold built-ins) are replaced in the model-visible tools array by three bridge tools, and the model loads each tool's schema on demand.

## Signature / Usage

```text
tool_search(queries, limit?)   search the deferred-tool catalog (one or more queries)
tool_describe(names)           load the full schemas for one or more tools
tool_call(calls)               invoke deferred tools; `calls` is an array of {name, arguments}
```

```yaml
tools:
  tool_search:
    enabled: auto       # auto (default), on, or off
    threshold_pct: 5
    search_default_limit: 5
    max_search_limit: 25
    listing: auto
    listing_max_tokens: 4000
    defer:              # replaces the curated default; [] keeps every tool eager
      - computer_use
      - session_search
```

## Options / Props

| Key | Default | Meaning |
| --- | --- | --- |
| `enabled` | `auto` | `auto` / `on` activate whenever at least one deferred tool exists (`auto` is currently an alias of `on`); `off` keeps everything eager |
| `threshold_pct` | `5` | Listing budget as a percentage of context length (0-100) |
| `search_default_limit` | `5` | Hits per query when `limit` is omitted |
| `max_search_limit` | `25` | Upper bound per query (1-50) |
| `listing` | `auto` | Embed a grouped name + first-sentence manifest (60 characters max); `on` / `off` force |
| `listing_max_tokens` | `4000` | Absolute cap on the embedded listing (200-60000) |
| `defer` | curated list | Tool names replaced by the bridge; an explicit list replaces the curated default |
| `tools.connectors.enabled` | `true` | `false` never touches connector routes |
| `nous.guest` | (default on) | `false` opts out of the free Nous identity created for connectors |

Legacy form: `tools: {tool_search: true}` equals `{enabled: auto}`.

## Tiers

| Tier | Condition | What the model sees |
| --- | --- | --- |
| 0 | No deferred tools | Every tool eager, no bridge |
| 1 | Deferred catalog listing fits the budget | Bridge + manifest of every deferred tool (degrades per server to names-only or a summary line) |
| 2 | Listing exceeds the budget even names-only | Bare bridge + one line per server (name + tool count) |

The budget is `min(threshold_pct% of context, listing_max_tokens)`, re-evaluated each time the tools array is built.

## Notes

- Core working-set tools (`terminal`, `read_file`, `write_file`, `patch`, `search_files`, `todo`, `memory`, `browser_*`, `web_search`, `web_extract`, `clarify`, `execute_code`, `delegate_task`, ...) stay eager by default; the curated `defer` list covers cold built-ins such as `computer_use` and `session_search`.
- `tool_call` unwraps the bridge: hooks, guardrails and approvals run against the real tool name. A batch holds up to 10 entries; a batch containing local tools is split into one call per entry; connector-only batches dispatch as one hosted request each in input order. A multi-entry batch naming a local tool is rejected.
- Retrieval is BM25 over tool name, source name, description and parameter names with English Snowball stemming. A tool matches only if it contains the query's rarest token and at least half of the query's answerable terms (floor engages from four answerable terms). Queries with no match return `available_sources`.
- Connectors (remote tools served by the managed tool gateway) are named `connectors__<connector>__<tool>`, discovered by `tool_search` (30-second gateway bound), and need a Nous identity; a missing link returns `CONNECTION_REQUIRED`. The `manage_connections` tool lists connectors and starts authorization; the model cannot disconnect an account.
- Trade-offs: one extra round trip for cold tools, no system-prompt cache benefit for deferred schemas, local argument validation instead of provider-native validation, dependence on model query quality, and toolset edits invalidate the prompt cache.
- The catalog is scoped to the session's granted toolsets, so subagents and restricted sessions cannot discover or call outside them.

## Related

- [MCP](./mcp.md)
- [Tool Gateway](./tool-gateway.md)
- [Tools](./tools.md)
