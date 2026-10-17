---
source: https://developer.apple.com/documentation/visualintelligence/semanticcontentdescriptor
---

# SemanticContentDescriptor

A type that represents a scene that visual intelligence captures, for example, a screenshot, photo, or photo and video stream.

## Signature / Usage

```swift
struct SemanticContentDescriptor
```

```swift
let labels: [String]
var pixelBuffer: CVReadOnlyPixelBuffer?
```

```swift
func values(for input: SemanticContentDescriptor) async throws -> [VisualSearchResult] {
    guard let pixelBuffer = input.pixelBuffer else {
        return []
    }
    let landmarks = try await modelData.search(matching: pixelBuffer)
    return landmarks
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `labels` | `let labels: [String]` | A list of labels that visual intelligence uses to classify items onscreen or in visual intelligence camera. |
| `pixelBuffer` | `var pixelBuffer: CVReadOnlyPixelBuffer?` | The pixel buffer that visual intelligence captures. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: some ResolverSpecification` | A default implementation of an internal type that the App Intents framework uses to convert data values with resolvers. |
| `Specification` | `typealias Specification` | A type that specifies how the system resolves a semantic content descriptor. |
| `ValueType` | `typealias ValueType` | A type that represents the value of a semantic content descriptor. |
| `UnwrappedType` | `typealias UnwrappedType` | A type that represents the unwrapped value of a semantic content descriptor. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 27.0+, macOS 27.0+; visionOS is listed without an introduction version.
- Conforms to: `Copyable`, `CustomLocalizedStringResourceConvertible`, `CustomStringConvertible`, `Decodable`, `DisplayRepresentable`, `Encodable`, `Escapable`, `InstanceDisplayRepresentable`, `IntentValueConvertible`, `IntentValueExpressing`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.
- Use it as the `input` type of `IntentValueQuery.values(for:)`. An app cannot contain more than one `IntentValueQuery` that takes a `SemanticContentDescriptor`.
- `labels` are general, high-level terms in the `en_US` locale that might change over time; they are not translated, have no synonyms, and do not include a well-known building's actual name.
- A common way to use `pixelBuffer` is to convert it into an image and run an image search (code from the integration article):

```swift
private func createImage(_ pixelBuffer: CVReadOnlyPixelBuffer) -> CGImage? {
    let context = CIContext()
    let image = CIImage(cvPixelBuffer: pixelBuffer)
    return context.createCGImage(image, from: image.extent)
}
```

- Distinct from the Vision framework (image analysis requests) covered by apple-ml; this type only carries what visual intelligence captured.

## Related

- [Visual Intelligence (framework overview)](./visualintelligence-overview.md)
- [IntentValueQuery](./intentvaluequery.md)
- [Visual intelligence schema domain](./domain-visual-intelligence.md)
- [IntentValueConvertible](../data-types/intentvalueconvertible.md)
