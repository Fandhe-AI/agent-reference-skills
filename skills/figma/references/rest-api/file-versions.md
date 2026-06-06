# File Versions

Endpoint for retrieving the version history of a Figma file.

## Signature / Usage

```http
GET /v1/files/:key/versions
X-Figma-Token: <token>
```

## Options / Props

### GET File Versions

`GET /v1/files/:key/versions` — Returns paginated list of file versions.

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | String (path) | File or branch key |

**Response:**
```json
{
  "versions": [
    {
      "id": "string",
      "created_at": "ISO 8601 UTC",
      "label": "string",
      "description": "string",
      "user": { "User object" }
    }
  ],
  "pagination": {
    "prev_page": "string",
    "next_page": "string"
  }
}
```

**Scope:** `file_versions:read` | **Rate Limit:** Tier 2

**Error Codes:**
- 403: Invalid or expired token
- 404: File not found

## Notes

- Versions are ordered by creation time (most recently created versions first by default)
- Pagination uses cursor-based `prev_page` / `next_page` URLs
- Branch keys are accepted: obtain via `GET /v1/files/:key?branch_data=true`

## Related

- [Files](./files.md)
