# vercel certs

Manage SSL certificates for domains: list, issue, and remove. Vercel manages certificates automatically.

## Signature / Usage

```bash
vercel certs ls
vercel certs issue foo.com bar.com
vercel certs issue foo.com --challenge-only
vercel certs rm [certificate-id]
vercel certs add --crt certificate.pem --key private-key.pem --ca ca.pem
vercel certs list --next 1234567890123
```

## Options / Props

| Name | Description |
|------|-------------|
| `--challenge-only` | Show only the DNS challenges needed to issue a certificate (useful for pre-generating SSL) |
| `--limit` | Max certificates returned by `ls` (default: 20, max: 100) |
| `--next` | Show the next page of certificates for `ls`; the output prints the command with the value to pass |
| `--crt` | Certificate file for `certs add` (custom certificate; requires an Enterprise team) |
| `--key` | Private key file for `certs add` |
| `--ca` | Certificate Authority file for `certs add` |

## Notes

- Subcommands: `ls`, `issue [domain1 domain2 ...]`, `rm [certificate-id]`, `add` (upload a custom certificate; requires an Enterprise team and all of `--crt` / `--key` / `--ca`)
- Vercel auto-manages certificates; manual issuance is rarely needed

- Source: https://vercel.com/docs/cli/certs (fetched 2026-11-14)

## Related

- [domains.md](./domains.md)
