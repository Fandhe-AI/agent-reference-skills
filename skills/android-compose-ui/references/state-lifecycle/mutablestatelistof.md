# mutableStateListOf

Creates an instance of `MutableList<T>` that is observable and can be snapshot, so structural changes (add/remove/set) trigger recomposition.

## Signature / Usage

```kotlin
fun <T> mutableStateListOf(): SnapshotStateList<T>

fun <T> mutableStateListOf(vararg elements: T): SnapshotStateList<T>

fun <T> Collection<T>.toMutableStateList(): SnapshotStateList<T>
```

```kotlin
val items = remember { mutableStateListOf<String>() }
items.add("one")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `elements` | `vararg T` | — | Initial elements of the returned list. |

## Notes

- Wrap in [remember](./remember.md) inside a composable to survive recomposition.
- Reading `.size` or iterating the list subscribes the calling scope to structural changes; reading an individual element via `[index]` also subscribes to changes of that slot.
- Package: `androidx.compose.runtime`.

## Related

- [mutableStateOf](./mutablestateof.md)
- [mutableStateMapOf](./mutablestatemapof.md)
- [mutableStateSetOf](./mutablestatesetof.md)
