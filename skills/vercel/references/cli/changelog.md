# vercel changelog

List recent Vercel product updates with full Markdown content, or search the changelog, from the terminal. No login or linked project needed.

## Signature / Usage

```bash
vercel changelog
vercel changelog search "AI SDK"
vercel changelog --limit 10
vercel changelog search "AI SDK" -n 2
vercel changelog --json
vercel changelog search "AI SDK" --limit 2 --json
vercel changelog --limit 1 --format=json
vercel changelog --limit 1 --json | jq '.items[] | {title, url}'
```

## Options / Props

| Name | Description |
|------|-------------|
| `--limit`, `-n` | Number of results, integer 1-20 (default: 5); applies to listing and search |
| `--json` | Write structured JSON to stdout (`--format=json` is equivalent) |

JSON output is an object with an `items` array; each item has:

| Field | Description |
|-------|-------------|
| `title` | The update's title |
| `url` | URL of the full announcement |
| `slug` | The announcement's URL slug |
| `publishedAt` | Publication timestamp |
| `authors` | Array of author names |
| `summary` | Summary or search excerpt, or `null` |
| `content` | Markdown content, when available |

## Notes

- `vercel changelog` shows the five latest updates by default; each entry shows date, title, URL, and Markdown content when available. Human-readable output goes to stderr, so use `--json` to pipe results
- `search` requires a query; multiple words form one query (`search AI SDK` equals `search "AI SDK"`) and it accepts the same options as listing
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--version`
- Source: https://vercel.com/docs/cli/changelog (fetched 2026-11-14)

## Related

- [docs.md](./docs.md)
- [upgrade.md](./upgrade.md)
- [global-options.md](./global-options.md)
