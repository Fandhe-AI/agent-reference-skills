# vercel webhooks

Manage webhooks for your Vercel account: list, inspect, create, and remove. Beta command.

## Signature / Usage

```bash
vercel webhooks list
vercel webhooks inspect <id>
vercel webhooks create <url> --event deployment.created --event deployment.ready
vercel webhooks create <url> --event deployment.created --project prj_abc123
vercel webhooks delete <id> --yes
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--json` | | JSON output for `list` and `inspect` subcommands |
| `--event` | `-e` | Event type to subscribe to (repeatable); required for `create` |
| `--project` | `-p` | Limit webhook to a project ID (repeatable); default: all projects |
| `--yes` | | Skip confirmation for `delete` |

## Notes

- Subcommands: `list`, `inspect`, `create`, `delete`. `get` remains a supported alias of `inspect` but prints a deprecation warning. Earlier docs used `rm` and `--format`; not confirmed on the current page.
- On `create`, the webhook secret is shown only once; save it immediately to verify `x-vercel-signature` headers
- Project must be specified by **project ID** (e.g. `prj_abc123`), not project name; find it in the dashboard (Settings, General) or with `vercel project inspect <name>`. `--project` can be repeated.
- See the official Webhooks API reference for supported event types
- Source: https://vercel.com/docs/cli/webhooks (fetched 2026-11-14)

## Related

- [project.md](./project.md)
