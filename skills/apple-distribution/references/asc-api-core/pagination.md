# Pagination

Retrieve large data sets using cursor-based paging on list endpoints.

## Signature / Usage

```bash
# Request the first page with a limit
GET https://api.appstoreconnect.apple.com/v1/apps?limit=50

# Follow the next-page link from the response
GET https://api.appstoreconnect.apple.com/v1/apps?cursor=<cursor_value>&limit=50
```

## Options / Props

### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Number of resources per page; endpoint-specific max (commonly 200 for primary resources, 50 for included relationships) |
| `cursor` | string | Opaque cursor value from `links.next`; do not construct manually |

### Response Structure

```json
{
  "data": [ /* array of resource objects */ ],
  "links": {
    "self": "https://api.appstoreconnect.apple.com/v1/apps?limit=2",
    "next": "https://api.appstoreconnect.apple.com/v1/apps?cursor=eyJsIjoiMiIsIm8iOiIyIn0&limit=2"
  },
  "meta": {
    "paging": {
      "total": 431,
      "limit": 2
    }
  }
}
```

### `PagingInformation.Paging` Fields

| Field | Type | Description |
|-------|------|-------------|
| `total` | integer | Total number of matching resources |
| `limit` | integer | Number of resources returned in this page |

### `PagedDocumentLinks` Fields

| Field | Description |
|-------|-------------|
| `self` | URL of the current page |
| `next` | URL of the next page (absent when on the last page) |
| `first` | URL of the first page (may be absent) |

## Notes

- Use the full `links.next` URL directly — do not reconstruct query parameters manually
- The `cursor` and `limit` query parameters are ignored when checking token scope
- When `links.next` is absent, you have reached the last page
- `meta.paging.total` reflects the total count at the time of the request and may change between pages

## Related

- [Apps](./apps.md)
- [Builds](./builds.md)
- [Error Handling](./error-handling.md)
