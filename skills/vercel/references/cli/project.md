# vercel project

Manage Vercel Projects: list, create, inspect, update, rename, delete, pause/resume production traffic, and configure checks, protection, members, access groups, analytics, Speed Insights, Observability Plus, and OIDC tokens. Alias: `vercel projects`.

## Signature / Usage

```bash
vercel project list
vercel project create my-app
vercel project inspect [name]
vercel project keep [project]
vercel project update [name] --framework nextjs --build-command "pnpm build"
vercel project update my-project --fluid-compute --node-version 24.x
vercel project pause [project]
vercel project resume [project...]
vercel project observability enable|disable [name]
vercel project checks [name]
vercel project access-groups [name]
vercel project access-summary [name]
vercel project dangerously-delete-immutable-static-asset _next/static/immutable/chunks/example.js
vercel project rename my-project my-renamed-project
vercel project delete my-app --confirm-name my-app --scope my-team
vercel project protection enable my-app --password
vercel project members my-project --json
vercel project web-analytics my-project
vercel project speed-insights my-project
vercel project token my-project --json
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `--next` | Show the next page of results; pass the cursor the previous page prints |
| `--limit` | Projects per page (default 20, maximum 100) |
| `--json` | Output the result as JSON |
| `--update-required` | Filter to projects affected by an upcoming Node.js runtime deprecation |
| `--paused` | Show only projects whose production traffic is paused |
| `-q, --query` | Filter projects by name (substring match) |

### keep

Argument: `[project]` (linked project if omitted). Removes a temporary project's scheduled automatic deletion; applies without a confirmation prompt. Option: `--json` (also `--format=json`) prints `id`, `name`, `kept` (`true` if a scheduled deletion was removed, `false` if none was scheduled).

### protection

| Name | Description |
|------|-------------|
| `--sso` | Apply the action to SSO protection |
| `--password` | Apply the action to password protection (requires an eligible plan) |
| `--protection-password <PASSWORD>` | When enabling `--password`, set the password value (maximum 72 characters) |
| `--customer-support-code-visibility` | Apply the action to customer support code visibility protection |
| `--skew` | Apply the action to skew protection |
| `--skew-max-age <SECONDS>` | When enabling `--skew`, max age in seconds (default 2592000, 30 days) |
| `--protection-bypass` | Apply the action to automation protection bypass secrets |
| `--protection-bypass-secret <SECRET>` | Optional bypass secret value; required when disabling bypass |
| `--git-fork-protection` | Apply the action to Git fork protection |
| `--json` | Output the result as JSON |

### update

At least one setting option is required; omitted settings are unchanged. Defaults to the linked project.

| Name | Description |
|------|-------------|
| `--framework <SLUG>` | Framework preset slug (e.g. `nextjs`); `other` clears the preset |
| `--build-command <COMMAND>` | Set the build command |
| `--dev-command <COMMAND>` | Set the development command |
| `--install-command <COMMAND>` | Set the install command |
| `--output-directory <DIR>` | Set the output directory |
| `--root-directory <DIR>` | Set the project root directory |
| `--auto-detect <SETTING>` | Reset to automatic detection: `build-command`, `dev-command`, `install-command`, `output-directory`, `root-directory`; repeat or comma-separate; cannot combine with the explicit flag for the same setting |
| `--fluid-compute` | Turn on Fluid compute; turn off with `--no-fluid-compute` |
| `--function-cpu <TIER>` | Default function CPU and memory tier, e.g. `standard` or `performance`; Pro or Enterprise |
| `--build-machine <TYPE>` | Build machine type: `basic`, `standard`, `enhanced`, `turbo`, `elastic`; Pro or Enterprise |
| `--elastic-concurrency` | Turn on on-demand concurrent builds; turn off with `--no-elastic-concurrency`; turning on requires Pro or Enterprise |
| `--node-version <VERSION>` | Node.js version, e.g. `24.x` or `22.x` |
| `--sandbox-region <REGION>` | Default region for sandboxes created in the project; `""` clears |
| `--sandbox-failover-regions <REGIONS>` | Ordered comma-separated failover regions; must not include the main region; `""` clears; Pro and Enterprise only (not Pro trials) |
| `-y, --yes` | Apply without a confirmation prompt; `--function-cpu`, `--build-machine` and `--elastic-concurrency` (charge-affecting) always ask in an interactive terminal |
| `--json` | Output the result as JSON |

### delete

| Name | Description |
|------|-------------|
| `--confirm-name <NAME>` | Project name to confirm deletion without the prompt (pass `--scope` with the team too) |

### members / access-groups

| Name | Description |
|------|-------------|
| `-q, --query` | Filter by name, username, or email (members `list`) / by name (access-groups) |
| `--limit` | Max results (1-100) |
| `--next` | Next page cursor (`members list`, `access-groups`) |
| `--role` | (members `add`, required) `ADMIN`, `PROJECT_DEVELOPER`, `PROJECT_VIEWER`, or `PROJECT_GUEST` (case-insensitive) |
| `--json` | Output the result as JSON |

### resume

| Name | Description |
|------|-------------|
| `--all` | Resume every paused project in the team; cannot combine with project names |
| `-y, --yes` | Skip the confirmation when resuming several projects; with `--all`, also pass `--scope` |
| `--json` | Output the result as JSON |

### web-analytics / observability

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip the confirmation prompt for `disable` (for a team project also pass `--scope`) |
| `--json` | Output the result as JSON (does not skip the confirmation) |

### pause / speed-insights / access-summary

| Name | Description |
|------|-------------|
| `--json` | Output the result as JSON |

### token

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation |
| `--json` | Output the result as JSON |

## Notes

- Subcommands on the current official page: `list` (default), `create`, `inspect`, `keep`, `update`, `rename`, `delete`, `dangerously-delete-immutable-static-asset`, `checks`, `protection`, `members` (alias `member`), `access-groups`, `access-summary` (needs the access groups entitlement), `web-analytics`, `speed-insights`, `observability`, `pause`, `resume`, `token`. The aliases `ls`, `add`, `set`, `rm`, `summary`, `unpause` listed in earlier versions of this page are not mentioned on the current official page (not confirmed)
- Renamed since the previous fetch (2026-10-16): `--format json` is now `--json`; list `-f, --filter` is now `-q, --query`; list `-N, --next` is `--next`. `rm` is now documented as `delete`. Old names are not confirmed to still work
- `create` requires the name argument; names must be lowercase and can include letters, digits, `.`, `_`, `-` (no spaces)
- `keep`: in non-interactive mode, naming a project outside a linked directory requires `--scope`; missing projects and insufficient permissions exit nonzero
- `delete` deletes the project and all its deployments and cannot be undone; in a terminal it asks you to type the project name. `--confirm-name` plus `--scope` skips the prompt (use only in a deliberate script)
- `checks`: `vercel project checks [name]` lists; `checks add [name]` (e.g. `--file ./check.json`, or flags such as `--check-name`, `--requires`, `--blocks deployment-alias`); `checks remove <id> [name]`; `--blocks deployment-alias` filters the list
- `dangerously-delete-immutable-static-asset`: permanently deletes an immutable static asset for production and preview (URL serves 410 Gone for seven days, then 404; build hash salt rotates). Cannot be undone; interactive only, asks you to type the asset path, which must start with `_vercel/immutable/` or `_next/static/immutable/` with no leading slash
- `web-analytics` and `speed-insights` accept `enable` or `disable` (default action: enable). `web-analytics enable` runs without a prompt (charges on Pro and Enterprise); `web-analytics disable` asks for confirmation. `speed-insights` always asks for confirmation with no skip flag; `enable` upgrades to Speed Insights Plus, `disable` downgrades to the free tier and data collection continues
- `observability` requires an explicit `enable`/`disable`, Pro or Enterprise, and incurs charges; `enable` runs without a prompt, `disable` asks for confirmation
- `pause` stops serving production traffic (visitors see an error page) and always requires typing the project name; run interactively. `resume` of a single project asks no confirmation; with `--all` or several paused projects it asks once. Projects that are not paused are skipped. Find paused projects with `vercel project list --paused`
- `protection`: activating Password Protection can incur charges and must be confirmed interactively by typing the project name; scripts and agents must hand activation to a person. Updating a password and disabling need no activation confirmation. Omit the action to show current settings
- `members add|remove` require a Pro or Enterprise team and an existing confirmed team member (`<member>` is email, username, or user ID); both always ask for confirmation. Allowed roles depend on team role (Developers only `ADMIN`; Security `ADMIN` or `PROJECT_DEVELOPER`; Contributors any; Members and Owners already have all projects)
- Project arguments accept project name or ID (e.g. `my-app` or `prj_abc123`); defaults to linked project when omitted
- Source: https://vercel.com/docs/cli/project (fetched 2026-11-14)

## Related

- [link.md](./link.md)
- [env.md](./env.md)
- [deploy.md](./deploy.md)
