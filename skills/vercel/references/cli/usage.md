# vercel usage

View billing usage and costs for the current billing period or a custom date range.

## Signature / Usage

```bash
vercel usage
vercel usage --since 2025-01-01 --until 2025-01-31
vercel usage --since 7d
vercel usage --breakdown daily
vercel usage --since 2025-01-01 --until 2025-01-31 --breakdown weekly
vercel usage --format json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--since` | `-s` | Start of the query: `YYYY-MM-DD`, ISO 8601, or relative duration such as `7d`. Date-only values start at midnight Pacific (Los Angeles) time; relative durations count backward from now |
| `--until` | `-u` | End of the query; same formats. A date-only value includes the full day in Pacific time. Requires `--since` |
| `--from` / `--to` | | Deprecated aliases of `--since` / `--until`; still work but print a deprecation warning |
| `--breakdown` | | Show usage grouped by time period: `daily`, `weekly`, or `monthly` |
| `--format` | `-F` | Output format; `json` is the only supported value |

## Notes

- Available to Owner, Member, Developer, Security, Billing, and Enterprise Viewer roles
- Default shows the current billing period; `--since` alone ends at now
- Supports up to 1-year date range with 1-day granularity
- Table columns: Service, Usage (USD or legacy MIUs), Effective Cost, Billed Cost
- JSON output has `period`, `context`, `services`, `totals`, `chargeCount`; with `--breakdown` it adds a `breakdown` array and `grandTotal`

## Related

- [contract.md](./contract.md)
