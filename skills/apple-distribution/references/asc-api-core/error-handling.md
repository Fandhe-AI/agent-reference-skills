# Error Handling

Interpret and handle errors returned by the App Store Connect API using HTTP status codes and the `ErrorResponse` object.

## Signature / Usage

```json
{
  "errors": [
    {
      "id": "string",
      "status": "400",
      "code": "PARAMETER_ERROR.INVALID",
      "title": "A parameter has an invalid value",
      "detail": "The value 'UNKNOWN' is not a valid value for filter[platform]",
      "source": {
        "parameter": "filter[platform]"
      }
    }
  ]
}
```

## Options / Props

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200`–`299` | Success; response body contains requested data |
| `400` | Bad Request — invalid parameters or request body |
| `401` | Unauthorized — missing or invalid JWT |
| `403` | Forbidden — API key lacks required role or scope |
| `404` | Not Found — resource does not exist |
| `409` | Conflict — state conflict (e.g., duplicate resource) |
| `422` | Unprocessable Entity — validation errors |
| `429` | Too Many Requests — rate limit exceeded (`RATE_LIMIT_EXCEEDED`) |
| `500`–`599` | Server Error — Apple-side issue |

### `ErrorResponse` Object

| Field | Type | Description |
|-------|------|-------------|
| `errors` | `[ErrorResponse.Errors]` | Array of error detail objects |

### `ErrorResponse.Errors` Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for this error occurrence |
| `status` | string | HTTP status code string |
| `code` | string | Programmatic error code (e.g., `PARAMETER_ERROR.INVALID`) |
| `title` | string | Short human-readable summary |
| `detail` | string | Detailed description of the error |
| `source` | object | Location of the error — either `JsonPointer` (request body path) or `Parameter` (query param name) |

### Error Source Types

| Type | Field | Description |
|------|-------|-------------|
| `JsonPointer` | `pointer` | JSON Pointer (RFC 6901) to the offending field in the request body |
| `Parameter` | `parameter` | Name of the query parameter that caused the error |

## Notes

- Check the HTTP status code first, then parse `ErrorResponse.errors` for details
- `code` is the most reliable field for programmatic error classification
- Multiple errors may be returned in a single `errors` array
- Handle `429` with backoff and retry; do not retry on `4xx` client errors without fixing the request

## Related

- [Rate Limits](./rate-limits.md)
- [Generating Tokens](./generating-tokens.md)
- [Pagination](./pagination.md)
