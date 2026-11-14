# vercel deploy-hooks

Manage Deploy Hooks: list, create, and delete deploy hook URLs that trigger new deployments when called.

## Signature / Usage

```bash
vercel deploy-hooks list --json
vercel deploy-hooks create cms-rebuild --git-branch main
vercel deploy-hooks delete hook_abc123 --yes --non-interactive
```

## Options / Props

| Name | Description |
|------|-------------|
| `list --json / -p, --project <NAME_OR_ID>` | List deploy hooks for the linked or specified project; `--json` for machine-readable output |
| `create [name] --git-branch <BRANCH> / -p, --project <NAME_OR_ID>` | Create a deploy hook for a Git branch; returns the hook URL |
| `delete <id> -p, --project <NAME_OR_ID> / -y, --yes` | Delete a deploy hook by ID (find it with `vercel deploy-hooks list`); `--yes` skips the confirmation and takes effect with `--non-interactive` |

## Notes

- A deploy hook URL triggers a deployment of a specific Git branch when called with an HTTP POST
- Useful for redeploying from external systems (CMS, cron schedulers)
- Not confirmed in the current official page: the aliases (`vercel deploy-hook`, `ls`, `add`, `rm`, `remove`), `-r, --ref` (now `--git-branch`), and `-F, --format json` (now `--json`); the subcommand is documented as `delete`, not `remove`
- Source: https://vercel.com/docs/cli/deploy-hooks (fetched 2026-11-14)

## Related

- [git.md](./git.md)
- [crons.md](./crons.md)
