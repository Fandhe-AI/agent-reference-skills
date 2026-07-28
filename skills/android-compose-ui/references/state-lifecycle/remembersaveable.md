# rememberSaveable

Behaves like `remember`, but the stored value also survives activity or process recreation (e.g. configuration changes such as screen rotation) via the saved instance state mechanism.

## Signature / Usage

```kotlin
@Composable
fun <T : Any> rememberSaveable(vararg inputs: Any?, init: () -> T): T

@Composable
fun <T : Any> rememberSaveable(
    vararg inputs: Any?,
    saver: Saver<T, out Any>,
    init: () -> T,
): T

@Composable
fun <T> rememberSaveable(
    vararg inputs: Any?,
    stateSaver: Saver<T, out Any>,
    init: () -> MutableState<T>,
): MutableState<T>
```

```kotlin
var selectedCity = rememberSaveable {
    mutableStateOf(City("Madrid", "Spain"))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `inputs` | `vararg Any?` | — | Extra invalidation keys; when any input changes, `init` reruns like `remember`'s keys. |
| `saver` | `Saver<T, out Any>` | `autoSaver()` | Converts `T` to/from a `Bundle`-savable representation. Required for types not supported by the default `Bundle` saver (e.g. non-`Parcelable` data classes). |
| `stateSaver` | `Saver<T, out Any>` | — | Saver applied to the value inside a returned `MutableState<T>`. |
| `init` | `() -> T` | — | Produces the initial value on first composition (or after process recreation, the restored value is used instead). |

## Notes

- Primitive types, `Parcelable`, and a few other built-in types are handled automatically; other types need `@Parcelize`, `listSaver`, `mapSaver`, or a custom `Saver`.
- The underlying `Bundle` has a limited size (`TransactionTooLargeException` risk) — save only minimal state (IDs, indices, simple values), not large objects.
- Does not retain state if the activity is completely dismissed by the user (e.g. swiped away from recents while finishing).
- Package: `androidx.compose.runtime.saveable`.

## Related

- [remember](./remember.md)
- [Saver](./saver.md)
