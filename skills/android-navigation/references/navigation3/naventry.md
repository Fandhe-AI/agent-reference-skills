# NavEntry

Holds a navigation `key` together with the composable `content` it represents. `NavEntry` instances are produced by an `entryProvider` and rendered by a `Scene`/`NavDisplay`.

## Signature / Usage

```kotlin
public class NavEntry<T : Any>(
    private val key: T,
    public val contentKey: Any = defaultContentKey(key),
    public val metadata: Map<String, Any> = emptyMap(),
    private val content: @Composable (T) -> Unit,
) {
    // Copies key, contentKey and metadata from another NavEntry
    public constructor(
        navEntry: NavEntry<T>,
        content: @Composable (T) -> Unit,
    )
}

@Composable
public fun Content()
```

```kotlin
NavEntry(Home) {
    Text("Home")
}

NavEntry(
    key = Product("123"),
    metadata = mapOf("extraDataKey" to "extraDataValue")
) { product ->
    Text("Product ${product.id}")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `T` | — | Navigation key this entry represents. |
| `contentKey` | `Any` | composite of `key.toString()` and `key::class.toString()` | Stable id that identifies this entry's content and any `NavEntryDecorator` state; entries sharing a `contentKey` are treated as the same content/decorator state. Must be saveable. |
| `metadata` | `Map<String, Any>` | `emptyMap()` | Information passed to the display layer (e.g. `SceneStrategy` pane assignment, animation overrides via `NavDisplay.TransitionKey`). |
| `content` | `@Composable (T) -> Unit` | — | Composable UI rendered for this entry. |

## Notes

- `Content()` is a composable that invokes `content(key)`; only entries actually rendered by a `Scene` get their `content` invoked.
- `NavEntry` is `@Immutable`; content lambdas are compared by reference.
- Since 1.1.6 / 1.2.0 the `contentKey` default is a composite of `key.toString()` and `key::class.toString()` (previously `key.toString()`), so `data object` keys with the same name under different interfaces no longer collide. On the JS platform `key::class` returns only the simple class name, so JS should still supply a custom `contentKey` for keys with duplicate names.
- The secondary constructor `NavEntry(navEntry, content)` creates a new entry that reuses `key`, `contentKey` and `metadata` of an existing entry with different `content`.
- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [entryProvider / entry](./entryprovider.md)
- [NavEntryDecorator](./naventrydecorator.md)
- [Scene](./scene.md)
