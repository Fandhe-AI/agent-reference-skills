# vercel dns

Manage DNS records for domains: list, inspect, add, update, remove, and import zone files.

## Signature / Usage

```bash
vercel dns list
vercel dns list [domain]
vercel dns list example.com --limit 100
vercel dns list example.com --next 1584722256178
vercel dns add [domain] [subdomain] [A || AAAA || ALIAS || CNAME || TXT] [value]
vercel dns add [domain] '@' MX [record-value] [priority]
vercel dns add [domain] [name] SRV [priority] [weight] [port] [target]
vercel dns add [domain] [name] CAA '[flags] [tag] "[value]"'
vercel dns inspect [record-id]
vercel dns inspect rec_1a2b3c4d5e6f --json
vercel dns update [record-id] --name [name] --type [type] --value [value] --ttl [seconds]
vercel dns remove [record-id]
vercel dns remove rec_1a2b3c4d5e6f --yes
vercel dns import [domain] [path-to-zonefile]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--limit` | Max DNS records returned by `list` with a domain argument (default: 20, max: 100) |
| `--next` | `list`: show the next page of results; the command prints the cursor to pass when more results exist |
| `--name` | `update`: new record name (`'@'` refers to the domain itself) |
| `--type` | `update`: new type: `A`, `AAAA`, `ALIAS`, `CAA`, `CNAME`, `MX`, `SRV`, `TXT` |
| `--value` | `update`: new record value |
| `--ttl` | `update`: new Time to Live in seconds |
| `--mx-priority` | `update`: new priority for an MX record |
| `--srv-priority` / `--srv-weight` / `--srv-port` / `--srv-target` | `update`: SRV fields; all four must be provided together |
| `--comment` | `update`: note describing what the record is for |
| `--yes` | `remove`: skip the confirmation prompt (e.g. in scripts) |
| `--json` | `list` / `inspect`: output the result as JSON |

## Notes

- New DNS records may take up to 24 hours to propagate
- Subcommands: `list [domain]`, `add`, `inspect [record-id]` (show one record in full), `update [record-id]` (edit fields in place), `remove [record-id]`, `import [domain] [zonefile]`
- `update` asks for confirmation and has no option to skip the prompt; run it in an interactive terminal
- Not confirmed in the current official page: the aliases `ls` and `rm`, and `--format json` for `inspect` (the page documents `--json`)
- Source: https://vercel.com/docs/cli/dns (fetched 2026-11-14)

## Related

- [domains.md](./domains.md)
- [certs.md](./certs.md)
