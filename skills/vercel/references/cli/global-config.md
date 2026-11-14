# vercel global-config

Manage Global Config stores from the CLI: list, create, inspect, update, delete, and manage items, read tokens, and backups. Renamed from Edge Config (the `vercel edge-config` alias is not confirmed in the current official page).

## Signature / Usage

```bash
vercel global-config create flags --items '{"betaUiEnabled":false,"region":"sfo1"}'
vercel global-config inspect flags
vercel global-config list --json
vercel global-config update flags --slug feature-flags
vercel global-config update flags --patch '{"items":[{"operation":"upsert","key":"betaUiEnabled","value":true}]}'
vercel global-config items flags --key betaUiEnabled
vercel global-config tokens flags --add "Production read"
vercel global-config tokens flags --remove tok_abc123 --yes
vercel global-config backups flags --backup-version backup_version_abc123 --json
vercel global-config backups flags --restore backup_version_abc123 --yes
vercel global-config delete flags --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `list` (default) | List Global Config stores for the current team; bare `vercel global-config` runs `list` |
| `create <slug> --items` | Create a store, optionally seeded with a JSON object of items (`add` is a deprecated alias that prints a warning) |
| `inspect <id-or-slug>` | Show store metadata; accepts the store ID (`ecfg_...`) or slug (`get` is a deprecated alias) |
| `update <id-or-slug> --slug / --patch` | Rename a store and/or batch-patch items (`--patch` takes `{"items":[...]}` or a bare array; each item needs `operation` of `create`/`update`/`upsert`/`delete`, `key`, and usually `value`) |
| `delete <id-or-slug> -y, --yes` | Delete a store |
| `items <id-or-slug> --key` | List items, or fetch one item by key |
| `tokens <id-or-slug> --add <LABEL> / --remove <ID_OR_TOKEN>` | List, create (label 1-52 chars), or revoke read tokens (`--remove` is repeatable and requires `--yes` in non-interactive mode) |
| `backups <id-or-slug> --backup-version / --restore / --limit / --next` | List backups, fetch one version, or restore from one (`--limit` 0 to 50; `--next` is a pagination cursor; `--restore` cannot be combined with `--backup-version`) |
| `--json` | Output as JSON; accepted by every subcommand |
| `-y, --yes` | Skip the confirmation prompt (`delete`, `tokens`, `backups --restore`) |

## Notes

- The Global Config SDK reads a `GLOBAL_CONFIG` env var (falls back to `EDGE_CONFIG`) containing a connection string: `https://global-config.vercel.com/<globalConfigId>?token=<token>`
- Restoring a backup updates live items immediately; `--yes` skips the confirmation prompt
- `--json` is the documented JSON output flag on every subcommand; the `-F, --format json` form previously listed here is not confirmed in the current official docs
- `create` / `inspect` / `delete` are the current names; `add` / `get` print a deprecation warning (the twin does not list `remove` / `rm` / `ls`, which are not confirmed in current official docs)
- `tokens --add` prints the plaintext token (and its ID) once; capture it immediately
- Use `vercel global-config inspect <id-or-slug>` to look up the Global Config ID for the connection string
- Source: https://vercel.com/docs/cli/global-config (fetched 2026-11-14)

## Related

- [env.md](./env.md)
