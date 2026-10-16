# Testing (@inngest/test)

`@inngest/test` lets you test Inngest functions programmatically by mocking function state, step tooling and inputs, with a Jest-compatible API.

## Signature / Usage

```shell
npm install -D @inngest/test
```

```ts
import { InngestTestEngine } from "@inngest/test";
import { helloWorld } from "./helloWorld";

const t = new InngestTestEngine({ function: helloWorld });

test("returns a greeting", async () => {
  const { result } = await t.execute();
  expect(result).toEqual("Hello World!");
});

test("runs one step", async () => {
  const { result } = await t.executeStep("calculate-price");
  expect(result).toEqual(123);
});
```

## Options / Props

| Name (return value of `t.execute()` / `t.executeStep()`) | Description |
|------|-------------|
| result | Output of the run or step. |
| error | Serialized error, returned instead of `result` if the function threw. |
| ctx | Input used for the run; `ctx.step.*` are Jest-compatible spies. |
| state | View into the outputs of all steps (promises; use `.resolves` / `.rejects`). |

Mocks (set on `new InngestTestEngine({...})`, `t.execute({...})` or `t.executeStep(id, {...})`):

| Name | Description |
|------|-------------|
| events | Array of mocked incoming events (arrays allow batches). |
| steps | Array of `{ id, handler() }` step mocks; handlers run lazily when the step is reached. |
| transformCtx | Function `(ctx) => ctx` to supply custom input mocks. |

## Examples

```ts
t.execute({
  events: [{ name: "demo/event.sent", data: { message: "Hi!" } }],
  steps: [
    { id: "one-day-delay", handler() {} },            // mock step.sleep
    { id: "wait-for-approval", handler() { return null; } }, // waitForEvent timeout
    { id: "dangerous-step", handler() { throw new Error("Oh no!"); } },
  ],
});

const { ctx, state } = await t.execute();
expect(ctx.step.run).toHaveBeenCalledWith("my-step", expect.any(Function));
await expect(state["dangerous-step"]).rejects.toThrowError("something failed");

// Reuse mocks / keep automatic mocking in a custom transform
const otherT = t.clone({ /* more mocks */ });
import { mockCtx } from "@inngest/test";
new InngestTestEngine({ function: helloWorld, transformCtx: (ctx) => ({ ...mockCtx(ctx), event: someCustomThing }) });
```

## Notes

- Requires `inngest@>=4.0.0`. Works with jest, vitest, `bun:test`, `@std/expect` (Deno) and chai/expect.
- Always mock `step.sleep`, `step.sleepUntil` and `step.waitForEvent`; otherwise delays are not skipped. `waitForEvent` returns `null` on timeout.
- If no event mocks are given (or `events: undefined`), an `inngest/function.invoked` event is mocked.
- Mocking of modules/imports outside Inngest must be done with your testing framework.
- Beyond unit tests: use the Dev Server to exercise durable behavior (retries, timed-out waits, cancellation) and verify idempotency of one-time effects before launch.

## Related

- [Create Function](./create-function.md)
- [Middleware](./middleware.md)
