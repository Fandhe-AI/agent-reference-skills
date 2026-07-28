# Saver

Describes how to convert an object of an arbitrary type into a form that can be saved by [rememberSaveable](./remembersaveable.md) (into a `Bundle`), and restored back. `listSaver` and `mapSaver` are convenience factories for the common list-based and map-based representations.

## Signature / Usage

```kotlin
interface Saver<Original, Saveable : Any> {
    fun SaverScope.save(value: Original): Saveable?
    fun restore(value: Saveable): Original?
}

fun interface SaverScope {
    fun canBeSaved(value: Any): Boolean
}

fun <T> autoSaver(): Saver<T, Any>

fun <Original, Saveable> listSaver(
    save: SaverScope.(value: Original) -> List<Saveable>,
    restore: (list: List<Saveable>) -> Original?,
): Saver<Original, Any>

fun <T> mapSaver(
    save: SaverScope.(value: T) -> Map<String, Any?>,
    restore: (Map<String, Any?>) -> T?,
): Saver<T, Any>
```

```kotlin
data class City(val name: String, val country: String)

val CitySaver = run {
    val nameKey = "Name"
    val countryKey = "Country"
    mapSaver(
        save = { mapOf(nameKey to it.name, countryKey to it.country) },
        restore = { City(it[nameKey] as String, it[countryKey] as String) },
    )
}

var selectedCity = rememberSaveable(stateSaver = CitySaver) {
    mutableStateOf(City("Madrid", "Spain"))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `save` | `SaverScope.(Original) -> Saveable?` | — | Converts the original value into a form `rememberSaveable` can store (a `List` for `listSaver`, a `Map<String, Any?>` for `mapSaver`). |
| `restore` | `(Saveable) -> Original?` | — | Reconstructs the original value from the saved representation. |

## Notes

- `autoSaver()` is the default `Saver` used by `rememberSaveable` when no `saver`/`stateSaver` is given; it performs no conversion and only works for types natively supported by `Bundle` (or `@Parcelize` types).
- Prefer `@Parcelize` for simple `data class` state when possible; use `listSaver`/`mapSaver`, or implement `Saver` directly, for types that can't be made `Parcelable`.
- Package: `androidx.compose.runtime.saveable`.

## Related

- [rememberSaveable](./remembersaveable.md)
