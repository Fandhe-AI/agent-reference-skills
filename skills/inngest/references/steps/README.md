# Steps

| Name | Description | Path |
|------|-------------|------|
| step.run | Execute a retriable durable code block | [step-run.md](./step-run.md) |
| step.sleep | Pause execution for a duration without consuming compute | [step-sleep.md](./step-sleep.md) |
| step.sleepUntil | Pause execution until a specific point in time | [step-sleep-until.md](./step-sleep-until.md) |
| step.waitForEvent | Pause execution until a matching event arrives or timeout | [step-wait-for-event.md](./step-wait-for-event.md) |
| step.invoke | Call another Inngest function and await its result | [step-invoke.md](./step-invoke.md) |
| step.sendEvent | Send events to Inngest from within a function | [step-send-event.md](./step-send-event.md) |
| Parallel Steps | Run multiple steps concurrently with Promise.all | [parallel-steps.md](./parallel-steps.md) |
| Error Handling & Retries | Retry policies, NonRetriableError, RetryAfterError, StepError, onFailure | [error-handling.md](./error-handling.md) |
| Conditional Steps | Branch and loop patterns using standard control flow | [conditionals.md](./conditionals.md) |
| step.ai | AI inference step utilities (step.ai.infer, step.ai.wrap) | [step-ai.md](./step-ai.md) |
| TypeScript Types | GetStepTools, InngestFunction.Any, error types, referenceFunction | [typescript-types.md](./typescript-types.md) |
