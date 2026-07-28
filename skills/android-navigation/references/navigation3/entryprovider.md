# entryProvider / entry

DSL for building the `(key: T) -> NavEntry<T>` function that `NavDisplay` uses to resolve back stack keys into `NavEntry`s. `entryProvider { ... }` opens an `EntryProviderScope<T>`, inside which `entry<K>` registers per-type content.

## Signature / Usage

```kotlin
public inline fun <T : Any> entryProvider(
    noinline fallback: (unknownScreen: T) -> NavEntry<T> = {
        throw IllegalStateException("Unknown screen $it")
    },
    builder: EntryProviderScope<T>.() -> Unit,
): (T) -> NavEntry<T>

public inline fun <reified K : T> entry(
    noinline clazzContentKey: (key: @JvmSuppressWildcards K) -> Any = { defaultContentKey(it) },
    metadata: Map<String, Any> = emptyMap(),
    noinline content: @Composable (K) -> Unit,
)
```

```kotlin
val provider = entryProvider {
    entry<Home> { Text("Home") }
    entry<Product>(
        metadata = mapOf("extraDataKey" to "extraDataValue")
    ) { product -> Text("Product ${product.id}") }
}
```

Equivalent hand-written lambda, without the DSL:

```kotlin
entryProvider = { key ->
    when (key) {
        is Home -> NavEntry(key) { Text("Home") }
        is Product -> NavEntry(key) { Text("Product ${key.id}") }
        else -> NavEntry(Unit) { Text("Invalid key: $key") }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `(unknownScreen: T) -> NavEntry<T>` | throws `IllegalStateException` | Called when a back stack key matches no registered `entry<K>`. |
| `builder` | `EntryProviderScope<T>.() -> Unit` | — | Lambda where `entry<K>` calls register key-to-content mappings. |
| `clazzContentKey` (on `entry<K>`) | `(K) -> Any` | `defaultContentKey(it)` | Per-instance `contentKey` factory for entries of type `K`. |
| `metadata` (on `entry<K>`) | `Map<String, Any>` or `(K) -> Map<String, Any>` | `emptyMap()` | Static or per-instance metadata attached to the resulting `NavEntry`. |
| `content` (on `entry<K>`) | `@Composable (K) -> Unit` | — | Composable content for keys of type `K`. |

## Notes

- `EntryProviderScope` also exposes an `entry(key: K, ...)` overload for registering one exact key instance rather than a whole type.
- `entryProvider` and `entry` live in `androidx.navigation3.runtime` — this is a different DSL from Navigation Compose's `NavGraphBuilder.composable()`.
- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavEntry](./naventry.md)
- [NavDisplay](./navdisplay.md)
