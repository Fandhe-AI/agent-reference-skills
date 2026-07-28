# NavEntry

Holds a navigation `key` together with the composable `content` it represents. `NavEntry` instances are produced by an `entryProvider` and rendered by a `Scene`/`NavDisplay`.

## Signature / Usage

```kotlin
public class NavEntry<T : Any>(
    private val key: T,
    public val contentKey: Any = defaultContentKey(key),
    public val metadata: Map<String, Any> = emptyMap(),
    private val content: @Composable (T) -> Unit,
)

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
| `contentKey` | `Any` | `key.toString()` | Stable id that identifies this entry's content and any `NavEntryDecorator` state; entries sharing a `contentKey` are treated as the same content/decorator state. Must be saveable. |
| `metadata` | `Map<String, Any>` | `emptyMap()` | Information passed to the display layer (e.g. `SceneStrategy` pane assignment, animation overrides via `NavDisplay.TransitionKey`). |
| `content` | `@Composable (T) -> Unit` | — | Composable UI rendered for this entry. |

## Notes

- `Content()` is a composable that invokes `content(key)`; only entries actually rendered by a `Scene` get their `content` invoked.
- `NavEntry` is `@Immutable`; content lambdas are compared by reference.
- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [entryProvider / entry](./entryprovider.md)
- [NavEntryDecorator](./naventrydecorator.md)
- [Scene](./scene.md)
