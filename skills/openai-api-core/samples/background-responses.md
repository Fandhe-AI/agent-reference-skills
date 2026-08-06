# Background Responses

Run a long-running Responses API call asynchronously with `background=True` and poll `status`, or pair it with a webhook to be notified on completion.

```python
from time import sleep
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-5.6",
    input="Write a very long novel about otters in space.",
    background=True,
)

while resp.status in ("queued", "in_progress"):
    sleep(2)
    resp = client.responses.retrieve(resp.id)

if resp.status != "completed":
    print(f"Background response ended in status={resp.status}, error={resp.error}")
else:
    print(resp.output_text)
```

## Notes

- `background=True` returns immediately with a response object whose `status` is `queued`/`in_progress`; poll `client.responses.retrieve(resp.id)` only while `status` is `queued`/`in_progress` — looping until `status == "completed"` never terminates if the response ends in `failed`/`cancelled`/`incomplete`, so treat those as errors after the loop instead.
- Or subscribe a webhook endpoint to receive `response.completed` / `response.failed` events (see `webhook-verification.md`).
- Background mode is useful for requests that would otherwise exceed typical HTTP client timeouts.
- Example from the OpenAI API (developers.openai.com) `guides/webhooks` page.
