# API Keys

Authentication credentials for the Inngest v2 REST API — used for CI/CD automation, scripted investigation, and custom tooling (distinct from event keys and signing keys).

## Signature / Usage

Authenticate REST API requests by passing the key as a Bearer token:

```bash
curl -X POST "https://api.inngest.com/v2/apps/<app-id>/functions/<fn-id>/invoke" \
  -H "Authorization: Bearer sk-inn-api-xxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{ "data": { "userId": "123" } }'
```

Manage keys in the dashboard: **Profile menu → API Keys** (or `https://app.inngest.com/settings/api-keys`). From that page you can generate, rename, and delete keys.

## Notes

- Manage API keys in the Inngest Cloud dashboard: profile menu → "API Keys" (or the dedicated settings page)
- Supported operations: generate new keys, rename existing keys, delete unused keys
- Keys can be scoped to a specific environment (e.g., production only) for controlled access
- Only organization admins can create, update, or delete API keys
- Typical use cases:
  - Syncing apps from a CI/CD pipeline (`PUT /v1/apps/sync`)
  - Scripted investigation and recovery workflows
  - Building custom internal tooling on top of the Inngest API
- For authentication details and API request format, refer to the [Inngest REST API authentication docs](https://api-docs.inngest.com/authentication)

## Related

- [Event Keys](./event-keys.md)
- [Signing Keys](./signing-keys.md)
- [Syncing an Inngest App](./deploy-syncing.md)
