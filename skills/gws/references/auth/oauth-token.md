# GOOGLE_WORKSPACE_CLI_TOKEN

Authenticate using a pre-obtained OAuth2 access token. This is the highest-priority credential source — when set, all other credential sources are ignored.

## Signature / Usage

```bash
export GOOGLE_WORKSPACE_CLI_TOKEN=$(gcloud auth print-access-token)
gws drive files list
```

## Notes

- Useful when another tool (e.g., `gcloud`) already manages OAuth tokens.
- Takes the highest priority in the credential precedence chain — overrides all other credential sources.
- The token must be a valid OAuth2 access token with the required scopes for the operations being performed.
- Environment variables can be loaded from a `.env` file.

## Related

- [auth-precedence.md](./auth-precedence.md)
- [service-account.md](./service-account.md)
