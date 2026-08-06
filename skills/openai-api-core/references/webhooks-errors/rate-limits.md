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
| Tier 1 | $5 paid | $100/month |
| Tier 2 | $50 paid | $500/month |
| Tier 3 | $100 paid | $1,000/month |
| Tier 4 | $250 paid | $5,000/month |
| Tier 5 | $1,000 paid | $200,000/month |

## Notes

- Rate limits apply at the organization/project level, not per individual user; they vary by model, and some model families share a combined limit.
- Organizations advance tiers automatically based on cumulative spend.
- Mitigation strategies: exponential backoff with jitter on 429s, reducing `max_tokens` to the expected response size, using the Batch API for non-synchronous work, and batching requests to maximize TPM utilization.
- Official OpenAI SDKs automatically retry eligible rate-limit errors and honor `Retry-After`.

## Related

- [Error codes](./error-codes.md)
