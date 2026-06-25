# Identifying Rate Limits

The App Store Connect API limits request volume per API key per rolling hour window.

## Signature / Usage

Every API response includes the `X-Rate-Limit` header:

```
X-Rate-Limit: user-hour-lim:3500;user-hour-rem:500;
```

## Options / Props

| Header Value | Description |
|-------------|-------------|
| `user-hour-lim` | Total requests allowed per hour with this API key |
| `user-hour-rem` | Requests remaining in the current rolling 60-minute window |

## Notes

- Limits apply per API key, not per IP address
- When the limit is exceeded, the API returns HTTP `429` with error code `RATE_LIMIT_EXCEEDED`
- Best practices: throttle periodic polling; implement retry logic with backoff on 429 errors

## Related

- [Generating Tokens for API Requests](./generating-tokens.md)
- [Error Handling](./error-handling.md)
