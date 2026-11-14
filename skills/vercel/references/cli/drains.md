# vercel drains

Manage drains that send logs, traces, Web Analytics events, and Speed Insights metrics to a custom HTTP endpoint.

## Signature / Usage

```bash
vercel drains
vercel drains list --scope my-team
vercel drains list --project my-app --json
vercel drains list --limit 10 --json
vercel drains list --limit 10 --next your_next_cursor_here --json
vercel drains inspect drn_example
vercel drains inspect drn_example --json
vercel drains create --name app-logs --type logs --url https://example.com/drain
vercel drains create --name production-logs --type logs --url https://example.com/drain --project my-app,my-api --environment production --source lambda
vercel drains create --name app-traces --type traces --url https://example.com/v1/traces --encoding proto --sample-rate 10
vercel drains update drn_example --url https://example.com/new-drain
vercel drains update drn_example --sample-rate 100
vercel drains update drn_example --all
vercel drains pause drn_example
vercel drains resume drn_example
vercel drains pause drn_example --yes --json
vercel drains delete drn_example
vercel drains delete drn_example --yes --json
```

## Options / Props

Subcommands: `list` (alias `ls`), `inspect`, `create`, `update`, `pause`, `resume`, `delete` (aliases `rm`, `del`). Every subcommand accepts `--json`.

`list`:

| Name | Description |
|------|-------------|
| `--project`, `-p` | Project name or ID to filter by (default: whole team) |
| `--limit`, `-n` | Results per page, 1-100 (default: 20) |
| `--next` | Cursor from the previous page |
| `--json` | JSON object with `drains` and `pagination` |

`create` data types:

| `--type` | Data | `--encoding` values |
|----------|------|---------------------|
| `logs` | Logs | `json`, `ndjson` |
| `traces` | Distributed traces | `json`, `proto` |
| `analytics` | Web Analytics events | `json`, `ndjson` |
| `speed-insights` | Speed Insights metrics | `json`, `ndjson` |

`create` options:

| Name | Required | Description |
|------|----------|-------------|
| `--name` | Yes | Name of the drain |
| `--type` | Yes | One of the data types above |
| `--url` | Yes | Full `http` or `https` endpoint URL |
| `--encoding` | No | Body encoding (default: `json`) |
| `--project`, `-p` | No | Comma-separated project names or IDs (default: all projects on the team) |
| `--environment`, `-e` | No | Logs only; repeat for `production` and/or `preview` (default: all) |
| `--source` | No | Logs only; repeat for `lambda`, `edge`, `static`, `external`, `build`, `firewall`, `redirect` (default: all) |
| `--sample-rate` | No | Percentage greater than 0 and at most 100; fractions supported (default: 100) |
| `--header` | No | Delivery header as `Name: value`; repeatable |
| `--secret` | No | Signing secret for the `x-vercel-signature` header; `-` reads it from stdin |
| `--json` | No | Return the created drain and an `outcome` of `created` |

`update` accepts the create options except `--type`, plus `--all` / `-a` (send data from all projects again; cannot combine with `--project`). `pause` / `delete` accept `--yes` / `-y`.

## Notes

- The CLI creates custom HTTP destinations (traces use OTLP over HTTP). Use the dashboard for other drain types or destinations, and for non-HTTP destinations or custom filters the CLI cannot preserve. Integration-managed destinations: change delivery settings in that integration
- `inspect` text output shows only the endpoint host unless `--show-full-url` is passed. JSON output includes the full endpoint URL, which can contain credentials; signing secrets are omitted and delivery header values are redacted in JSON
- `update`: omitted settings stay unchanged; the encoding stays unless `--encoding` is passed; when given, `--header`, `--project`, `--source`, `--environment` replace their lists rather than adding to them
- `pause` stops delivery without deleting the drain; data generated while paused is not sent and cannot be recovered by resuming. `pause` asks for confirmation (`--yes` to confirm in scripts or with `--json`); `resume` needs none. Pausing a paused drain or resuming a running one returns `outcome: "unchanged"` with `--json`
- `delete` is permanent; pass `--yes` to confirm in scripts or with JSON output
- Output: with `--json`, `inspect` returns a `drain` object and mutating commands add an `outcome` (`created`, `updated`, `paused`, `resumed`, `deleted`). Without `--json`, mutating commands write the drain ID to stdout when piped; status messages go to stderr. In JSON or non-interactive mode errors go to stderr as JSON with a `reason` (for example `confirmation_required` for `pause` / `delete` without `--yes`) and a nonzero exit code
- If a create request fails with an unknown outcome, run `vercel drains list` before retrying
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--token`, `--version`
- Source: https://vercel.com/docs/cli/drains (fetched 2026-11-14)

## Related

- [webhooks.md](./webhooks.md)
- [global-options.md](./global-options.md)
