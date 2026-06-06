# qstash

| Name | Description | Path |
| --- | --- | --- |
| Overview | SDK installation, `Client` constructor options, environment variables | [overview.md](./overview.md) |
| publishJSON / publish | Publish a single message to a URL or URL Group with all delivery options | [publish.md](./publish.md) |
| batchJSON | Publish multiple messages in one API call; mix URLs, URL Groups, and queues | [batch.md](./batch.md) |
| Schedules | Create and manage cron-based recurring message delivery | [schedules.md](./schedules.md) |
| Queues | FIFO ordered delivery with configurable parallelism; enqueue, pause, resume | [queues.md](./queues.md) |
| Dead Letter Queue (DLQ) | List, retry, and delete messages that exhausted all delivery retries | [dlq.md](./dlq.md) |
| Callbacks | Receive delivery results (`callback`) or failure notifications (`failureCallback`) at a URL | [callbacks.md](./callbacks.md) |
| URL Groups | Fan-out: publish once to deliver to multiple subscribed endpoints | [url-groups.md](./url-groups.md) |
| Receiver | Verify incoming requests are signed by QStash (`Receiver.verify`, Next.js helpers) | [receiver.md](./receiver.md) |
| Messages | Retrieve and cancel in-flight messages by ID | [messages.md](./messages.md) |
| Flow Control | Rate limiting and concurrency control per named key | [flow-control.md](./flow-control.md) |
