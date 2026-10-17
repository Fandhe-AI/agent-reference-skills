---
source: https://developer.apple.com/documentation/foundationmodels/guide(description:), https://developer.apple.com/documentation/foundationmodels/guide(description:_:)
---

# Guide(description:) macro

Peer macro applied to a property of a `@Generable` type to describe it in natural language and, optionally, constrain generated values with a `GenerationGuide` or a `Regex`.

## Signature / Usage

```swift
@attached(peer) macro Guide(description: String)
```

Overload with a regular expression:

```swift
@attached(peer) macro Guide<RegexOutput>(description: String? = nil, _ guides: Regex<RegexOutput>)
```

Usage, from the `Generable` page:

```swift
@Generable
struct SearchSuggestions {
    @Guide(description: "A list of suggested search terms.", .count(4))
    var searchTerms: [SearchTerm]
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| description | String | Required in the first overload. |
| description | String? | Optional (default `nil`) in the `Regex` overload. |
| guides | Regex<RegexOutput> | Unlabeled argument of the `Regex` overload. |

## Notes

- Availability (both overloads): iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- The macro pages carry no abstract or prose in the source.
- The `Generable` page advises using `Guide(description:)` only when it improves response quality, because every `Generable` type's schema counts against the context window.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [GenerationGuide](./generation-guide.md)
- [Generable](./generable.md)
- [Generable(description:) macro](./generable-macro.md)
