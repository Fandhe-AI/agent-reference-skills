# Cleanup after Function Cancellation

Run post-cancellation code by triggering a function from the `inngest/function.cancelled` system event.

```ts
const inngest = new Inngest({ id: "newsletter-app" });

// This is our "import" function that will get cancelled
export const importAllContacts = inngest.createFunction(
  {
    id: "import-all-contacts",
    cancelOn: [{ event: "contacts/import.cancelled", if: "async.data.importId == event.data.importId" }],
    triggers: { event: "contacts/import.requested" },
  },
  async ({ event, step  }) => {
    // This is a long running function
  }
)

// This function will be run only when the matching function_id has a run that is cancelled
export const cleanupCancelledImport = inngest.createFunction(
  {
    name: "Cleanup cancelled import",
    id: "cleanup-cancelled-import",
    triggers: {
      event: "inngest/function.cancelled",
      // The function ID is a hyphenated slug of the App ID w/ the functions" id
      if: "event.data.function_id == 'newsletter-app-import-all-contacts'",
    },
  },
  async ({ event, step, logger }) => {
    // This code will execute after your function is cancelled

    // The event that triggered our original function run is passed nested in our event payload
    const originalTriggeringEvent = event.data.event;
    logger.info(`Import was cancelled: ${originalTriggeringEvent.data.importId}`)
  }
);
```

## Notes

- Works the same whether the run was cancelled via a `cancelOn` event, the REST API, or bulk cancellation
- The trigger's `if` filters `inngest/function.cancelled` to one function; `function_id` is the App ID and the function `id` joined as a hyphenated slug (`newsletter-app-import-all-contacts`)
- The original triggering event is available at `event.data.event`
