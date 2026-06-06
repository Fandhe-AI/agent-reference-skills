# step.sleep

Pauses function execution for a specified duration without consuming serverless compute resources.

## Signature / Usage

```ts
step.sleep(id: string, duration: number | string | Temporal.Duration): Promise<void>
```

```ts
await step.sleep("wait-before-followup", "3 days");
await step.run("send-followup", () => sendEmail(event.data.email));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state |
| `duration` | `number \| string \| Temporal.Duration` | Duration as milliseconds, `ms`-compatible string (e.g. `"30m"`, `"2.5d"`), or `Temporal.Duration` |

## Notes

- Must be called with `await` (or another Promise handler) to ensure the function actually sleeps
- Maximum sleep duration is 1 year; 7 days on the free plan
- Bypasses serverless provider timeout limits entirely — the function is not running during the sleep period
- String format uses the [`ms`](https://github.com/vercel/ms) package conventions: `"30m"`, `"3 hours"`, `"2.5d"`

## Related

- [step.sleepUntil](./step-sleep-until.md)
- [step.run](./step-run.md)
