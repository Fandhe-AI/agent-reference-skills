# Vercel REST API for Edge Config

Use the Vercel REST API to create and write to Edge Configs. For reads, use the [SDK](./edge-config-sdk.md) or the `edge-config.vercel.com` endpoint.

All requests to `api.vercel.com` require `Authorization: Bearer <vercel_api_token>`.

## Create an Edge Config

```bash
POST https://api.vercel.com/v1/edge-config
```

```json
{ "slug": "your_edge_config_name" }
```

Response:
```json
{
  "id": "ecfg_...",
  "slug": "your_edge_config_name",
  "createdAt": 1234567890123,
  "updatedAt": 1234567890123,
  "digest": "abc123",
  "sizeInBytes": 2,
  "itemCount": 0,
  "ownerId": "..."
}
```

Scope to a team: add `?teamId=<teamId>` and use a team-scoped API token.

## Update Items

```bash
PATCH https://api.vercel.com/v1/edge-config/<id>/items
```

```json
{
  "items": [
    { "operation": "create", "key": "featureFlag", "value": true },
    { "operation": "update", "key": "redirectUrl", "value": "https://example.com" },
    { "operation": "upsert", "key": "config", "value": { "timeout": 30 } },
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

## Read All Items (via REST API)

```bash
GET https://api.vercel.com/v1/edge-config/<id>/items?teamId=<teamId>
```

> Not recommended for application reads — use the SDK or `edge-config.vercel.com` endpoint instead. Rate limited to 20 reads/min.

## Read Metadata

```bash
GET https://api.vercel.com/v1/edge-config/<id>?teamId=<teamId>
```

Returns same structure as Create response.

## List All Edge Configs

```bash
GET https://api.vercel.com/v1/edge-config?teamId=<teamId>
```

Returns an array of Edge Config metadata objects.

## Edge Config Endpoint (Optimized Reads)

For high-volume reads, use `edge-config.vercel.com` directly. Auth: `Authorization: Bearer <read_access_token>`.

```bash
# All items
GET https://edge-config.vercel.com/<id>/items?token=<read_token>

# Single item
GET https://edge-config.vercel.com/<id>/item/<key>?token=<read_token>

# Digest
GET https://edge-config.vercel.com/<id>/digest?token=<read_token>
```

This endpoint:
- Is globally distributed with no rate limits
- Is what `@vercel/edge-config` SDK reads from
- Uses read access tokens (not Vercel API tokens)

## Create a Read Access Token

```bash
POST https://api.vercel.com/v1/edge-config/<id>/token
Authorization: Bearer <vercel_api_token>

{ "label": "my-token-label" }
```

Response includes `token` (full plaintext — shown only once, copy immediately) and `id`.

## Notes

- Vercel shows the full token value **only once** at creation
- Write propagation: up to 10 seconds globally
- `api.vercel.com` always returns the latest data but does not apply read optimizations

## Related

- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Using Edge Config](./using-edge-config.md)
- [Limits](./limits.md)
