# Metadata DSL / NavMetadataKey

Metadata shares arbitrary information between `NavEntry`, `Scene` and `NavDisplay`; it is a `Map<String, Any>`, with a type-safe DSL (`metadata { put(key, value) }`) built on `NavMetadataKey`.

## Signature / Usage

```kotlin
@DslMarker public annotation class MetadataDsl

public inline fun metadata(builder: MetadataScope.() -> Unit): Map<String, Any>

@MetadataDsl
public class MetadataScope {
    public fun <K : NavMetadataKey<T>, T : Any> put(key: K, value: T)
}

public operator fun <T : Any> Map<String, Any>.get(key: NavMetadataKey<T>): T?
public operator fun <T : Any> Map<String, Any>.contains(key: NavMetadataKey<T>): Boolean

public interface NavMetadataKey<T : Any>
```

Define keys, then build and read metadata:

```kotlin
class MySceneStrategy<T : Any> : SceneStrategy<T> {
    object MyStringMetadataKey : NavMetadataKey<String>
}

entry<Home>(
    metadata = metadata {
        put(NavDisplay.TransitionKey) { fadeIn() togetherWith fadeOut() }
        if (condition) {
            put(MySceneStrategy.MyStringMetadataKey, "Hello, world!")
        }
    }
) {
    // ...
}

// import androidx.navigation3.runtime.contains
// import androidx.navigation3.runtime.get
val hasMyString: Boolean = metadata.contains(MySceneStrategy.MyStringMetadataKey)
val myString: String? = metadata[MySceneStrategy.MyStringMetadataKey]
```

Providing metadata without the DSL:

```kotlin
when (key) {
    is Home -> NavEntry(key, metadata = mapOf("key" to "value")) {}
}

entry<Home>(metadata = mapOf("key" to "value")) { /* ... */ }
entry<Conversation>(metadata = { key: Conversation ->
    mapOf("key" to "value: ${key.id})")
}) { /* ... */ }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NavEntry(metadata = ...)` | `Map<String, Any>` | Metadata passed directly when constructing a `NavEntry`. |
| `entry<K>(metadata = ...)` | `Map<String, Any>` or `(key: K) -> Map<String, Any>` | Two overloads of `entry` in the `entryProvider` DSL: a map, or a lambda receiving the entry's key. |
| `put(key, value)` | `K : NavMetadataKey<T>`, `T : Any` | Adds a typed entry to the map being built. |

## Notes

- Metadata DSL introduced in Navigation 3 `1.1.0-beta01`.
- By default `Scene.metadata` returns the `metadata` of the last entry in `Scene.entries` (empty map if null); override it when implementing `Scene`. The default `SinglePaneScene` used by `NavDisplay` holds one entry, so its metadata is that `NavEntry`'s metadata.
- Convention: define keys as nested objects of the class that reads them (scene strategies, entry decorators); for functions such as `NavDisplay`, define them in an object of the same name (e.g. `NavDisplay.TransitionKey`).
- Keys are stored under `key.toString()` in the underlying map.
- To build on a base map, use `baseMap + metadata { ... }`.
- If `[]` indexed access does not compile, import `androidx.navigation3.runtime.get` manually.
- Package: `androidx.navigation3.runtime`. This is the Android Navigation 3 (Kotlin) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.
- Source: https://developer.android.com/guide/navigation/navigation-3/metadata (retrieved 2026-10-17; Navigation 3 1.2.0)

## Related

- [NavEntry](./naventry.md)
- [Scene](./scene.md)
- [NavDisplay](./navdisplay.md)
- [entryProvider / entry](./entryprovider.md)
- [SceneStrategy](./scenestrategy.md)
