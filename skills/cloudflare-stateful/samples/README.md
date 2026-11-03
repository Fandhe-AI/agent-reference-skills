# samples

| Name | Description | Path |
| --- | --- | --- |
| Durable Object Counter (RPC) | A Worker routes `?name=A` to a named Durable Object that increments, decrements, and reads a counter through RPC methods. | [durable-object-counter.md](./durable-object-counter.md) |
| Durable Object Alarm Batching | Batch requests to one Durable Object and flush them from an `alarm()` handler 10 seconds after the first request. | [durable-object-alarm-batching.md](./durable-object-alarm-batching.md) |
| Durable Object In-Memory State | Keep the last access location in an instance field and observe that it is lost when the object is evicted. | [durable-object-in-memory-state.md](./durable-object-in-memory-state.md) |
| Durable Object Time To Live (TTL) | Delete a Durable Object's storage after a period without requests by re-arming an alarm on every request. | [durable-object-ttl.md](./durable-object-ttl.md) |
| Durable Object ReadableStream | Stream an incrementing number from a Durable Object to a Worker, and cancel the stream from the Worker side. | [durable-object-readable-stream.md](./durable-object-readable-stream.md) |
| Durable Object Metadata with RpcTarget | Pass per-caller metadata (such as the name used with `idFromName()`) to a Durable Object method through an `RpcTarget`. | [durable-object-rpctarget-metadata.md](./durable-object-rpctarget-metadata.md) |
| Use Workers KV from a Durable Object | Read and write a Workers KV namespace from inside a Durable Object, for example to serialize writes or fan out one read to many clients. | [durable-object-with-kv.md](./durable-object-with-kv.md) |
| WebSocket Server with Hibernation | A Durable Object WebSocket server using the WebSocket Hibernation API, so the object can be evicted while connections stay open. | [websocket-hibernation-server.md](./websocket-hibernation-server.md) |
| Publish to a Queue from a Worker | A Worker that validates a JSON body and publishes it to a queue through a producer binding. | [queues-publish-from-worker.md](./queues-publish-from-worker.md) |
| Publish to a Queue via HTTP | Push a message to a queue from any HTTP client using a Cloudflare API token with the `Queues Edit` permission. | [queues-publish-via-http.md](./queues-publish-via-http.md) |
| Publish to a Queue from a Durable Object | Route a request to a per-user Durable Object that publishes a message to a queue using its own `env` binding. | [queues-publish-from-durable-object.md](./queues-publish-from-durable-object.md) |
| Batch Errors from a Queue into R2 | One Worker acts as producer and consumer: it enqueues caught errors and writes each batch of errors to a log file in R2. | [queues-batch-errors-to-r2.md](./queues-batch-errors-to-r2.md) |
| Handle External API Rate Limits with Queues | Send emails through Resend (default limit: two requests per second) by queuing requests and consuming them in batches of two with delayed retries. | [queues-handle-rate-limits.md](./queues-handle-rate-limits.md) |
| Workflow: Pay Cart and Send Invoice | A Workflow that polls D1 until a cart is checked out, charges a payment processor, then emails an invoice, retrying each step independently. | [workflows-cart-invoice.md](./workflows-cart-invoice.md) |
| Workflow: Scheduled D1 Backup to R2 | A cron-scheduled Workflow that starts a D1 export through the REST API, polls until the dump is ready, and streams it into R2. | [workflows-d1-backup-to-r2.md](./workflows-d1-backup-to-r2.md) |
| Workflow: Human-in-the-Loop Approval with waitForEvent | Pause a Workflow until an external approval event arrives, then run an AI tagging step only if approved. | [workflows-wait-for-event-approval.md](./workflows-wait-for-event-approval.md) |
