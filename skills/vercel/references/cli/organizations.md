# vercel organizations

Create and manage organizations (several Vercel teams under one billing team) and their child teams.

## Signature / Usage

```bash
vercel organizations list
vercel organizations inspect acme
vercel organizations teams list acme
vercel organizations inspect org_aBcD1234EfGh5678IjKl9012
vercel --scope acme-web organizations inspect
vercel --scope acme organizations create --slug acme --name "Acme Inc"
vercel organizations update org_aBcD1234EfGh5678IjKl9012 --slug acme-corp
vercel organizations teams create acme --slug acme-web --name "Acme Web"
vercel organizations teams create acme --slug acme-docs --name "Acme Docs" --billing-plan enterprise --yes
vercel organizations teams add acme --child-team acme-web
```

## Options / Props

| Subcommand | Description |
|------------|-------------|
| `list` | List the organizations you can view (table: ID, slug, billing team, number of teams) |
| `inspect` | Show an organization's details, including billing team and team count |
| `create` | Create an organization from the active team (it becomes the billing team) |
| `update` | Change the slug of an organization |
| `teams list` | List the teams in an organization, including the billing team |
| `teams create` | Create a child team in an organization |
| `teams add` | Add an existing team to an organization |

| Option | Subcommands | Description |
|--------|-------------|-------------|
| `--limit`, `-n` | `list`, `teams list` | Number of results, 1 to 100 (default 20) |
| `--next` | `list`, `teams list` | Next page; pass the cursor from the previous page |
| `--slug` | `create`, `update`, `teams create` | Required. 1 to 48 lowercase letters, numbers, or hyphens, beginning and ending with a letter or number |
| `--name` | `create` (optional), `teams create` (required) | Display name. For `create`, Vercel generates one from the slug if omitted |
| `--billing-plan` | `teams create`, `teams add` | `platform` or `enterprise`. `teams create` defaults to `platform`; `teams add` defaults to a plan derived from the team's current plan |
| `--child-team` | `teams add` | Required. Team ID or slug of the existing team to add |
| `--yes`, `-y` | `teams create`, `teams add` | Confirm the billing change without a prompt |
| `--json` | all | Print the result as JSON |

## Notes

- Private Beta for Enterprise plans with Flexible Commitment (Flex) billing; contact your account team for access. Available in `vercel@65.2.0` and later
- The billing team (called the root team in output) pays for every team in the organization
- Select the organization with an ID (starts with `org_`) or slug as the first argument (not for `list` and `create`). A slug matches the organizations shown by `list`; for others, pass the ID. If omitted, the organization of the active team (global `--scope`) is used; the billing team and every child team select the same organization
- `create`: the billing team must be an Enterprise team with Flex billing; you get Organization Admin access. Vercel then moves the billing team's projects to the organization in the background
- `teams create` requires Organization Admin. It shows the team, billing plan, and billing change, then asks to confirm. `platform` adds usage to the organization at the end of the team's billing cycle (for tenants of a multi-tenant platform); `enterprise` draws down the organization's Flex commitment in real time (for internal teams needing Enterprise features). In CI, from an AI agent, or with `--json`, pass `--yes` only after a person approves the billing change
- `teams add` requires owner of the added team; confirmation as above. To add a team already on the Enterprise plan, contact your account team. The team's projects move in the background after it joins
- `teams list` shows a Billing Plan column; the billing team shows `-`
- With `--json`, each subcommand prints one JSON document under the resource name (`organization`, `organizations`, `team`, `teams`); lists include `pagination.next` (cursor or `null`); changes include `outcome` (`created`, `updated`, `added`). In `organization`, `teamId` is the billing team's ID
- Without `--json`, `create`, `update`, `teams create`, and `teams add` print the changed slug to stdout when stdout is not a terminal, for example `team=$(vercel organizations teams create acme --slug acme-web --name "Acme Web" --yes)` then `vercel --scope "$team" project list`
- Source: https://vercel.com/docs/cli/organizations (fetched 2026-11-14)

## Related

- [teams.md](./teams.md)
- [switch.md](./switch.md)
- [global-options.md](./global-options.md)
