# Error Codes

Overview of HTTP error codes returned by the OpenAI API and the corresponding exception classes raised by the Python library, with causes and solutions.

## Options / Props

| Code | Cause | Solution |
|------|-------|----------|
| 401 - Invalid Authentication | Invalid authentication credentials | Ensure the correct API key and organization/project are being used |
| 401 - Incorrect API key provided | API key is incorrect, malformed, or cached | Clear cache, verify the key, or generate a new one from account settings |
| 401 - Member requirement | Account is not part of an organization | Contact an org admin to be invited, or create a new organization |
| 401 - IP not authorized | Request IP does not match the org's allowlist | Send from an authorized IP or update the allowlist |
| 403 - Unsupported region | Accessing the API from an unsupported country/region | Check the list of supported countries/regions in the docs |
| 429 - Credit balance exhausted | No prepaid credits remaining | Add credits in billing settings |
| 429 - Rate limit reached | Too many requests sent in a short period | Pace requests, implement backoff, and honor the `Retry-After` header |
| 429 - Organization spend limit | Organization reached its configured monthly spend limit | Increase or remove the spend limit |
| 429 - Project spend limit | Project reached its configured monthly spend limit | Adjust the limit in project settings |
| 429 - Usage limit reached | OpenAI-assigned usage limit reached | Request a higher limit or contact support |
| 500 - Server error | Issue on OpenAI's servers | Retry after a brief wait; check the status page |
| 503 - Overloaded | High traffic on OpenAI's servers | Retry after a brief wait, using exponential backoff |
| 503 - Slow Down | Sudden traffic surge affecting reliability | Reduce request rate and ramp up gradually |

## Python SDK exception classes

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
| `RateLimitError` | Exceeded the assigned rate limit for API usage |

## Notes

- Handle errors programmatically with try/catch around SDK calls, checking `error.status` / exception class rather than parsing message text.
- For persistent issues, contact support with the model, exact error message, and timestamps of failed requests.

## Related

- [Rate limits](./rate-limits.md)
