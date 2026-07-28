# Lifecycle

Abstract class holding the current lifecycle status (`State`) of a component and dispatching transition `Event`s to registered observers.

## Signature / Usage

```kotlin
abstract class Lifecycle {
    abstract val currentState: State
    open val currentStateFlow: StateFlow<State>
    abstract fun addObserver(observer: LifecycleObserver)
    abstract fun removeObserver(observer: LifecycleObserver)

    enum class State { DESTROYED, INITIALIZED, CREATED, STARTED, RESUMED;
        fun isAtLeast(state: State): Boolean
    }
    enum class Event { ON_CREATE, ON_START, ON_RESUME, ON_PAUSE, ON_STOP, ON_DESTROY, ON_ANY }
}
```

```kotlin
val lifecycleOwner = LocalLifecycleOwner.current
val currentState = lifecycleOwner.lifecycle.currentStateAsState()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `currentState` | `Lifecycle.State` | — | Current state, updated synchronously as the owner transitions. |
| `currentStateFlow` | `StateFlow<Lifecycle.State>` | — | Observable stream of state changes. |
| `addObserver` / `removeObserver` | function | — | Registers/unregisters a `LifecycleObserver` (typically `DefaultLifecycleObserver` or `LifecycleEventObserver`). |
| `State.isAtLeast(state)` | function | — | Whether the current state is at or above `state`. |
| `Event.ON_CREATE` | enum | — | Fired on `onCreate`; transitions to `CREATED`. |
| `Event.ON_START` | enum | — | Fired on `onStart`; transitions to `STARTED`. |
| `Event.ON_RESUME` | enum | — | Fired on `onResume`; transitions to `RESUMED`. |
| `Event.ON_PAUSE` | enum | — | Fired on `onPause`; transitions to `STARTED`. |
| `Event.ON_STOP` | enum | — | Fired on `onStop`; transitions to `CREATED`. |
| `Event.ON_DESTROY` | enum | — | Fired on `onDestroy`; transitions to `DESTROYED` (terminal). |
| `Event.ON_ANY` | enum | — | Wildcard matching any event (used with `@OnLifecycleEvent`, deprecated). |

## Notes

- `State` is cyclic between `CREATED`/`STARTED`/`RESUMED`; `DESTROYED` is terminal and no further events dispatch.
- `Lifecycle.coroutineScope` (`LifecycleCoroutineScope`) and `Lifecycle.eventFlow` (`Flow<Lifecycle.Event>`) are also available as extensions.
- `currentStateFlow` / `currentStateAsState()` were introduced in Lifecycle 2.7.0.
- Package: `androidx.lifecycle` (module `lifecycle-common`).

## Related

- [LifecycleOwner](./lifecycleowner.md)
- [DefaultLifecycleObserver](./defaultlifecycleobserver.md)
- [LifecycleEventObserver](./lifecycleeventobserver.md)
- [repeatOnLifecycle](./repeatonlifecycle.md)
