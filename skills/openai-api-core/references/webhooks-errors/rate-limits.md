# Rate Limits

Restrictions the OpenAI API imposes on requests/tokens within a time window, applied at the organization and project level, using metrics such as RPM, TPM, RPD, TPD, and IPM.

## Signature / Usage

```python
# Manual exponential backoff pattern (also handled automatically by official SDKs)
import random
import time
import openai
from openai import OpenAI

client = OpenAI()

def retry_with_exponential_backoff(
    func,
    initial_delay: float = 1,
    exponential_base: float = 2,
    jitter: bool = True,
    max_retries: int = 10,
    errors: tuple = (openai.RateLimitError,),
):
    """Retry a function with exponential backoff."""
    def wrapper(*args, **kwargs):
        num_retries = 0
        delay = initial_delay
        while True:
            try:
                return func(*args, **kwargs)
            except errors:
                num_retries += 1
                if num_retries > max_retries:
                    raise Exception(
                        f"Maximum number of retries ({max_retries}) exceeded."
                    )
                delay *= exponential_base * (1 + jitter * random.random())
                time.sleep(delay)
            except Exception:
                raise
    return wrapper

@retry_with_exponential_backoff
def completions_with_backoff(**kwargs):
    return client.completions.create(**kwargs)
```

## Options / Props

| Header | Description |
|--------|-------------|
| `Retry-After` | Minimum number of seconds to wait before retrying a temporary rate-limit error |
| `x-ratelimit-limit-requests` | Maximum number of requests permitted before exhausting the rate limit |
| `x-ratelimit-limit-tokens` | Maximum number of tokens permitted before exhausting the rate limit |
| `x-ratelimit-remaining-requests` | Remaining number of requests permitted before exhausting the rate limit |
| `x-ratelimit-remaining-tokens` | Remaining number of tokens permitted before exhausting the rate limit |
| `x-ratelimit-reset-requests` | Time until the request-based rate limit resets to its initial state |
| `x-ratelimit-reset-tokens` | Time until the token-based rate limit resets to its initial state |
| `x-ratelimit-limit-project-tokens` | Token limit scoped to the project |
| `x-ratelimit-remaining-project-tokens` | Remaining tokens before exhausting the project-scoped token rate limit |
| `x-ratelimit-reset-project-tokens` | Time until the project-scoped token rate limit resets |

### Usage tiers

| Tier | Qualification | Usage Limit |
|------|---------------|-------------|
| Free | Must be in an allowed geography | $100/month |
| Build | $5 in total credit purchases | $500/month |
| Launch | $100 in total credit purchases | $5,000/month |
| Grow | $500 in total credit purchases | $200,000/month |

On 2026-10-06 usage tiers were simplified from five to three (Build, Launch, Grow); organizations upgrade automatically as total credit purchases reach each threshold.

### Standard rate limits

Per-model limits for your tier are in Settings > Organization > Limits. These differ from Ultrafast rate limits.

| Tier | Model | RPM | TPM |
|------|-------|-----|-----|
| Build | Astra, Sol, Terra | 5,000 | 1,000,000 |
| Build | Luna | 5,000 | 2,000,000 |
| Launch | Astra, Sol, Terra | 10,000 | 4,000,000 |
| Launch | Luna | 10,000 | 10,000,000 |
| Grow | Astra, Sol, Terra | 15,000 | 40,000,000 |
| Grow | Luna | 30,000 | 180,000,000 |

### Handle rapid traffic increases and model overload

| HTTP status | Error type | Error code | What it means | What to do |
|-------------|------------|------------|---------------|------------|
| `429` | `rate_limit_error` | `slow_down` | Request rate increased too quickly | Follow `Retry-After` when present, reduce the rate, then increase gradually |
| `503` | `service_unavailable_error` | `server_is_overloaded` | The requested model is temporarily overloaded | Follow `Retry-After` when present, then retry; if it continues, increase the delay between attempts |

- If `Retry-After` is missing, increase the delay between retries and add a small random delay.
- `slow_down` can occur even within RPM/TPM limits. Rule of thumb: once traffic reaches 1M input TPM, increase it by no more than 50% every 15 minutes.
- Updating existing handlers: endpoints that previously returned `503` with `slow_down` for both conditions now return `429` with `slow_down` for rapid traffic increases; model overload stays `503` with `server_is_overloaded`. Video requests rejected before job creation previously returned `429` / `invalid_request_error` / `rate_limit_exceeded`.
- Handle both `429` and `503` in SDK handlers: Python, TypeScript, and Ruby use `RateLimitError` (`429`) and `InternalServerError` (`503`); Java uses `RateLimitException` and `InternalServerException`.
- For streaming requests these HTTP errors apply before the stream starts; an error after streaming begins can arrive as a stream event — do not automatically replay a request after consuming output.

## Notes

- Rate limits apply at the organization/project level, not per individual user; they vary by model, and some model families share a combined limit.
- Vector store ingestion is rate limited per vector store ID: `/vector_stores/{vector_store_id}/files` and `/vector_stores/{vector_store_id}/file_batches` share 300 requests per minute per vector store; prefer `file_batches` for larger ingests.
- Project-token headers (`x-ratelimit-*-project-tokens`) may be present when a project-scoped token limit applies. `Retry-After` may be present on `429` (temporary rate limit) and `503` (temporary model overload) responses; it does not make quota or billing errors retryable.
- Organizations advance tiers automatically based on total credit purchases.
- Mitigation strategies: exponential backoff with jitter on 429s, reducing `max_tokens` to the expected response size, using the Batch API for non-synchronous work, and batching requests to maximize TPM utilization.
- Official OpenAI SDKs automatically retry eligible rate-limit errors and honor `Retry-After`.

## Related

- [Error codes](./error-codes.md)
