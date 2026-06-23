# Authentication

Stripe authenticates API requests using API keys. All requests must be made over HTTPS; requests without authentication or over plain HTTP will fail.

## Signature / Usage

```sh
curl https://api.stripe.com/v1/charges \
  -u sk_test_YOUR_KEY:
# Provide the key as the HTTP Basic Auth username; no password required.
# The trailing colon prevents curl from prompting for a password.
```

For cross-origin requests, use the Bearer token format:

```
Authorization: Bearer sk_test_YOUR_KEY
```

## Options / Props

| Key Type | Prefix | Use |
|----------|--------|-----|
| Test secret key | `sk_test_` | Server-side testing; no real charges |
| Live secret key | `sk_live_` | Server-side production |
| Restricted key | varies | Scoped permissions for limited access |
| Publishable key | `pk_test_` / `pk_live_` | Client-side (Stripe.js); cannot access most API resources |

## Notes

- Never embed secret or restricted keys in source code or client-side bundles.
- Store keys in a secrets vault or environment variables.
- All API requests must use HTTPS; HTTP requests are rejected.
- When using server-side SDKs, pass the key at client construction time; per-request key override is available for Connect use cases.

## Related

- [API Versioning](./api-versioning.md)
- [Error Handling](./error-handling.md)
