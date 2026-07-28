# coroutines-flow

| Name | Description | Path |
|------|-------------|------|
| Suspend functions | `suspend` functions and structured concurrency basics, main-safety. | [suspend-functions.md](./suspend-functions.md) |
| CoroutineScope, coroutineScope, supervisorScope | Scoping coroutines and parallel decomposition with structured concurrency. | [coroutine-scope.md](./coroutine-scope.md) |
| launch, async, await | Coroutine builders for fire-and-forget and result-producing work. | [launch-async-await.md](./launch-async-await.md) |
| Dispatchers and withContext | `Dispatchers.Main` / `IO` / `Default` / `Main.immediate` and switching context safely. | [dispatchers-withcontext.md](./dispatchers-withcontext.md) |
| Job, SupervisorJob, cancellation | Coroutine lifecycle handle and cooperative cancellation (`isActive`, `ensureActive`, `yield`). | [job-cancellation.md](./job-cancellation.md) |
| Exception handling | `CoroutineExceptionHandler`, try/catch, `runCatching`, SupervisorJob propagation. | [exception-handling.md](./exception-handling.md) |
| Flow basics | `flow { }`, `emit`, `collect`, cold flow semantics. | [flow-basics.md](./flow-basics.md) |
| Flow intermediate operators | `map` / `filter` / `transform` / `onEach` / `catch` / `flowOn` / `debounce` / `distinctUntilChanged` / `buffer` / `conflate`. | [flow-operators.md](./flow-operators.md) |
| StateFlow | Hot state-holder flow, `MutableStateFlow`, `stateIn`. | [stateflow.md](./stateflow.md) |
| SharedFlow | Hot broadcast flow, `MutableSharedFlow`, `shareIn`. | [sharedflow.md](./sharedflow.md) |
| callbackFlow and channelFlow | Wrapping callback APIs and concurrent emission into a `Flow`. | [callbackflow-channelflow.md](./callbackflow-channelflow.md) |
| combine, zip, flatMapLatest | Combining and switching between multiple flows. | [combine-zip-flatmaplatest.md](./combine-zip-flatmaplatest.md) |
| Channel | Coroutine-safe producer-consumer stream primitive underlying `callbackFlow`/`channelFlow`. | [channel.md](./channel.md) |
| Testing coroutines and Flow | `runTest`, `TestDispatcher`, Turbine (mention). | [testing-coroutines-flow.md](./testing-coroutines-flow.md) |
