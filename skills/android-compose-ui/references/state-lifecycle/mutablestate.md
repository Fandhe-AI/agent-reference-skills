# MutableState

A mutable value holder. Reads of `value` during a composable function's execution subscribe the current recompose scope to changes; writes to `value` outside a snapshot read schedule recomposition of subscribed scopes.

## Signature / Usage

```kotlin
interface MutableState<T> : State<T> {
    override var value: T
    operator fun component1(): T
    operator fun component2(): (T) -> Unit
}
```

```kotlin
val (value, setValue) = remember { mutableStateOf(0) }
```

## Notes

- Returned by [mutableStateOf](./mutablestateof.md), [produceState](./producestate.md) (as the read-only [State](./state.md) supertype), and `rememberSaveable` overloads that take a `stateSaver`.
- Supports Kotlin property-delegate syntax via the `getValue`/`setValue` operators (`var x by remember { mutableStateOf(0) }`).
- Supports destructuring (`component1`/`component2`) into a value and a setter function.
- Package: `androidx.compose.runtime`.

## Related

- [State](./state.md)
- [mutableStateOf](./mutablestateof.md)
