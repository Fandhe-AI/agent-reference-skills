# Functions

| Name | Description | Path |
|------|-------------|------|
| createFunction | Define an Inngest function with triggers, configuration, and a handler | [create-function.md](./create-function.md) |
| Triggers | Event and cron triggers that start function runs | [triggers.md](./triggers.md) |
| Retries | Configure retry attempts per step (0–20, default 4) | [retries.md](./retries.md) |
| cancelOn | Stop a running or sleeping function when a matching event arrives | [cancel-on.md](./cancel-on.md) |
| timeouts | Auto-cancel runs that exceed start or execution time limits | [timeouts.md](./timeouts.md) |
| onFailure | Handler invoked after all retries are exhausted | [on-failure.md](./on-failure.md) |
| batchEvents | Aggregate multiple events into a single invocation | [batch-events.md](./batch-events.md) |
| priority | Dynamically order runs within a function using CEL expressions | [priority.md](./priority.md) |
| idempotency | Prevent duplicate executions within a 24-hour window via CEL key | [idempotency.md](./idempotency.md) |
| Durable Execution | Step memoization and fault-tolerant execution engine concepts | [durable-execution.md](./durable-execution.md) |
| Versioning | Evolve function code safely while runs are in progress | [versioning.md](./versioning.md) |
