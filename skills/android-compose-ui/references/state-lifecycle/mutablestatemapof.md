# mutableStateMapOf

Creates an instance of `MutableMap<K, V>` that is observable and can be snapshot, so structural changes trigger recomposition.

## Signature / Usage

```kotlin
fun <K, V> mutableStateMapOf(): SnapshotStateMap<K, V>

fun <K, V> mutableStateMapOf(vararg pairs: Pair<K, V>): SnapshotStateMap<K, V>

fun <K, V> Iterable<Pair<K, V>>.toMutableStateMap(): SnapshotStateMap<K, V>
```

```kotlin
val map = remember { mutableStateMapOf<String, Int>() }
map["a"] = 1
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pairs` | `vararg Pair<K, V>` | — | Initial key/value pairs of the returned map. |

## Notes

- Wrap in [remember](./remember.md) inside a composable to survive recomposition.
- Package: `androidx.compose.runtime`.

## Related

- [mutableStateOf](./mutablestateof.md)
- [mutableStateListOf](./mutablestatelistof.md)
- [mutableStateSetOf](./mutablestatesetof.md)
