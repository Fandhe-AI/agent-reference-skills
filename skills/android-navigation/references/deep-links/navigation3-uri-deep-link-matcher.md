# UriDeepLinkMatcher (Navigation 3 URI deep links)

`UriDeepLinkMatcher` matches hierarchical URIs against a `DeepLinkUri` pattern, extracts arguments, and uses `kotlinx.serialization` to deserialize them into a `NavKey` class.

## Signature / Usage

```kotlin
@Serializable
data class UserProfileKey(val id: String) : NavKey

val userProfilePattern = DeepLinkUri("www.example.com/users/{id}")
val userProfileMatcher = UriDeepLinkMatcher(userProfilePattern, serializer<UserProfileKey>())

val request = DeepLinkRequest(uri = "https://www.example.com/users/123")
val matchResult = userProfileMatcher.match(request)
val key = matchResult?.key // UserProfileKey(id = "123")
```

```kotlin
public open class UriDeepLinkMatcher<out T : Any>(
    uriPattern: DeepLinkUri,
    private val serializer: KSerializer<T>,
    filters: List<Filter> = emptyList(),
) : DeepLinkMatcher<T, UriMatchResult<T>>(filters)

public open class UriMatchResult<out T : Any>(
    key: T,
    public val arguments: Map<String, List<String>> = emptyMap(),
) : DeepLinkMatcher.MatchResult<T>(key)
```

## Options / Props

Pattern matching per URI component:

| Component | Rule |
|-----------|------|
| Scheme | No scheme in pattern matches both `http` and `https`. Pattern `http` matches `http` and `https` requests; pattern `https` matches only `https`. Custom schemes (`myapp://`) match exactly. |
| Authority | Case-insensitive exact match of host and optional port. No placeholders or wildcards, no arguments extracted. `example.com` and `www.example.com` are distinct. |
| Path | Literal segments, `{id}` placeholders (also `{first}-{last}`, `user_{id}`), `.*` wildcard. A placeholder may match an empty string. Trailing slash creates an extra segment and does not match. |
| Query | Order-independent; extra request params ignored. `name={name}`, `{rawQuery}` (unnamed, list of raw entries), `type=user_{id}`, repeated keys into a list (`list={list}`), `type=user_.*`. |
| Fragment | `#section1`, `#section_{id}`, `#section_.*`. |

Supported argument types:

| Type | Notes |
|------|-------|
| Primitives and `String` | `Boolean`, `Int`, `Long`, `Float`, `Double`, `Char`, `Byte`, `Short`. |
| Enums | Matched case-sensitively against element names. |
| `List` / `Set` / `Array` | Of primitives, strings, or enums; repeated query keys (`?id=10&id=20`) deserialize into them. |
| Nested `@Serializable` classes | Properties are flattened into individual URI parameters of the same name (use `@SerialName` to avoid name collisions). |
| `DeepLinkSerializer<T>` | Abstract `KSerializer<T>` converting a single `String` to/from `T` (custom objects, external types such as `java.time.LocalDate`, custom-delimited collections). Apply with `@Serializable(with = ...)`, or on the element type for repeated params. |

```kotlin
abstract class DeepLinkSerializer<T : Any> : KSerializer<T> {
    abstract val serialName: String
    abstract fun deserialize(value: String): T
    abstract fun serialize(value: T): String
}
```

Outcomes:

| Situation | Result |
|-----------|--------|
| Missing required parameter (non-nullable, no default) | `match` returns `null` |
| Value cannot be parsed to the property type (e.g. `"abc"` for `Int`, unknown enum name) | `match` returns `null` |
| Empty optional query value, or absent param with default | Default is used |
| `Map` property | Throws `IllegalArgumentException` |
| Nested collections, `List<Filter>` without `DeepLinkSerializer`, nested class mapped to a single placeholder | Throws `SerializationException` |

`UriMatchResult` ranking (in order): result type (`UriMatchResult` beats other `MatchResult` types), exact path over placeholder/wildcard, more path arguments, presence of arguments, total argument count.

Overridable members of the open class:

| Member | Purpose |
|--------|---------|
| `matchRequest(request)` | Top-level entry; override to inspect request extras or add preconditions. |
| `protected open fun matchUri(uri: DeepLinkUri): UriMatchResult<T>?` | Match the URI against the pattern; override to normalize incoming URIs, then call `super.matchUri`. |
| `protected open fun matchArguments(pathArgs, queryArgs, fragmentArgs): UriMatchResult<T>?` | Deserialize extracted argument maps into the key; override to inject or transform values. |

```kotlin
class LegacyPrefixUriDeepLinkMatcher<T : Any>(
    uriPattern: DeepLinkUri,
    serializer: KSerializer<T>
) : UriDeepLinkMatcher<T>(uriPattern, serializer) {

    override fun matchUri(uri: DeepLinkUri): UriMatchResult<T>? {
        val path = uri.path
        val normalizedUri = if (path != null && path.startsWith("/legacy/")) {
            DeepLinkUri(uri.toString().replaceFirst("/legacy", ""))
        } else {
            uri
        }
        return super.matchUri(normalizedUri)
    }
}
```

## Notes

- Only for hierarchical URIs. For non-hierarchical URIs or custom schemes such as `tel:`, write a custom matcher (see [navigation3-custom-deep-link-matcher](./navigation3-custom-deep-link-matcher.md)).
- When arguments share a name, path arguments take priority over query, which takes priority over fragment (`matchArguments` merges the maps in that order).
- Part of the `androidx.navigation3.runtime.deeplink` package, available from `navigation3-runtime` 1.2.0 (see [navigation3-deep-links](./navigation3-deep-links.md)). This is distinct from Navigation Compose's `navDeepLink()` string-pattern API.

## Related

- [navigation3-deep-links](./navigation3-deep-links.md)
- [navigation3-custom-deep-link-matcher](./navigation3-custom-deep-link-matcher.md)
- [intent-filter-deep-links](./intent-filter-deep-links.md)
