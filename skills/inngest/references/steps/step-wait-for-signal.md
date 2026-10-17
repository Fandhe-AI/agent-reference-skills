# step.waitForSignal

Pauses function execution until a matching signal is received or a timeout expires. Returns the signal's data payload or `null` on timeout.

## Signature / Usage

```ts
step.waitForSignal(
  id: string,
  options: {
    signal: string;
    timeout: number | string | Date | Temporal.Duration | Temporal.Instant | Temporal.ZonedDateTime;
    duplicate?: 'replace';
  }
): Promise<null | EventPayload>
```

```ts
// Wait 7d for an approval
const approval = await step.waitForSignal("wait-for-approval", {
  signal: "task/71651db4-9f27-466a-a6be-4759b9784b3c",
  timeout: "7d",
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state |
| `signal` | `string` | A unique identifier for the signal, used to resume this function run |
| `timeout` | `number \| string \| Date \| Temporal.*` | Maximum wait duration; accepts an `ms`-compatible string, milliseconds number, absolute `Date`, or Temporal types. If the signal is not received before this timeout, the run resumes with `undefined` |
| `duplicate` | `'replace'` | (optional) By default, `waitForSignal` requires a unique signal and duplicate signals fail the function. Set to `'replace'` to let another run's signal override this one; the replaced run will time out instead of resuming |

## Notes

- Must be called with `await` or another Promise handler to ensure the function actually pauses
- Resumed only by calling `inngest.sendSignal`, `step.sendSignal`, or the signal API with a matching signal string
- Resolves at most one run per signal; to resume many runs from a single event, use `step.waitForEvent` instead
- Signals are currently experimental.
- Official docs use two different spellings for duplicate-signal handling. The primitives guide uses `onConflict: "fail" | "replace"` (Go: `OnConflict: step.SignalConflictFail`): `"fail"` fails this run if another active wait uses the same signal name; `"replace"` gives the name to the new wait and the earlier wait stays pending until its timeout. The v4 reference (signature above) uses `duplicate?: 'replace'`. Both are documented; this page does not unify them, so check the installed SDK's types.
- Timeout return value differs by page: the primitives guide says the function resumes with `null` (Go: `step.ErrSignalNotReceived`) and to check it before reading `data`; the v4 reference says it resumes with `undefined`.
- The guide's example result shape reads `approval.data.approved` (an object with the signal's `data`).
- Send a signal from your app with `inngest.sendSignal`, or with `step.sendSignal()` from another function:

```ts
await inngest.sendSignal({
  signal: `approval/${requestId}`,
  data: { approved: true },
});
```

## Related

- [step.waitForEvent](./step-wait-for-event.md)
- [step.run](./step-run.md)
