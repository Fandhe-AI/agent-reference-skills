# step.sleepUntil

Pauses function execution until a specific point in time without consuming serverless compute resources.

## Signature / Usage

```ts
step.sleepUntil(
  id: string,
  datetime: Date | string | Temporal.Instant | Temporal.ZonedDateTime
): Promise<void>
```

```ts
await step.sleepUntil("wait-until-new-year", "2025-01-01");
await step.run("send-new-year-email", () => sendEmail(event.data.email));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state |
| `datetime` | `Date \| string \| Temporal.Instant \| Temporal.ZonedDateTime` | The point in time to resume execution; accepts `Date` objects, ISO 8601 strings, or `Temporal` types |

## Notes

- Must be called with `await` (or another Promise handler) to ensure the function actually sleeps
- ISO 8601 string formats accepted: `YYYY-MM-DD`, `YYYY-MM-DDTHH:mm:ss`, `YYYY-MM-DDTHH:mm:ss.sssZ`
- Maximum sleep duration is 1 year; 7 days on the free plan
- Useful for scheduling against event timestamps: `await step.sleepUntil("wait", event.data.run_at)`

## Related

- [step.sleep](./step-sleep.md)
- [step.run](./step-run.md)
