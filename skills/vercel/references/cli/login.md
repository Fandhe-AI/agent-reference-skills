# vercel login

Authenticate with your Vercel account through the CLI.

## Signature / Usage

```bash
vercel login
vercel login [email]
vercel login --github
```

## Notes

- For CI/CD where manual input is not possible, use `VERCEL_TOKEN` env var or `--token` global option instead
- `--token` flag takes precedence over `VERCEL_TOKEN` if both are provided

## Related

- [logout.md](./logout.md)
- [whoami.md](./whoami.md)
- [global-options.md](./global-options.md)
