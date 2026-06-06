# gws auth login

Performs OAuth login with interactive scope selection. Use after `gws auth setup`, or when re-authenticating or changing scopes.

## Signature / Usage

```bash
# Interactive scope picker (all scopes)
gws auth login

# Filter to specific services
gws auth login -s drive,gmail,sheets
```

## Options / Props

| Flag | Short | Description |
|------|-------|-------------|
| `--scopes` | `-s` | Comma-separated list of service names to limit scope selection (e.g. `drive,gmail,sheets`) |

## Notes

- The `-s` / `--scopes` flag filters the OAuth consent to only the named services, keeping the total scope count low.
- This is required for unverified (testing mode) OAuth apps, which are limited to approximately 25 scopes — see [testing-mode-scopes.md](./testing-mode-scopes.md).
- Credentials are saved encrypted (AES-256-GCM). Not needed when using `GOOGLE_WORKSPACE_CLI_TOKEN` or `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` — see [auth-precedence.md](./auth-precedence.md).

## Related

- [auth-setup.md](./auth-setup.md)
- [testing-mode-scopes.md](./testing-mode-scopes.md)
- [auth-precedence.md](./auth-precedence.md)
