# Vercel REST API for Global Config (formerly Edge Config)

Use the Vercel REST API to create and write to Global Configs. For reads, use the [SDK](./edge-config-sdk.md) or the `global-config.vercel.com` endpoint.

All requests to `api.vercel.com` require `Authorization: Bearer <vercel_api_token>`.

## Create a Global Config

```bash
POST https://api.vercel.com/v1/global-config
```

```json
{ "slug": "your_global_config_name" }
```

Response:
```json
{
  "id": "ecfg_...",
  "slug": "your_global_config_name",
  "createdAt": 1234567890123,
  "updatedAt": 1234567890123,
  "digest": "abc123",
  "sizeInBytes": 2,
  "itemCount": 0,
  "ownerId": "..."
}
```

The `slug` can only contain alphanumeric letters, `_` and `-`, and cannot exceed 64 characters. Scope to a team: add `?teamId=<teamId>` and use a team-scoped API token.

## Update Items

```bash
PATCH https://api.vercel.com/v1/global-config/<id>/items
```

```json
{
  "items": [
    { "operation": "create", "key": "featureFlag", "value": true },
    { "operation": "update", "key": "redirectUrl", "value": "https://example.com" },
    { "operation": "upsert", "key": "config", "value": { "timeout": 30 }, "description": "Request timeout settings" },
    { "operation": "delete", "key": "oldKey" }
  ]
}
```

Valid operations: `create`, `update`, `upsert`, `delete`.

If any single operation fails, the entire `PATCH` request fails (atomic).

Response on success: `{ "status": "ok" }`

### Item Constraints

- Key: alphanumeric, `_`, `-` only. Max 256 characters. Pattern: `^[A-Za-z0-9_-]+$`
- Value: string, number, boolean, JSON object, array, or `null`
- Description (optional): string of 1 to 512 characters, or `null` to remove the description

## Read All Items (via REST API)

```bash
GET https://api.vercel.com/v1/global-config/<id>/items?teamId=<teamId>
```

> Not recommended for application reads — use the SDK or `global-config.vercel.com` endpoint instead. Reads of a Global Config or its items from `api.vercel.com` are rate limited to 500 requests per minute (per the Using Global Config page).

## Read Metadata

```bash
GET https://api.vercel.com/v1/global-config/<id>?teamId=<teamId>
```

Returns same structure as Create response.

## List All Global Configs

```bash
GET https://api.vercel.com/v1/global-config?teamId=<teamId>
```

Returns an array of Global Config metadata objects.

## Global Config Endpoint (Optimized Reads)

For high-volume reads, use `global-config.vercel.com` directly. Auth: `Authorization: Bearer <read_access_token>`.

```bash
# All items
GET https://global-config.vercel.com/<id>/items?token=<read_token>

# Single item
GET https://global-config.vercel.com/<id>/item/<key>?token=<read_token>

# Digest
GET https://global-config.vercel.com/<id>/digest?token=<read_token>
```

This endpoint:
- Is globally distributed with no rate limits
- Is what the `@vercel/global-config` SDK reads from
- Uses read access tokens (not Vercel API tokens)

## Create a Read Access Token

```bash
POST https://api.vercel.com/v1/global-config/<id>/token
Authorization: Bearer <vercel_api_token>

{ "label": "my-token-label" }
```

Response includes `token` (full plaintext — shown only once, copy immediately) and `id`.

## Notes

- This is Global Config, formerly Edge Config. Per the migration guide, `api.vercel.com/v1/edge-config` and `edge-config.vercel.com` continue to work; new integrations should use `api.vercel.com/v1/global-config` and `global-config.vercel.com`
- A failed `PATCH` returns a JSON object with an `error` property, e.g. `{ "error": { "code": "forbidden", "message": "The request is missing an authentication token", "missingToken": true } }`.
- The `ownerId` in responses is the Team ID when created with `?teamId`.
- On `global-config.vercel.com`, the read access token can be sent as a `token` query parameter or as an `Authorization: Bearer <read_token>` header; a single item response is the raw JSON value at the key.
- Updates can take up to a few seconds to propagate globally, so they may not be available from the Global Config endpoint immediately; `api.vercel.com` reads are not served through Vercel's CDN.
- Source: https://vercel.com/docs/global-config/vercel-api (fetched 2026-11-14)
- Vercel shows the full token value **only once** at creation
- Write propagation: up to 10 seconds globally
- `api.vercel.com` always returns the latest data but does not apply read optimizations

## Related

- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Using Edge Config](./using-edge-config.md)
- [Limits](./limits.md)
- [Migration Guide](./migration-guide.md)
