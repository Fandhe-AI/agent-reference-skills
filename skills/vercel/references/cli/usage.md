# vercel billing usage

View billing usage and costs for the current billing period or a custom date range.

## Signature / Usage

```bash
vercel billing usage
vercel billing usage --since 2025-01-01 --until 2025-01-31
vercel billing usage --since 7d
vercel billing usage --breakdown daily
vercel billing usage --since 2025-01-01 --until 2025-01-31 --breakdown weekly
vercel billing usage --group-by project
vercel billing usage --json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--since` | `-s` | Start of the query: `YYYY-MM-DD`, ISO 8601, or relative duration such as `7d`. Date-only values start at midnight Pacific (Los Angeles) time; relative durations count backward from now |
| `--until` | `-u` | End of the query; same formats. A date-only value includes the full day in Pacific time. Requires `--since` |
| `--from` / `--to` | | Deprecated aliases of `--since` / `--until`; still work but print a deprecation warning |
| `--breakdown` | | Show usage grouped by time period: `daily`, `weekly`, or `monthly` |
| `--group-by` | | Group usage by `project` or `region`. Can't combine with `--breakdown` |
| `--json` | | Print the usage data as a single JSON object on stdout instead of a table |

## Notes

- Available to Owner, Member, Developer, Security, Billing, and Enterprise Viewer roles for the current active team
- Available in `vercel@65.11.0` and later, where the old name `vercel usage` still works but prints a deprecation warning. Use `vercel billing usage` in new scripts. `--format json` still works but is deprecated.
- Default shows the current billing period; `--since` alone ends at now
- Data supports 1-day granularity with a maximum range of 1 year
- Output has separate tables for infrastructure usage and subscription licenses with columns Service, Usage (in the service's unit), and Cost. Cost is accrued before credits and discounts, in USD or legacy MIUs, and isn't the invoice amount.
- JSON output has `period`, `context`, `costUnit` (`USD` or `managed_infrastructure_units`), `services`, `totals`, and `creditBalance` (when available; omitted for custom date ranges). `--breakdown` adds a `breakdown` object; `--group-by` adds a `groupBy` object.
- The previous page listed `Effective Cost` / `Billed Cost` columns, `chargeCount`, and `grandTotal`; the current docs don't mention them.
- Source: https://vercel.com/docs/cli/usage (fetched 2026-11-14)

## Related

- [billing.md](./billing.md)
- [contract.md](./contract.md)
