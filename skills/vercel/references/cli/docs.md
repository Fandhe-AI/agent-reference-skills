# vercel docs

Search the Vercel docs and print docs pages as Markdown from the terminal. No login or linked project needed.

## Signature / Usage

```bash
vercel docs search "environment variables"
vercel docs inspect functions
vercel docs inspect /docs/routing/rewrites
vercel docs inspect https://vercel.com/docs/routing/rewrites
vercel docs inspect functions > functions.md
vercel docs search "rewrites" --limit 10
vercel docs search "function timeout" -n 3
vercel docs search "function timeout" --limit 3 --json
vercel docs inspect functions --json
vercel docs search "environment variables" --limit 2 --json | jq -r '.docs[].url'
vercel docs inspect "$(vercel docs search "environment variables" --limit 1 --json | jq -r '.docs[0].url')"
```

## Options / Props

| Name | Description |
|------|-------------|
| `--limit`, `-n` | Number of search results: whole number of 1 or more (default: 5); values above 20 use 20 and print a warning. Search only |
| `--json` | Write structured JSON to stdout (`--format=json` is equivalent) |

JSON shapes:

| Command | Output |
|---------|--------|
| `vercel docs search` | Object with a `docs` array of matching pages |
| `vercel docs inspect` | Object with a `page` that has `path`, `url`, and Markdown `content` |

Each `docs` item has: `title`, `url`, `path` (path after `/docs/`, accepted by `inspect`; empty for the docs home), `description` (or `null`), `section` (`title` and `url`, or `null` when the match is the page itself).

## Notes

- `vercel docs` without a command shows help
- `search` returns one result per page, best match first (title, URL, description; plus section heading and section URL when the best match is a section). Results go to stdout. The query is required, up to 200 characters; multiple words form one query. When nothing matches, the command suggests `vercel kb search`
- `inspect` accepts the path after `/docs/`, a `/docs/...` path, or a full URL; a section anchor or `.md` suffix is ignored. Use `/docs` or `https://vercel.com/docs` for the docs home. Output includes the page's frontmatter and body on stdout
- Exit codes: 0 on a completed search (including no matches); 1 when the docs cannot be reached, rate limiting, or an `inspect` page is not found; 2 for invalid input (missing query, query over 200 characters, invalid `--limit`, value that is not a docs path or Vercel docs URL). With `--json`, errors are JSON on stderr with `reason`, `message`, and optionally a `next` command
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--version`
- Source: https://vercel.com/docs/cli/docs (fetched 2026-11-14)

## Related

- [changelog.md](./changelog.md)
- [global-options.md](./global-options.md)
