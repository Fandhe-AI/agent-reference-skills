---
source: https://developers.cloudflare.com/queues/get-started/
---

# Get started with Queues

Create a queue, a producer Worker that publishes to it, and a consumer Worker that logs the messages.

## Signature / Usage

```sh
npm create cloudflare@latest -- producer-worker
cd producer-worker
npx wrangler queues create <MY-QUEUE-NAME>
```

Producer binding in `wrangler.jsonc`:

```jsonc
{
	"queues": {
		"producers": [
			{
				"queue": "MY-QUEUE-NAME",
				"binding": "MY_QUEUE"
			}
		]
	}
}
```

Adapted (not in the official docs): the placeholder `<MY_QUEUE>` is replaced with the valid identifier `MY_QUEUE` and the `Env` interface is declared in the snippet; the Cookie and Authorization headers are dropped before the request is stored in the queue; see Notes.

```ts
interface Env {
  MY_QUEUE: Queue;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const headers = new Headers(request.headers);
    headers.delete("cookie");
    headers.delete("authorization");
    const log = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(headers),
    };
    await env.MY_QUEUE.send(log);
    return new Response("Success!");
  },
  async queue(batch, env, ctx): Promise<void> {
    for (const message of batch.messages) {
      console.log("consumed from our queue:", JSON.stringify(message.body));
    }
  },
} satisfies ExportedHandler<Env>;
```

Consumer binding (add alongside the producer):

```jsonc
{
	"queues": {
		"consumers": [
			{
				"queue": "<MY-QUEUE-NAME>",
				"max_batch_size": 10, // optional: defaults to 10
				"max_batch_timeout": 5 // optional: defaults to 5 seconds
			}
		]
	}
}
```

Deploy and watch the consumer:

```sh
npx wrangler deploy
npx wrangler tail
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| queue name | string | — | 1 to 63 characters; only letters, digits and dashes; must start and end with a letter or number. Cannot be changed after creation. |
| `binding` | string | — | Must be a valid JavaScript variable name; used as `env.<binding>`. |
| `max_batch_size` | number | 10 | Messages per batch delivered to the consumer. |
| `max_batch_timeout` | number | 5 | Seconds to wait before delivering a partial batch. |

## Notes

- Corrected from the official docs: the page writes `env.<MY_QUEUE>.send(log)` and `<MY_QUEUE>: Queue`, which are not valid TypeScript; `<MY_QUEUE>` is a placeholder for the binding name.
- Adapted from the official docs: the official example enqueues all request headers, which would persist Cookie and Authorization values in the queue; they are removed here.
- Corrected from the official docs: the page says batch timeout is "configured for 10 seconds" in step 5, but the configured value (and default) is 5 seconds.
- The producer enqueues a message for every request it receives and has no authentication, so anyone who can reach the Worker URL can add messages (each one a billed operation). Put it behind authentication before exposing it; the publish-from-worker sample in this skill shows a fail-closed bearer-token check.
- Each queue can have only one consumer Worker; connecting a second one fails at deploy.
- Without a consumer, messages stay on the queue until retention expires (default 4 days).
- If you use R2 Bucket Event Notifications you do not need a producer Worker. See https://developers.cloudflare.com/r2/buckets/event-notifications/.
- Use `waitUntil()` for asynchronous work that finishes after the handler returns.

## Related

- [How Queues works](./how-queues-works.md)
- [Configure Queues](./configure-queues.md)
- [Producer API](./producer-api.md)
- [Consumer API](./consumer-api.md)
