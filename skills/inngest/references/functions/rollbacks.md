# Rollbacks

A step that exhausts all retries throws a `StepError` at its call site instead of failing the whole function immediately. Catching it inside the handler lets each step's failure be handled and rolled back individually, rather than letting the error bubble up and mark the entire function run as failed.

## Signature / Usage

```ts
inngest.createFunction(
  { id: "generate-result", triggers: { event: "prompt.created" } },
  async ({ event, step }) => {
    let imageURL: string | null = null;
    let via: "dall-e" | "midjourney";

    try {
      imageURL = await step.run("generate-image-dall-e", () => {
        // call DALL-E...
      });
      via = "dall-e";
    } catch (err) {
      imageURL = await step.run("generate-image-midjourney", () => {
        // fall back to Midjourney...
      });
      via = "midjourney";
    }

    await step.run("notify-user", () => {
      return pusher.trigger(event.data.channelID, "image-result", { imageURL, via });
    });
  },
);
```

## Notes

- An unhandled `StepError` from a step bubbles up and marks the entire function run as failed.
- A `.catch()` chained on `step.run(...)` can perform a compensating rollback step, e.g. `step.run("create-row", ...).catch((err) => step.run("rollback-row-creation", ...))`, so partial side effects from a failed step can be undone.
- Since each `step.run()` call is a separate durable checkpoint, rollback/fallback logic composed this way remains resilient to timeouts and transient errors on each individual attempt.
- Non-critical steps can simply be given an empty `.catch()` to ignore their failure without affecting the rest of the function.

## Related

- [retries](./retries.md)
- [on-failure](./on-failure.md)
- [durable-execution](./durable-execution.md)
