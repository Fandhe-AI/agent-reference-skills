# vercel billing

Group of commands for your team's billing: plan and balance due, usage, contracts, Spend Management budgets, and invoices.

## Signature / Usage

```bash
vercel billing --json budgets alerts
```

```bash
vercel billing invoices list --limit 3
vercel billing invoices inspect <INVOICE_ID>
vercel billing invoices upcoming
vercel billing invoices download <INVOICE_ID> --output invoice.pdf
vercel billing overview
```

## Options / Props

### Subcommands

| Command | Description |
|---------|-------------|
| `vercel billing budgets` | View and manage Spend Management budgets |
| `vercel billing contract` | Show contract information for all billing periods |
| `vercel billing invoices` | List, inspect, and download invoices |
| `vercel billing overview` | Show the plan, billing cycle, balance due, and overdue invoices |
| `vercel billing usage` | Show billing usage and costs |

### invoices list

| Option | Description |
|--------|-------------|
| `--status` | Repeatable: `draft`, `open`, `paid`, `uncollectible`, `void`. Defaults to `open`, `paid`, `uncollectible` |
| `--limit`, `-n` | Number of invoices to show. Defaults to 20, up to 100 |
| `--next` | Next page, using the cursor from the previous page. Keeps the first page's statuses, so it can't be combined with `--status` |
| `--json` | Print the invoices and next-page cursor as JSON |

### invoices upcoming

| Option | Description |
|--------|-------------|
| `--json` | Print the estimates as JSON. An empty `invoices` array means no upcoming invoice |

### invoices download

| Option | Description |
|--------|-------------|
| `--output`, `-o` | File to write. `-` writes the PDF to stdout. Default: `<INVOICE_NUMBER>.pdf` in the current directory |

### overview

| Option | Description |
|--------|-------------|
| `--json` | Print the overview as JSON. `billing` holds `plan`, `status`, `period`, `trial`, `balance`; dates are millisecond timestamps, amounts are strings. Without invoice access, `billing.balance` is `null` and a top-level `warnings` array explains why |

## Notes

- Options can be placed before or after subcommands. Running `vercel billing` with no subcommand lists the commands.
- `invoices` supports `--json` on every subcommand. `vercel billing invoices` with no subcommand runs `list` (newest first).
- `invoices upcoming` is available in `vercel@65.10.0` and later. It shows up to five line items (use `--json` for all). It needs a team with an active paid subscription and invoice access. Upcoming invoices have no invoice ID or PDF, so they can't be passed to `inspect` or `download`.
- `invoices download` never overwrites an existing file.
- `overview` is available in `vercel@65.15.0` and later. Rows: `Plan`, `Status`, `Billing Cycle` (UTC), `Balance Due` (unpaid open and uncollectible invoices), `Overdue`. `Balance Due` and `Overdue` count the same invoices as `invoices list` (including v0 invoices) and need invoice access; without it the command warns and still exits `0`.
- Accepted global options: `--cwd`, `--debug`, `--global-config`, `--help`, `--local-config`, `--no-color`, `--non-interactive`, `--scope`, `--token`, `--version`.
- Source: https://vercel.com/docs/cli/billing (fetched 2026-11-14)

## Related

- [budgets.md](./budgets.md)
- [contract.md](./contract.md)
- [usage.md](./usage.md)
- [buy.md](./buy.md)
- [global-options.md](./global-options.md)
