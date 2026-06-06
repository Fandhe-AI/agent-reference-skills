# Errors

Standard HTTP error codes returned by the Figma REST API.

## Options / Props

| Status Code | Name | Description |
|-------------|------|-------------|
| `400` | Bad Request | Parameters are invalid or malformed. Also occurs when requested resources are too large, causing a timeout. Reduce the quantity and size of objects in the request. |
| `403` | Forbidden | The request was valid, but the server refused the action. Typically caused by insufficient permissions or unencrypted HTTP (use HTTPS). |
| `404` | Not Found | The requested file or resource was not found, or is inaccessible to the current user. |
| `429` | Too Many Requests | API rate limit exceeded. Check `Retry-After` header and wait before retrying. |
| `500` | Internal Server Error | Most commonly occurs for very large image render requests that time out. Reduce the number and size of objects. |

## Notes

- All requests must use HTTPS; plain HTTP returns 403
- For 429 responses, use the `Retry-After` response header value (seconds to wait)
- 400 and 500 errors caused by large payloads can be resolved by splitting requests into smaller batches
- API usage is governed by Figma's Terms of Service; Figma may deny API access

## Related

- [Rate Limits](./rate-limits.md)
- [Files](./files.md)
