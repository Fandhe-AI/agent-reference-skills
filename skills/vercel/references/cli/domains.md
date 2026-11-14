# vercel domains

List, inspect, verify, add, remove, purchase, renew, move, transfer in, search, price, check availability of, and manage automatic renewal for domains under the current scope.

## Signature / Usage

```bash
vercel domains list
vercel domains inspect [domain]
vercel domains verify [domain]
vercel domains add [domain] [project]
vercel domains remove [domain]
vercel domains buy [domain]
vercel domains renew [domain]
vercel domains auto-renew [enable|disable] [domain]
vercel domains search [query]
vercel domains price [domain] [...domain]
vercel domains check [domain] [...domain]
vercel domains move [domain] [scope-name]
vercel domains transfer-in [domain]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip confirmation when removing a domain |
| `--limit` | Max domains returned by `list` (default: 20, max: 100); with `search`, candidates per page (default: 20, max: 200) |
| `--next` | Pagination cursor: for `list`, the cursor from the output when more domains remain; for `search`, the cursor from the previous response or continuation command |
| `--force` | Force-add a domain to a project, removing it from an existing project |
| `--available` | `search`: only candidates available to register |
| `--order` | `search`: order by `relevance` (default), `alphabetical`, or `length` |
| `--tld` | `search`: filter by exact TLD; repeatable (e.g. `--tld com --tld dev`) |
| `--json` | Structured JSON output (`search`, `verify`, `auto-renew`, and `buy` / `renew` without prompts) |
| `--project` | `verify`: check DNS against the records expected by a specific project |
| `--strict` | `verify`: check DNS for the exact domain only, no fallback to the parent zone |
| `--amount <USD>` | `buy` / `renew`: the price a person approved; must match the current price (not a spending limit). Omit to get the price without charging |
| `--use-billing-details` | `buy`: use available team billing email and address fields for the registrant |
| `--first-name` / `--last-name` / `--phone` | `buy`: registrant details (required without prompts; phone starts with `+`, 10-15 digits incl. country code) |
| `--email` / `--address` / `--city` / `--state` / `--zip` / `--country` | `buy`: registrant contact fields (required unless supplied by approved billing details; `--state` and `--zip` required for every country; `--country` is a two-letter code) |
| `--company` | `buy`: optional registrant company name |
| `--auto-renew` / `--no-auto-renew` | `buy`: pass exactly one (no values such as `false`) |

## Notes

- `search` can be used without authentication (changelog, published 2026-09-28: discover names and check availability and pricing without signing in or an access token); authentication is still required to buy or manage domains
- Buy or renew without prompts (Vercel CLI 63.1.0+): `domains buy` and `domains renew` work in non-interactive terminals and skip prompts in CI with `--json`. Pass `--scope <team>` or set `VERCEL_ORG_ID` to the paying team's ID; a saved team selection or `vercel.json` scope alone is not sufficient, and a mismatching `VERCEL_ORG_ID` refuses the charge
- Without `--amount`, non-interactive `buy` / `renew` charge nothing and exit non-zero, returning a structured response (`status: action_required`, price, term, paying team, `missing`, and `next` commands; for a purchase also renewal terms and missing registrant details). Parse stdout for JSON; human guidance may appear on stderr. Confirmation stays with a person: approve price, paying team and (for purchases) automatic renewal, then run the returned command with `--amount <approved-price>`; if the price changed, nothing is charged and approval is requested again
- Domain registrations are non-refundable (limited exceptions); renewals are never refundable. The CLI does not retry automatically; if a charge is unconfirmed, run `vercel domains inspect <domain> --scope <team> --json` before retrying, since an immediate retry can charge twice
- Contact flags override billing details; replacing one existing billing address field with a flag discards the remaining billing address fields, so supply the complete address. `renew` needs no registrant details and does not change auto-renew
- `vercel domains auto-renew [enable|disable] [domain]` requires both the subcommand and the domain; the `enable` and `disable` subcommands need Vercel CLI 65.1.0 or later. To stop auto-renewal after purchase use `vercel domains auto-renew disable <domain>`
- `renew` shows the renewal price and term, then asks you to confirm the charge
- Project dashboard provides more options and control than CLI
- Not confirmed in the current official page: the aliases `ls` and `rm`, the earlier `auto-renew [domain] [on|off]` argument form, and `--format json` (the page documents `--json`)
- Source: https://vercel.com/docs/cli/domains (fetched 2026-11-14)

## Related

- [dns.md](./dns.md)
- [certs.md](./certs.md)
- [alias.md](./alias.md)
