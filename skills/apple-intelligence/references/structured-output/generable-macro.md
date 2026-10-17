---
source: https://developer.apple.com/documentation/foundationmodels/generable(description:), https://developer.apple.com/documentation/foundationmodels/generable(description:representnilexplicitlyingeneratedcontent:), https://developer.apple.com/documentation/foundationmodels/generable(name:description:representnilexplicitlyingeneratedcontent:)
---

# Generable(description:) macro

Macro that makes a Swift structure or enumeration conform to `Generable`, so the model can respond to a prompt by generating an instance of the type.

## Signature / Usage

```swift
@attached(extension, conformances: Generable, names: named(init(_:)), named(generatedContent)) @attached(member, names: arbitrary) macro Generable(description: String? = nil)
```

Overloads:

```swift
@attached(extension, conformances: Generable, names: named(init(_:)), named(generatedContent)) @attached(member, names: arbitrary) macro Generable(description: String? = nil, representNilExplicitlyInGeneratedContent: Bool)

@attached(extension, conformances: Generable, names: named(init(_:)), named(generatedContent)) @attached(member, names: arbitrary) macro Generable(name: String, description: String? = nil, representNilExplicitlyInGeneratedContent: Bool = false)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| description | String? | Optional natural-language description of the type (default `nil`). |
| representNilExplicitlyInGeneratedContent | Bool | Present on the second and third overloads. Required (no default) on the second; default `false` on the third. |
| name | String | Present on the third overload only (required). |

## Notes

- Availability: `Generable(description:)` is iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- `Generable(description:representNilExplicitlyInGeneratedContent:)` is iOS 26.4+, iPadOS 26.4+, Mac Catalyst 26.4+, macOS 26.4+, visionOS 26.4+, watchOS 27.0+.
- `Generable(name:description:representNilExplicitlyInGeneratedContent:)` is iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- The macro pages carry no abstract or prose in the source; the meaning of `name` and `representNilExplicitlyInGeneratedContent` is not documented there.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [Generable](./generable.md)
- [Guide(description:) macro](./guide-macro.md)
- [GenerationSchema](./generation-schema.md)
- [Generating Swift data structures with guided generation](../guides/guided-generation.md)
