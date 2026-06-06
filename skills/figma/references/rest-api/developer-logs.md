# Developer Logs

Endpoint for searching granular API call logs across an organization. Enterprise + Governance+ plan required.

## Signature / Usage

```http
POST /v1/developer_logs
X-Figma-Token: <plan-access-token>
Content-Type: application/json

{
  "date_range": "LAST_7D",
  "limit": 25
}
```

## Options / Props

### POST /v1/developer_logs — Search developer logs

| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | String (body) | Hashed access token to investigate |
| `token_name` | String (body) | Personal/plan token or OAuth app name; comma-separated (OR logic) |
| `user_email` | String (body) | User email prefix; comma-separated (OR logic) |
| `ip_address` | String (body) | IP address or prefix; comma-separated (OR logic) |
| `token_type` | String enum (body) | `PLAN_ACCESS_TOKEN`, `PERSONAL_ACCESS_TOKEN`, or `OAUTH_TOKEN` |
| `event_source` | String enum (body) | `REST_API` or `MCP_SERVER` |
| `date_range` | String enum (body) | `LAST_24H`, `LAST_7D`, or `LAST_30D` |
| `limit` | Number (body) | Max records (default: 25, max: 100) |
| `cursor` | String (body) | Pagination token from previous response |

**Response:** Log entries containing UUID, timestamp, action details, actor information, resource metadata, IP, and geolocation.

**Scope:** `org:developer_log_read` | **Rate Limit:** Tier 3  
**Authentication:** Plan access token only  
**Error Codes:** 400 (invalid parameter), 401 (authentication), 403 (unavailable/access denied)

## Notes

- Requires Enterprise plan with Governance+ add-on; organization administrator account
- Only plan access tokens are supported (not personal access tokens or OAuth tokens)
- Use cases: investigating leaked credentials, auditing token usage, monitoring MCP server utilization

## Related

- [Plan Access Tokens](./plan-access-tokens.md)
- [Activity Logs](./activity-logs.md)
- [Scopes](./scopes.md)
