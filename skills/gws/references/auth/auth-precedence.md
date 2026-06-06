# Authentication Precedence

`gws` resolves credentials in a fixed priority order. The first available source wins; lower-priority sources are ignored.

## Precedence Order

| Priority | Source | How to configure |
|----------|--------|-----------------|
| 1 (highest) | Pre-obtained access token | `GOOGLE_WORKSPACE_CLI_TOKEN` env var |
| 2 | Credentials file (OAuth or service account) | `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` env var |
| 3 | Encrypted credentials from interactive login | `gws auth login` |
| 4 (lowest) | Plaintext credentials | `~/.config/gws/credentials.json` |

## Notes

- `GOOGLE_WORKSPACE_CLI_TOKEN` takes absolute priority; set it when another tool (e.g., `gcloud`) already manages tokens.
- `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` accepts both exported OAuth credentials (from `gws auth export`) and service account key JSON files.
- Interactive login credentials (priority 3) are encrypted at rest using AES-256-GCM. The encryption key is stored in the OS keyring by default, or in `~/.config/gws/.encryption_key` when `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file`.
- Environment variables can be loaded from a `.env` file.

## Related Environment Variables

| Variable | Purpose |
|----------|---------|
| `GOOGLE_WORKSPACE_CLI_TOKEN` | OAuth2 access token (highest priority) |
| `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` | Path to OAuth or service account JSON |
| `GOOGLE_WORKSPACE_CLI_CLIENT_ID` | OAuth client ID |
| `GOOGLE_WORKSPACE_CLI_CLIENT_SECRET` | OAuth client secret |
| `GOOGLE_WORKSPACE_CLI_CONFIG_DIR` | Override default config dir (`~/.config/gws`) |
| `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND` | Set to `file` to use `~/.config/gws/.encryption_key` instead of OS keyring |

## Related

- [oauth-token.md](./oauth-token.md)
- [service-account.md](./service-account.md)
- [auth-login.md](./auth-login.md)
- [auth-export.md](./auth-export.md)
