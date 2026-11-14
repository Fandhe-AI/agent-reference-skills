# Billing

View a team's billing (billing overview / invoices / budgets / contract / usage) and manage Spend Management budgets

Running `vercel billing` without a subcommand lists the subcommands. Options can go before or after the subcommand (e.g. `vercel billing --json budgets alerts`).

## Signature / Usage

### Plan and balance overview (overview)

Shows the plan, billing status, billing cycle, balance due, and overdue invoices (`vercel@65.15.0` or later). Without access to invoices, `Balance Due` / `Overdue` are not shown and only a warning is printed (exit code 0).

```sh
vercel billing overview
```

Output as JSON (`billing.balance` is `null` without invoice access).

```sh
vercel billing overview --json
```

### Viewing invoices (invoices)

Lists newest first (`vercel billing invoices` without a subcommand is equivalent). Default statuses are `open` / `paid` / `uncollectible`; default page size is 20 (max 100).

```sh
vercel billing invoices list --limit 3
```

Filter by status (repeatable: `draft` / `open` / `paid` / `uncollectible` / `void`).

```sh
vercel billing invoices list --status open --status uncollectible
```

Fetch the next page (replace `<NEXT_CURSOR>` with the cursor from the previous page's output; cannot be combined with `--status`).

```sh
vercel billing invoices list --limit 3 --next <NEXT_CURSOR>
```

Show invoice details and line items. Replace `<INVOICE_ID>` with the full invoice ID shown by `list`.

```sh
vercel billing invoices inspect <INVOICE_ID>
```

Show an estimate of the upcoming invoice (`vercel@65.10.0` or later; amounts change until the end of the billing period; at most 5 line items are shown, use `--json` for all).

```sh
vercel billing invoices upcoming
```

Save an invoice as a PDF (existing files are not overwritten; `-o -` writes to stdout).

```sh
vercel billing invoices download <INVOICE_ID> --output invoice.pdf
```

### Usage and cost (usage)

Vercel CLI 65.11.0 or later. The old name `vercel usage` still works but prints a deprecation warning.

```sh
vercel billing usage
```

Specify a period (`--since` accepts `YYYY-MM-DD`, ISO 8601, or a relative period; `--until` requires `--since`).

```sh
vercel billing usage --since 2025-01-01 --until 2025-01-31
```

Daily, weekly, or monthly breakdown (`daily` / `weekly` / `monthly`; up to 1 year).

```sh
vercel billing usage --since 2025-01-01 --until 2025-01-31 --breakdown weekly
```

Aggregate by project or region (`project` / `region`; cannot be combined with `--breakdown`).

```sh
vercel billing usage --group-by project
```

Output as JSON (the old `--format json` is deprecated).

```sh
vercel billing usage --json
```

### Viewing contract commitments (contract)

Shows Enterprise contract commitments in a table per contract ID (other plans have no commitments to show).

```sh
vercel billing contract
```

Output as JSON (`context` / `commitments` / `totalCommitments`).

```sh
vercel billing contract --json
```

### Spend Management budgets (budgets)

See [the budgets page](https://vercel.com/docs/cli/budgets) for details. Changing budgets requires the Owner or Billing role. The target is the team by default, `--project <name or ID>` (`-p`) for a project, `--product <name or ID>` for a product, or `--organization <slug or ID>` for an organization.

List budgets (`vercel billing budgets` without a subcommand is equivalent).

```sh
vercel billing budgets list
```

Show this cycle's spend against the budget.

```sh
vercel billing budgets inspect --project my-app
```

Create or update a budget (`--amount` (in dollars) is required on create; `--pause` pauses production deployments when the limit is reached; `--webhook <url>` sends an HTTPS POST when a threshold is reached).

```sh
vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend
```

Set budgets for a project, product, or organization (product and organization budgets cannot pause; they only notify and call webhooks).

```sh
vercel billing budgets set --project my-app --amount 100 --pause
vercel billing budgets set --product "Fast Data Transfer" --amount 50
vercel billing budgets set --organization my-org --amount 10000
```

> **Note**: `set` with a webhook shows the webhook secret only once. Store it when shown, and do not leave it in logs or CI output.

Remove a budget (scripts need `--yes` to skip confirmation).

> **Warning**: A removed budget no longer sends notifications or pauses deployments. Alert history for removed budgets remains in `alerts`.

```sh
vercel billing budgets remove --project my-app --yes
```

Show alert history, newest first (`--since` / `--until` take ISO 8601 or relative times such as `7d`; `--limit` is 1 to 100).

```sh
vercel billing budgets alerts --since 7d --limit 20
```

## Notes

- Source: https://vercel.com/docs/cli/billing , https://vercel.com/docs/cli/usage , https://vercel.com/docs/cli/contract , https://vercel.com/docs/cli/budgets (fetched 2026-11-14)
