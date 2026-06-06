# gws auth export

Exports the current authentication credentials to JSON. Used to transfer credentials from a browser-capable machine to a headless or CI environment.

## Signature / Usage

```bash
# Export masked credentials (tokens redacted)
gws auth export

# Export with plaintext tokens for transfer
gws auth export --unmasked > credentials.json
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--unmasked` | Output credentials in plaintext (tokens not redacted) |

## Notes

- Typical headless/CI transfer flow:
  1. On a browser-capable machine: `gws auth export --unmasked > credentials.json`
  2. Copy `credentials.json` to the target machine.
  3. On the target machine: `export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/credentials.json`
  4. Run any `gws` command — no `gws auth login` required.
- The exported file contains sensitive OAuth tokens; store and transmit it securely.

## Related

- [service-account.md](./service-account.md)
- [auth-precedence.md](./auth-precedence.md)
