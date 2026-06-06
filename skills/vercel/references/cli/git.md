# vercel git

Manage Git provider repository connections for a Vercel Project.

## Signature / Usage

```bash
vercel git connect
vercel git connect --yes
vercel git disconnect
vercel git ls
```

## Options / Props

| Name | Description |
|------|-------------|
| `--yes` | Skip connect confirmation prompt |

## Notes

- Searches for a local `.git` config file with at least one remote URL
- Subcommands: `connect`, `disconnect [provider]`, `ls`

## Related

- [link.md](./link.md)
- [deploy.md](./deploy.md)
