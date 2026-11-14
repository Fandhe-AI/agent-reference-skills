# REST API: Signing Keys

Endpoints to read and rotate the signing keys used to verify that requests to a workflow endpoint come from Upstash.

## Signature / Usage

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/v2/keys` | Retrieve the current and next signing keys: `current`, `next` |
| `POST` | `/v2/keys/rotate` | Rotate the signing keys |

```yaml
servers:
  - url: https://qstash-{region}.upstash.io
    description: Regional
    variables:
      region:
        default: eu-central-1
        enum:
          - us-east-1
          - eu-central-1
security:
  - bearerAuth: []
  - bearerAuthQuery: []
```

Adapted (not in the official docs): request assembled from the documented path and Bearer authentication; the response contains secrets, so do not log it.

```bash
curl -X POST "https://qstash-eu-central-1.upstash.io/v2/keys/rotate" \
  -H "Authorization: Bearer $QSTASH_TOKEN"
```

## Options / Props

| Field | Type | Description |
|-------|------|-------------|
| `current` | `string` | Current signing key |
| `next` | `string` | Next signing key |

## Notes

- The REST API belongs to Upstash Workflow (OpenAPI title "Upstash Workflow REST API", version 2.0.0); base URL `https://qstash-{region}.upstash.io` with `region` `us-east-1` or `eu-central-1` (default `eu-central-1`); authenticate with the QStash token as Bearer token (`bearerAuth`) or as the `qstash_token` query parameter (`bearerAuthQuery`)
- This is the Workflow endpoint family (`/v2/workflows/...`, `/v2/trigger/...`); the plain QStash message API is covered by the qstash category of this skill
- Rotating signing keys lets you switch the keys used to sign messages without causing downtime
- The keys correspond to `QSTASH_CURRENT_SIGNING_KEY` / `QSTASH_NEXT_SIGNING_KEY` used by the workflow endpoint receiver (see security)
- Source: https://upstash.com/docs/workflow/api-reference/signing-keys/get-signing-keys (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/workflow/api-reference/signing-keys/rotate-signing-keys (fetched 2026-11-14; no version pin on the site)

## Related

- [security](./security.md)
- [serve](./serve.md)
