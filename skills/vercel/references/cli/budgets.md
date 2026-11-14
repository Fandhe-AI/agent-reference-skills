# vercel billing budgets

View and manage Spend Management budgets (team, project, product, or organization) from the terminal.

## Signature / Usage

```bash
vercel billing budgets list
vercel billing budgets inspect
vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend
vercel billing budgets remove --project my-app --yes
vercel billing budgets alerts
```

```bash
vercel billing budgets set --project my-app --amount 100 --pause
vercel billing budgets set --product "Fast Data Transfer" --amount 50
vercel billing budgets set --organization my-org --amount 10000
```

## Options / Props

### Choosing a budget

| Option | Budget |
|--------|--------|
| None | The team's budget |
| `--project <name or ID>`, `-p` | A project's budget |
| `--product <name or ID>` | A product's budget, such as `"Fast Data Transfer"` |
| `--organization <slug or ID>` | The organization's budget, from any team |

### set

| Option | Required | Description |
|--------|----------|-------------|
| `--amount` | For creation | Budget in whole dollars per billing cycle. Omit to keep the existing amount |
| `--pause`, `--no-pause` | No | `--pause` pauses production deployments when the budget is reached (every project for a team budget, that project for a project budget). `--no-pause` turns it off |
| `--webhook`, `--no-webhook` | No | `--webhook <url>` sends an HTTPS POST at spend thresholds. `--no-webhook` removes it |

### remove

| Option | Description |
|--------|-------------|
| `--yes` | Skip the confirmation prompt (required in scripts and automation) |

### alerts

| Option | Description |
|--------|-------------|
| `--since`, `-s` | Only alerts on or after this time. ISO 8601 or relative (`1d`, `7d`, `30d`) |
| `--until`, `-u` | Only alerts on or before this time. Same formats |
| `--limit` | Number of alerts, 1 to 100 |
| `--next` | Next page, using the cursor from the previous page; keeps the same filters |

## Notes

- Every subcommand supports `--json`. Running `vercel billing budgets` with no subcommand runs `list`.
- `list` and `alerts` show every budget by default; the budget options narrow them, and `--type` filters by scope (for example `--type project,product`). `set` and `remove` act on the team's budget unless an option is passed. The global `--scope` selects the team.
- Viewing needs team membership. Changing a budget requires the Owner or Billing role. The organization budget needs an organization role: Admin or Viewer to view, Admin to change.
- Spend Management is available at no additional cost on the Pro plan and for Enterprise teams on the Flexible Commitment plan.
- A new budget notifies at 50%, 75%, and 100%. For an existing budget, pause or webhook settings can change without `--amount`; omitted settings keep their values.
- `set` prints a webhook secret once when it adds a webhook. It can't be retrieved later.
- Product and organization budgets can't pause deployments; they send notifications and call the webhook. Pausing stops production deployments of the affected projects from serving traffic until you resume each project manually.
- Vercel checks spend every few minutes, so actions can trigger several minutes after spend crosses the budget.
- `inspect` with no budget set reports current spend and shows the `set` command. The CLI doesn't show spend for the organization budget yet.
- A removed budget's alerts stay in `alerts`. The `actions configured` column reports what a threshold was set to do, not whether each action ran. Budget alerts are distinct from observability alerts (see `vercel alerts`).
- Source: https://vercel.com/docs/cli/budgets (fetched 2026-11-14)

## Related

- [billing.md](./billing.md)
- [alerts.md](./alerts.md)
