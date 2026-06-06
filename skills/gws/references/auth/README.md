# auth

| Name | Description | Path |
|------|-------------|------|
| gws auth setup | One-time setup: creates Cloud project, enables APIs, and logs in (requires `gcloud`) | [auth-setup.md](./auth-setup.md) |
| gws auth login | OAuth login with interactive scope selection; `-s` flag filters to specific services | [auth-login.md](./auth-login.md) |
| gws auth export | Export credentials to JSON for headless/CI transfer; `--unmasked` for plaintext output | [auth-export.md](./auth-export.md) |
| Service Account | Authenticate via `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` with a service account key JSON | [service-account.md](./service-account.md) |
| GOOGLE_WORKSPACE_CLI_TOKEN | Use a pre-obtained OAuth2 access token (highest-priority credential source) | [oauth-token.md](./oauth-token.md) |
| Authentication Precedence | Four-level credential resolution order with environment variable reference | [auth-precedence.md](./auth-precedence.md) |
| Testing Mode & Scope Limits | ~25 scope limit for unverified apps; use `-s` to select individual services | [testing-mode-scopes.md](./testing-mode-scopes.md) |
