# vercel kb

Browse, search, and read Vercel Knowledge Base guides from your terminal.

## Signature / Usage

```bash
vercel kb
vercel kb search "rewrites"
vercel kb inspect ai-sdk-and-evlog
vercel kb inspect https://vercel.com/kb/guide/ai-sdk-and-evlog
vercel kb inspect ai-sdk-and-evlog > guide.md
vercel kb --limit 10
vercel kb --next 10 --limit 10
vercel kb search "AI SDK" -n 3
vercel kb --json
vercel kb search "AI SDK" --limit 3 --json
vercel kb inspect ai-sdk-and-evlog --json
vercel kb search "rewrites" --limit 2 --json | jq -r '.guides[].url'
vercel kb --limit 3 --json | jq -r '.pagination.next'
```

## Options / Props

| Name | Description |
|------|-------------|
| `--limit`, `-n` | Number of guides (whole number, 1 or more; default 5). Values above 20 use 20 and print a warning. Applies to listing and search |
| `--next` | Cursor from the previous output to list the next page. Listing only; keep the same `--limit` across pages |
| `--json` | Write structured JSON to stdout. `--format=json` is equivalent |

### Subcommands

| Subcommand | Description |
|------------|-------------|
| (none) | List the five latest guides: publication date, title, URL, summary, newest first |
| `search <query>` | Find guides, best match first. Query is required; multiple words form one query |
| `inspect <slug-or-url>` | Print the guide as Markdown (frontmatter, body, related links) to stdout |

### JSON output

| Command | Output |
|---------|--------|
| `vercel kb` | Object with a `guides` array and a `pagination` object. `pagination.next` is the cursor for `--next`, or `null` on the last page |
| `vercel kb search` | Object with a `guides` array; each guide includes its Markdown `content` |
| `vercel kb inspect` | Object with a `guide` that has `slug`, `url`, and Markdown `content` |

Each item in `guides` has `title`, `url`, `slug`, `publishedAt`, `authors` (array of names), `summary` (or `null`), and `content` (search results only).

## Notes

- No login or linked project is needed
- Guides go to stdout. When more are available, a `Next page:` command (including the cursor) follows on stderr
- Search returns up to five guides by default and can return fewer than `--limit`; search has no pages, so `--next` does not apply
- Exit status: 0 when guides are retrieved, including a search with no matches. Exit 1 when the Knowledge Base is unreachable, rate limited, or the guide for `inspect` is not found. Exit 2 for invalid input (missing search query, invalid `--limit`, or a value that is not a guide slug or Knowledge Base guide URL)
- With `--json`, errors are JSON objects on stderr with `reason`, `message`, and, when applicable, a `next` command to recover
- Source: https://vercel.com/docs/cli/kb (fetched 2026-11-14)

## Related

- [api.md](./api.md)
- [global-options.md](./global-options.md)
