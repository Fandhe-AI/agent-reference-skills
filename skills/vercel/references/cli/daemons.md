# vercel daemons

Manage Daemons for a project: list and inspect production daemons, override regional instance counts, and inspect or restart individual instances.

## Signature / Usage

```bash
vercel daemons
vercel daemons list
vercel daemons list --project my-app --scope my-team
vercel daemons list --limit 20 --json
vercel daemons list --next <cursor> --json
vercel daemons inspect worker
vercel daemons inspect worker --json
vercel daemons scale worker iad1=3 fra1=1
vercel daemons scale worker iad1=0
vercel daemons scale worker --reset
vercel daemons instances list
vercel daemons instances list worker --json
vercel daemons instances inspect <instance-id>
vercel daemons instances inspect <instance-id> --since 24h --json
vercel daemons instances restart <instance-id>
```

## Options / Props

Common options (every command; for instance commands include the subcommand, such as `instances list --json`):

| Name | Description |
|------|-------------|
| `-p, --project <name-or-id>` | Select an existing project (default: linked project) |
| `--json` | Output JSON (`--format=json` is equivalent) |

`list`:

| Name | Description |
|------|-------------|
| `-n, --limit <number>` | Maximum results for one page, 1-100. Defaults to all results when both pagination options are omitted |
| `--next <cursor>` | Fetch the next page using the cursor from a previous response |

`instances inspect`:

| Name | Description |
|------|-------------|
| `-s, --since <time>` | Start of the metrics window (ISO 8601 or relative, such as `24h`); default one hour ago |
| `-u, --until <time>` | End of the metrics window (ISO 8601 or relative, such as `1h`); default now |

## Notes

- All daemon commands target production and use the linked project by default; use `--scope` to select the team. The CLI does not create or link a project as part of a daemon command. Non-interactive execution also uses JSON output
- `ls` is an alias for `list` (also under `instances`)
- `list`: by default fetches every page; `--limit` or `--next` returns one page. JSON includes `daemons` and `pagination.next` (`null` means no more results)
- `inspect` output includes image, memory allocation, regional instance counts, and whether scaling overrides differ from the deployed configuration
- `scale`: each override is `REGION=NUMBER` (integer 0-100), each region at most once; omitted regions keep existing counts; overrides persist across deployments until reset. `--reset` restores the deployed configuration and cannot be combined with regional overrides. It applies **without a confirmation prompt** and returns after saving; instances start or stop asynchronously, so check readiness with `vercel daemons inspect <name>`
- `instances inspect` needs a window of at least one second with start before end; if metrics are unavailable it still returns details (JSON has `metrics: null` and a warning). Use the full `dmni_...` instance ID from `instances list`
- `instances restart` sends `SIGTERM` and schedules a replacement container, **without a confirmation prompt**. Success means the restart was accepted, not that the replacement is ready; check with `instances list`. If the outcome is unknown after an error, inspect the instance before retrying
- Global options accepted: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--token`, `--version`
- Source: https://vercel.com/docs/cli/daemons (fetched 2026-11-14)

## Related

- [link.md](./link.md)
- [login.md](./login.md)
- [global-options.md](./global-options.md)
