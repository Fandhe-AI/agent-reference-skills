# vercel dns

Manage DNS records for domains: list, add, remove, and import zone files.

## Signature / Usage

```bash
vercel dns ls [domain]
vercel dns add [domain] [subdomain] [A|AAAA|ALIAS|CNAME|TXT] [value]
vercel dns add [domain] '@' MX [record-value] [priority]
vercel dns add [domain] [name] SRV [priority] [weight] [port] [target]
vercel dns add [domain] [name] CAA '[flags] [tag] "[value]"'
vercel dns inspect [record-id]
vercel dns update [record-id] --name [name] --type [type] --value [value] --ttl [seconds]
vercel dns rm [record-id]
vercel dns import [domain] [path-to-zonefile]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--limit` | Max DNS records returned by `ls` (default: 20, max: 100) |
| `--name` | `update`: new record name (`'@'` refers to the domain itself) |
| `--type` | `update`: new type: `A`, `AAAA`, `ALIAS`, `CAA`, `CNAME`, `MX`, `SRV`, `TXT` |
| `--value` | `update`: new record value |
| `--ttl` | `update`: new Time to Live in seconds |
| `--mx-priority` | `update`: new priority for an MX record |
| `--srv-priority` / `--srv-weight` / `--srv-port` / `--srv-target` | `update`: SRV fields; all four must be provided together |
| `--comment` | `update`: note describing what the record is for |
| `--format` | `inspect`: output format; `json` is the only supported value |

## Notes

- New DNS records may take up to 24 hours to propagate
- Subcommands: `ls [domain]`, `add`, `inspect [record-id]` (show one record in full), `update [record-id]` (edit fields in place), `rm [record-id]`, `import [domain] [zonefile]`

## Related

- [domains.md](./domains.md)
- [certs.md](./certs.md)
