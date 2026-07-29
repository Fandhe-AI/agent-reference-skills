# Deep Links in Navigation 3

Navigation 3 (`androidx.navigation3`) parses deep-link `Intent`s into type-safe `NavKey` instances using an explicit `DeepLinkPattern` / `DeepLinkMatcher` / `KeyDecoder` pipeline, instead of Navigation Compose's built-in `NavDeepLinkRequest` string-pattern matching.

## Signature / Usage

```kotlin
val deepLinkPatterns: List<DeepLinkPattern<out NavKey>> = listOf(
    DeepLinkPattern(HomeKey.serializer(), "https://www.example.com/home".toUri()),
    DeepLinkPattern(UsersKey.serializer(), "https://www.example.com/users/with/{filter}".toUri()),
    DeepLinkPattern(SearchKey.serializer(), "https://www.example.com/users/search?{firstName}&{age}"),
)

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val uri: Uri? = intent.data
    val key: NavKey = uri?.let {
        val request = DeepLinkRequest(uri)
        val match = deepLinkPatterns.firstNotNullOfOrNull { pattern ->
            DeepLinkMatcher(request, pattern).match()
        }
        match?.let { KeyDecoder(match.args).decodeSerializableValue(match.serializer) }
    } ?: HomeKey

    setContent {
        val backStack: NavBackStack<NavKey> = rememberNavBackStack(key)
        NavDisplay(backStack = backStack /* ... */)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeepLinkPattern(serializer, uri)` | class | Declares one supported deep-link URL and the `NavKey` serializer to decode it into. Supports exact URLs, `{param}` path arguments, and `?{key}` query arguments. |
| `DeepLinkRequest(uri)` | class | Parses an incoming `Uri` into `pathSegments` and a `queries` map. |
| `DeepLinkMatcher(request, pattern)` | class | Matches a `DeepLinkRequest` against a `DeepLinkPattern`; `.match()` returns the extracted args or `null`. |
| `KeyDecoder(args)` | `AbstractDecoder` | Deserializes the matched arguments into the target `@Serializable` `NavKey` via `kotlinx.serialization`. |

## Notes

- Deep link routing is intentionally manual/explicit in Navigation 3 — there is no built-in intent-filter-to-destination auto-wiring like Navigation Compose's `navDeepLink()`; app code owns pattern lists and matching order.
- `AndroidManifest.xml` `<intent-filter>` declarations are still required to make the app reachable from the OS; see [intent-filter-deep-links](./intent-filter-deep-links.md).
- This is Android deep linking / App Links (Kotlin, `androidx.navigation` and `AndroidManifest.xml`) — distinct from the same-named concept in other skills.

## Related

- [nav-deep-link](./nav-deep-link.md)
- [NavDisplay](../navigation3/navdisplay.md)
- [NavKey](../navigation3/navkey.md)
