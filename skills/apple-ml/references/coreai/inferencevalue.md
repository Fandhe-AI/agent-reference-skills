# InferenceValue

A value that an inference function accepts as input or produces as output. Wraps either an `NDArray` or a pixel buffer, and is retrieved after inference with `ndArray` or `pixelBuffer`.

## Signature / Usage

```swift
struct InferenceValue

guard let predictionValue = outputs.remove("prediction") else {
    // Handle output not found.
}
guard let prediction = predictionValue.ndArray else {
    // Handle output of unexpected type of value.
}
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `kind` | `var kind: InferenceValue.Kind` | The kind of data this value contains |
| `ndArray` | `var ndArray: NDArray?` | The array that the value wraps |
| `pixelBuffer` | `var pixelBuffer: CVMutablePixelBuffer?` | Consume this value to access the underlying pixel buffer |
| `init(_:)` | `init(consuming CVMutablePixelBuffer)` | Creates an inference value that wraps the specified pixel buffer |

Nested types: `InferenceValue.Descriptor` (enum: type and shape of a value; cases `.ndArray(_)` and `.image(_)` appear in the integration article), `InferenceValue.Kind` (type of data), `InferenceValue.View` (borrowed read-only view), `InferenceValue.MutableView` (borrowed mutable view), `InferenceValue.NamedMutableViews` (named mutable views), protocols `InferenceValue.ViewRepresentable` and `InferenceValue.MutableViewRepresentable`.

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- To tell which type an output uses, check the Functions tab in the Xcode model viewer or inspect the `InferenceFunctionDescriptor` at runtime.
- Source: https://developer.apple.com/documentation/coreai/inferencevalue

## Related

- [InferenceFunction](./inferencefunction.md)
- [InferenceFunctionDescriptor](./inferencefunctiondescriptor.md)
- [NDArray](./ndarray.md)
- [ImageDescriptor](./imagedescriptor.md)
- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
