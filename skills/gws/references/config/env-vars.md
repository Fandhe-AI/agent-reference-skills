# Environment Variables

All configuration environment variables recognized by the gws CLI. Variables can be set in the shell or in a `.env` file (loaded automatically via dotenvy).

## Auth Precedence

When multiple auth methods are configured, gws resolves them in this order:

1. `GOOGLE_WORKSPACE_CLI_TOKEN`
2. `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE`
3. Encrypted credentials (stored by `gws auth login`)
4. Plaintext credentials at `~/.config/gws/credentials.json`

## Variables

| Name | Default | Description |
|------|---------|-------------|
| `GOOGLE_WORKSPACE_CLI_TOKEN` | — | Pre-obtained OAuth2 access token. Highest-priority auth method. Useful when another tool (e.g. `gcloud`) already mints tokens. |
| `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` | — | Path to an OAuth credentials JSON or service account key JSON. Used for both user OAuth flows and headless/CI service account auth. |
| `GOOGLE_WORKSPACE_CLI_CLIENT_ID` | — | OAuth client ID. Alternative to supplying a `client_secret.json` file; must be paired with `GOOGLE_WORKSPACE_CLI_CLIENT_SECRET`. |
| `GOOGLE_WORKSPACE_CLI_CLIENT_SECRET` | — | OAuth client secret. Paired with `GOOGLE_WORKSPACE_CLI_CLIENT_ID`. |
| `GOOGLE_WORKSPACE_CLI_CONFIG_DIR` | `~/.config/gws` | Override the configuration directory where credentials and settings are stored. |
| `GOOGLE_WORKSPACE_CLI_SANITIZE_TEMPLATE` | — | Default Model Armor template ID used to scan API responses for prompt injection. |
| `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` | `warn` | Sanitization behavior: `warn` logs concerns without blocking; `block` halts execution when threats are detected. |
| `GOOGLE_WORKSPACE_CLI_LOG` | off | stderr log level filter (e.g. `gws=debug`). Off by default. |
| `GOOGLE_WORKSPACE_CLI_LOG_FILE` | off | Directory path for JSON log files with automatic daily rotation. Off by default. |
| `GOOGLE_WORKSPACE_PROJECT_ID` | — | GCP project ID override for quota/billing attribution and as a fallback for helper commands (e.g. Gmail watch, events subscriptions). |
| `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND` | OS keyring | Keyring storage backend. Set to `file` to store the encryption key in `~/.config/gws/.encryption_key` instead of the OS keyring. |

## Related

- [dotenv-file.md](./dotenv-file.md)
- [ci-headless.md](./ci-headless.md)
- [keyring-backend.md](./keyring-backend.md)
- [logging.md](./logging.md)
- [project-id.md](./project-id.md)
