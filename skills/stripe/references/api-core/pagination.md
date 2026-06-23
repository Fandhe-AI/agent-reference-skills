# Pagination

Stripe list endpoints use cursor-based pagination, returning results in reverse chronological order. Each list response wraps the data in a `list` object that includes a `has_more` flag and cursor IDs for navigating pages.

## Signature / Usage

```sh
# First page
GET /v1/customers?limit=100

# Next page — use the ID of the last object from the previous response
GET /v1/customers?limit=100&starting_after=cus_xyz
```

## Options / Props

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Number of objects to return. Range: 1–100. |
| `starting_after` | string (object ID) | — | Returns objects listed after this ID (forward pagination). |
| `ending_before` | string (object ID) | — | Returns objects listed before this ID (backward pagination). |

`starting_after` and `ending_before` are mutually exclusive.

## List Response Structure

```json
{
  "object": "list",
  "url": "/v1/customers",
  "has_more": true,
  "data": [ /* array of objects */ ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `object` | string | Always `"list"`. |
| `data` | array | The paginated objects for this page. |
| `has_more` | boolean | `true` if more objects exist beyond this page. |
| `url` | string | The endpoint URL for this list. |

## Notes

- Server-side SDKs provide auto-pagination helpers that transparently traverse all pages.
- The v2 API uses a different pagination interface; see the v2 API documentation for details.

## Related

- [Error Handling](./error-handling.md)
- [API Versioning](./api-versioning.md)
