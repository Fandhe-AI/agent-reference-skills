# vercel dns

Manage DNS records for domains: list, add, remove, and import zone files.

## Signature / Usage

```bash
vercel dns ls [domain]
vercel dns add [domain] [subdomain] [A|AAAA|ALIAS|CNAME|TXT] [value]
vercel dns add [domain] '@' MX [record-value] [priority]
vercel dns add [domain] [name] SRV [priority] [weight] [port] [target]
vercel dns add [domain] [name] CAA '[flags] [tag] "[value]"'
vercel dns rm [record-id]
vercel dns import [domain] [path-to-zonefile]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--limit` | Max DNS records returned by `ls` (default: 20, max: 100) |

## Notes

- New DNS records may take up to 24 hours to propagate
- Subcommands: `ls [domain]`, `add`, `rm [record-id]`, `import [domain] [zonefile]`

## Related

- [domains.md](./domains.md)
- [certs.md](./certs.md)
