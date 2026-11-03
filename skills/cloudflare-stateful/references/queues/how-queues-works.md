---
source: https://developers.cloudflare.com/queues/reference/how-queues-works/
---

# How Queues Works

Architecture of Cloudflare Queues: queues, producers, consumers and messages.

## Signature / Usage

Adapted (not in the official docs): Cookie and Authorization headers are removed before the request is enqueued; see Notes.

```ts
interface Env {
  readonly MY_FIRST_QUEUE: Queue;
}

export default {
  async fetch(req, env, ctx): Promise<Response> {
    const headers = new Headers(req.headers);
    headers.delete("cookie");
    headers.delete("authorization");
    const message = {
      url: req.url,
      method: req.method,
      headers: Object.fromEntries(headers),
    };

    await env.MY_FIRST_QUEUE.send(message); // This will throw an exception if the send fails for any reason
    return new Response("Sent!");
  },
} satisfies ExportedHandler<Env>;
```

Consumer Worker:

```ts
interface Env {
  // Add your bindings here, e.g. KV namespaces, R2 buckets, D1 databases
}

export default {
  async queue(batch, env, ctx): Promise<void> {
    // Do something with messages in the batch
    // i.e. write to R2 storage, D1 database, or POST to an external API
    for (const msg of batch.messages) {
      // Process each message
      console.log(msg.body);
    }
  },
} satisfies ExportedHandler<Env>;
```

Consume several queues with one handler by switching on `batch.queue`:

```ts
interface Env {
  // Add your bindings here
}

export default {
  async queue(batch, env, ctx): Promise<void> {
    // MessageBatch has a `queue` property we can switch on
    switch (batch.queue) {
      case "log-queue":
        // Write the batch to R2
        break;
      case "debug-queue":
        // Write the message to the console or to another queue
        break;
      case "email-reset":
        // Trigger a password reset email via an external API
        break;
      default:
        // Handle messages we haven't mentioned explicitly (write a log, push to a DLQ)
        break;
    }
  },
} satisfies ExportedHandler<Env>;
```

Remove a consumer:

```sh
npx wrangler queues consumer remove <QUEUE-NAME> <SCRIPT-NAME>
```

## Options / Props

| Concept | Type | Default | Description |
| --- | --- | --- | --- |
| Queue | buffer | — | Automatically scales as messages are written; messages are not deleted until a consumer has consumed them successfully. |
| Producer | client | — | A Worker with a queue binding that calls `send()` / `sendBatch()`. No limit on the number of producer Workers per queue; one Worker can bind several queues. |
| Consumer | client | — | Either a push-based consumer Worker (`queue()` handler) or an HTTP pull consumer. A queue can have only one type of consumer, and only one active consumer. |
| Message | object | JSON content type | Any structured-clone-serializable value; default content type is `json`. |

## Notes

- The producer enqueues a message for every request it receives and has no authentication, so anyone who can reach the Worker URL can add messages (each one a billed operation). Put it behind authentication before exposing it; the publish-from-worker sample in this skill shows a fail-closed bearer-token check.
- Ordering is not guaranteed: messages may not be delivered in publish order.
- `waitUntil()` can send without blocking the response, but errors from `send()` / `sendBatch()` are then implicitly ignored.
- Content types: default `json`; `{ contentType: "text" }` accepts only strings and throws on other values. See the producer API page for all types.
- By default a batch is all-or-nothing for retries; explicit `ack()` / `retry()` per message avoids redelivering the whole batch.
- Corrected from the official docs: the page says to connect a consumer with `wrangler queues consumer <queue-name> <worker-script-name>`; the command needs a subcommand, for example `wrangler queues consumer add <queue-name> <worker-script-name>` (or `consumer worker add`).
- Adapted from the official docs: the official producer example enqueues all request headers; Cookie and Authorization are stripped here.
- Best practice from the page: one consumer per queue, so failures in one queue do not affect others; one consumer Worker can still serve several queues.
- Different products: Upstash QStash (upstash skill), BullMQ (bullmq skill) and Inngest (inngest skill) are not Cloudflare Queues.

## Related

- [Producer API](./producer-api.md)
- [Consumer API](./consumer-api.md)
- [Batching, retries and delays](./batching-retries.md)
- [Pull consumers](./pull-consumers.md)
- [Delivery guarantees](./delivery-guarantees.md)
