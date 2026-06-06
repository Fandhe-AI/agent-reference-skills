# vercel webhooks

Manage webhooks for your Vercel account: list, inspect, create, and remove. Beta command.

## Signature / Usage

```bash
vercel webhooks list
vercel webhooks get <id>
vercel webhooks create <url> --event deployment.created --event deployment.ready
vercel webhooks create <url> --event deployment.created --project prj_abc123
vercel webhooks rm <id> --yes
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--format` | | `json` output for `list` and `get` subcommands |
| `--event` | `-e` | Event type to subscribe to (repeatable); required for `create` |
| `--project` | `-p` | Limit webhook to a project ID (repeatable); default: all projects |
| `--yes` | | Skip confirmation for `rm` |

## Notes

- Subcommands: `list` / `ls`, `get` / `inspect`, `create` / `add`, `rm` / `remove` / `delete`
- On `create`, the webhook secret is shown only once; save it immediately to verify `x-vercel-signature` headers
- Project must be specified by **project ID** (e.g. `prj_abc123`), not project name
- See official docs for supported event types

## Related

- [project.md](./project.md)
