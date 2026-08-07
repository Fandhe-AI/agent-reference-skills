# vercel global-config

Manage Global Config stores from the CLI: list, create, inspect, update, remove, and manage items, read tokens, and backups. `vercel edge-config` is a continuing alias following the rename from Edge Config to Global Config.

## Signature / Usage

```bash
vercel global-config add flags --items '{"betaUiEnabled":false,"region":"sfo1"}'
vercel global-config get flags
vercel global-config update flags --patch '{"items":[{"operation":"upsert","key":"betaUiEnabled","value":true}]}'
vercel global-config items flags --key betaUiEnabled
vercel global-config tokens flags --add "Production read"
vercel global-config backups flags --restore backup_version_abc123 --yes
vercel global-config remove flags --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `list` (alias `ls`, default) | List Global Config stores for the current team |
| `add <slug> --items` (alias `create`) | Create a store, optionally seeded with JSON items |
| `get <id-or-slug>` (alias `inspect`) | Show store metadata |
| `update <id-or-slug> --slug / --patch` | Rename a store and/or batch-patch items (`create`/`update`/`upsert`/`delete` ops) |
| `remove <id-or-slug> -y, --yes` (alias `rm`, `delete`) | Delete a store |
| `items <id-or-slug> -k, --key` | List items, or fetch one item by key |
| `tokens <id-or-slug> --add / --remove` | List, create, or revoke read tokens |
| `backups <id-or-slug> --backup-version / --restore / --limit / --next` | List, inspect, or restore backups |

## Notes

- The Global Config SDK reads a `GLOBAL_CONFIG` env var (falls back to `EDGE_CONFIG`) containing a connection string: `https://global-config.vercel.com/<globalConfigId>?token=<token>`
- Restoring a backup updates live items immediately; `--yes` skips the confirmation prompt
- All subcommands support `-F, --format json`

## Related

- [env.md](./env.md)
