---
source: https://developer.apple.com/documentation/appintents/stringsearchcriteria
---

# StringSearchCriteria

A type that tells your app to match its items against a provided string.

## Signature / Usage

```swift
struct StringSearchCriteria
```

```swift
init(term: String)
var term: String
```

## Options / Props

| Member | Declaration | Description |
| --- | --- | --- |
| `init(term:)` | `init(term: String)` | Initializes the type with the specified search term. |
| `term` | `var term: String` | The string to use when matching items in your app. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: some ResolverSpecification` | Related type (no abstract on the page). |
| `Specification`, `UnwrappedType`, `ValueType` | `typealias` | Related types (no abstract on the page). |

## Notes

- iOS 17.2+, iPadOS 17.2+, Mac Catalyst 17.2+, macOS 14.2+, tvOS 17.2+, visionOS (version not listed on the page), watchOS 10.2+
- Conforms to `Copyable`, `Equatable`, `Escapable`, `Hashable`, `IntentValueConvertible`, `IntentValueExpressing`, `SearchCriteria`, `Sendable`, `SendableMetatype`.
- Use in app intents that match the app's content against a string value. When defining an intent with the `search` schema (`AppSchema.SystemIntent.search`, deprecated in the source reference) or the `ShowInAppSearchResultsIntent` protocol, apply this type to the `criteria` property. The system fills in the search term when the intent runs.
- Pair with `StringSearchScope` for the `searchScopes` property.

## Related

- [ShowInAppSearchResultsIntent](./showinappsearchresultsintent.md)
- [StringSearchScope](./stringsearchscope.md)
