# state-lifecycle

| Name | Description | Path |
|------|-------------|------|
| collectAsState | Collects values from a `Flow` or `StateFlow` and represents the latest value as Compose `State`, triggering recomposition of readers on every new emission. | [collectasstate.md](./collectasstate.md) |
| derivedStateOf | Creates a `State` object whose value is the result of `calculation`, recomputed only when one of the state objects read inside `calculation` changes. | [derivedstateof.md](./derivedstateof.md) |
| DisposableEffect | A side effect of composition that requires cleanup, run when the given keys change or when the composable leaves the Composition. | [disposableeffect.md](./disposableeffect.md) |
| LaunchedEffect | Runs a suspend function scoped to the Composition. Launches a coroutine when it enters the Composition and cancels it when it leaves. | [launchedeffect.md](./launchedeffect.md) |
| MutableState | A mutable value holder. Reads of `value` during a composable function's execution subscribe the current recompose scope to changes. | [mutablestate.md](./mutablestate.md) |
| mutableStateListOf | Creates an instance of `MutableList<T>` that is observable and can be snapshot, so structural changes trigger recomposition. | [mutablestatelistof.md](./mutablestatelistof.md) |
| mutableStateMapOf | Creates an instance of `MutableMap<K, V>` that is observable and can be snapshot, so structural changes trigger recomposition. | [mutablestatemapof.md](./mutablestatemapof.md) |
| mutableStateOf | Creates an observable `MutableState<T>`. Any write to `value` schedules recomposition of every composable function that read `value`. | [mutablestateof.md](./mutablestateof.md) |
| mutableStateSetOf | Creates an instance of `MutableSet<T>` that is observable and can be snapshot, so structural changes trigger recomposition. | [mutablestatesetof.md](./mutablestatesetof.md) |
| produceState | Converts non-Compose state (e.g. `Flow`, `LiveData`, callback-based APIs) into Compose `State` by launching a coroutine. | [producestate.md](./producestate.md) |
| remember | Stores an object in memory during composition. A value computed by `remember` is calculated once during initial composition and returned unchanged on recomposition. | [remember.md](./remember.md) |
| rememberCoroutineScope | Returns a `CoroutineScope` bound to the point in the Composition where it is called, for launching coroutines in event handlers. | [remembercoroutinescope.md](./remembercoroutinescope.md) |
| rememberSaveable | Behaves like `remember`, but the stored value also survives activity or process recreation via the saved instance state mechanism. | [remembersaveable.md](./remembersaveable.md) |
| rememberUpdatedState | Remembers a `mutableStateOf(newValue)` and updates its value to `newValue` on every recomposition, without restarting effects. | [rememberupdatedstate.md](./rememberupdatedstate.md) |
| Saver | Describes how to convert an object of an arbitrary type into a form that can be saved by `rememberSaveable`, and restored back. | [saver.md](./saver.md) |
| SideEffect | Schedules `effect` to run after every successful recomposition, used to publish Compose state to non-Compose code. | [sideeffect.md](./sideeffect.md) |
| snapshotFlow | Converts Compose `Snapshot` state reads (e.g. `MutableState` objects) into a cold `Flow`. | [snapshotflow.md](./snapshotflow.md) |
| State Hoisting | A pattern for making a composable stateless by moving its state to the caller, replacing an internal `remember`ed variable with a value parameter. | [state-hoisting.md](./state-hoisting.md) |
| State | A read-only value holder. Reading `value` during the execution of a `@Composable` function subscribes the current recompose scope to changes. | [state.md](./state.md) |
| State Lifespans | Conceptual guidance for choosing where to store Compose state based on how long it must survive: recomposition only, configuration changes, or process death. | [state-lifespans.md](./state-lifespans.md) |
