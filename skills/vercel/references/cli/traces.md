# vercel traces

Search spans across a team, inspect request traces, capture session traces, and manage project trace sampling rules.

## Signature / Usage

```bash
vercel traces search --status error --since 1h
vercel traces search --query 'span.duration > 2000' --columns span.startTime,span.duration,span.name
vercel traces search --next <cursor> --json
vercel traces inspect req_1234567890
vercel traces req_1234567890           # `inspect` is the default subcommand
vercel traces inspect req_1234567890 --open --view tree
vercel traces inspect req_1234567890 --json
vercel traces create /api/hello        # alias of `vercel curl --trace`
vercel traces config ls
vercel traces config set production 25 [requestPath]
vercel traces config rm production --default
```

## Options / Props

`search`:

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Search only this project (default: all projects in the selected team, even from a linked directory) |
| `--environment` | | `production` or `preview`, case-insensitive |
| `--service` | | Filter by service name |
| `--name` | | Filter by span name |
| `--kind` | | Span kind name (`unspecified`, `internal`, `server`, `client`, `producer`, `consumer`) or numeric 0-5 |
| `--status` | | `error`, `ok`, or `unset` |
| `--deployment-id` / `--request-id` / `--trace-id` / `--span-id` | | Filter by ID |
| `--root` | | Root spans only |
| `--since` / `--until` | `-s` / `-u` | Time range: relative (`30m`, `7d`), ISO 8601, or `YYYY-MM-DD` (midnight UTC). Defaults: one hour ago / now |
| `--limit` | `-n` | 1 to 1,000 (default 100) |
| `--next` | `-N` | Continue from the summary's cursor; cannot combine with filters, `--project`, `--since`, `--until` |
| `--query` | `-q` | KQL field expression (bare text unsupported) |
| `--columns` | | Comma-separated column keys in display order; cannot combine with `--json` |
| `--json` | `-j` | JSON Lines ending with a summary line |

`inspect` (alias `get`, deprecated):

| Name | Description |
|------|-------------|
| `--project` | Project name or ID, defaulting to the linked project |
| `--json` | Raw trace as JSON; cannot combine with `--open` |
| `--open` | Open the trace in the Vercel Dashboard |
| `--view` | Dashboard view (requires `--open`): `timeline` (default), `tree`, `waterfall` |

`create`: `--deployment <id-or-url>`, `--protection-bypass <secret>`, `--json`, `--yes` / `-y`; pass curl flags after `--`.

`config ls|set|rm`: `--project <name-or-id>`, `--json`; `config rm` also has `--default` (remove only the rule without a path prefix).

## Notes

- `get` is now a deprecated alias that prints a warning; `inspect` is the primary subcommand and the default (`vercel traces req_...`). Unlike `search`, `inspect` defaults to the linked project
- `search` requires a team scope (`--scope <team>`, else the linked project's team, else the selected team; run `vercel switch <team>` if none). Typed JSON Lines output and `--next` need Vercel CLI 64.0.0+
- Search `--json` lines look like `{"type":"span","data":<event>}`; read `.data.span` and `.data.resource`. Last line is a summary (`recordsReturned`, `timeRange`, `pagination`, `excludedIntervals`). `--non-interactive` implies `--json`
- Within `--query`, use numeric span kind values, e.g. `span.kind:(2 OR 3)`; `NOT` excludes, trailing `*` matches a prefix. Fields include `project.id`, `deployment.id`, `environment`, `service.name`, `request.id`, `trace.id`, `span.id`, `parent.id`, `span.name`, `span.isRoot`, `span.duration` (ms), `span.kind`, `span.status.code` (`Error` / `Ok` / `Unset`, case-sensitive); other names search span and resource attributes
- `inspect` requires a matching root span in the same project within 30 minutes after the request ID timestamp, else 404. For team-wide search results pass `--project` and the same `--scope`
- Sampling rules: at most 10 per project; `environment` is `any`, `preview` or `production`; `rate` is a whole number 1-100 (CLI rejects 0; use the dashboard for 0%). First matching rule in `ls` wins and `set` appends, so order cannot be changed via CLI (remove and re-add). `set` with the same environment and path prefix changes the rate. `rm` always prompts for confirmation and fails in non-interactive sessions; `rm any` removes only `any` rules. A project with no rules collects no traces. Changing rules requires project update access
- Capture a trace during a request with `vercel curl --trace /api/hello` (equivalent to `vercel traces create`)

## Related

- [curl.md](./curl.md)
- [logs.md](./logs.md)
