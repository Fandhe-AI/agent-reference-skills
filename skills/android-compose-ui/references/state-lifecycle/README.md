# state-lifecycle

| Name | Description | Path |
|------|-------------|------|
| remember | Store an object in memory across recompositions, recalculated only when given keys change. | [remember.md](./remember.md) |
| rememberSaveable | Like remember, but also survives activity/process recreation via saved instance state. | [remembersaveable.md](./remembersaveable.md) |
| mutableStateOf | Create an observable MutableState<T> that triggers recomposition when written. | [mutablestateof.md](./mutablestateof.md) |
| mutableStateListOf | Create an observable, snapshot-aware MutableList<T>. | [mutablestatelistof.md](./mutablestatelistof.md) |
| mutableStateMapOf | Create an observable, snapshot-aware MutableMap<K, V>. | [mutablestatemapof.md](./mutablestatemapof.md) |
| mutableStateSetOf | Create an observable, snapshot-aware MutableSet<T>. | [mutablestatesetof.md](./mutablestatesetof.md) |
| MutableState | Mutable value holder interface returned by mutableStateOf and friends. | [mutablestate.md](./mutablestate.md) |
| State | Jetpack Compose (androidx.compose.runtime) read-only value holder interface. | [state.md](./state.md) |
| derivedStateOf | Derive a State from other State objects, recomposing only when the derived result changes. | [derivedstateof.md](./derivedstateof.md) |
| snapshotFlow | Convert Compose Snapshot state reads into a cold Flow. | [snapshotflow.md](./snapshotflow.md) |
| produceState | Convert non-Compose state (Flow, LiveData, callbacks) into Compose State via a coroutine. | [producestate.md](./producestate.md) |
| collectAsState | Collect a Flow/StateFlow as Compose State (not lifecycle-aware). | [collectasstate.md](./collectasstate.md) |
| rememberUpdatedState | Keep a State updated with the latest value without restarting effects that reference it. | [rememberupdatedstate.md](./rememberupdatedstate.md) |
| LaunchedEffect | Launch a coroutine scoped to the Composition, restarted when keys change. | [launchedeffect.md](./launchedeffect.md) |
| DisposableEffect | Run a side effect that requires cleanup (onDispose) when keys change or leaving Composition. | [disposableeffect.md](./disposableeffect.md) |
| SideEffect | Run a non-suspend block after every successful recomposition, publishing state to non-Compose code. | [sideeffect.md](./sideeffect.md) |
| rememberCoroutineScope | Get a CoroutineScope bound to the Composition for launching coroutines from event handlers. | [remembercoroutinescope.md](./remembercoroutinescope.md) |
| Saver | Convert values to/from a savable form for rememberSaveable; includes listSaver and mapSaver. | [saver.md](./saver.md) |
| State Hoisting | Pattern for moving state to a composable's caller via value/onValueChange parameters. | [state-hoisting.md](./state-hoisting.md) |
