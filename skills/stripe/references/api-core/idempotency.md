# Idempotency

Idempotency lets you safely retry `POST` requests without accidentally performing the same operation twice. Stripe saves the status code and response body for a given idempotency key and replays that result on subsequent requests using the same key.

## Signature / Usage

```sh
curl https://api.stripe.com/v1/customers \
  -u sk_test_YOUR_KEY: \
  -H "Idempotency-Key: KG5LxwFBepaKHyUD" \
  -d description="My First Test Customer"
```

## Options / Props

| Header | Type | Description |
|--------|------|-------------|
| `Idempotency-Key` | string (max 255 chars) | Unique key per request; recommended: V4 UUID |

## Notes

- Use on all `POST` requests (create and update operations).
- `GET` and `DELETE` requests are inherently idempotent; do not add the header.
- Subsequent requests with the same key return identical results, including `500` errors.
- If the key is reused with **different parameters or a different endpoint**, the API returns an `idempotency_error`.
- Keys expire after at least 24 hours; after expiry the same key generates a new request.
- Results are only saved once endpoint execution begins — validation failures and concurrent conflicts do not save an idempotent result and can be safely retried.
- Do not use sensitive data (e.g., email addresses) as idempotency keys.

## Related

- [Error Handling](./error-handling.md)
- [Authentication](./authentication.md)
