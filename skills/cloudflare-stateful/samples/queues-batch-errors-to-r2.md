---
source: https://developers.cloudflare.com/queues/examples/send-errors-to-r2/
---

# Batch Errors from a Queue into R2

One Worker acts as producer and consumer: it enqueues caught errors and writes each batch of errors to a log file in R2.

## Signature / Usage

Wrangler configuration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"queues": {
		"producers": [
			{
				"queue": "my-queue",
				"binding": "ERROR_QUEUE"
			}
		],
		"consumers": [
			{
				"queue": "my-queue",
				"max_batch_size": 100,
				"max_batch_timeout": 30
			}
		]
	},
	"r2_buckets": [
		{
			"bucket_name": "my-bucket",
			"binding": "ERROR_BUCKET"
		}
	]
}
```

Adapted (not in the official docs): the 500 response no longer echoes the error message, the queued fields are truncated so a message stays under the 128 KB limit, a failed `send()` is logged instead of escaping the `catch`, and the R2 key adds `crypto.randomUUID()` so concurrent consumer invocations do not overwrite each other. See Notes.

```ts
interface ErrorMessage {
	message: string;
	stack?: string;
}

interface Env {
	readonly ERROR_QUEUE: Queue<ErrorMessage>;
	readonly ERROR_BUCKET: R2Bucket;
}

// Keep each queued message well under the 128 KB per-message limit
// (even if every character expanded to a 6-byte JSON escape, two fields stay under 100 KB).
const MAX_FIELD_CHARS = 8 * 1024;

export default {
  async fetch(req, env, ctx): Promise<Response> {
    try {
      return doRequest(req);
    } catch (e) {
      const error: ErrorMessage = {
        message: (e instanceof Error ? e.message : String(e)).slice(0, MAX_FIELD_CHARS),
        stack: e instanceof Error ? e.stack?.slice(0, MAX_FIELD_CHARS) : undefined,
      };
      try {
        await env.ERROR_QUEUE.send(error);
      } catch (sendError) {
        console.error("failed to enqueue error", sendError);
      }
      return new Response("Internal Server Error", { status: 500 });
    }
  },
  async queue(batch, env, ctx): Promise<void> {
    let file = "";
    for (const message of batch.messages) {
      const error = message.body;
      file += error.stack ?? error.message;
      file += "\r\n";
    }
    // Unique per invocation: consumers can run concurrently in the same millisecond.
    await env.ERROR_BUCKET.put(`errors/${Date.now()}-${crypto.randomUUID()}.log`, file);
  },
} satisfies ExportedHandler<Env, ErrorMessage>;

function doRequest(request: Request): Response {
  if (Math.random() > 0.5) {
    return new Response("Success!");
  }
  throw new Error("Failed!");
}
```

## Notes

- Adapted from the official docs: the official handler returns `error.message` as the 500 response body, which can leak internals to the client; a generic body is returned and the detail goes to the queue.
- Adapted from the official docs: `message` and `stack` are truncated to 8,192 UTF-16 code units each, so the serialized message stays under the 128 KB per-message limit, and a failing `send()` is logged rather than turning the 500 into an unhandled exception.
- Adapted from the official docs: the official R2 key is `errors/${Date.now()}.log`. With consumer concurrency above one, two batches written in the same millisecond would overwrite each other; the key now appends `crypto.randomUUID()`.
- `doRequest` is synchronous here (as in the official example), so `return doRequest(req)` inside `try` lets the `catch` see its exceptions. If you make it `async`, use `return await doRequest(req)`; otherwise a rejected promise bypasses the `catch`.
- A batch is delivered when it reaches `max_batch_size` (100) messages or `max_batch_timeout` (30 seconds) elapses, whichever comes first.
- If `queue()` throws (for example, the R2 `put()` fails), the whole batch is retried. Delivery is at-least-once, so a retry after a successful `put()` whose acknowledgement was lost writes the same errors to a second object; deduplicate downstream if that matters.
- `doRequest` is a random-failure stand-in for real request handling.

## Related

- [Consumer API](../references/queues/consumer-api.md)
- [Batching and retries](../references/queues/batching-retries.md)
- [Delivery guarantees](../references/queues/delivery-guarantees.md)
- [Configure queues](../references/queues/configure-queues.md)
