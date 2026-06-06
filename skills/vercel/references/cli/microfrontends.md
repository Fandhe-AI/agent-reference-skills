# vercel microfrontends

Manage Vercel Microfrontends: create groups, add/remove projects, pull configuration for local development. Alias: `vercel mf`.

## Signature / Usage

```bash
vercel microfrontends create-group --name="My Group" --project=web --default-app=web --yes
vercel mf add-to-group --group="My Group" --default-route=/docs
vercel mf remove-from-group
vercel mf delete-group --group="My Group"
vercel mf inspect-group --group="My Group" --format=json
vercel mf pull
vercel mf pull --dpl dpl_123xyz
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
| `-y, --yes` | Skip project-link prompt (not the removal confirmation) |

### delete-group

| Name | Description |
|------|-------------|
| `--group` | Name or ID of the group to delete |
| `-y, --yes` | Skip project-link prompt (not the deletion confirmation) |

### inspect-group

| Name | Description |
|------|-------------|
| `--group` | Name, slug, or ID of the group to inspect |
| `--config-file-name` | Custom config file path (must end with `.json` or `.jsonc`) |
| `-F, --format` | Output format; `json` |

### pull

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation when linking is required |
| `--dpl` | Deployment ID to pull configuration from |

## Notes

- Default application cannot be removed from a group via CLI; use the dashboard or `delete-group`
- `pull` requires Vercel CLI 44.2.2+

## Related

- [link.md](./link.md)
- [deploy.md](./deploy.md)
