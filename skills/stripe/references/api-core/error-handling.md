# Error Handling

Stripe uses standard HTTP status codes for success and failure. Failed requests return a JSON error object with machine-readable `type` and `code` fields alongside a human-readable `message`.

## Signature / Usage

```json
{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "decline_code": "insufficient_funds",
    "message": "Your card has insufficient funds.",
    "param": null,
    "charge": "ch_abc123"
  }
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `2xx` | Success |
| `400` | Bad Request — missing or invalid parameters |
| `401` | Unauthorized — no valid API key |
| `402` | Request Failed — valid params but operation failed (e.g., card declined) |
| `403` | Forbidden — insufficient key permissions |
| `404` | Not Found — resource does not exist |
| `409` | Conflict — idempotency key reused with different params/endpoint |
| `429` | Too Many Requests — rate limit exceeded; use exponential backoff |
| `5xx` | Server Error — Stripe-side issue (rare) |

## Error Object Attributes

| Field | Type | Description |
|-------|------|-------------|
| `type` | enum | Error category (see Error Types below). |
| `message` | string | Human-readable description; safe to display to users. |
| `code` | string | Short programmatic error code. |
| `param` | string | The request parameter that caused the error. |
| `doc_url` | string | Link to relevant error documentation. |
| `decline_code` | string | Card issuer's reason for decline (`card_error` only). |
| `advice_code` | string | Recommended next step for issuer declines. |
| `charge` | string | ID of the failed Charge object (`card_error` only). |
| `request_log_url` | string | Link to the request log in the Stripe Dashboard. |

## Error Types

| Type | Description |
|------|-------------|
| `card_error` | Most common — card declined or cannot be charged. |
| `invalid_request_error` | Request parameters are invalid or missing. |
| `idempotency_error` | `Idempotency-Key` reused with different endpoint or parameters. |
| `api_error` | Temporary Stripe server problem (extremely rare). |

## Notes

- Check `decline_code` and `advice_code` on `card_error` to determine whether to retry.
- Use the `param` field to highlight the offending form field in your UI.
- For `429` errors, implement exponential backoff before retrying.
- The `message` field for `card_error` is designed to be shown directly to end users.
- Use `request_log_url` to debug requests in the Stripe Dashboard.

## Related

- [Idempotency](./idempotency.md)
- [Authentication](./authentication.md)
