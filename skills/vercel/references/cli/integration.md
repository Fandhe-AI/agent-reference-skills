# vercel integration

Manage marketplace integrations: provision resources, discover integrations, manage installations, and control individual resources.

## Signature / Usage

```bash
vercel integration add neon
vercel integration add acme/acme-redis --name my-db --billing-plan pro
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
vercel integration resource delete my-database --disconnect-all --yes
vercel integration resource create-threshold my-database 50 100 2000 --yes
vercel integration resource claim my-stripe-sandbox
vercel integration resource inspect my-database --json
```

## Options / Props

### integration add

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--name` | | Custom resource name (auto-generated if omitted) |
| `--meta` | | Metadata as `KEY=VALUE` (repeatable) |
| `--billing-plan` | | Billing plan ID to use for the resource |
| `--environment` | `-e` | Environments to connect: `production`, `preview`, `development`, or a Custom Environment slug or ID from the linked project (repeatable, default: all three built-in) |
| `--prefix` | | Prefix for env var names, used as-is (include a trailing `_` if desired; e.g. `NEON2_` gives `NEON2_DATABASE_URL`); must start with a letter and contain only letters, digits, underscores |
| `--json` | | Output as JSON |
| `--no-connect` | | Skip connecting to the current project (also skips env pull) |
| `--no-env-pull` | | Skip running `vercel env pull` after provisioning |
| `--installation` | | Installation ID when multiple installations exist for the same integration |
| `--claim`, `--no-claim` | | `--claim` claims a sandbox resource immediately after provisioning; `--no-claim` skips the claim offer and prints a hint. With neither, in a terminal without `--json`, it asks |

### integration accept-terms

Argument: `<integration>` (slug or ID).

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--yes` | `-y` | Accept the terms without a confirmation prompt; only supported for the `neon` integration |
| `--json` | | Output as JSON |

### integration list (alias: `ls`)

Argument: `[project]` (project name; uses the linked project if omitted).

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--integration` | | Filter resources to a specific integration |
| `--all` | `-a` | List all resources regardless of project; cannot be used with `[project]` |
| `--json` | | Output as JSON |

### integration installations (alias: `installation`)

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--integration` | | Limit to installations of this integration (slug or ID) |
| `--json` | | Output as JSON |

### integration discover / categories

`discover [query]` filters by substring against integration slug, product slug, name, or description.

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--category` (discover) | | Filter by category; repeatable (matches any), e.g. `--category storage --category ai`; valid values from `vercel integration categories` |
| `--json` | | Output as JSON |

### integration guide

Argument: `<integration-name>` or `<integration>/<product>`.

| Name | Description |
|------|-------------|
| `--framework` | Select a framework guide without prompts (e.g. `nextjs`, `remix`, `astro`, `nuxtjs`, `sveltekit`) |

### integration balance / open

`balance <integration-name>` shows balances and thresholds (including prepayment). `open <integration-name> [resource-name]` opens the provider dashboard via SSO.

| Name | Description |
|------|-------------|
| `--json` | `balance`: output as JSON. `open`: output the SSO link as JSON |

### integration update

Argument: `<integration>` (slug or ID).

| Name | Description |
|------|-------------|
| `--billing-plan` | Billing plan ID for integrations with installation-level billing plans |
| `--authorization` | Billing authorization ID when the platform requires it for plan changes |
| `--projects` | Project ID allowed to use this installation; `all` for all projects; repeatable |
| `--installation` | Configuration ID when multiple installations exist for this integration |
| `--json` | Output as JSON |

### integration remove

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--yes` | `-y` | Skip the confirmation prompt |
| `--json` | | Output as JSON |

### integration resource connect / disconnect

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--environment` | `-e` | Environments to connect (repeatable; also accepts a Custom Environment slug or ID from the target project); `connect` only |
| `--prefix` | | Env var name prefix (`connect` only) |
| `--all` | | Disconnect all projects from the resource (`disconnect` only) |
| `--yes` | `-y` | Skip confirmation prompt; `--json` on `connect` requires `--yes` |
| `--json` | | Output as JSON |

### integration resource delete (alias: `rm`)

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--disconnect-all` | | Disconnect all projects from the resource before deletion |
| `--yes` | `-y` | Skip the confirmation prompt |
| `--json` | | Output as JSON |

### integration resource create-threshold

Arguments: `<resource-name> <minimum> <spend> <limit>` (dollar amounts, decimals supported). Option: `--yes` / `-y` skips the confirmation prompt.

### integration resource claim

Argument: `[resource-name]`.

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--yes` | `-y` | With exactly one sandbox resource and no name, skip the confirmation prompt; does not affect the multi-resource picker |
| `--no-wait` | | Print the claim URL and exit without opening the browser or polling |
| `--json` | | Output as JSON |

### integration resource inspect

Argument: `<resource-name>`. Option: `--json` (output as JSON).

## Notes

- `vercel install` and `vercel i` are aliases for `vercel integration add`
- `<integration-name>` is the integration's URL slug (e.g. `neon` for `https://vercel.com/marketplace/neon`); multi-product integrations use slash syntax `integration/product` (e.g. `aws/aws-dynamodb`)
- `vercel integration-resource <subcommand>` and `vc ir <subcommand>` are backward-compatible aliases (not mentioned on the current official page; not confirmed)
- Renamed since the previous fetch (2026-10-16): `--format` / `-F json` is now `--json`; `--metadata` is `--meta`; `--plan` is `--billing-plan`; `--installation-id` is `--installation`; `--authorization-id` is `--authorization`; `integration resource remove` is `integration resource delete` (alias `rm`). The shorthands `-n`, `-m`, `-p`, `-i`, `-c` are not listed on the current page. Whether the old names still work is not confirmed in official docs
- Removing an integration requires deleting all its resources first (`integration resource delete`)
- Unclaimed sandbox resources show a yellow `[SANDBOX]` tag in the Status column of `vercel integration list`; with `--json` each sandbox resource has `claim_status: "sandbox"`
- `accept-terms` accepts an integration's legal terms and installs it on the team without provisioning a resource; requires an interactive terminal and human confirmation (only `neon` accepts `--yes`) and does not replace integrations that require a browser flow or device attestation
- `update` changes the billing plan or the set of projects with access; it does not handle install, remove or connect flows (use `add`, `remove`, `integration resource` / `env pull`)
- Post-provisioning behavior of `add`: prints a dashboard link to the resource, connects it to the linked project (unless `--no-connect`), then runs `vercel env pull` (unless `--no-env-pull` or `--no-connect`)
- `connect` fails with an error naming the variable, project, and environments if an env var name already exists; use `--prefix` or `vercel env remove`
- `disconnect` exits with code 1 if the project is not connected to the resource
- `create-threshold` sets auto-recharge for a prepaid resource (applies to all resources of an installation with installation-level billing). Rules: amounts non-negative, `minimum <= spend`, `minimum <= limit`, `limit >= spend`, and `spend` within the billing plan's allowed range
- `claim` with no name: 0 sandbox resources prints a message and exits 0; 1 prompts for confirmation; 2 or more shows a picker. It polls up to five minutes; Ctrl-C exits with code 130
- Source: https://vercel.com/docs/cli/integration (fetched 2026-11-14)

## Related

- [install.md](./install.md)
- [env.md](./env.md)
- [project.md](./project.md)
