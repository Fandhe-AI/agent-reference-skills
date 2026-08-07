# qstash

| Name | Description | Path |
|------|-------------|------|
| batchJSON | Publish multiple messages in a single API call. Each message is independent—if one fails, others still process. | [batch.md](./batch.md) |
| Callbacks | Receive delivery results at a specified URL. `callback` fires on every delivery attempt result; `failureCallback` fires only after all retries are exhausted. | [callbacks.md](./callbacks.md) |
| Dead Letter Queue (DLQ) | Messages that exhaust all delivery retries are automatically moved to the Dead Letter Queue. DLQ messages can be retried or deleted individually or in bulk. | [dlq.md](./dlq.md) |
| Flow Control | Rate limiting and parallelism control for message delivery. Group messages under a named key and configure how many can be delivered per time window and how many can be active concurrently. | [flow-control.md](./flow-control.md) |
| Logs | Retrieve request/message delivery logs for debugging—message lifecycle state, delivery attempts, and response details. | [logs.md](./logs.md) |
| Messages | Retrieve and cancel in-flight messages by ID. | [messages.md](./messages.md) |
| QStash Overview | Serverless messaging and scheduling solution. Acts as middleware between services—handles durable message delivery, automatic retries, scheduling, and fan-out without managing infrastructure. | [overview.md](./overview.md) |
| publishJSON / publish | Publish a single message to a URL or URL Group. `publishJSON` serializes the body as JSON and sets `Content-Type: application/json` automatically. | [publish.md](./publish.md) |
| Queues | FIFO ordered message delivery. Messages in a queue are processed one at a time (default parallelism: 1); the next message waits until the current delivery—including callbacks and retries—completes. | [queues.md](./queues.md) |
| Receiver | Verifies that incoming HTTP requests originate from QStash. Uses HMAC SHA-256 signed JWTs sent in the `Upstash-Signature` header. Supports automatic key rotation via `currentSigningKey` / `nextSigningKey`. | [receiver.md](./receiver.md) |
| Schedules | Create and manage cron-based recurring message delivery. QStash publishes the configured message automatically on each cron tick. | [schedules.md](./schedules.md) |
| URL Groups | Fan-out mechanism. Publishing once to a URL Group creates an independent delivery task for each subscribed endpoint. Each task has its own retry lifecycle. | [url-groups.md](./url-groups.md) |
