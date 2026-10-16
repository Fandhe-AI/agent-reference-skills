# vercel pricing

Read the public Vercel pricing table and list features grouped by the lowest plan that includes them (Hobby, Pro, Enterprise).

## Signature / Usage

```bash
vercel pricing
vercel pricing "skew protection"
vercel pricing firewall --json
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `query` (argument) | String | Optional filter for the pricing table. Multiple words form one query: `vercel pricing skew protection` equals `vercel pricing "skew protection"` |
| `-F, --format json` | String | Return structured JSON |
| `--json` | Boolean | Shorthand for `--format json` |

## Notes

- The command fetches the public table each time it runs.
- JSON output includes the query, source URL, feature groups, and a summary of matches. When the CLI can resolve your current team or account, it also includes plan information and feature availability for that plan.

## Related

- [usage.md](./usage.md)
- [buy.md](./buy.md)
- [api.md](./api.md)
- [global-options.md](./global-options.md)
