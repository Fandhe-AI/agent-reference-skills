---
source: https://developer.apple.com/documentation/appintents/displayrepresentation
---

# DisplayRepresentation

A type that describes the user interface presentation of a custom type.

## Signature / Usage

```swift
struct DisplayRepresentation
```

```swift
init(title: LocalizedStringResource, subtitle: LocalizedStringResource?, image: DisplayRepresentation.Image?)
```

Usage from the AppEntity page:

```swift
var displayRepresentation: DisplayRepresentation {
    DisplayRepresentation(title: "\(name)",
                          subtitle: "\(regionDescription)",
                          image: DisplayRepresentation.Image(named: imageName))
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(title:subtitle:image:)` | `init(title: LocalizedStringResource, subtitle: LocalizedStringResource?, image: DisplayRepresentation.Image?)` | Creates a representation. |
| `init(title:subtitle:image:synonyms:)` | `init(title: LocalizedStringResource, subtitle: LocalizedStringResource?, image: DisplayRepresentation.Image?, synonyms: [LocalizedStringResource])` | Same with synonyms. |
| `init(title:subtitle:synonyms:image:)` | `init(title: LocalizedStringResource, subtitle: LocalizedStringResource?, synonyms: [LocalizedStringResource], image: () async throws -> DisplayRepresentation.Image?)` | Creates a display representation whose image is produced lazily by the given closure. |
| `title` | `var title: LocalizedStringResource` | |
| `subtitle` | `var subtitle: LocalizedStringResource?` | |
| `image` | `var image: DisplayRepresentation.Image?` | |
| `Image` | `struct Image` (`DisplayRepresentation.Image`) | The image type. |
| `synonyms` | `var synonyms: [LocalizedStringResource]` | A list of localized phrases that are synonyms of this particular display representation. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- Conforms to: `Equatable`, `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`, `Sendable`, `SendableMetatype`. The string-literal conformance is why `static let caseDisplayRepresentations` dictionaries on the UnionValue page can use plain string literals such as `.tapback: "Tapback"`.
- Part of the "Data representations" group with `DisplayRepresentable`, `InstanceDisplayRepresentable`, `TypeDisplayRepresentable`, `TypeDisplayRepresentation`, `StaticDisplayRepresentable`, `CaseDisplayRepresentable`.
- Member abstracts for `title`, `subtitle`, `image`, `Image` and the first two initializers are empty in the source.

## Related

- [TypeDisplayRepresentation](./typedisplayrepresentation.md)
- [DisplayRepresentable protocols](./display-representable-protocols.md)
- [AppEntity](./appentity.md)
- [AppEnum](./appenum.md)
