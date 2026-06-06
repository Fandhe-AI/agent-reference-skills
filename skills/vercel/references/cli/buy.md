# vercel buy

Purchase Vercel products (credits, addons, subscriptions, domains) from the CLI.

## Signature / Usage

```bash
vercel buy credits v0 100
vercel buy credits gateway 250
vercel buy addon siem 1
vercel buy pro
vercel buy domain example.com
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip confirmation prompt; required in non-interactive environments |
| `--json` | Return purchase result as JSON |

## Notes

- All subcommands except `domain` require team scope; use `--scope` if needed
- Subcommands: `credits [v0|gateway|agent] <amount>`, `addon <name> <quantity>`, `pro`, `v0`, `domain <domain>`
- `credits` max $1,000 per purchase
- `addon` requires Flex plan; current supported addon: `siem`
- `domain` delegates to `vercel domains buy`

## Related

- [domains.md](./domains.md)
