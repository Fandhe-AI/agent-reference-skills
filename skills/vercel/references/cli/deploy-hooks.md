# vercel deploy-hooks

Manage Deploy Hooks: list, create, and remove deploy hook URLs that trigger new deployments when called. Alias: `vercel deploy-hook`.

## Signature / Usage

```bash
vercel deploy-hooks list --format json
vercel deploy-hooks create cms-rebuild --ref main
vercel deploy-hooks rm hook_abc123 --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `list` (alias `ls`) `-F, --format / -p, --project` | List deploy hooks for the linked or specified project |
| `create [name] -r, --ref / -p, --project` (alias `add`) | Create a deploy hook for a Git branch; returns the hook URL |
| `remove <id> -p, --project / -y, --yes` (alias `rm`, `delete`) | Remove a deploy hook by ID |

## Notes

- A deploy hook URL triggers a deployment of a specific Git branch when called with an HTTP POST
- Useful for redeploying from external systems (CMS, cron schedulers)

## Related

- [git.md](./git.md)
- [crons.md](./crons.md)
