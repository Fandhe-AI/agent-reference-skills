# gws auth setup

One-time interactive command that creates a Google Cloud project, enables the required Workspace APIs, and logs you in — all in a single step. Requires `gcloud` CLI to be installed.

## Signature / Usage

```bash
gws auth setup
```

## Notes

- Requires the `gcloud` CLI to be present on the system.
- Automates project creation, API enablement, and OAuth login in one flow.
- After setup, credentials are encrypted at rest (AES-256-GCM) with the key stored in the OS keyring (or `~/.config/gws/.encryption_key` when `GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file`).
- For subsequent logins or scope changes, use `gws auth login` instead.

## Related

- [auth-login.md](./auth-login.md)
- [auth-precedence.md](./auth-precedence.md)
