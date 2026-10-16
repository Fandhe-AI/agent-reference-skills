# Error Codes

Overview of HTTP error codes returned by the OpenAI API and the corresponding exception classes raised by the Python library, with causes and solutions.

## Options / Props

| Code | Cause | Solution |
|------|-------|----------|
| 400 - Invalid `service_tier` argument | The requested or resolved service tier is not allowed for the project (`invalid_request_error`, `error.param` = `service_tier`) | Set `service_tier` to a tier allowed for the project, or update the allowed tiers in project settings |
| 401 - Invalid Authentication | Invalid authentication credentials | Ensure the correct API key and organization/project are being used |
| 401 - Incorrect API key provided | API key is incorrect, malformed, or cached | Clear cache, verify the key, or generate a new one from account settings |
| 401 - Member requirement | Account is not part of an organization | Contact an org admin to be invited, or create a new organization |
| 401 - IP not authorized | Request IP does not match the org's allowlist | Send from an authorized IP or update the allowlist |
| 403 - Country, region, or territory not supported | Accessing the API from an unsupported country, region, or territory | Check the list of supported countries/regions in the docs |
| 429 - Credit balance exhausted | `error.code` `credit_balance_exhausted`: no prepaid credits remaining | Add credits in billing settings |
| 429 - Rate limit reached for requests | Requests sent too quickly | Pace requests and honor the `Retry-After` header when present |
| 429 - Slow down | `error.type` `rate_limit_error`, `error.code` `slow_down`: request rate increased too quickly (can occur even within RPM/TPM limits) | Follow `Retry-After`, reduce the request rate, then increase it gradually |
| 429 - Organization spend limit reached | `error.code` `organization_spend_limit_exceeded`: organization reached its enforced spend limit | Increase or remove the organization spend limit |
| 429 - Project spend limit reached | `error.code` `project_spend_limit_exceeded`: project reached its enforced spend limit | Increase or remove the limit in project settings |
| 429 - Organization usage limit reached | `error.code` `organization_usage_limit_exceeded`: OpenAI-assigned usage limit reached | Request a higher approved usage limit or contact support |
| 500 - Server error | Issue on OpenAI's servers | Retry after a brief wait; check the status page |
| 503 - Model temporarily overloaded | `error.type` `service_unavailable_error`, `error.code` `server_is_overloaded`: the requested model lacks capacity right now | Follow `Retry-After` when present, then retry; if it continues, check the status page |

## Notes

- Handle errors programmatically with try/catch around SDK calls, checking `error.status` / exception class rather than parsing message text.
- Python raises `RateLimitError` for `429` and `InternalServerError` for `503`. Handle both for throttling/overload and inspect `error.code`; video overload, for example, now returns `503` where it previously returned `429`.
- For persistent issues, contact support with the model, exact error message, and timestamps of failed requests.

### Notes on specific errors

- Billing-related errors: inspect `error.code` to identify the cause; `error.type` can still be `insufficient_quota`. Retrying billing, spend, or quota errors will not restore access — update credits or limits first.
- `400 - Invalid service_tier argument`: project restrictions apply to the `default`, `flex`, and `priority` tiers. The `fast` tier is evaluated as `priority`. Requests that omit `service_tier` or use `auto` can also fail if they resolve to a disallowed tier. Scale Tier is outside this project policy.
- `429 - Slow down`: rule of thumb — once traffic reaches 1 million input TPM, increase it by no more than 50% every 15 minutes (exact threshold varies by model and traffic).

### WebSocket mode errors

| Code | Meaning |
|------|---------|
| `previous_response_not_found` | `previous_response_id` cannot be resolved from available state; retry with full input context and `previous_response_id` set to `null` |
| `websocket_connection_limit_reached` | The connection hit the 60-minute limit; open a new connection and continue |

### Python SDK exception classes

| Class | Description |
|-------|-------------|
| `APIConnectionError` | Issue connecting to OpenAI services due to network or configuration problems |
| `APITimeoutError` | Request took too long to complete and the connection was closed |
| `AuthenticationError` | API key or token was invalid, expired, or revoked |
| `BadRequestError` | Request was malformed or missing required parameters |
| `ConflictError` | Resource was updated by another concurrent request |
| `InternalServerError` | Something went wrong on OpenAI's side while processing the request |
| `NotFoundError` | Requested resource does not exist |
| `PermissionDeniedError` | Insufficient access to the requested resource |
| `RateLimitError` | Exceeded the assigned rate limit or increased traffic too quickly |
| `UnprocessableEntityError` | Unable to process the request despite correct format; try again |

## Related

- [Rate limits](./rate-limits.md)
