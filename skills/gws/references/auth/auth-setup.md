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
- Since v0.22.3, macOS/Windows use the native keychain only, with no `.encryption_key` fallback; a leftover legacy file is deleted on the next successful keychain login. Linux keeps the file fallback for CI/Docker/SSH.
- Source: https://github.com/googleworkspace/cli/blob/v0.22.5/crates/google-workspace-cli/src/credential_store.rs
- Source: https://github.com/googleworkspace/cli/blob/v0.22.5/CHANGELOG.md#0223
- For subsequent logins or scope changes, use `gws auth login` instead.

## Related

- [auth-login.md](./auth-login.md)
- [auth-precedence.md](./auth-precedence.md)
