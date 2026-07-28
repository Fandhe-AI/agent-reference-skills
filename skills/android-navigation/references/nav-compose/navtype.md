# NavType

Defines how a typed navigation argument is put into and retrieved from a `Bundle`, and how it is serialized to/from a route's `String` representation. Used implicitly by type-safe routes, or explicitly via [navArgument](./navargument.md) / the `typeMap` parameter.

## Signature / Usage

```kotlin
public expect abstract class NavType<T>(isNullableAllowed: Boolean) {
    public open val isNullableAllowed: Boolean

    public abstract fun put(bundle: SavedState, key: String, value: T)
    public abstract operator fun get(bundle: SavedState, key: String): T?
    public abstract fun parseValue(value: String): T
    public open fun parseValue(value: String, previousValue: T): T
    public open fun serializeAsValue(value: T): String
}
```

Built-in companion values: `IntType`, `IntArrayType`, `IntListType`, `LongType`, `LongArrayType`, `LongListType`, `FloatType`, `FloatArrayType`, `FloatListType`, `BoolType`, `BoolArrayType`, `BoolListType`, `StringType`, `StringArrayType`, `StringListType`.

```kotlin
val SearchParametersType = object : NavType<SearchParameters>(isNullableAllowed = false) {
    override fun put(bundle: Bundle, key: String, value: SearchParameters) {
        bundle.putParcelable(key, value)
    }
    override fun get(bundle: Bundle, key: String): SearchParameters {
        return bundle.getParcelable(key) as SearchParameters
    }
    override fun serializeAsValue(value: SearchParameters): String =
        Uri.encode(Json.encodeToString(value))
    override fun parseValue(value: String): SearchParameters =
        Json.decodeFromString(value)
}

composable<SearchRoute>(typeMap = mapOf(typeOf<SearchParameters>() to SearchParametersType)) { }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isNullableAllowed` | `Boolean` | — | Whether `null` is a valid value for this type (constructor param, exposed as an `open val`). |
| `put(bundle, key, value)` | `(SavedState, String, T) -> Unit` | — | Writes the value into a `SavedState` (Bundle). |
| `get(bundle, key)` | `(SavedState, String) -> T?` | — | Reads the value out of a `SavedState` (Bundle). |
| `parseValue(value)` | `(String) -> T` | — | Parses a route path/query segment `String` into `T`. |
| `parseValue(value, previousValue)` | `(String, T) -> T` | delegates to single-arg `parseValue` | Overridable variant that can merge with a previously parsed value (used for collection types). |
| `serializeAsValue(value)` | `(T) -> String` | — | Serializes `T` back into a route `String`; override for complex/URL-unsafe types. |

## Notes

- Built-in companion instances cover `Int`, `Long`, `Float`, `Boolean`, `String`, each with an array and list variant; enums and `@Serializable` types get generated `NavType`s automatically for type-safe routes.
- Custom `NavType`s are supplied via the `typeMap` parameter of `composable` / `navigation` / `dialog`, or set as `type` inside [navArgument](./navargument.md) for string-route destinations.
- Package: `androidx.navigation` (`navigation-common` artifact).

## Related

- [navArgument](./navargument.md)
- [Type-Safe Routes](./type-safe-routes.md)
- [composable](./composable.md)
