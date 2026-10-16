# Authentication Precedence

`gws` resolves credentials in a fixed priority order. The first available source wins; lower-priority sources are ignored.

## Signature / Usage

```bash
# Highest priority: wins over every other configured source
export GOOGLE_WORKSPACE_CLI_TOKEN="<access-token>"
# Next: credentials file (OAuth export or service account key)
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE="/path/to/credentials.json"
```

## Options / Props

| Priority | Source | How to configure |
|----------|--------|-----------------|
| 1 (highest) | Pre-obtained access token | `GOOGLE_WORKSPACE_CLI_TOKEN` env var |
| 2 | Credentials file (OAuth or service account) | `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` env var |
| 3 | Encrypted credentials from interactive login | `gws auth login` |
| 4 (lowest) | Plaintext credentials | `~/.config/gws/credentials.json` |

## Notes

- `GOOGLE_WORKSPACE_CLI_TOKEN` takes absolute priority; set it when another tool (e.g., `gcloud`) already manages tokens.
- `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` accepts both exported OAuth credentials (from `gws auth export`) and service account key JSON files.
- Interactive login credentials (priority 3) are encrypted at rest using AES-256-GCM. The encryption key is stored in the OS keyring by default, or in `~/.config/gws/.encryption_key` when `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file`. In the default `keyring` mode there is no `.encryption_key` fallback on macOS/Windows (since v0.22.3) and a file backup is kept on Linux; `file` mode means file only.
- Environment variables can be loaded from a `.env` file.
- Related environment variables: `GOOGLE_WORKSPACE_CLI_CLIENT_ID` / `GOOGLE_WORKSPACE_CLI_CLIENT_SECRET` (OAuth client), `GOOGLE_WORKSPACE_CLI_CONFIG_DIR` (override default config dir `~/.config/gws`), `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND` (`keyring` default or `file`; `file` uses `~/.config/gws/.encryption_key` only; macOS/Windows `keyring` mode has no file fallback since v0.22.3).

## Related

- [oauth-token.md](./oauth-token.md)
- [service-account.md](./service-account.md)
- [auth-login.md](./auth-login.md)
- [auth-export.md](./auth-export.md)
