# vercel project

Manage Vercel Projects: list, add, inspect, rename, remove, and configure checks, protection, access groups, analytics, Speed Insights, and OIDC tokens. Alias: `vercel projects`.

## Signature / Usage

```bash
vercel project ls
vercel project create my-app          # alias: add
vercel project inspect [name]
vercel project update [name] --framework nextjs --build-command "pnpm build"
vercel project pause [project]
vercel project resume [project]
vercel project observability enable|disable [name]
vercel project checks [name]
vercel project access-groups [name]
vercel project access-summary [name]
vercel project dangerously-delete-immutable-static-asset _next/static/immutable/chunks/example.js
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

### update (alias: set)

At least one setting option is required; omitted settings are unchanged. Defaults to the linked project.

| Name | Description |
|------|-------------|
| `--framework <SLUG>` | Framework preset slug (e.g. `nextjs`); `other` clears the preset |
| `--build-command <COMMAND>` | Set the build command |
| `--dev-command <COMMAND>` | Set the development command |
| `--install-command <COMMAND>` | Set the install command |
| `--output-directory <DIR>` | Set the output directory |
| `--auto-detect <SETTING>` | Reset to automatic detection: `build-command`, `dev-command`, `install-command`, `output-directory`; repeat or comma-separate; cannot combine with the explicit flag for the same setting |
| `--sandbox-region <REGION>` | Default region for sandboxes created in the project; `""` clears |
| `--sandbox-failover-regions <REGIONS>` | Ordered comma-separated failover regions; must not include the main region; `""` clears; Pro and Enterprise only (not Pro trials) |
| `--format` | `json` output |

### members / access-groups

| Name | Description |
|------|-------------|
| `--search` | Filter by name, username, or email (members `list`) / by name (access-groups) |
| `--limit` | Max results (1–100) |
| `-N, --next` | (access-groups) Next page cursor (ms since UNIX epoch) |
| `--role` | (members `add`, required) `ADMIN`, `PROJECT_DEVELOPER`, `PROJECT_VIEWER`, or `PROJECT_GUEST` (case-insensitive) |
| `--format` | `json` output |

### pause / resume / observability / access-summary

| Name | Description |
|------|-------------|
| `--format` | `json` output |

### token

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation |
| `--format` | `json` output |

## Notes

- Subcommands: `list` / `ls` (default), `create` / `add`, `inspect`, `update` / `set`, `rename`, `remove` / `rm`, `dangerously-delete-immutable-static-asset`, `checks`, `protection`, `members`, `access-groups`, `access-summary` (alias `summary`; needs the access groups entitlement), `web-analytics`, `speed-insights`, `observability`, `pause`, `resume` (alias `unpause`), `token`
- `create` requires the name argument (quote names with spaces)
- `checks`: `vercel project checks [name]` lists; `checks add [name]` (e.g. `--file ./check.json`, or flags such as `--check-name`, `--requires`, `--blocks deployment-alias`); `checks remove <id> [name]`; `--blocks deployment-alias` filters the list
- `dangerously-delete-immutable-static-asset`: permanently deletes an immutable static asset for production and preview (URL serves 410 Gone for seven days, then 404; build hash salt rotates). Cannot be undone; interactive only, asks you to type the asset path, which must start with `_vercel/immutable/` or `_next/static/immutable/` with no leading slash
- `web-analytics` and `speed-insights` accept `enable` or `disable` (default action: enable) and both ask for confirmation with no skip flag. `speed-insights enable` upgrades to Speed Insights Plus; `disable` downgrades back. `observability` requires an explicit `enable`/`disable`, Pro or Enterprise, and incurs charges; also confirmation-only
- `pause` stops serving production traffic (visitors see an error page) and always requires typing the project name; `resume` asks for confirmation. Run both interactively
- `protection`: activating Password Protection can incur charges and must be confirmed interactively by typing the project name; scripts and agents must hand activation to a person. Disabling it needs no activation confirmation
- `members add|remove` (alias `rm`) require a Pro or Enterprise team and an existing confirmed team member; both always ask for confirmation. Allowed roles depend on team role (Developers only `ADMIN`; Security `ADMIN` or `PROJECT_DEVELOPER`; Contributors any; Members and Owners already have all projects)
- Project arguments accept project name or ID (e.g. `my-app` or `prj_abc123`); defaults to linked project when omitted

## Related

- [link.md](./link.md)
- [env.md](./env.md)
- [deploy.md](./deploy.md)
