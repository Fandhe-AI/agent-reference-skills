# observeAsState

Compose extension that observes a `LiveData` and represents its latest value as a Compose `State`, triggering recomposition on updates.

## Signature / Usage

```kotlin
@Composable
fun <T> LiveData<T>.observeAsState(): State<T?>

@Composable
fun <R, T : R> LiveData<T>.observeAsState(initial: R): State<R>
```

```kotlin
@Composable
fun NameScreen(viewModel: NameViewModel) {
    val name by viewModel.currentName.observeAsState(initial = "")
    Text(name)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initial` | `R` | none (overload without it returns `State<T?>`) | Fallback value used only until the `LiveData` posts its first value. |

## Notes

- Requires the `androidx.compose.runtime:runtime-livedata` artifact (separate from the `lifecycle-*` modules).
- The observer is removed automatically on composable disposal or when the current `LifecycleOwner` reaches `DESTROYED`.
- For non-nullable type parameters, ensure the `LiveData` never posts `null` after the first non-null value.
- Package: `androidx.compose.runtime.livedata` (module `runtime-livedata`).

## Related

- [LiveData](./livedata.md)
- [collectAsStateWithLifecycle](./collectasstatewithlifecycle.md)
