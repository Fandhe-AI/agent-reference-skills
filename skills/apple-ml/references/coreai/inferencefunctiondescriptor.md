# InferenceFunctionDescriptor

A description of an inference function's signature: the names and types of its inputs, outputs, and states, available before running inference.

## Signature / Usage

```swift
struct InferenceFunctionDescriptor

let function: InferenceFunction = ...

let functionDescriptor = function.descriptor
guard let valueDescriptor = functionDescriptor.inputDescriptor(of: "input"),
      case .ndArray(let arrayDescriptor) = valueDescriptor else {
        // Handle input not found, or an unexpected type.
}

guard arrayDescriptor.shape == [3, 4] else {
    // Handle an unexpected shape.
}
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `name` | `var name: String` | The function's name |
| `inputCount` | `var inputCount: Int` | The number of inputs |
| `inputNames` | `var inputNames: [String]` | The names of the inputs |
| `inputDescriptor(of:)` | `func inputDescriptor(of: String) -> InferenceValue.Descriptor?` | Descriptor for the specified input |
| `outputCount` | `var outputCount: Int` | The number of outputs |
| `outputNames` | `var outputNames: [String]` | The names of the outputs |
| `outputDescriptor(of:)` | `func outputDescriptor(of: String) -> InferenceValue.Descriptor?` | Descriptor for the specified output |
| `stateNames` | `var stateNames: [String]` | The names of the states |
| `stateDescriptor(of:)` | `func stateDescriptor(of: String) -> InferenceValue.Descriptor?` | Descriptor for the specified state |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Sendable`.
- Obtain one from `AIModel.functionDescriptor(for:)` or the `InferenceFunction.descriptor` property.
- Useful to verify at runtime that a function accepts the inputs your app provides, or to adapt to inputs and outputs that change between model deployments.
- Source: https://developer.apple.com/documentation/coreai/inferencefunctiondescriptor

## Related

- [InferenceFunction](./inferencefunction.md)
- [InferenceValue](./inferencevalue.md)
- [AIModel](./aimodel.md)
- [NDArrayDescriptor](./ndarraydescriptor.md)
- [ImageDescriptor](./imagedescriptor.md)
