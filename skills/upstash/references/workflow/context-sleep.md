# context.sleep() / context.sleepUntil()

Pauses workflow execution for a specified duration or until an absolute timestamp. No compute resources are consumed during the pause.

## Signature / Usage

```typescript
// Pause for a duration
await context.sleep("wait-step", "1d")
await context.sleep("wait-step", 3600)        // seconds

// Pause until a specific time
await context.sleepUntil("wait-until", date)  // Date object or Unix timestamp (seconds)
```

## Options / Props

### context.sleep

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique step identifier |
| `duration` | `number \| string` | Duration in seconds (number) or human-readable string |

Supported string formats: `"10s"`, `"1m"`, `"30m"`, `"2h"`, `"1d"`, `"1w"`, `"1mo"`, `"1y"`

### context.sleepUntil

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique step identifier |
| `datetime` | `Date \| number \| string` | Target time: a `Date` object, a Unix timestamp in seconds, or a string parseable by `new Date(string)` |

## Notes

- Always `await` sleep calls; omitting `await` will not pause execution
- When a workflow sleeps, the current request completes and QStash schedules a new request to resume after the delay
- Maximum sleep duration depends on the plan (Free: 7 days; Pay-as-you-go: up to 1 year); this plan limit is not stated on the current `steps/sleep` / `steps/sleepUntil` pages (fetched 2026-11-14)
- Source: https://upstash.com/docs/workflow/steps/sleep and https://upstash.com/docs/workflow/steps/sleepUntil (fetched 2026-11-14; no version pin on the site)

## Related

- [context](./context.md)
- [context-wait-for-event](./context-wait-for-event.md)
