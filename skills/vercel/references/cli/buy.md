# vercel buy

Purchase Vercel products (credits, addons, subscriptions, domains) from the CLI.

## Signature / Usage

```bash
vercel buy credits v0 100
vercel buy credits gateway 250
vercel buy credits agent 50
vercel buy addon observability-plus
vercel buy pro
vercel buy domain example.com
```

```bash
vercel buy credits v0 100 --amount 100.00 --scope my-team
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip the confirmation prompt for `addon` and `pro`; required in non-interactive environments such as CI |
| `--amount` | Approves the charge for `credits` without a prompt (`vercel@65.10.0` and later). Pass the same value as the `amount` argument and name the team with `--scope` |
| `--json` | Return the purchase result as JSON |

## Notes

- All subcommands except `domain` require a team scope; use `--scope` if needed. `vercel buy` without a subcommand shows help.
- Subcommands: `credits [credit-type] [amount]` (`v0`, `gateway` for AI Gateway, `agent` for Vercel Agent), `addon [addon-name] [quantity]`, `pro`, `domain [domain]`
- `credits`: amount in whole US dollars, max $1,000 per purchase. If `--amount` and the `amount` argument don't match, the CLI charges nothing. When CLI 65.10.0 or later detects an AI agent running `vercel buy credits`, `--amount` is also required; without it nothing is charged and the agent is told to ask for your approval.
- `addon`: team must be on a Pro or Enterprise plan; run `vercel buy addon --help` for options. Some addons require a quantity; don't pass one for `observability-plus`. The `siem` addon can no longer be purchased this way; use Audit Log Drains (https://vercel.com/docs/drains/reference/audit-logs).
- `domain` delegates to `vercel domains buy`
- Source: https://vercel.com/docs/cli/buy (fetched 2026-11-14)

## Related

- [domains.md](./domains.md)
- [billing.md](./billing.md)
