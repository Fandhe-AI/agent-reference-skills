# steps

| Name | Description | Path |
|------|-------------|------|
| Conditional Steps | Branch step execution using standard JavaScript control flow. Steps that are never reached are never executed or memoized. | [conditionals.md](./conditionals.md) |
| Error Handling & Retries | Inngest distinguishes errors (which trigger retries) from failures (which occur after all retries are exhausted). Each step retries independently. | [error-handling.md](./error-handling.md) |
| Parallel Steps | Run multiple steps concurrently by collecting unawaited `step.run()` (or other step) calls with `Promise.all()`. | [parallel-steps.md](./parallel-steps.md) |
| step.ai | AI-specific step utilities for calling inference providers with request offloading, observability, and cost tracking. | [step-ai.md](./step-ai.md) |
| step.fetch | Makes durable HTTP requests by offloading them to the Inngest Platform, so the request survives even if the calling service is not active while waiting for a response. | [step-fetch.md](./step-fetch.md) |
| step.invoke | Calls another Inngest function and waits for its result. Supports cross-language invocations and type-safe data passing. | [step-invoke.md](./step-invoke.md) |
| step.metadata | Step tool that attaches custom key-value metadata to a function run. Like every step tool it takes a memoization ID, executes exactly once, and appears as its own step in the trace. Shown in the Inngest dashboard trace view. | [step-metadata.md](./step-metadata.md) |
| step.run | Executes a retriable code block as a durable step. Each call is independently memoized and retried on failure. | [step-run.md](./step-run.md) |
| step.sendEvent | Sends one or more events to Inngest from within a function. Preferred over `inngest.send()` inside functions for reliable delivery. | [step-send-event.md](./step-send-event.md) |
| step.sleepUntil | Pauses function execution until a specific point in time without consuming serverless compute resources. | [step-sleep-until.md](./step-sleep-until.md) |
| step.sleep | Pauses function execution for a specified duration without consuming serverless compute resources. | [step-sleep.md](./step-sleep.md) |
| step.waitForEvent | Pauses function execution until a matching event arrives or a timeout expires. Returns the event payload or `null` on timeout. | [step-wait-for-event.md](./step-wait-for-event.md) |
| step.waitForSignal | Pauses function execution until a matching signal is received or a timeout expires. Returns the signal's data payload or `null` on timeout. | [step-wait-for-signal.md](./step-wait-for-signal.md) |
| TypeScript Types for Steps | Key TypeScript types for working with Inngest step tools, function handlers, and error classes. | [typescript-types.md](./typescript-types.md) |
| Working with Loops | Process lists or paginated data one item at a time with saved progress, so retries resume from completed work. External calls go in named steps so a retry does not repeat work that already succeeded. | [working-with-loops.md](./working-with-loops.md) |
