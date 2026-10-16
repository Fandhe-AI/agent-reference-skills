---
source: https://developer.apple.com/documentation/appintents/typedisplayrepresentation
---

# TypeDisplayRepresentation

A type that describes the user interface presentation of a custom type.

## Signature / Usage

```swift
struct TypeDisplayRepresentation
```

```swift
init(name: LocalizedStringResource, numericFormat: LocalizedStringResource?)
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(name:numericFormat:)` | `init(name: LocalizedStringResource, numericFormat: LocalizedStringResource?)` | |
| `init(name:numericFormat:synonyms:)` | `init(name: LocalizedStringResource, numericFormat: LocalizedStringResource?, synonyms: [LocalizedStringResource])` | |
| `name` | `var name: LocalizedStringResource` | The singular type name, e.g. "Book". |
| `numericFormat` | `var numericFormat: LocalizedStringResource?` | A string representing a count for the type, e.g. "2 books". |
| `synonyms` | `var synonyms: [LocalizedStringResource]` | A list of localized phrases that are synonyms of this particular type display representation. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- Conforms to: `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`, `Sendable`, `SendableMetatype`. This is why a plain string literal can be used for `typeDisplayRepresentation` (see the UnionValue page: `static var typeDisplayRepresentation: TypeDisplayRepresentation { "Reaction" }`).
- Returned by the `typeDisplayRepresentation` requirement of `TypeDisplayRepresentable`; `DisplayRepresentation` describes one instance instead.
- Referenced from the article "Defining app entities for your custom data types".

## Related

- [DisplayRepresentation](./displayrepresentation.md)
- [DisplayRepresentable protocols](./display-representable-protocols.md)
- [AppEnum](./appenum.md)
