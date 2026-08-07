# Rotating Keys

Zero-downtime procedure for rotating an environment's signing key and event keys via the Inngest dashboard.

## Signature / Usage

```
INNGEST_SIGNING_KEY="<NEWLY CREATED SIGNING KEY>"
INNGEST_SIGNING_KEY_FALLBACK="<OLD SIGNING KEY>"
```

## Notes

- Workflow: select environment → create new signing key (dashboard: key icon → "Signing keys" → "Create new signing key") → set `INNGEST_SIGNING_KEY` to the new key and `INNGEST_SIGNING_KEY_FALLBACK` to the old key → create new event key(s) → set `INNGEST_EVENT_KEY` → re-deploy app(s) → click "Rotate key" on the signing key page (deletes the original key, promotes the new one) → re-sync app(s) from the Apps tab → delete old event key(s)
- The signing key is shared across all apps within an environment, so it must be rotated across every app in that environment
- Both new and old signing keys must be set simultaneously during rotation to avoid downtime, since in-flight requests may still use the old key until rotation completes
- After rotation is confirmed complete (apps re-synced successfully), `INNGEST_SIGNING_KEY_FALLBACK` can be removed

## Related

- [Signing Keys](./signing-keys.md)
- [Event Keys](./event-keys.md)
- [Environments](./environments.md)
