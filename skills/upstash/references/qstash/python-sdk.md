# Python SDK (qstash-py)

`qstash` is the Python SDK for the QStash API: publish, schedule, logs, URL groups, DLQ, messages and signature verification. Repository: https://github.com/upstash/qstash-py.

## Signature / Usage

```bash
pip install qstash
```

```python
from qstash import QStash

client = QStash("<QSTASH_TOKEN>")
res = client.message.publish_json(
    url="https://my-api...",
    body={"hello": "world"},
    headers={"test-header": "test-value"},
    delay="3s",
)
print(res.message_id)
```

Async client:

```python
import asyncio

from qstash import AsyncQStash


async def main():
    client = AsyncQStash("<QSTASH_TOKEN>")
    await client.message.publish_json(...)


asyncio.run(main())
```

Schedules:

```python
schedule_id = client.schedule.create(
    destination="https://my-api...",
    cron="*/5 * * * *",
)
client.schedule.pause(schedule_id)
client.schedule.resume(schedule_id)
```

Receiver (signature verification):

```python
from qstash import Receiver

receiver = Receiver(
    current_signing_key="YOUR_CURRENT_SIGNING_KEY",
    next_signing_key="YOUR_NEXT_SIGNING_KEY",
)

signature, body = req.headers["Upstash-Signature"], req.body

receiver.verify(body=body, signature=signature, url="YOUR-SITE-URL")
```

## Options / Props

`client.message.publish_json(...)` parameters shown on the official examples:

| Name | Description |
| --- | --- |
| `url` | Destination URL |
| `url_group` | URL group name (response is an array of messages, one per URL) |
| `body` | JSON body |
| `headers` | Extra headers |
| `delay` | e.g. `"3s"` |
| `callback` / `failure_callback` | Callback URLs |
| `method` | HTTP method, default `POST` (e.g. `"GET"`) |
| `retries` | Retry count (max depends on plan) |
| `content_based_deduplication` | `True` to enable content-based deduplication |
| `timeout` | Timeout when calling the URL, e.g. `"30s"` |

`client.message.publish(url=..., body=..., content_type="text/html")` sends a non-JSON body. `client.schedule.create(destination=..., cron=..., callback=..., failure_callback=..., timeout=...)`; also `schedule.get(id)`, `schedule.list()`, `schedule.delete(id)`, `schedule.pause(id)`, `schedule.resume(id)`.

## Notes

- Client `retry` config (`retry={"retries": 3, "backoff": lambda retry_count: (2**retry_count) * 20}`) controls retries of requests sent to QStash, not QStash's delivery retry policy. Defaults: 5 retries, backoff `lambda retry_count: math.exp(retry_count) * 50`; pass `False` to disable.
- All examples can run async by importing `AsyncQStash` and awaiting the methods.
- Capabilities listed: publish to URL / URL group / API, delayed publish, schedules, message logs, URL group CRUD, DLQ read/remove, read/cancel messages, signature verification.
- The Python examples also cover `retry_delay`, a custom backoff expression; see the retry page.

## Related

- [publish.md](./publish.md)
- [schedules.md](./schedules.md)
- [receiver.md](./receiver.md)
- [retry.md](./retry.md)
