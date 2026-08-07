<!-- source: https://platform.claude.com/docs/en/build-with-claude/batch-processing / last verified: 2026-08-07 -->

# Batch Processing

Create a Message Batch with multiple requests, poll until it ends, then stream and match results by `custom_id`.

```python
import time

from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request

client = anthropic.Anthropic()

message_batch = client.messages.batches.create(
    requests=[
        Request(
            custom_id="my-first-request",
            params=MessageCreateParamsNonStreaming(
                model="claude-opus-5",
                max_tokens=1024,
                messages=[{"role": "user", "content": "Hello, world"}],
            ),
        ),
        Request(
            custom_id="my-second-request",
            params=MessageCreateParamsNonStreaming(
                model="claude-opus-5",
                max_tokens=1024,
                messages=[{"role": "user", "content": "Hi again, friend"}],
            ),
        ),
    ]
)

# Poll until processing has ended
while True:
    message_batch = client.messages.batches.retrieve(message_batch.id)
    if message_batch.processing_status == "ended":
        break
    time.sleep(60)

# Stream results in memory-efficient chunks, matching by custom_id
for result in client.messages.batches.results(message_batch.id):
    match result.result.type:
        case "succeeded":
            print(f"Success! {result.custom_id}")
        case "errored":
            if result.result.error.error.type == "invalid_request_error":
                print(f"Validation error {result.custom_id}")
            else:
                print(f"Server error {result.custom_id}")
        case "expired":
            print(f"Request expired {result.custom_id}")
```

## Notes

- Each `custom_id` must match `^[a-zA-Z0-9_-]{1,64}$` and is the only reliable way to correlate a result with its request — results can come back in any order.
- A batch's `processing_status` starts as `in_progress` and moves to `ended`; most batches finish within an hour, but results are only guaranteed after 24 hours (the batch's hard expiration).
- Batch pricing is 50% of standard Messages API pricing; `stream: true`, `speed` (fast mode), and `max_tokens: 0` (cache pre-warming) are rejected inside a batch request.
- Batch requests support the same `cache_control` blocks as synchronous requests — put identical cache blocks in every request in the batch to raise the odds of cache hits (typically 30-98%, best-effort due to concurrent processing).
- Example from the Claude API (platform.claude.com) `build-with-claude/batch-processing` page.
