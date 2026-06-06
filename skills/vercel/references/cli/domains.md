# vercel domains

Buy, transfer, and manage domains under the current scope.

## Signature / Usage

```bash
vercel domains ls
vercel domains inspect [domain]
vercel domains add [domain] [project]
vercel domains rm [domain]
vercel domains buy [domain]
vercel domains price [domain] [...domain]
vercel domains check [domain] [...domain]
vercel domains move [domain] [scope-name]
vercel domains transfer-in [domain]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip confirmation when removing a domain |
| `--limit` | Max domains returned by `ls` (default: 20, max: 100) |
| `--next` | Pagination cursor (ms timestamp from previous response) |
| `--force` | Force-add a domain to a project, removing it from an existing project |

## Notes

- Subcommands: `ls`, `inspect`, `add`, `rm`, `buy`, `price`, `check`, `move`, `transfer-in`
- Project dashboard provides more options and control than CLI

## Related

- [dns.md](./dns.md)
- [certs.md](./certs.md)
- [alias.md](./alias.md)
