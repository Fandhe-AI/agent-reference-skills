---
source: https://ai.google.dev/gemini-api/docs/api-errors
---

# API errors

Reference for all Interactions API error codes, the error response format, and how errors are delivered for standard and streaming (SSE) requests.

## Signature / Usage

Error response format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The value 'invalid_tool_type_xyz' is not supported for 'type' at 'tools[0]'. Supported values: 'function', 'code_execution', 'mcp_server', 'filesystem', 'google_maps', 'google_search', 'bash', 'computer_use', 'file_search', 'url_context'."
  }
}
```

Streaming (SSE, `stream: true`) error event:

```json
{
  "event_type": "error",
  "error": {
    "code": "not_found",
    "message": "Failed to get completed interaction: Result not found."
  }
}
```

## Options / Props

Error object fields:

| Field | Type | Description |
|---|---|---|
| `code` | string | A machine-readable error code in `snake_case`. |
| `message` | string | A human-readable description of what went wrong. |

Standard API error codes:

| Code | HTTP Status | Description | Recommended action |
|---|---|---|---|
| `invalid_request` | 400 Bad Request | Malformed payload or invalid parameters. | Check request syntax and parameters against the API reference. |
| `failed_precondition` | 400 Bad Request | A prerequisite is not met (for example, disabled billing). | Verify project billing status or account prerequisites. |
| `out_of_range` | 416 Requested Range Not Satisfiable | Request parameter is outside the valid range. | Check parameter values and limits. |
| `parameter_unknown` | 400 Bad Request | Unknown parameter. | Remove the unrecognized parameter and retry. |
| `authentication` | 401 Unauthorized | API key missing, invalid, or expired. | Verify your API key. |
| `payment_required` | 402 Payment Required | Prepay credit balance is depleted. | Add credits or turn on auto-reload. Do not retry until credits are added. |
| `permission_denied` | 403 Forbidden | API key lacks permission for this resource. | Check API key permissions and project access. |
| `not_found` | 404 Not Found | Resource not found. | Verify the resource path and parameters. |
| `model_not_found` | 404 Not Found | Model not found. | Verify the model name or fall back to a different model. |
| `already_exists` | 409 Conflict | The entity already exists. | Check before re-creating. |
| `aborted` | 409 Conflict | Aborted due to a conflict or concurrency check failure. | Retry at a higher application level. |
| `rate_limit_exceeded` | 429 Too Many Requests | Per-minute or per-second request or token limit exceeded. | Wait and retry with exponential backoff. |
| `quota_exceeded` | 429 Too Many Requests | Daily quota exceeded. | Wait until reset or request an increase. |
| `too_many_requests` | 429 Too Many Requests | Too many requests in a short period. | Wait and retry with exponential backoff. |
| `cancelled` | 499 Client Closed Request | Client cancelled before completion. | No action needed. |
| `api_error` | 500 Internal Server Error | Unexpected server error. | Retry; contact support if it persists. |
| `unimplemented` | 501 Not Implemented | Operation or feature not supported. | Check API capabilities. |
| `service_unavailable` | 503 Service Unavailable | Temporarily overloaded or down. | Wait and retry with exponential backoff. |
| `deadline_exceeded` | 504 Gateway Timeout | Request didn't finish within the deadline. | Remove or increase the client deadline to use the server default. |

Generation blocked codes (modify input and retry): `safety`, `recitation`, `language`, `prohibited_content`, `spii`, `blocklist`, `image_safety`, `image_prohibited_content`, `image_recitation`, `image_other`, `content_blocked`.

Generation error codes (structural issue in output): `malformed_function_call`, `malformed_tool_call`, `unexpected_tool_call`, `no_image`, `too_many_tool_calls`, `missing_thought_signature`.

## Notes

- Availability: Interactions API. Any error code not listed falls back to the `snake_case` version of the HTTP status.
- Standard requests set the HTTP status code and return the `error` object in the JSON body; streaming requests deliver it as an SSE event with `event_type` `"error"`.
- Docs fetched 2026-10-16.

## Related

- [troubleshooting](./troubleshooting.md)
- [rate-limits](./rate-limits.md)
- [billing](./billing.md)
