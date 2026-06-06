# Discovery

Endpoint for fetching text events that have occurred in Figma files across an organization. Enterprise + Governance+ plan required.

## Signature / Usage

```http
GET /v1/discovery?start_date=2025-01-01T00:00:00Z
Authorization: Bearer <oauth-access-token>
```

## Options / Props

### GET Text Events

`GET /v1/discovery` — Returns up to 24 hours of text events for organization files.

| Parameter | Type | Description |
|-----------|------|-------------|
| `start_date` | String (query, required) | ISO 8601 UTC timestamp; beginning hour (must be at least 1 hour in the past) |
| `end_date` | String (query, optional) | ISO 8601 UTC timestamp; ending hour (max 24 hours after `start_date`) |
| `file_ttl_in_seconds` | Number (query, optional) | Download link validity (60–86400 seconds; default: 86400) |

**Response:**
```json
{
  "error": false,
  "status": 200,
  "meta": {
    "urls": {
      "<hourly-timestamp>": ["<download-url>", ...]
    }
  }
}
```

**Scope:** `org:discovery_read` | **Rate Limit:** Tier 2  
**Authentication:** OAuth 2 required  
**Error Codes:** 400 (malformed query parameters), 429 (exceeding 20 requests per second)

## Notes

- Enterprise plan with Governance+ add-on required
- OAuth 2 authentication is required
- The response `urls` map is keyed by hourly UTC timestamps
- Use `file_ttl_in_seconds` to control how long download links remain valid

## Related

- [Activity Logs](./activity-logs.md)
- [Scopes](./scopes.md)
