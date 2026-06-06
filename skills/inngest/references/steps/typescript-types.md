# TypeScript Types for Steps

Key TypeScript types for working with Inngest step tools, function handlers, and error classes.

## Signature / Usage

```ts
import {
  Inngest,
  NonRetriableError,
  RetryAfterError,
  type GetStepTools,
} from "inngest";

// Type the step parameter in a helper function
type StepTools = GetStepTools<typeof inngest>;

async function myHelper(step: StepTools) {
  await step.run("do-work", () => doWork());
}
```

Typing a reference function for cross-app invocations:

```ts
import { referenceFunction } from "inngest";

const externalFn = referenceFunction<typeof myFnType>({
  appId: "my-python-app",
  functionId: "compute-score",
});

const result = await step.invoke("invoke-external", {
  function: externalFn,
  data: { userId: "123" },
});
```

## Key Types

| Type / Import | Description |
|---------------|-------------|
| `GetStepTools<typeof inngest>` | Derives the `step` parameter type for a given `Inngest` instance; optionally scoped to an event with a second type argument |
| `GetStepTools<typeof inngest, "app/user.created">` | `step` type scoped to a specific event trigger |
| `InngestFunction.Any` | Represents any `InngestFunction` instance without generics; useful for lists and factories |
| `NonRetriableError` | Error class that stops retries immediately |
| `RetryAfterError` | Error class that specifies a custom retry delay |
| `StepError` | Thrown when a step exhausts all retries (SDK v3.12+) |
| `referenceFunction<T>({ appId, functionId })` | Creates a typed reference to a function in another app for use with `step.invoke()` |

## Notes

- `GetStepTools` is the recommended way to type `step` outside a function handler (e.g., in extracted helper functions or shared utilities)
- `InngestFunction.Any` avoids needing to thread all generic parameters when storing or passing functions
- Custom error classes passed to `onFailure` handlers are deserialized as plain `Error` objects; `instanceof` checks will not work

## Related

- [step.run](./step-run.md)
- [step.invoke](./step-invoke.md)
- [Error Handling & Retries](./error-handling.md)
