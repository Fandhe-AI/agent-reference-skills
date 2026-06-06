# Service Account Authentication

Authenticate using a Google Cloud service account key JSON file. No browser login required — suitable for server-to-server and automated workflows.

## Signature / Usage

```bash
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/service-account.json
gws drive files list
```

## Notes

- Set `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` to the path of the downloaded service account key JSON.
- `gws auth login` is not required when this variable is set.
- This variable is also used for exported OAuth credentials (see [auth-export.md](./auth-export.md)); `gws` distinguishes the credential type from the JSON content.
- Takes priority over locally stored `gws auth login` credentials. See [auth-precedence.md](./auth-precedence.md) for the full precedence order.
- Environment variables can be loaded from a `.env` file.

## Related

- [auth-export.md](./auth-export.md)
- [auth-precedence.md](./auth-precedence.md)
- [oauth-token.md](./oauth-token.md)
