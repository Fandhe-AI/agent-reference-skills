# vercel certs

Manage SSL certificates for domains: list, issue, and remove. Vercel manages certificates automatically.

## Signature / Usage

```bash
vercel certs ls
vercel certs issue foo.com bar.com
vercel certs issue foo.com --challenge-only
vercel certs rm [certificate-id]
```

## Options / Props

| Name | Description |
|------|-------------|
| `--challenge-only` | Show only the DNS challenges needed to issue a certificate (useful for pre-generating SSL) |
| `--limit` | Max certificates returned by `ls` (default: 20, max: 100) |

## Notes

- Subcommands: `ls`, `issue [domain1 domain2 ...]`, `rm [certificate-id]`
- Vercel auto-manages certificates; manual issuance is rarely needed

## Related

- [domains.md](./domains.md)
