# Flow Control

| Name | Description | Path |
|------|-------------|------|
| Batching | Processes multiple events in a single function run. | [batching.md](./batching.md) |
| Bursty Concurrency | Lets Pro and above accounts burst up to 3x their account concurrency limit for up to 60 minutes per month, so unexpected work runs immediately instead of building a backlog. | [bursty-concurrency.md](./bursty-concurrency.md) |
| Concurrency | Limits the number of steps executing simultaneously across function runs. | [concurrency.md](./concurrency.md) |
| Debounce | Delays function execution until a series of rapid events stops arriving. | [debounce.md](./debounce.md) |
| Idempotency | Guarantees that an operation produces the same result regardless of how many times it is executed. | [idempotency.md](./idempotency.md) |
| Multi-tenancy | Apply concurrency and throttle limits per tenant by using the same stable tenant ID in each key expression, so one busy tenant does not consume capacity reserved for others. | [multi-tenancy.md](./multi-tenancy.md) |
| Priority | Dynamically adjusts the execution order of function runs based on event data. | [priority.md](./priority.md) |
| Rate Limiting | Enforces a hard cap on function executions within a time period. | [rate-limiting.md](./rate-limiting.md) |
| Flow Control Simulator | An interactive teaching tool in the Inngest docs that combines concurrency, throttling, rate limiting, batching, debounce, singleton, and priority and shows how runs are scheduled over time. | [simulator.md](./simulator.md) |
| Singleton | Ensures that only a single run of a function (or a set of functions scoped by a key expression) is running at a time. | [singleton.md](./singleton.md) |
| Throttling | Limits the number of new function runs that can start within a given time period. | [throttling.md](./throttling.md) |
