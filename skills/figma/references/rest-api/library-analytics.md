# Library Analytics

Endpoints for retrieving usage and action analytics for components, styles, and variables in a published library. Enterprise plan required.

## Signature / Usage

```http
GET /v1/analytics/libraries/:library_file_key/component/usages?group_by=component
X-Figma-Token: <token>
```

## Options / Props

All six endpoints share these common requirements:
- **Scope:** `library_analytics:read`
- **Rate Limit:** Tier 3
- **Plan:** Enterprise only
- **Pagination:** Cursor-based, max 1,000 rows per page
- **Data refresh:** Daily at 00:00 UTC

### Component Analytics

| Endpoint | Path | `group_by` values |
|----------|------|-------------------|
| Component Actions | `GET /v1/analytics/libraries/:library_file_key/component/actions` | `component`, `team` |
| Component Usages | `GET /v1/analytics/libraries/:library_file_key/component/usages` | `component`, `file` |

### Style Analytics

| Endpoint | Path | `group_by` values |
|----------|------|-------------------|
| Style Actions | `GET /v1/analytics/libraries/:library_file_key/style/actions` | `style`, `team` |
| Style Usages | `GET /v1/analytics/libraries/:library_file_key/style/usages` | `style`, `file` |

### Variable Analytics

| Endpoint | Path | `group_by` values |
|----------|------|-------------------|
| Variable Actions | `GET /v1/analytics/libraries/:library_file_key/variable/actions` | `variable`, `team` |
| Variable Usages | `GET /v1/analytics/libraries/:library_file_key/variable/usages` | `variable`, `file` |

### Common parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `library_file_key` | String (path) | File key of the published library |
| `group_by` | String (query, required) | Grouping dimension (see table above) |
| `start_date` | String (query, optional) | ISO 8601 date; rounded to week start (actions only) |
| `end_date` | String (query, optional) | ISO 8601 date; rounded to week end (actions only) |
| `cursor` | String (query, optional) | Pagination cursor |

**Response for actions:** Weekly time series tracking insertions and detachments  
**Response for usages:** Summary snapshot of instance counts across files and teams

**Error Codes:** 400 (invalid parameter), 401 (authentication), 403 (plan unavailable or insufficient access)

## Notes

- Only available to Enterprise plan organizations
- `start_date` and `end_date` are only applicable for actions endpoints (not usages)
- Usages data represents a point-in-time snapshot, not historical time series

## Related

- [Components](./components.md)
- [Variables](./variables.md)
