# Signing Keys

Secret pre-shared keys unique to each environment that secure bidirectional communication between Inngest and your application servers.

## Signature / Usage

```bash
# Set via environment variable (recommended)
INNGEST_SIGNING_KEY=your-signing-key
INNGEST_SIGNING_KEY_FALLBACK=your-old-signing-key  # for zero-downtime rotation
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `INNGEST_SIGNING_KEY` | `string` | Primary signing key for request authentication |
| `INNGEST_SIGNING_KEY_FALLBACK` | `string` | Secondary key used during zero-downtime rotation (SDK 3.18.0+) |

## Notes

- Signing keys provide three security guarantees: serve endpoint authentication, API authentication, and replay attack prevention (requests embed a timestamp; stale requests are rejected)
- Branch environments share a single signing key across the entire account — set one variable to cover all preview environments
- Never hardcode signing keys in source control; use platform secrets or environment variable management
- For local development, set `INNGEST_DEV=1` or pass `isDev: true` to bypass signature verification; the Dev Server does not require signing keys
- Zero-downtime rotation requires TypeScript SDK 3.18.0+, Python 0.3.9+, or Go 0.7.2+; older SDK versions will experience a brief outage during rotation

## Related

- [Event Keys](./event-keys.md)
- [Environments](./environments.md)
- [Environment Variables](./environment-variables.md)
