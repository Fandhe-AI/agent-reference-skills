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
- The current official page documents only `vercel login`; the `[email]` and `--github` forms are not confirmed in the current official docs. To create an account use `vercel signup`
- Source: https://vercel.com/docs/cli/login (fetched 2026-11-14)

## Related

- [logout.md](./logout.md)
- [whoami.md](./whoami.md)
- [global-options.md](./global-options.md)
