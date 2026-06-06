# Schedules

Create and manage cron-based recurring message delivery. QStash publishes the configured message automatically on each cron tick.

## Signature / Usage

```ts
// Create a schedule
const schedule = await client.schedules.create({
  destination: "https://example.com/api/cron",
  cron: "0 9 * * 1-5",  // weekdays at 09:00 UTC
});

// List all schedules
const all = await client.schedules.list();

// Get a specific schedule
const s = await client.schedules.get("scheduleId");

// Pause / resume
await client.schedules.pause({ schedule: "scheduleId" });
await client.schedules.resume({ schedule: "scheduleId" });

// Delete
await client.schedules.delete("scheduleId");
```

## Options / Props

**`schedules.create()` options:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `destination` | `string` | — | Target URL, URL Group name/ID, or queue |
| `cron` | `string` | — | Cron expression (UTC by default) |
| `scheduleId` | `string` | auto-generated | Create or overwrite a schedule with this ID |
| `body` | `unknown` | — | Message payload delivered on each tick |
| `headers` | `Record<string, string>` | — | Headers forwarded to destination |
| `callback` | `string` | — | Callback URL for each delivery result |
| `failureCallback` | `string` | — | Failure callback URL |
| `timeout` | `string` | — | Per-delivery request timeout |
| `retries` | `number` | plan default | Max delivery attempts per tick |

## Notes

- Cron expressions are evaluated in UTC by default
- Use `CRON_TZ=<IANA>` prefix for other timezones: `"CRON_TZ=America/New_York 0 4 * * *"`
- First trigger may fire up to 60 seconds after creation
- All standard `publishJSON` options (delay, retries, etc.) apply to each scheduled delivery
- Use [crontab.guru](https://crontab.guru/) to build and test expressions

## Related

- [publish.md](./publish.md)
- [queues.md](./queues.md)
