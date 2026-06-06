# vercel usage

View billing usage and costs for the current billing period or a custom date range.

## Signature / Usage

```bash
vercel usage
vercel usage --from 2025-01-01 --to 2025-01-31
vercel usage --breakdown daily
vercel usage --from 2025-01-01 --to 2025-01-31 --breakdown weekly
vercel usage --format json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--from` | | Start date (YYYY-MM-DD); interpreted as midnight Pacific time; requires `--to` |
| `--to` | | End date (YYYY-MM-DD); interpreted as 23:59:59 Pacific time; requires `--from` |
| `--breakdown` | | Show usage grouped by time period: `daily`, `weekly`, or `monthly` |
| `--format` | `-F` | Output format; `json` returns structured data |

## Notes

- Available to Owner, Member, Developer, Security, Billing, and Enterprise Viewer roles
- Default shows current billing period
- Supports up to 1-year date range with 1-day granularity

## Related

- [contract.md](./contract.md)
