# step.invoke

Calls another Inngest function and waits for its result. Supports cross-language invocations and type-safe data passing.

## Signature / Usage

```ts
step.invoke(
  id: string,
  options: {
    function: InngestFunction | ReferenceFunction;
    data?: object;
    timeout?: number | string | Date | Temporal.Duration | Temporal.Instant | Temporal.ZonedDateTime;
  }
): Promise<ReturnType>
```

```ts
const result = await step.invoke("compute-score", {
  function: computeScoreFn,
  data: { userId: event.data.userId },
  timeout: "1h",
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state |
| `function` | `InngestFunction \| ReferenceFunction` | A local function instance or a cross-app reference created with `referenceFunction()` |
| `data` | `object` | (optional) Input data passed to the invoked function; typed based on the function's trigger event |
| `timeout` | `number \| string \| Date \| Temporal.*` | (optional) Maximum wait duration; defaults to 1 year |

## Notes

- The invoked function executes with its own configuration (retries, concurrency, etc.) independently
- Failures in the invoked function (rate limiting, exhausted retries, debouncing) throw a `NonRetriableError` to prevent compounding retries
- Return values are JSON-serialized
- Use `referenceFunction({ appId, functionId })` to invoke functions in other apps or languages
- Supports parallel invocations via `Promise.all()`

## Related

- [step.run](./step-run.md)
- [step.sendEvent](./step-send-event.md)
- [Parallel Steps](./parallel-steps.md)
