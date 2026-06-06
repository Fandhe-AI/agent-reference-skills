# Activity Logs

Endpoint for retrieving organization activity log events. Enterprise plan and OAuth authentication required.

## Signature / Usage

```http
GET /v1/activity_logs?limit=100&order=desc
Authorization: Bearer <oauth-access-token>
```

## Options / Props

### GET Activity Logs

`GET /v1/activity_logs` — Returns paginated list of activity log events.

| Parameter | Type | Description |
|-----------|------|-------------|
| `events` | String (query) | Comma-separated event types to filter; returns all if omitted |
| `start_time` | Number (query) | Unix timestamp for earliest event (default: 1 year ago) |
| `end_time` | Number (query) | Unix timestamp for latest event (default: current time) |
| `limit` | Number (query) | Max events to return (default: 1000) |
| `order` | String (query) | `asc` (oldest first) or `desc` (newest first) |
| `cursor` | String (query) | Pagination token for next batch |

**Response:** Paginated array of activity log events. When more results exist, response includes a `cursor` field and `next_page: true`.

**Scope:** `org:activity_log_read` | **Rate Limit:** Tier 3  
**Authentication:** OAuth 2 required  
**Error Codes:** 401 (insufficient permissions)

## Notes

- Enterprise plan required; the authenticated user must be an organization administrator
- OAuth 2 is required; personal access tokens and plan access tokens are not supported
- Use cursor-based pagination when results exceed the `limit` value

## Related

- [Authentication](./authentication.md)
- [OAuth Apps](./oauth-apps.md)
- [Scopes](./scopes.md)
