# vercel project

Manage Vercel Projects: list, add, inspect, rename, remove, and configure checks, protection, access groups, analytics, Speed Insights, and OIDC tokens. Alias: `vercel projects`.

## Signature / Usage

```bash
vercel project ls
vercel project add my-app
vercel project inspect [name]
vercel project rename my-project my-renamed-project
vercel project rm my-app
vercel project protection enable my-app --password
vercel project members my-project --format json
vercel project web-analytics my-project
vercel project speed-insights my-project
vercel project token my-project --format=json
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `-N, --next` | Next page cursor (ms since UNIX epoch) |
| `--format` | `json` output |
| `--update-required` | Filter to projects with an upcoming Node.js runtime deprecation |
| `-f, --filter` | Substring filter on project name |

### protection

| Name | Description |
|------|-------------|
| `--sso` | Toggle SSO protection |
| `--password` | Toggle password protection |
| `--customer-support-code-visibility` | Toggle customer support code visibility |
| `--skew` | Toggle skew protection |
| `--skew-max-age <SECONDS>` | Max age in seconds when enabling skew (default: 2592000) |
| `--protection-bypass` | Toggle automation bypass secrets |
| `--protection-bypass-secret <SECRET>` | Required when disabling bypass |
| `--git-fork-protection` | Toggle Git fork protection |
| `--format` | `json` output |

### members / access-groups

| Name | Description |
|------|-------------|
| `--search` | Filter by name, username, or email |
| `--limit` | Max results (1–100) |
| `--format` | `json` output |

### token

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation |
| `--format` | `json` output |

## Notes

- Subcommands: `list` / `ls`, `add`, `inspect`, `rename`, `remove` / `rm`, `checks`, `protection`, `members`, `access-groups`, `access-summary`, `web-analytics`, `speed-insights`, `token`
- Project arguments accept project name or ID (e.g. `my-app` or `prj_abc123`); defaults to linked project when omitted

## Related

- [link.md](./link.md)
- [env.md](./env.md)
- [deploy.md](./deploy.md)
