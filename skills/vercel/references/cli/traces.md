# vercel traces

Search spans across a team, inspect request traces, capture session traces, and manage project trace sampling rules.

## Signature / Usage

```bash
vercel traces search --status error --since 1h
vercel traces search --query 'span.duration > 2000' --columns span.startTime,span.duration,span.name
vercel traces search --trace 4bf92f3577b34da6a3ce929d0e0e4736 --span 00f067aa0ba902b7
vercel traces search --next <cursor> --json
vercel traces inspect req_1234567890
vercel traces req_1234567890           # `inspect` is the default subcommand
vercel traces inspect req_1234567890 --open --view tree
vercel traces inspect req_1234567890 --json
vercel traces create /api/hello        # alias of `vercel curl --trace`
vercel traces config ls
vercel traces config set 25 /api --environment production
vercel traces config remove --environment production --default
```

## Options / Props

`search`:

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Search only this project (default: all projects in the selected team, even from a linked directory) |
| `--environment` | `-e` | `production` or `preview`, case-insensitive |
| `--service` | | Filter by service name |
| `--name` | | Filter by span name |
| `--kind` | | Span kind name (`unspecified`, `internal`, `server`, `client`, `producer`, `consumer`) or numeric 0-5 |
| `--status` | | `error`, `ok`, or `unset` |
| `--deployment` / `--request-id` / `--trace` / `--span` | | Filter by deployment ID / request ID / trace ID / span ID |
| `--root` | | Root spans only |
| `--since` / `--until` | `-s` / `-u` | Time range: relative (`30m`, `7d`), ISO 8601, or `YYYY-MM-DD` (midnight UTC). Defaults: one hour ago / now |
| `--limit` | `-n` | 1 to 1,000 (default 100) |
| `--next` | | Continue from the summary's `next` cursor; cannot combine with filters, `--project`, `--since`, `--until` (`--limit` can change) |
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

`config ls|set|remove`: `--project <name-or-id>`, `--json`; `set` and `remove` require `--environment <production|preview|any>` (`-e`); `config remove` also has `--default` (remove only the rule without a path prefix; cannot combine with a path prefix). Syntax: `config set <rate> [requestPath] --environment <env>`, `config remove [requestPath] --environment <env>`.

## Notes

- `--deployment` replaced `--deployment-id` in Vercel CLI 65.0.0, and `--trace` / `--span` replaced `--trace-id` / `--span-id` in 65.4.0; the old names still work but are deprecated
- `inspect` accepts a trace ID (32-char hex, direct lookup within the retention window) or a request ID
- `get` is now a deprecated alias that prints a warning; `inspect` is the primary subcommand and the default (`vercel traces req_...`). Unlike `search`, `inspect` defaults to the linked project
- `search` requires a team scope (`--scope <team>`, else the linked project's team, else the selected team; run `vercel switch <team>` if none). Typed JSON Lines output and `--next` need Vercel CLI 64.0.0+. `search` combines all filters with AND and takes no positional arguments; results are newest first (no sort by duration)
- Search `--json` lines look like `{"type":"span","data":<event>}`; read `.data.span` and `.data.resource`. Last line is a summary (`recordsReturned`, `timeRange`, `pagination`, `excludedIntervals`). `--non-interactive` implies `--json`
- Within `--query`, use numeric span kind values, e.g. `span.kind:(2 OR 3)`; `NOT` excludes, trailing `*` matches a prefix. Fields include `project.id`, `deployment.id`, `environment`, `service.name`, `request.id`, `trace.id`, `span.id`, `parent.id`, `span.name`, `span.isRoot`, `span.duration` (ms), `span.kind`, `span.status.code` (`Error` / `Ok` / `Unset`, case-sensitive); other names search span and resource attributes
- `inspect` requires a matching root span in the same project within 30 minutes after the request ID timestamp, else 404. For team-wide search results pass `--project` and the same `--scope`
- Sampling rules: at most 10 per project; `environment` is `any`, `preview` or `production`; `rate` is a whole number 1-100 (CLI rejects 0 and fractions; use the dashboard for 0%). `config set` / `config remove` take `--environment` in Vercel CLI 64.7.0 and later; earlier versions took it as the first argument (e.g. `config set production 25`), still accepted with a deprecation warning. `config rm` is now documented as `config remove`; `ls` has alias `list`. First matching rule in `ls` wins and `set` appends, so order cannot be changed via CLI (remove and re-add). `set` with the same environment and path prefix changes the rate. `remove` always prompts for confirmation (listing matched rules first, no option skips it) and fails in non-interactive sessions; `remove --environment any` removes only `any` rules; without a path prefix it removes every rule of that environment. `set` never prompts and prints the previous rate. With `--non-interactive`, config subcommands print JSON. A project with no rules collects no traces. Changing rules requires project update access
- Table output: default columns are `span.startTime`, `span.duration`, `span.name`, `span.status.code`, `service.name`, `trace.id`, `span.id`, `parent.id`; `--columns` can add `environment`, `request.id`, `span.kind`. Column keys are case-sensitive; shorthand such as `time` is rejected. JSON Lines paths from earlier CLI versions (e.g. `.span.traceId`) now live under `.data`.
- `inspect` 404 (`Trace not found`): check the retention window and that `--project` / `--scope` match the trace's project and team
- `create`: curl flags go after `--`, e.g. `vercel traces create /api/test -- --request POST --data '{"name": "John"}'`
- Capture a trace during a request with `vercel curl --trace /api/hello` (equivalent to `vercel traces create`)
- Source: https://vercel.com/docs/cli/traces (fetched 2026-11-14)

## Related

- [curl.md](./curl.md)
- [logs.md](./logs.md)
