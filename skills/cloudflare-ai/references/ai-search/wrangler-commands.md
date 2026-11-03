---
source: https://developers.cloudflare.com/ai-search/wrangler-commands/
---

# Wrangler commands (ai-search)

Manage AI Search instances, namespaces, and indexing jobs from the command line.

## Signature / Usage

```sh
npx wrangler ai-search list
npx wrangler ai-search create <NAME>
npx wrangler ai-search get <NAME>
npx wrangler ai-search update <NAME>
npx wrangler ai-search delete <NAME>
npx wrangler ai-search stats <NAME>
npx wrangler ai-search search <NAME> --query "What is Cloudflare?"
npx wrangler ai-search namespace list
npx wrangler ai-search namespace create <NAME>
npx wrangler ai-search namespace get <NAME>
npx wrangler ai-search namespace update <NAME>
npx wrangler ai-search namespace delete <NAME>
npx wrangler ai-search jobs list <NAME>
npx wrangler ai-search jobs create <NAME>
npx wrangler ai-search jobs get <NAME> <JOB-ID>
npx wrangler ai-search jobs cancel <NAME> <JOB-ID>
npx wrangler ai-search jobs logs <NAME> <JOB-ID>
```

## Options / Props

Common to instance commands (`list`, `create`, `get`, `update`, `delete`, `stats`, `search`, `jobs *`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--namespace`, `-n` | string | `default` | Namespace. Not offered on `namespace *` commands. For `create` the source lists no default. |
| `--json` | boolean | `false` | Clean JSON output (all commands except `delete`). |
| `--page` | number | `1` | Page number (`list`, `namespace list`, `jobs list`, `jobs logs`). |
| `--per-page` | number | — | Page size. |
| `--force`, `-y` | boolean | `false` | Skip confirmation (`delete`, `namespace delete`, `jobs cancel`). |

`create <NAME>` (name unique within its namespace):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--source` | string | — | R2 bucket name or web URL. |
| `--type` | string | — | Source type (`r2`, `web-crawler`). |
| `--parse-type` | string | `sitemap` | `web-crawler` only: `sitemap` or `discover`. |
| `--source-jurisdiction` | string | — | R2 jurisdiction (e.g. `eu`, `fedramp`); `--type r2` only. |
| `--embedding-model` | string | — | Embedding model. |
| `--generation-model` | string | — | LLM for chat completions. |
| `--chunk-size` | number | — | Min `64`. |
| `--chunk-overlap` | number | — | Chunk overlap. |
| `--max-num-results` | number | — | Max results per query. |
| `--reranking` | boolean | — | Enable reranking. |
| `--reranking-model` | string | — | Reranking model. |
| `--hybrid-search` | boolean | — | Enable hybrid search. |
| `--cache` | boolean | — | Response caching. |
| `--score-threshold` | number | — | 0 to 1. |
| `--prefix` | string | — | R2 key prefix. |
| `--include-items` | array | — | Glob patterns to include. |
| `--exclude-items` | array | — | Glob patterns to exclude. |
| `--custom-metadata` | array | — | `field_name:data_type` (`text`, `number`, `boolean`, `datetime`); repeatable. |
| `--custom-metadata-schema` | string | — | JSON file path (array of `{ field_name, data_type }`); exclusive with `--custom-metadata`. |

`update <NAME>`: `--embedding-model`, `--generation-model`, `--chunk-size`, `--chunk-overlap`, `--max-num-results`, `--reranking`, `--reranking-model`, `--hybrid-search`, `--cache`, `--score-threshold`, and `--paused` (boolean, pause or resume).

`search <NAME>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--query` | string (required) | — | Search text. |
| `--max-num-results` | number | — | Override max results. |
| `--score-threshold` | number | — | Override min score (0-1). |
| `--reranking` | boolean | — | Override reranking. |
| `--filter` | array | — | `key=value`, repeatable (e.g. `--filter type=docs --filter lang=en`). |

`namespace list`: `--search` (string; filter by name or description). `namespace create` / `update`: `--description` (string, max 256 chars). `jobs create`: `--description` (string).

Global flags (every command): `--version`/`-v`, `--cwd`, `--config`/`-c`, `--env`/`-e`, `--env-file`, `--install-skills`, `--profile`.

## Notes

- Corrected from the official docs: the source prints short aliases as `--v`, `--c`, `--e`, `--n`, `--y`; Wrangler short aliases are single-dash (`-v`, `-c`, `-e`, `-n`, `-y`).
- `jobs create` triggers a sync; user-triggered syncs have a 30 second cooldown.
- `ai-search create` can register the service API token for R2 sources automatically; see service-api-token.md.
- Wrangler install, config, and global behavior: cloudflare-wrangler skill.

## Related

- [Get started: Wrangler](./get-started-wrangler.md)
- [Syncing](./syncing.md)
- [Namespaces](./namespaces.md)
