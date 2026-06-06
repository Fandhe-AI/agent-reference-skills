# CI / Headless Authentication

Running gws in environments without a browser (CI pipelines, servers, containers) requires exporting credentials from an interactive session first, or using a service account.

## Option 1: Export from Desktop + Credentials File

```sh
# 1. Authenticate interactively on a desktop machine
gws auth login

# 2. Export credentials (unmasked) to a file
gws auth export --unmasked > credentials.json

# 3. Transfer credentials.json to the CI/headless environment, then set:
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/credentials.json
```

## Option 2: Service Account

Point `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` at a service account key JSON. No interactive login required.

```sh
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/service-account-key.json
```

## Option 3: Pre-obtained Access Token

If another tool (e.g. `gcloud`) already mints OAuth2 tokens, pass the token directly:

```sh
export GOOGLE_WORKSPACE_CLI_TOKEN="$(gcloud auth print-access-token)"
```

This is the highest-priority auth method and bypasses credential file resolution entirely.

## Notes

- Auth precedence (highest to lowest): `GOOGLE_WORKSPACE_CLI_TOKEN` → `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` → encrypted credentials from `gws auth login` → plaintext `~/.config/gws/credentials.json`.
- Store `credentials.json` as a CI secret; never commit it to source control.

## Related

- [env-vars.md](./env-vars.md)
- [keyring-backend.md](./keyring-backend.md)
