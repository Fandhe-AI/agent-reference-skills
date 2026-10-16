# InferenceFunction

A function that performs inference on input values and produces output values. It owns the resources needed for inference, including model weights and intermediate buffers.

## Signature / Usage

```swift
struct InferenceFunction

// Loaded from an AIModel, then run:
var outputs = try await function.run(inputs: ["input": input])
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `run(inputs:states:outputViews:)` (NDArray) | `func run(inputs: [String : NDArray], states: consuming InferenceFunction.MutableViews, outputViews: consuming InferenceFunction.MutableViews) async throws -> InferenceFunction.Outputs` | Runs the function on the provided input arrays and returns the output values |
| `run(inputs:states:outputViews:)` (Inputs) | `func run(inputs: borrowing InferenceFunction.Inputs, states: consuming InferenceFunction.MutableViews, outputViews: consuming InferenceFunction.MutableViews) async throws -> InferenceFunction.Outputs` | Runs the function on the provided input values and returns the output values |
| `encode(inputs:states:outputViews:to:)` | `func encode(inputs: [String : InferenceFunction.AsyncValue], states: consuming InferenceFunction.AsyncMutableViews, outputViews: consuming InferenceFunction.AsyncMutableViews, to: ComputeStream) throws -> [String : InferenceFunction.AsyncValue]` | Encodes the inference onto the provided compute stream, returning async values for the outputs |
| `descriptor` | `let descriptor: InferenceFunctionDescriptor` | The descriptor for this function's inputs, outputs, and states |

Supporting types:

| Type | Description |
|------|-------------|
| `InferenceFunction.Inputs` | A collection of named input values |
| `InferenceFunction.Outputs` | The output values produced by running the function (`remove(_:)` returns an `InferenceValue?`) |
| `InferenceFunction.MutableViews` | A collection of `InferenceValue.MutableView`s that can be updated in place by the function |
| `InferenceFunction.AsyncValue` | A future that provides an inference value once any pending write is complete |
| `InferenceFunction.AsyncMutableValue` | An async value that can be provided as a mutable argument |
| `InferenceFunction.AsyncMutableViews` | A collection of mutable references to async states, used as the states argument |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- `Sendable`: can run concurrently from multiple tasks; the function automatically allocates additional intermediate buffers as needed to support concurrency.
- Related background-task entitlement: Background Inference (`com.apple.developer.background-tasks.continued-processing.inference`).

## Related

- [AIModel](./aimodel.md)
- [InferenceFunctionDescriptor](./inferencefunctiondescriptor.md)
- [InferenceValue](./inferencevalue.md)
- [ComputeStream](./computestream.md)
- [Background Inference entitlement](./background-inference-entitlement.md)
