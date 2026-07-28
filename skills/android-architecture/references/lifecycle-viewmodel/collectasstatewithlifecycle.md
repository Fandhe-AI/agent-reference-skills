# collectAsStateWithLifecycle

Compose extension that collects a `Flow`/`StateFlow` into a Compose `State`, automatically starting/stopping collection based on the current `LifecycleOwner`. The recommended way to collect flows in composables.

## Signature / Usage

```kotlin
@Composable
fun <T> StateFlow<T>.collectAsStateWithLifecycle(
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    context: CoroutineContext = EmptyCoroutineContext,
): State<T>

@Composable
fun <T> Flow<T>.collectAsStateWithLifecycle(
    initialValue: T,
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    context: CoroutineContext = EmptyCoroutineContext,
): State<T>
```

```kotlin
@Composable
fun ConversationScreen(viewModel: ConversationViewModel = viewModel()) {
    val messages by viewModel.messages.collectAsStateWithLifecycle()
    ConversationList(messages)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `T` | — | Required for plain `Flow` (not `StateFlow`) since a Flow has no current value. |
| `lifecycleOwner` / `lifecycle` | `LifecycleOwner` / `Lifecycle` | `LocalLifecycleOwner.current` | Lifecycle driving collection start/stop. |
| `minActiveState` | `Lifecycle.State` | `Lifecycle.State.STARTED` | Minimum state during which collection is active; `INITIALIZED` throws `IllegalArgumentException`. |
| `context` | `CoroutineContext` | `EmptyCoroutineContext` | Additional context combined with the collecting coroutine. |

## Notes

- Implemented internally with `produceState` + `repeatOnLifecycle`.
- Multiple flows can be collected in parallel safely, each via its own `collectAsStateWithLifecycle()` call.
- Package: `androidx.lifecycle.compose` (module `lifecycle-runtime-compose`).

## Related

- [repeatOnLifecycle](./repeatonlifecycle.md)
- [flowWithLifecycle](./flowwithlifecycle.md)
- [viewModelScope](./viewmodelscope.md)
- collectAsState — owned by the `android-compose-ui` skill (`references/state-lifecycle/collectasstate.md`), the non-lifecycle-aware counterpart
