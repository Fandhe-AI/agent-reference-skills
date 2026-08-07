# Singleton Function

Ensure only one run of a function is active per key at a time, so overlapping triggers are skipped or the active run is cancelled and replaced.

```ts
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "my-app" });

// mode: "skip" — ignore new triggers while a sync is already running for this user
export const syncUserData = inngest.createFunction(
  {
    id: "sync-user-data",
    singleton: {
      key: "event.data.user_id",
      mode: "skip",
    },
  },
  { event: "user/data.sync.requested" },
  async ({ event, step }) => {
    await step.run("fetch-and-sync", async () => {
      await syncFromSource(event.data.user_id);
    });
  }
);

// mode: "cancel" — abort the active run and start over with the latest event
export const generateReport = inngest.createFunction(
  {
    id: "generate-report",
    singleton: {
      key: "event.data.report_id",
      mode: "cancel",
    },
  },
  { event: "report/regenerate.requested" },
  async ({ event, step }) => {
    const data = await step.run("collect-latest-data", async () => {
      return collectReportData(event.data.report_id);
    });

    await step.run("render-report", async () => {
      await renderReport(event.data.report_id, data);
    });
  }
);
```

## Notes

- `key` is a CEL expression scoping the exclusive-run lock to a value (e.g. per `user_id`); omit it to make the whole function globally singleton
- `mode: "skip"` discards the new trigger while a run is active; `mode: "cancel"` terminates the active run and starts the new one immediately
- Singleton differs from `concurrency: 1` — concurrency limits step execution in flight, singleton guarantees only one full function run per key
- Singleton is incompatible with `batchEvents` and per-function `concurrency` settings, but composes with rate limiting, throttling, and debounce
