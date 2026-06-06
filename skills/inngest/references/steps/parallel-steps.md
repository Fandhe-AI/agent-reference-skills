# Parallel Steps

Run multiple steps concurrently by collecting unawaited `step.run()` (or other step) calls with `Promise.all()`.

## Signature / Usage

```ts
// Do NOT await individual steps before Promise.all
const [emailId, updatedUser] = await Promise.all([
  step.run("send-email", () => sendEmail(event.data.email)),
  step.run("update-user", () => db.users.update({ id: event.data.userId })),
]);
```

For dynamic parallel work (e.g., processing an array):

```ts
const summaries = await Promise.all(
  chunks.map((chunk, i) =>
    step.run(`summarize-chunk-${i}`, () => summarize(chunk))
  )
);
```

## Notes

- Creating a step without `await` returns an unresolved Promise; `Promise.all()` schedules all of them simultaneously
- Each parallel step is independently retried on failure
- On serverless platforms, steps run with true parallelism; on single-server Node.js, they share the thread
- **Optimized parallelism** (default in SDK v4): reduces HTTP requests from 2 per step to 1, significantly improving performance
- With optimized parallelism, `Promise.race()` waits for **all** parallel steps to complete before resolving (use `group.parallel()` for early-resolution behavior)
- Total data returned across all steps must not exceed 4 MB
- Maximum 1,000 steps per function run
- **Parallel steps vs. fan-out**: use parallel steps when you need to access return values within the same function; use `step.sendEvent()` fan-out for unlimited independent functions without needing their output

## Related

- [step.run](./step-run.md)
- [step.invoke](./step-invoke.md)
- [step.sendEvent](./step-send-event.md)
