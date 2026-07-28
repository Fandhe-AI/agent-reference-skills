# mutableStateSetOf

Creates an instance of `MutableSet<T>` that is observable and can be snapshot, so structural changes trigger recomposition.

## Signature / Usage

```kotlin
fun <T> mutableStateSetOf(): SnapshotStateSet<T>

fun <T> mutableStateSetOf(vararg elements: T): SnapshotStateSet<T>
```

```kotlin
val selectedIds = remember { mutableStateSetOf<String>() }
selectedIds.add("id-1")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `elements` | `vararg T` | — | Initial elements of the returned set. |

## Notes

- Wrap in [remember](./remember.md) inside a composable to survive recomposition.
- Package: `androidx.compose.runtime`.

## Related

- [mutableStateOf](./mutablestateof.md)
- [mutableStateListOf](./mutablestatelistof.md)
- [mutableStateMapOf](./mutablestatemapof.md)
