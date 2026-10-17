# coroutines

| Name | Description | Path |
|------|-------------|------|
| Asynchronous control flow and suspending functions | Walks through a small reminder application to show how threads, actors, callbacks and control-flow abstractions manage asynchronous control flow, and how suspending functions express the same flow in a sequential style. | [async-programming.md](./async-programming.md) |
| Channels | Channels transfer a stream of values between coroutines (deferred values transfer a single value). | [channels.md](./channels.md) |
| Composing suspending functions | Approaches to composing suspending functions: sequential by default, concurrent with `async`, lazy `async`, async-style functions (discouraged), and structured concurrency with `async`. | [composing-suspending-functions.md](./composing-suspending-functions.md) |
| Coroutine context and dispatchers | Coroutines execute in a context, a `CoroutineContext` (defined in the Kotlin standard library) holding elements such as the coroutine's `Job` and its dispatcher. | [coroutine-context-and-dispatchers.md](./coroutine-context-and-dispatchers.md) |
| Coroutines basics | A coroutine is a suspendable computation that lets you write concurrent code in a sequential style. | [coroutines-basics.md](./coroutines-basics.md) |
| Cancellation and timeouts | Cancellation requests a coroutine to stop before it completes. | [coroutines-cancellation.md](./coroutines-cancellation.md) |
| Debug coroutines | JVM features that make debugging coroutines easier: debug mode, stack trace recovery, and the debug agent (`kotlinx-coroutines-debug`). | [coroutines-debugging.md](./coroutines-debugging.md) |
| Flow operators | Operators transform and process values in a flow pipeline. | [coroutines-flow-operators.md](./coroutines-flow-operators.md) |
| Flows | A flow is a sequential stream of values produced asynchronously. | [coroutines-flow.md](./coroutines-flow.md) |
| Coroutines guide | Entry page for the kotlinx.coroutines guide: Kotlin's standard library offers only minimal low-level coroutine APIs, and `kotlinx.coroutines` provides high-level primitives such as `launch` and `async`. | [coroutines-guide.md](./coroutines-guide.md) |
| Coroutines | Overview of Kotlin coroutines: lightweight, suspendable alternatives to threads, with most features provided by the kotlinx.coroutines library. | [coroutines-overview.md](./coroutines-overview.md) |
| Coroutine exceptions handling | Exception propagation, `CoroutineExceptionHandler`, cancellation and exceptions, exception aggregation, and supervision (`SupervisorJob`, `supervisorScope`). | [exception-handling.md](./exception-handling.md) |
| Select expression (experimental) | `select` awaits multiple suspending functions simultaneously and selects the first one that becomes available. | [select-expression.md](./select-expression.md) |
| Shared mutable state and concurrency | Coroutines on a multi-threaded dispatcher such as `Dispatchers.Default` present the usual problem of synchronizing access to shared mutable state. | [shared-mutable-state-and-concurrency.md](./shared-mutable-state-and-concurrency.md) |
