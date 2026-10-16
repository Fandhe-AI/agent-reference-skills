# Working with Loops

Process lists or paginated data one item at a time with saved progress, so retries resume from completed work. External calls go in named steps so a retry does not repeat work that already succeeded.

## Signature / Usage

Process a list (TypeScript v4):

```ts
import { eventType, staticSchema } from "inngest";

const importRequested = eventType("app/items.import_requested", {
  schema: staticSchema<{ itemIds: string[] }>(),
});

export const importItems = inngest.createFunction(
  { id: "import-items", triggers: [importRequested] },
  async ({ event, step }) => {
    for (const itemId of event.data.itemIds) {
      await step.run("process-item", () => processItem(itemId));
    }
  }
);
```

Process a paginated source by returning the next cursor from each step (assumes `source.listPage` returns `items` and `nextCursor`, and `store.upsertMany` safely repeats a write):

```ts
export const importPages = inngest.createFunction(
  { id: "import-pages", triggers: { event: "app/pages.import_requested" } },
  async ({ step }) => {
    let cursor: string | null = null;

    do {
      const nextCursor: string | null = await step.run(
        "import-page",
        async () => {
          const page = await source.listPage({ cursor });
          await store.upsertMany(page.items);
          return page.nextCursor;
        }
      );
      cursor = nextCursor;
    } while (cursor !== null);
  }
);
```

## Notes

- The SDK counts repeated calls to the same step ID, so each iteration has its own saved result. Keep the input list and its order stable while the run is active; if the list comes from an API or database, load it in a step.
- A completed iteration saves its cursor. On resume the function re-enters the handler and reads saved step results to reach the next iteration. A step that fails after writing but before completing can repeat the write, so make the external write idempotent.
- Put API calls, database reads/writes, random values, and current-time decisions inside steps; code outside steps can run again as the function resumes.
- Keep step IDs and iteration order stable for in-progress runs (see Versioning when changing a live workflow).
- Use `step.sleep()` between iterations when an external API needs a delay; a sleep pauses the run without holding a worker.
- Keep each step's return value within plan limits; store large payloads outside run state and return an ID or cursor instead.
- For many independent items that can run and fail separately, use fan-out. For parallel steps in one run, use `Promise.all()` (`group.Parallel` in Go, `ctx.group.parallel` in Python) with stable step IDs.
- The source page also provides Python and Go versions of both examples.

## Related

- [step.run](./step-run.md)
- [step.sleep](./step-sleep.md)
- [Parallel Steps](./parallel-steps.md)
- [step.sendEvent](./step-send-event.md)
