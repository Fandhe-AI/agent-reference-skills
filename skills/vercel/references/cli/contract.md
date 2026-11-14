# vercel billing contract

View contract commitment information for your Vercel account: contract periods, commitment types, and values.

## Signature / Usage

```bash
vercel billing contract
vercel billing contract --json
```

## Options / Props

| Name | Description |
|------|-------------|
| `--json` | Print the contract data as a single JSON object on stdout instead of a table. Includes `context` (account or team name), `commitments` (array), and `totalCommitments` |

## Notes

- Output is a table grouped by contract ID with: Contract ID, Contract Period, Type (the plan the commitment belongs to: `Enterprise`), Category (`Usage`), Period, Commitment, Description
- Contract commitments are part of an Enterprise contract; teams on other plans have no commitments to show
- The previous page used `vercel contract`, `--format` / `-F`, a `totalCount` field, and a "Spend" category; the current docs show `vercel billing contract`, `--json`, `totalCommitments`, and `Usage` only. Whether the old command name or `--format` still works is not confirmed in official docs.
- Source: https://vercel.com/docs/cli/contract (fetched 2026-11-14)

## Related

- [billing.md](./billing.md)
- [usage.md](./usage.md)
