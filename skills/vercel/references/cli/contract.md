# vercel contract

View contract commitment information for your Vercel account: contract periods, commitment types, and values.

## Signature / Usage

```bash
vercel contract
vercel contract --format json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--format` | `-F` | Output format; `json` returns structured data with `context`, `commitments`, and `totalCount` |

## Notes

- Output table shows: Contract ID, Contract Period, Commitment Type, Category, Period, Commitment, Description
- Category is either "Spend" (Pro plans) or "Usage" (Enterprise plans)
