# Deep Links in Navigation 3

Since stable `androidx.navigation3:navigation3-runtime:1.2.0` (2026-09-23), Navigation 3 ships its own deep-link package, `androidx.navigation3.runtime.deeplink`: a `DeepLinkRequest` wraps an incoming URI/`Intent`, one or more `DeepLinkMatcher`s (typically `UriDeepLinkMatcher`) are matched against it, and the best `MatchResult` yields a `NavKey` (or a synthetic back stack) to use for the back stack. This is a different, newer mechanism from the `DeepLinkPattern`/`KeyDecoder` hand-rolled pipeline shown in the `android/compose-samples` JetNews sample (package `com.example.jetnews.deeplink.util`) and in older `android/nav3-recipes` snippets — those predate this API and are app-owned recipe code, not part of the library.

## Signature / Usage

Match an incoming request in `onCreate` or `onNewIntent`:

```kotlin
// 1. Instantiate your DeepLinkMatcher instances.
val homeMatcher = StaticKeyDeepLinkMatcher(HomeKey, listOf(DeepLinkMatcher.actionFilter(Intent.ACTION_VIEW)))

val userProfileMatcher = UriDeepLinkMatcher(
    DeepLinkUri("www.example.com/users/{id}"),
    serializer<UserProfileKey>()
).withBackStack { matchResult ->
    listOf(HomeKey, matchResult.key)
}

// 2. Collate all matchers (different generic types require wildcards).
val deepLinkMatchers: List<DeepLinkMatcher<*, *>> = listOf(homeMatcher, userProfileMatcher)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 3. Create a DeepLinkRequest from the incoming Intent.
        val request = DeepLinkRequest(intent = intent)

        // 4. MatchResult is Comparable, so maxOrNull() picks the best match.
        val matchResult = deepLinkMatchers
            .mapNotNull { it.match(request) }
            .maxOrNull()

        // 5. Create the back stack from the match result.
        val backStack: List<NavKey> = when (matchResult) {
            null -> listOf(HomeKey)
            is BackStackMatchResult<*, *> -> {
                @Suppress("UNCHECKED_CAST")
                matchResult.backStack as List<NavKey>
            }
            else -> listOf(matchResult.key as NavKey)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DeepLinkRequest(uri: DeepLinkUri? = null, extras)` | constructor | `uri = null` | Represents a requested deep link. Requires either a `uri` or non-empty `extras`. |
| `DeepLinkRequest(uri: String, extras)` | constructor | — | KMP secondary constructor taking a raw string URI. |
| `DeepLinkRequest(intent, extras)` | Android-only operator | — | Builds a request from an `Intent`: `uri` from `intent.data`, MIME type and action extras if non-null, all non-null `intent.extras` stored as `SavedState` under `IntentExtrasKey`, plus any extra `extras`. |
| `DeepLinkRequest.MimeTypeExtrasKey` / `mimeTypeExtra(mimeType)` | `RequestExtrasKey<String>` / helper | — | Stores a MIME type `String` in the request extras. |
| `DeepLinkRequest.ActionExtrasKey` / `actionExtra(action)` | Android-only key / helper | — | Stores an `Intent` action `String` in the request extras. |
| `DeepLinkRequest.IntentExtrasKey` | Android-only `RequestExtrasKey<SavedState>` | — | Holds the originating intent's extras as `SavedState`. |
| `RequestExtras`, `requestExtras { }`, `RequestExtrasKey<T>` | class / DSL / interface | — | Type-safe key-value container for `DeepLinkRequest.extras`; `put(key, value)` in the builder, `extras[key]` / `key in extras` to read, `emptyRequestExtras()` for an empty instance, `+` / `-` operators to combine or remove extras. |
| `DeepLinkMatcher<T : Any, R : MatchResult<T>>(filters)` | abstract class | — | Base type for anything that can match a `DeepLinkRequest` to a navigation key of type `T`. `T` is the destination key type, `R` is the specific `MatchResult` subtype returned by `match` / `matchRequest`, so no unchecked downcast is needed. `match(request)` runs `filters` first, then delegates to the abstract `matchRequest(request)`. |
| `DeepLinkMatcher.Filter` | fun interface | — | `filterRequest(request): Boolean`; declared `filters` must all pass for a match to proceed (pre-filtering). Built-in factories: `DeepLinkMatcher.mimeTypeFilter(mimeType)` and the Android-only `actionFilter(action)`; both compare by case-insensitive string equality. |
| `DeepLinkMatcher.MatchResult<T>(key)` | open class | — | Returned on a successful match; holds the resolved `key: T` and is `Comparable` so multiple matches can be ranked. |
| `UriDeepLinkMatcher<T>(uriPattern, serializer, filters)` | open class | — | `DeepLinkMatcher` that matches on a `DeepLinkUri` pattern and instantiates the matched `NavKey` via a `kotlinx.serialization` `serializer`. Returns a `UriMatchResult<T>` on success. Pattern syntax (scheme, authority, path, query, fragment) is detailed in [navigation3-uri-deep-link-matcher.md](./navigation3-uri-deep-link-matcher.md). |
| `UriMatchResult<T>(key, arguments)` | open class | `arguments` = empty map | `MatchResult` subtype from `UriDeepLinkMatcher`; `arguments` is the flattened `Map<String, List<String>>` of extracted path/query/fragment values (defaults to an empty map). Its `compareTo` prefers exact-path over wildcard/argument matches, then more path arguments, then more total arguments. |
| `StaticKeyDeepLinkMatcher<T>(key, filters)` | class | — | `DeepLinkMatcher` that ignores the URI and returns the fixed `key` whenever all `filters` pass — for action-only or mimeType-only deep links; do not use it for fixed URIs (use `UriDeepLinkMatcher`, whose `UriMatchResult` is comparable with other URI matches). |
| `DeepLinkMatcher<T, *>.withBackStack(backStackBuilder)` | extension function → `BackStackMatcher<T, K>` | — | Wraps a matcher so a successful match also produces a full `List<K>` back stack, exposed as `BackStackMatchResult.backStack`. `BackStackMatchResult` delegates comparison to the wrapped result, preserving the original ranking. |
| `WrappedMatchResult<T>(matchResult)` | abstract class | — | Wraps another `MatchResult` so custom results can be layered on top of it; `BackStackMatchResult` extends it. |
| `DeepLinkUri` | `expect`/`actual` type | — | Multiplatform URI abstraction; on Android it is a `typealias` for `android.net.Uri`. Build one with the top-level `DeepLinkUri(uriString: String)` function. |
| `DeepLinkSerializer<T>` | abstract class | — | Implement to control how a single `NavKey` field is stringified for/parsed from a URI segment or query value (`serialName`, `serialize(T): String`, `deserialize(String): T`), for types `kotlinx.serialization` can't stringify by default. Compatible with `rememberSaveable` and `rememberNavBackStack`. |

## Notes

- Stable since `androidx.navigation3:navigation3-runtime:1.2.0` (2026-09-23); the deep-link API first appeared in `1.2.0-alpha03`.
- `AndroidManifest.xml` `<intent-filter>` declarations are still required to make the app reachable from the OS; see [intent-filter-deep-links](./intent-filter-deep-links.md).
- This built-in matcher pipeline is manual/explicit by design — app code still owns the list of matchers and how the best match is selected; there is no auto-wiring from `<intent-filter>` to a `NavKey` like Navigation Compose's `navDeepLink()`.
- Changes during the 1.2.0 alphas: `1.2.0-alpha05` removed the `fromUri` / `fromUriString` / `fromIntent` / `fromAction` / `fromMimeType` factory functions (replaced by the constructors plus `extras`) and made `DeepLinkMatcher.Filter` a `fun interface`; `1.2.0-alpha07` renamed the secondary constructor parameter `uriString` to `uri`, added the second type parameter `R` to `DeepLinkMatcher`, and added `BackStackMatcher`, `WrappedMatchResult` and `DeepLinkSerializer`; `1.2.0-beta01` changed `DeepLinkRequest.extras` from `Map<String, Any>` to `RequestExtras`.
- `UriDeepLinkMatcher` returns `null` (not an exception) when required arguments are missing or cannot be parsed, so other matchers can still be tried.
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3.runtime.deeplink`) deep-link API — distinct from the same-named concept in other skills, and from Navigation Compose's `androidx.navigation.NavDeepLinkRequest` (string-pattern matching in `androidx.navigation`).

## Related

- [nav-deep-link](./nav-deep-link.md)
- [Match URI deep links](./navigation3-uri-deep-link-matcher.md)
- [Create custom deep link matchers](./navigation3-custom-deep-link-matcher.md)
- [NavDisplay](../navigation3/navdisplay.md)
- [NavKey](../navigation3/navkey.md)
- [Modularize Navigation 3 Code](../navigation3/modularize.md)
