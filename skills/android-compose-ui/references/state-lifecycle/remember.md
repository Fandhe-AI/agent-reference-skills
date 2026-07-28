# remember

Stores an object in memory during composition. A value computed by `remember` is calculated once during initial composition and returned unchanged on recomposition unless one of the given keys changes.

## Signature / Usage

```kotlin
@Composable
inline fun <T> remember(crossinline calculation: @DisallowComposableCalls () -> T): T

@Composable
inline fun <T> remember(
    key1: Any?,
    crossinline calculation: @DisallowComposableCalls () -> T,
): T

@Composable
inline fun <T> remember(
    key1: Any?,
    key2: Any?,
    crossinline calculation: @DisallowComposableCalls () -> T,
): T

@Composable
inline fun <T> remember(
    key1: Any?,
    key2: Any?,
    key3: Any?,
    crossinline calculation: @DisallowComposableCalls () -> T,
): T

@Composable
inline fun <T> remember(
    vararg keys: Any?,
    crossinline calculation: @DisallowComposableCalls () -> T,
): T
```

```kotlin
var name by remember { mutableStateOf("") }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key1`, `key2`, `key3` | `Any?` | — | If any key does not compare equal (`==`) to the previous composition, `calculation` reruns and the new value is remembered. |
| `keys` | `vararg Any?` | — | Same as above but for an arbitrary number of keys. |
| `calculation` | `@DisallowComposableCalls () -> T` | — | Produces the value to remember. Cannot call other `@Composable` functions. |

## Notes

- `remember` stores the value in the Composition and forgets it when the calling composable leaves the Composition.
- Without keys, `remember` never recalculates across recompositions (only on initial composition or full recomposition of the call site).
- Package: `androidx.compose.runtime`.

## Related

- [rememberSaveable](./remembersaveable.md)
- [mutableStateOf](./mutablestateof.md)
- [derivedStateOf](./derivedstateof.md)
