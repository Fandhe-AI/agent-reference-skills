# Versioning and Function Evolution

Inngest supports evolving function code while runs are in progress. Step-based memoization ensures completed steps are never re-executed, allowing safe deployments without explicit version markers.

## Signature / Usage

```ts
// V1 handles events before a cutover timestamp
export const processUploadV1 = inngest.createFunction(
  {
    id: "process-upload",
    triggers: {
      event: "file/uploaded",
      if: `event.ts < ${CUTOVER_TS}`,
    },
  },
  async ({ event, step }) => { /* original implementation */ }
);

// V2 handles events after the cutover
export const processUploadV2 = inngest.createFunction(
  {
    id: "process-upload-v2",
    triggers: {
      event: "file/uploaded",
      if: `event.ts >= ${CUTOVER_TS}`,
    },
  },
  async ({ event, step }) => { /* new implementation */ }
);
```

## How Step Memoization Enables Safe Deploys

The SDK hashes each step's `id` string with a counter. On each re-execution:

1. If the hash exists in stored state → return memoized result, skip execution.
2. If the hash is new → execute the step and store the result.

Completed steps are **never re-executed** across deployments.

## Evolution Strategies

| Change | Behavior | Safety |
|--------|----------|--------|
| Add a new step | New step executes when in-progress runs reach it | Safe |
| Modify step logic (same `id`) | In-progress runs use cached old result; new runs use new logic | Safe |
| Change a step `id` | Forces re-execution for all runs (old memoized result is lost) | Intentional reset |
| Remove a step | Memoized data for the removed step persists but is ignored | Safe |
| Reorder steps | Generates warnings; memoized results still return correctly | Safe with warning |

## Notes

- **Stable step IDs** are critical. Use descriptive, permanent names like `"charge-customer-payment"` rather than `"step-1"`.
- Avoid encoding changeable values in step IDs (e.g. timestamps, user IDs).
- For major incompatible rewrites, use separate function IDs with timestamp-based `if` routing on the trigger, or the event `v` version field.
- Test version changes locally using the Inngest Dev Server with `step.sleep()` to simulate in-progress state.
- Adding new steps is the safest change; new steps execute when in-progress runs discover them.

## Related

- [create-function](./create-function.md)
- [durable-execution](./durable-execution.md)
- [triggers](./triggers.md)
