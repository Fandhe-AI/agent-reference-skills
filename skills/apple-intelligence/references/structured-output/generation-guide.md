---
source: https://developer.apple.com/documentation/foundationmodels/generationguide
---

# GenerationGuide

Guides that control how values are generated.

## Signature / Usage

```swift
struct GenerationGuide<Value>
```

Used as the second argument of the `Guide` macro, as on the `Generable` page:

```swift
@Guide(description: "A list of suggested search terms.", .count(4))
var searchTerms: [SearchTerm]
```

## Options / Props

| Name | Description |
| --- | --- |
| pattern(_:) | Enforces that the string follows the pattern. |
| element(_:) | Enforces a guide on the elements within the array. |
| count(_:) | Enforces that the array has exactly a certain number of elements. |
| constant(_:) | Enforces that the string be precisely the given value. |
| anyOf(_:) | Enforces that the string be one of the provided values. |
| range(_:) | Enforces values that fall within a range. |
| minimum(_:) | Enforces a minimum value. |
| minimumCount(_:) | Enforces a minimum number of elements in the array. |
| maximum(_:) | Enforces a maximum value. |
| maximumCount(_:) | Enforces a maximum number of elements in the array. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- Member signatures are not recorded here; only the member names and abstracts from the type's topic list were available in the fetched source.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [Guide(description:) macro](./guide-macro.md)
- [Generable](./generable.md)
