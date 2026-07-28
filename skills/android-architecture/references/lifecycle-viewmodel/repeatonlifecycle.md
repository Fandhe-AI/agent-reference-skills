# repeatOnLifecycle

Suspend function that runs a coroutine block that automatically restarts whenever the `Lifecycle` reaches `state`, and cancels when it drops below `state`. Suspends the caller until the `Lifecycle` is destroyed.

## Signature / Usage

```kotlin
suspend fun Lifecycle.repeatOnLifecycle(state: Lifecycle.State, block: suspend CoroutineScope.() -> Unit)
suspend fun LifecycleOwner.repeatOnLifecycle(state: Lifecycle.State, block: suspend CoroutineScope.() -> Unit)
```

```kotlin
class MyFragment : Fragment() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.uiState.collect { state -> render(state) }
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `Lifecycle.State` | — | Minimum active state; `INITIALIZED` is not allowed and throws `IllegalArgumentException`. |
| `block` | `suspend CoroutineScope.() -> Unit` | — | Restarted every time the lifecycle re-enters `state`; canceled when it falls below `state`. |

## Notes

- Runs `block` on `Dispatchers.Main.immediate`; internally serialized with a `Mutex` so overlapping invocations don't race.
- Call from a stable place (`onCreate`, `onViewCreated`) to avoid launching duplicate competing coroutines.
- Preferred over `collectAsStateWithLifecycle`/`flowWithLifecycle` when collecting multiple flows together, since it avoids creating one hot flow per collector.
- Package: `androidx.lifecycle` (module `lifecycle-runtime-ktx` / `lifecycle-runtime`).

## Related

- [flowWithLifecycle](./flowwithlifecycle.md)
- [collectAsStateWithLifecycle](./collectasstatewithlifecycle.md)
- [Lifecycle](./lifecycle.md)
