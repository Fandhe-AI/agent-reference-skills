# Scheduled Task

Run a function on a recurring schedule using a cron trigger.

```typescript
import { Inngest } from "inngest";

const inngest = new Inngest({ id: "my-app" });

// Runs every Friday at noon (Paris time)
export const prepareWeeklyDigest = inngest.createFunction(
  { id: "prepare-weekly-digest" },
  { cron: "TZ=Europe/Paris 0 12 * * 5" },
  async ({ step }) => {
    const users = await step.run("load-users", async () => {
      return db.query("SELECT * FROM users WHERE digest_enabled = true");
    });

    // Fan-out: send one event per user for parallel processing
    await step.sendEvent(
      "send-digest-events",
      users.map((user) => ({
        name: "app/send.weekly.digest",
        data: { userId: user.id, email: user.email },
      }))
    );
  }
);

// With jitter to avoid thundering herd
export const hourlySync = inngest.createFunction(
  { id: "hourly-sync" },
  { cron: "0 * * * *", jitter: "5m" },
  async ({ step }) => {
    await step.run("sync-data", async () => {
      await syncExternalData();
    });
  }
);
```

## Notes

- Cron syntax follows standard format; prefix `TZ=<timezone>` to specify the timezone
- `jitter` spreads execution randomly within the given window to reduce load spikes
- `step.sendEvent()` inside a scheduled function is a common fan-out pattern for per-user processing
- No event payload is available in cron-triggered functions (`event` is an empty object)
