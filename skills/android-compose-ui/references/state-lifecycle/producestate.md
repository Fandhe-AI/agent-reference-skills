# produceState

Converts non-Compose state (e.g. `Flow`, `LiveData`, callback-based APIs) into Compose `State` by launching a coroutine, scoped to the Composition, that can push values into the returned state.

## Signature / Usage

```kotlin
@Composable
fun <T> produceState(
    initialValue: T,
    producer: suspend ProduceStateScope<T>.() -> Unit,
): State<T>

@Composable
fun <T> produceState(
    initialValue: T,
    vararg keys: Any?,
    producer: suspend ProduceStateScope<T>.() -> Unit,
): State<T>
```

```kotlin
@Composable
fun loadNetworkImage(
    url: String,
    imageRepository: ImageRepository = ImageRepository(),
): State<Result<Image>> {
    return produceState<Result<Image>>(initialValue = Result.Loading, url, imageRepository) {
        val image = imageRepository.load(url)
        value = if (image == null) Result.Error else Result.Success(image)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `T` | — | Value held by the returned `State` before `producer` first assigns to it. |
| `key1`, `key2`, `key3`, `keys` | `Any?` | — | When any key changes, the running producer coroutine is cancelled and relaunched. |
| `mutationPolicy` | `SnapshotMutationPolicy<T>` | `structuralEqualityPolicy()` | Controls when a write to `value` is considered a change. |
| `producer` | `suspend ProduceStateScope<T>.() -> Unit` | — | Suspend function that assigns to `value` over time; `ProduceStateScope<T>` is a `MutableState<T>` plus `CoroutineScope`, and exposes `awaitDispose { ... }` for cleanup. |

## Notes

- The coroutine launched by `produceState` follows the Composition's lifecycle — it is started when the call enters the Composition and cancelled when it leaves (or when a key changes).
- Use `awaitDispose { }` inside `producer` to release resources (e.g. unregister a callback) when the coroutine is cancelled.
- Package: `androidx.compose.runtime`.

## Related

- [State](./state.md)
- [LaunchedEffect](./launchedeffect.md)
- [collectAsState](./collectasstate.md)
