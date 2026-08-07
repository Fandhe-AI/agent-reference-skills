# MLComputePlan

A class representing the compute plan of a model. The application can use the compute plan to estimate the necessary cost and resources of the model before running predictions.

## Signature / Usage

```swift
class MLComputePlan

let computePlan = try await MLComputePlan.load(contentsOf: modelURL, configuration: configuration)
guard case let .program(program) = computePlan.modelStructure else {
    fatalError("Unexpected model type.")
}
guard let mainFunction = program.functions["main"] else {
    fatalError("Missing main function.")
}
for operation in mainFunction.block.operations {
    let deviceUsage = computePlan.deviceUsage(for: operation)
    let estimatedCost = computePlan.estimatedCost(of: operation)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `modelStructure` | `MLModelStructure` | The structure of the model backing the compute plan |
| `load(asset:configuration:)` | static method | Constructs the compute plan asynchronously from a model asset |
| `load(contentsOf:configuration:)` | static method | Constructs the compute plan asynchronously from a file URL |
| `deviceUsage(for:)` | method | Returns the anticipated compute devices (`DeviceUsage`) for executing a NeuralNetwork layer or MLProgram operation |
| `estimatedCost(of:)` | method | Returns the estimated cost (`Cost`) of executing an MLProgram operation |

## Notes

- iOS 17.4+, iPadOS 17.4+, macOS 14.4+, Mac Catalyst 17.4+, tvOS 17.4+, visionOS 1.0+, watchOS 10.4+

## Related

- [MLComputeDevice](./mlcomputedevice.md)
- [MLComputePolicy](./mlcomputepolicy.md)
