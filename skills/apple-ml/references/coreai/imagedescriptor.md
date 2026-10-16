# ImageDescriptor

A description of an image's dimensions and pixel format, for function inputs or outputs that use images instead of `NDArray`.

## Signature / Usage

```swift
struct ImageDescriptor

guard let inputDescriptor = function.descriptor.inputDescriptor(of: "image"),
      case .image(let imageDescriptor) = inputDescriptor else {
    // Handle a missing or unexpected input.
}

let expectedWidth = imageDescriptor.width
let expectedHeight = imageDescriptor.height
let expectedFormat = imageDescriptor.pixelFormatType
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pixelFormatType` | `OSType` | The four-character code that identifies the pixel format |
| `width` | `Int` | The width of the image, in pixels |
| `height` | `Int` | The height of the image, in pixels |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Equatable`, `Sendable`.
- A `width` or `height` of `-1` indicates a dynamic dimension.
- `pixelFormatType` can be compared against the format constants in Core Video.

## Related

- [InferenceFunctionDescriptor](./inferencefunctiondescriptor.md)
- [InferenceValue](./inferencevalue.md)
- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
