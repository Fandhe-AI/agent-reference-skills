# Deep Links in Navigation 3

Since `androidx.navigation3:navigation3-runtime:1.2.0-alpha05`, Navigation 3 ships its own deep-link package, `androidx.navigation3.runtime.deeplink`: a `DeepLinkRequest` wraps an incoming URI/`Intent`, one or more `DeepLinkMatcher`s (typically `UriDeepLinkMatcher`) are matched against it in order, and a successful match yields a `NavKey` to push onto the back stack. This is a different, newer mechanism from the `DeepLinkPattern`/`KeyDecoder` hand-rolled pipeline shown in the `android/compose-samples` JetNews sample (package `com.example.jetnews.deeplink.util`) and in older `android/nav3-recipes` snippets — those predate this API and are app-owned recipe code, not part of the library.

## Signature / Usage

```kotlin
// Declare one matcher per supported deep-link shape.
val homeMatcher = UriDeepLinkMatcher(
    uriPattern = DeepLinkUri("https://www.example.com/home"),
    serializer = HomeKey.serializer(),
)
val userMatcher = UriDeepLinkMatcher(
    uriPattern = DeepLinkUri("https://www.example.com/users/{userId}"),
    serializer = UserKey.serializer(),
)
val matchers: List<DeepLinkMatcher<out NavKey, *>> = listOf(homeMatcher, userMatcher)

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Build a DeepLinkRequest straight from the launching Intent.
    val request = DeepLinkRequest(intent)
    val key: NavKey = matchers.firstNotNullOfOrNull { it.match(request)?.key } ?: HomeKey

    setContent {
        val backStack: NavBackStack<NavKey> = rememberNavBackStack(key)
        NavDisplay(backStack = backStack /* ... */)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeepLinkRequest(uri, extras)` / `DeepLinkRequest(uriString, extras)` | class | Represents a requested deep link. `extras` carries typed side-channel data (e.g. mimeType, action) via `RequestExtrasKey`. An Android-only `DeepLinkRequest(intent, extras)` operator builds one directly from an `Intent`. |
| `DeepLinkMatcher<T, R : MatchResult<T>>(filters)` | abstract class | Base type for anything that can match a `DeepLinkRequest` to a navigation key of type `T`. `match(request)` runs `filters` first, then delegates to the abstract `matchRequest(request)`. |
| `DeepLinkMatcher.Filter` | fun interface | `filterRequest(request): Boolean`; declared filters must all pass for a match to proceed. `DeepLinkMatcher.mimeTypeFilter(mimeType)` and the Android-only `actionFilter(action)` are built-in factories. |
| `DeepLinkMatcher.MatchResult<T>(key)` | open class | Returned on a successful match; holds the resolved `key: T` and is `Comparable` so multiple matches can be ranked. |
| `UriDeepLinkMatcher<T>(uriPattern, serializer, filters)` | open class | `DeepLinkMatcher` that matches on a `DeepLinkUri` pattern. Path segments support `{name}` placeholders and `.*` wildcards; query supports named (`?name={name}`), unnamed (`?{raw}`), and flag params; fragment supports `#section_{id}`. Instantiates the matched `NavKey` via the supplied `kotlinx.serialization` `serializer`. Returns a `UriMatchResult<T>` on success. |
| `UriMatchResult<T>(key, arguments)` | open class | `MatchResult` subtype from `UriDeepLinkMatcher`; `arguments` is the flattened `Map<String, List<String>>` of extracted path/query/fragment values. Its `compareTo` prefers exact-path over wildcard/argument matches, then more path arguments, then more total arguments. |
| `StaticKeyDeepLinkMatcher<T>(key, filters)` | class | `DeepLinkMatcher` that ignores the URI entirely and returns the fixed `key` whenever all `filters` pass — useful for action-only or mimeType-only deep links. |
| `DeepLinkMatcher<T, *>.withBackStack(backStackBuilder)` | extension function → `BackStackMatcher<T, K>` | Wraps a matcher so a successful match also produces a full `List<K>` back stack (via `backStackBuilder`) instead of just a single key, exposed as `BackStackMatchResult.backStack`. |
| `DeepLinkUri` | `expect`/`actual` type | Multiplatform URI abstraction; on Android it is a `typealias` for `android.net.Uri`. Build one with the top-level `DeepLinkUri(uriString: String)` function. |
| `DeepLinkSerializer<T>` | abstract class | Implement to control how a single `NavKey` field is stringified for/parsed from a URI segment or query value (`serialize(T): String`, `deserialize(String): T`), for types `kotlinx.serialization` can't stringify by default. |
| `requestExtras { }` / `RequestExtrasKey<T>` | DSL / interface | Type-safe key-value bag for `DeepLinkRequest.extras`; `RequestExtrasScope.put(key, value)` inside the builder, `map[key]` / `key in map` to read it back. |

## Notes

- Requires `androidx.navigation3:navigation3-runtime:1.2.0-alpha05` or newer (latest alpha as of this writing: `1.2.0-alpha07`) — the latest stable release (`1.1.5` as of this writing) does not include the `deeplink` package at all; apps on stable must still hand-roll matching (see the JetNews-style recipe pattern referenced above) or wait for promotion to a stable release.
- `AndroidManifest.xml` `<intent-filter>` declarations are still required to make the app reachable from the OS; see [intent-filter-deep-links](./intent-filter-deep-links.md).
- This built-in matcher pipeline is manual/explicit by design — app code still owns the list of matchers and the order they're tried in; there is no auto-wiring from `<intent-filter>` to a `NavKey` like Navigation Compose's `navDeepLink()`.
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3.runtime.deeplink`) deep-link API — distinct from the same-named concept in other skills, and from Navigation Compose's `androidx.navigation.NavDeepLinkRequest` (string-pattern matching in `androidx.navigation`).

## Related

- [nav-deep-link](./nav-deep-link.md)
- [NavDisplay](../navigation3/navdisplay.md)
- [NavKey](../navigation3/navkey.md)
