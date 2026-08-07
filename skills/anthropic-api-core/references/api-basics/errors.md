<!-- source: https://platform.claude.com/docs/en/api/errors / last verified: 2026-08-07 -->

# Claude API errors

HTTP status codes, error response shape, request IDs, and typed SDK exceptions returned by the Claude API.

## Signature / Usage

```json
{
  "type": "error",
  "error": { "type": "not_found_error", "message": "The requested resource could not be found." },
  "request_id": "req_011CSHoEeqs5C35K2UUqR7Fy"
}
```

## Options / Props

| Status | Error type | Meaning |
|---|---|---|
| 400 | `invalid_request_error` | Malformed/invalid request (also used for other unlisted 4XX) |
| 401 | `authentication_error` | API key issue (malformed, revoked, expired) or AWS SigV4 problem on Claude Platform on AWS |
| 402 | `billing_error` | Billing/payment issue |
| 403 | `permission_error` | API key lacks permission for the resource |
| 404 | `not_found_error` | Resource not found |
| 409 | `conflict_error` | Concurrent modification or uniqueness conflict |
| 413 | `request_too_large` | Exceeds max request size |
| 429 | `rate_limit_error` | Rate limit hit |
| 500 | `api_error` | Internal error; retry with exponential backoff |
| 504 | `timeout_error` | Request timed out; consider streaming |
| 529 | `overloaded_error` | API temporarily overloaded |

## Notes

- SDKs auto-retry transient failures (connection errors, rate limits, 5xx) twice by default with exponential backoff, honoring `retry-after`; configurable per client.
- SDKs raise typed exceptions per language (e.g. `anthropic.NotFoundError` in Python, `Anthropic::Errors::NotFoundError` in Ruby, `com.anthropic.errors.NotFoundException` in Java, a single `*anthropic.Error` in Go) — catch these instead of string-matching, most-specific first.
- Every response has a `request-id` header, mirrored as `request_id` in error bodies; include it when contacting support. On Claude Platform on AWS, responses also carry `x-amzn-requestid` (primary for CloudTrail).
- Mid-stream SSE errors after a 200 response don't follow these standard mechanisms — see streaming error events.
- For requests over ~10 minutes, use the streaming Messages API or Message Batches API rather than a large non-streaming `max_tokens`, since idle connections may be dropped; SDKs validate this and set TCP keep-alive.
- Common validation errors: assistant-message prefill unsupported on Claude 4.6+/Mythos models; edited/reordered `thinking`/`redacted_thinking` blocks in the latest assistant message are rejected; `thinking.type.enabled` unsupported on Claude 4.7+ (use `adaptive` + `output_config.effort`); `thinking.type.adaptive` unsupported on Claude 4.5 and earlier (use `enabled` + `budget_tokens`); `thinking.type.disabled` unsupported on Fable 5 / Mythos (thinking is always on — omit the param, or set `display: "omitted"`).

## Related

- [beta-headers](./beta-headers.md)
- [rate-limits](./rate-limits.md)
- [versioning](./versioning.md)
