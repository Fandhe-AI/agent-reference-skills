# vercel integration

Manage marketplace integrations: provision resources, discover integrations, manage installations, and control individual resources.

## Signature / Usage

```bash
vercel integration add neon
vercel integration add acme/acme-redis --name my-db --plan pro
vercel integration list
vercel integration accept-terms neon
vercel integration installations
vercel integration categories
vercel integration discover postgres --category storage
vercel integration update neon --projects all
vercel integration guide neon --framework nextjs
vercel integration balance neon
vercel integration open neon my-database
vercel integration remove neon --yes
vercel integration resource connect my-database my-project
vercel integration resource disconnect my-database --all --yes
vercel integration resource remove my-database --disconnect-all --yes
vercel integration resource create-threshold my-database 50 100 2000 --yes
vercel integration resource claim my-stripe-sandbox
```

## Options / Props

### integration add

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--name` | `-n` | Custom resource name (auto-generated if omitted) |
| `--metadata` | `-m` | Metadata as `KEY=VALUE` (repeatable) |
| `--plan` | `-p` | Billing plan ID |
| `--environment` | `-e` | Environments to connect: `production`, `preview`, `development` (repeatable, default: all three) |
| `--prefix` | | Prefix for env var names (include trailing `_` if desired) |
| `--format` | `-F` | Output format; `json` for machine-readable |
| `--no-connect` | | Skip connecting to current project |
| `--no-env-pull` | | Skip running `vercel env pull` after provisioning |
| `--installation-id` | | Installation ID when multiple installations exist |
| `--claim` | | Claim sandbox resource immediately after provisioning |
| `--no-claim` | | Skip the claim offer for sandbox resources |

### integration accept-terms

Argument: `<integration>` (slug or ID). Option: `--format` / `-F` (`json`).

### integration list (alias: `ls`)

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--integration` | `-i` | Filter by integration slug |
| `--all` | `-a` | List all team resources regardless of project; cannot be used with `[project]` |
| `--format` | `-F` | Output format; `json` |

### integration installations (alias: `installation`)

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--integration` | `-i` | Limit to installations of this integration (slug or ID) |
| `--format` | `-F` | Output format; `json` |

### integration discover / categories

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--category` (discover) | `-c` | Filter by category; repeatable (matches any), e.g. `-c storage -c ai`; valid values from `vercel integration categories` |
| `--format` | `-F` | Output format; `json` |

### integration update

Argument: `<integration>` (slug or ID).

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--plan` | `-p` | Billing plan ID for integrations with installation-level plans |
| `--authorization-id` | | Billing authorization ID when the platform requires it for plan changes |
| `--projects` | | Project ID allowed to use this installation; `all` for all projects; repeatable |
| `--installation-id` | | Configuration ID when multiple installations exist |
| `--format` | `-F` | Output format; `json` |

### integration resource connect / disconnect

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--environment` | `-e` | Environments to connect (repeatable) |
| `--prefix` | | Env var name prefix |
| `--all` | `-a` | Disconnect from all projects (disconnect only) |
| `--yes` | `-y` | Skip confirmation; required for `--format json` |
| `--format` | `-F` | Output format; `json` |

### integration resource remove

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--disconnect-all` | `-a` | Disconnect all projects before deletion |
| `--yes` | `-y` | Skip confirmation |
| `--format` | `-F` | Output format; `json` |

### integration resource create-threshold

Arguments: `<resource-name> <minimum> <spend> <limit>` (all in USD; `minimum <= spend <= limit`)

### integration resource claim

| Name | Description |
|------|-------------|
| `--yes` | Skip single-resource confirmation prompt |
| `--no-wait` | Print claim URL and exit without polling |
| `--format` / `-F` | Output format; `json` |

## Notes

- `vercel install` and `vercel i` are aliases for `vercel integration add`
- Multi-product integrations use slash syntax: `integration/product`
- `vercel integration-resource <subcommand>` and `vc ir <subcommand>` are backward-compatible aliases
- Removing an integration requires all resources to be removed first
- Sandbox resources show `[SANDBOX]` tag in `vercel integration list`
- `accept-terms` accepts an integration's legal terms and installs it on the team without provisioning a resource; requires an interactive terminal and human confirmation
- `update` changes the billing plan or the set of projects with access; it does not handle install, remove or connect flows (use `add`, `remove`, `integration resource` / `env pull`)
- `--environment` also accepts a Custom Environment slug or ID from the linked project (default is the three built-in environments only); `--no-connect` also skips env pull
- Post-provisioning behavior of `add`: prints a dashboard link to the resource, connects it to the linked project (unless `--no-connect`), then runs `vercel env pull` (unless `--no-env-pull` or `--no-connect`)
- Passing both `--claim` and `--no-claim` exits with code 1. In non-interactive environments, provisioning a sandbox resource without either prints a hint pointing to `resource claim`
- `remove` requires `--yes` in non-interactive environments and JSON output mode

## Related

- [install.md](./install.md)
- [env.md](./env.md)
- [project.md](./project.md)
