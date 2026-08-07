# Publishing

Publish realtime messages to a channel topic from inside or outside an Inngest function, using either a non-durable client publish or a durable, memoized step publish.

## Signature / Usage

```ts
import { inngest } from "./client";
import { pipelineChannel } from "./channels";

inngest.createFunction(
  { id: "process-upload", triggers: [{ event: "app/upload" }] },
  async ({ event, step }) => {
    const ch = pipelineChannel({ uploadId: event.data.uploadId });

    // Non-durable, fires again on retry — good for ephemeral progress
    await inngest.realtime.publish(ch.status, { message: "Processing..." });

    // Durable, memoized — good for final results / state transitions
    await step.realtime.publish("publish-result", ch.result, {
      success: true,
    });
  },
);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `inngest.realtime.publish(topicRef, data)` topicRef | TopicRef\<TData> | Topic accessor from a channel instance. |
| `inngest.realtime.publish(topicRef, data)` data | TData | Message payload; must match the topic's schema. Returns `Promise<void>`. |
| `step.realtime.publish(id, topicRef, data)` id | string | Unique step ID, used for memoization and shown in function logs. |
| `step.realtime.publish(id, topicRef, data)` topicRef | TopicRef\<TData> | Topic accessor from a channel instance. |
| `step.realtime.publish(id, topicRef, data)` data | TData | Message payload; must match the topic's schema. Returns `Promise<TData>`. |

## Notes

- `inngest.realtime.publish()` is **not durable**: it is usable outside functions (API routes, webhooks, cron jobs) and re-fires on retry when called inside a function. Best for high-frequency streaming (e.g. token-by-token) and ephemeral progress updates.
- `step.realtime.publish()` is **durable and memoized**: requires a step ID, is not usable outside a function, and won't re-run if the function retries. Best for state transitions, final results, and deduped publishes; appears in the function's execution graph.
- Inside a function run, `inngest.realtime.publish()` automatically attaches the current run ID.
- Both methods validate `data` against the topic's schema at compile time (TypeScript) and runtime.

## Related

- [Channels & Topics](./channels.md)
- [Subscribing](./subscribing.md)
- [useRealtime](./use-realtime.md)
