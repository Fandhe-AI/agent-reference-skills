---
source: https://docs.cloud.google.com/model-armor/retry-strategy
---

# Retry strategy

Best practices for retrying failed Model Armor API requests: for requests that are safe to retry, use truncated exponential backoff with jitter, so retries do not exceed the Model Armor quotas and limits that apply to every resource in your project, and clients do not cause a thundering herd.

## Signature / Usage

### Wait time before each retry

Before each retry, wait `min((2^n + random-fraction), maximum-backoff)` seconds, with `n` starting at 0 and incremented by 1 for each retry. Retry only requests that are safe to retry, such as the following read-only template request:

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://modelarmor.LOCATION.rep.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID"
```

## Options / Props

### Algorithm

| Step | Action |
|------|--------|
| 1 | Send a request to Model Armor |
| 2 | On failure, wait 1 + `random-fraction` seconds, then retry |
| 3 | On failure, wait 2 + `random-fraction` seconds, then retry |
| 4 | On failure, wait 4 + `random-fraction` seconds, then retry |
| 5 | Continue waiting 2^n + `random-fraction` seconds after each retry, up to `maximum-backoff` |
| 6 | After `deadline` seconds, stop retrying |

### Parameters

| Name | Description |
|------|-------------|
| `random-fraction` | A random fractional value less than or equal to 1; use a different value for each retry so clients do not synchronize |
| `maximum-backoff` | Maximum seconds to wait between retries; typical values are 32 or 64 (2^5 or 2^6) seconds |
| `deadline` | Maximum seconds to keep sending retries; for example, 300 seconds (5 minutes) for a CI/CD pipeline that is not highly time-sensitive |

### Errors to retry

| Error code | Retry |
|------------|-------|
| `500`, `502`, `503`, `504` | Use this strategy |
| `429` | Optional |

## Notes

- Source: https://docs.cloud.google.com/model-armor/retry-strategy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Retry only requests that are safe to retry. For `gcloud model-armor templates create`, `update` and `delete`, the gcloud 593.0.0 help describes `--request-id` (a UUID that the server stores for 60 minutes after the first request) so that the server can ignore a repeated request.
- The source writes the exponent as a superscript (2^n^ in its step list; the inline formula reads `2n` once the superscript is lost); it means 2 to the power `n`.
- The source page has no code sample. Snippet taken from https://docs.cloud.google.com/model-armor/manage-templates (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-templates.md](./manage-templates.md)
- Quotas and limits: https://docs.cloud.google.com/model-armor/quotas
