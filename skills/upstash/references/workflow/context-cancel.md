# context.cancel()

Explicitly cancels the current workflow run. Unlike other context methods, it does not define a step.

## Signature / Usage

```typescript
export const { POST } = serve<{ topic: string }>(async (context) => {
  const payload = context.requestPayload

  const result = await context.run("check if canceled", () => { ... });

  if (result.cancel) {
    await context.cancel() // cancel the workflow run
  }
})
```

## Notes

- The run is labeled as canceled (not failed)
- The configured `failureFunction` is not triggered
- No entries are sent to the dead-letter queue (DLQ)

## Related

- [client-cancel](./client-cancel.md)
- [failure-callback](./failure-callback.md)
- [dlq](./dlq.md)
- [context](./context.md)
