# vercel integration

Manage marketplace integrations: provision resources, discover integrations, manage installations, and control individual resources.

## Signature / Usage

```bash
vercel integration add neon
vercel integration add acme/acme-redis --name my-db --plan pro
vercel integration list
vercel integration installations
vercel integration discover postgres
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

### integration list

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--integration` | `-i` | Filter by integration slug |
| `--all` | `-a` | List all team resources regardless of project |
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

## Related

- [install.md](./install.md)
- [env.md](./env.md)
- [project.md](./project.md)
