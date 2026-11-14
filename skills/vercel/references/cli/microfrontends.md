# vercel microfrontends

Manage Vercel Microfrontends: create groups, add/remove projects, pull configuration for local development. Alias: `vercel mf`.

## Signature / Usage

```bash
vercel microfrontends create-group --name="My Group" --project=web --default-app=web --yes
vercel mf add-to-group --group="My Group" --default-route=/docs
vercel mf remove-from-group
vercel mf delete-group --group="My Group"
vercel mf inspect-group --group="My Group" --json
vercel mf pull
vercel mf pull --deployment dpl_123xyz
vercel mf inspect-group --group="My Group" --config-file-name=microfrontends.jsonc --json
```

## Options / Props

### create-group

| Name | Description |
|------|-------------|
| `--name` | Name of the microfrontends group |
| `--project` | Project name to include (repeatable) |
| `--default-app` | Project name for the default application |
| `--default-route` | Default route for the default application |
| `--project-default-route` | Default route for a non-default project: `<project>=<route>` (repeatable) |
| `-y, --yes` | Skip creation confirmation |

### add-to-group

| Name | Description |
|------|-------------|
| `--group` | Group name to add the current project to |
| `--default-route` | Default route for this project (e.g. `/docs`) |

### remove-from-group

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip the project-link prompt and removal confirmations, including the one for a project that is still in `microfrontends.json` |

### delete-group

| Name | Description |
|------|-------------|
| `--group` | Name or ID of the group to delete |
| `-y, --yes` | Skip the deletion confirmation; combine with `--group` to delete without prompting |

### inspect-group

| Name | Description |
|------|-------------|
| `--group` | Name, slug, or ID of the group to inspect; required in non-interactive environments |
| `--config-file-name` | Custom config file path/name relative to the default app root (must end with `.json` or `.jsonc`) |
| `--json` | Output the group and project metadata as JSON |

### pull

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation when linking is required |
| `--deployment` | Deployment ID to pull configuration from |

## Notes

- `create-group` creates the group in the current team; if the current scope is not a team it exits with an error. Subcommands are interactive when options are omitted
- To set the default application use `create-group --default-app` or the dashboard (`add-to-group` adds a child application)
- `delete-group` deletes the group and all its settings and is not reversible
- Renamed since the previous fetch: `--format=json` / `-F` is now `--json` (`inspect-group`), and `--dpl` is now `--deployment` (`pull`); the old names are not mentioned on the current official page (not confirmed to still work)
- Source: https://vercel.com/docs/cli/microfrontends (fetched 2026-11-14)
- Default application cannot be removed from a group via CLI; use the dashboard or `delete-group`
- `pull` requires Vercel CLI 44.2.2+

## Related

- [link.md](./link.md)
- [deploy.md](./deploy.md)
