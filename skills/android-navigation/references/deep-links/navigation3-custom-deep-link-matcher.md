# Custom DeepLinkMatcher / MatchResult ranking

Extend `DeepLinkMatcher<T, R>` when `UriDeepLinkMatcher` is not sufficient (for example opaque URIs such as `tel:5550100`), and extend `DeepLinkMatcher.MatchResult` to rank results from your matcher.

## Signature / Usage

```kotlin
class TelDeepLinkMatcher : DeepLinkMatcher<DialerKey, DeepLinkMatcher.MatchResult<DialerKey>>() {
    override fun matchRequest(request: DeepLinkRequest): MatchResult<DialerKey>? {
        val uri = request.uri ?: return null
        if (uri.scheme != "tel") return null

        // Note: schemeSpecificPart is only available on Android
        val phoneNumber = uri.schemeSpecificPart ?: return null
        return MatchResult(DialerKey(phoneNumber = phoneNumber))
    }
}
```

```kotlin
public abstract class DeepLinkMatcher<out T : Any, out R : DeepLinkMatcher.MatchResult<T>>(
    private val filters: List<Filter> = emptyList()
) {
    public fun match(request: DeepLinkRequest): R?
    protected abstract fun matchRequest(request: DeepLinkRequest): R?

    public fun interface Filter {
        public fun filterRequest(request: DeepLinkRequest): Boolean
    }

    public open class MatchResult<out T : Any>(public val key: T) :
        Comparable<MatchResult<@UnsafeVariance T>> {
        public override fun compareTo(other: MatchResult<@UnsafeVariance T>): Int = 0
    }

    public companion object {
        public fun mimeTypeFilter(mimeType: String): Filter
    }
}

public abstract class WrappedMatchResult<out T : Any>(
    public val matchResult: DeepLinkMatcher.MatchResult<T>
) : DeepLinkMatcher.MatchResult<T>(matchResult.key)
```

Ranking a custom result:

```kotlin
class TelMatchResult(
    key: DialerKey,
    val isExactMatch: Boolean,
    val patternLength: Int
) : DeepLinkMatcher.MatchResult<DialerKey>(key) {
    override fun compareTo(other: DeepLinkMatcher.MatchResult<DialerKey>): Int {
        // Unwrap if the other result is wrapped in a BackStackMatchResult or custom WrappedMatchResult
        val target = if (other is WrappedMatchResult<*>) other.matchResult else other
        if (target !is TelMatchResult) {
            // Determine precedence relative to other MatchResult types (e.g. UriMatchResult)
            return 1
        }

        // An exact match wins over a wildcard/prefix match
        if (isExactMatch && !target.isExactMatch) return 1
        if (!isExactMatch && target.isExactMatch) return -1

        // The more specific (longer) pattern wins (e.g., tel:1800* versus tel:*)
        val lengthDiff = this.patternLength - target.patternLength
        if (lengthDiff != 0) {
            return lengthDiff
        }

        return 0
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `T : Any` | type argument | — | Destination navigation key type. |
| `R : DeepLinkMatcher.MatchResult<T>` | type argument | — | Match result type. Use `DeepLinkMatcher.MatchResult<T>` if no custom ranking or metadata is needed. |
| `filters` | `List<Filter>` | — | All filters must pass (`filterRequest` returns `true`) before `matchRequest` is called; otherwise `match` returns `null`. |
| `match(request)` | `R?` | — | Entry point: runs filters, then `matchRequest`. |
| `matchRequest(request)` | `R?` | — | Abstract; implement the matching logic. Return `null` for no match. |
| `MatchResult.compareTo(other)` | `Int` | `0` | Positive if this result wins, negative if it loses, zero if equal. Default returns 0. |
| `WrappedMatchResult.matchResult` | `MatchResult<T>` | — | Wrapped result. Its `compareTo` unwraps `other` if it is also wrapped, then compares the underlying results. |
| `DeepLinkMatcher.mimeTypeFilter(mimeType)` | `Filter` | — | Case-insensitive match on the request's mimeType extra. |

## Notes

- When a custom `MatchResult` subclass is defined, declare it as the matcher's second type parameter (`DeepLinkMatcher<DialerKey, TelMatchResult>()`) so callers can read its properties without unchecked downcasting.
- If the matcher is wrapped by `withBackStack`, unwrap `WrappedMatchResult` before comparing so precedence is evaluated on the underlying result.
- `uri.schemeSpecificPart` is available only on Android.
- Available from `navigation3-runtime` 1.2.0 (see [navigation3-deep-links](./navigation3-deep-links.md)).

## Related

- [navigation3-deep-links](./navigation3-deep-links.md)
- [navigation3-uri-deep-link-matcher](./navigation3-uri-deep-link-matcher.md)
