# vercel health

Read Vercel platform status, active incidents, scheduled maintenance, and recently resolved incidents from your terminal.

## Signature / Usage

```bash
vercel health
vercel health --json
vercel health --json | jq -r '.status.description'
vercel health --json | jq -r '.incidents[] | select(.resolvedAt == null) | .name'
```

## Options / Props

| Name | Description |
|------|-------------|
| `--json` | Return the status report as structured JSON on stdout |

### JSON fields

| Field | Description |
|-------|-------------|
| `page` | The status page's name, URL, and `updatedAt` timestamp |
| `status` | The overall `indicator` and human-readable `description` |
| `components` | Individual components, including operational ones. Each has an ID, name, group, and status |
| `incidents` | Active incidents and recent incidents resolved within seven days, sorted by `startedAt`, newest first |
| `scheduledMaintenances` | Scheduled maintenance entries, including status, time window, affected components, and URL |
| `since` | The timestamp seven days before the request, used to filter resolved incidents |

## Notes

- Reads the public Vercel status page. No sign-in or linked project is needed, and the report covers the platform regardless of the selected team or project
- Text report: status description and last update time, then non-operational components, active incidents with latest updates, scheduled maintenance (when present), and incidents resolved in the last seven days. Timestamps are in UTC and include incident links
- Takes no positional arguments or subcommands. The older `status-page` alias still works but is deprecated; use `health` in new scripts
- Reports and JSON go to stdout; the CLI version banner and errors go to stderr
- An incident has `resolvedAt: null` while open. Active incidents stay in the report even if they started more than seven days ago
- Exit status: success when the report is retrieved, even if the status page reports an outage, so scripts must inspect `status.indicator`, components, or incidents. Retrieval failures (network, rate limiting, unexpected responses) exit nonzero; with `--json` they are JSON objects on stderr with `reason` and `message`
- The text report lists only non-operational components; read the `components` array for all states
- Source: https://vercel.com/docs/cli/health (fetched 2026-11-14)

## Related

- [api.md](./api.md)
- [global-options.md](./global-options.md)
