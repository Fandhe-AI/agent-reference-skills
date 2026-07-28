# flowWithLifecycle

`Flow` operator that only emits upstream values while `lifecycle` is at least at `minActiveState`, automatically starting/canceling the upstream collection as the lifecycle moves in and out of range.

## Signature / Usage

```kotlin
fun <T> Flow<T>.flowWithLifecycle(
    lifecycle: Lifecycle,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
): Flow<T>
```

```kotlin
lifecycleScope.launch {
    viewModel.uiState
        .flowWithLifecycle(lifecycle, Lifecycle.State.STARTED)
        .collect { state -> render(state) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `lifecycle` | `Lifecycle` | — | Lifecycle gating emission. |
| `minActiveState` | `Lifecycle.State` | `Lifecycle.State.STARTED` | Minimum state for values to be emitted; `INITIALIZED` throws `IllegalArgumentException`. |

## Notes

- Not a terminal operator; typically followed by `collect` or `onEach().launchIn(scope)`.
- The downstream stays subscribed (without receiving emissions) while the collecting scope is active but the lifecycle is below `minActiveState` — operator placement in a chain matters.
- For collecting several flows together, `Lifecycle.repeatOnLifecycle` is more resource-efficient since it avoids creating one hot flow per collector.
- Package: `androidx.lifecycle` (module `lifecycle-runtime-ktx` / `lifecycle-runtime`).

## Related

- [repeatOnLifecycle](./repeatonlifecycle.md)
- [collectAsStateWithLifecycle](./collectasstatewithlifecycle.md)
