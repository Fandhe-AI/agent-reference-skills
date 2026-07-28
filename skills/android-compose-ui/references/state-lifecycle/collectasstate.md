# collectAsState

Collects values from a `Flow` or `StateFlow` and represents the latest value as Compose `State`, triggering recomposition of readers on every new emission.

## Signature / Usage

```kotlin
@Composable
fun <T> StateFlow<T>.collectAsState(
    context: CoroutineContext = EmptyCoroutineContext,
    mutationPolicy: SnapshotMutationPolicy<T> = structuralEqualityPolicy(),
): State<T>

@Composable
fun <T : R, R> Flow<T>.collectAsState(
    initial: R,
    context: CoroutineContext = EmptyCoroutineContext,
    mutationPolicy: SnapshotMutationPolicy<R> = structuralEqualityPolicy(),
): State<R>
```

```kotlin
val uiState by viewModel.uiStateFlow.collectAsState()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initial` | `R` | — | (`Flow` overload only) Initial value returned before the first emission. `StateFlow.value` is used automatically for the `StateFlow` overload. |
| `context` | `CoroutineContext` | `EmptyCoroutineContext` | Context the collection coroutine runs in, added to the composition's `CoroutineContext`. |
| `mutationPolicy` | `SnapshotMutationPolicy<T>` | `structuralEqualityPolicy()` | Controls when a newly collected value is treated as a change. |

## Notes

- Collection starts when the call enters the Composition and stops when it leaves — it is **not** lifecycle-aware, so it keeps collecting while the app is backgrounded. Prefer collectAsStateWithLifecycle (owned by the `android-architecture` skill, `references/lifecycle-viewmodel/collectasstatewithlifecycle.md`) in Android apps to avoid wasted work.
- Implemented internally with [produceState](./producestate.md).
- Package: `androidx.compose.runtime`.

## Related

- collectAsStateWithLifecycle — owned by the `android-architecture` skill (`references/lifecycle-viewmodel/collectasstatewithlifecycle.md`)
- [produceState](./producestate.md)
- [State](./state.md)
