# MLState

A handle to the state buffers for stateful machine learning models. Used with models that maintain state between predictions.

## Signature / Usage

```swift
class MLState

let modelAsset = try MLModelAsset(url: modelURL)
let model = try await MLModel.load(asset: modelAsset, configuration: MLModelConfiguration())

let state = model.newState()

for _ in 0 ..< 42 {
    _ = try await model.prediction(from: inputFeatures, using: state)
}

state.withMultiArray(for: "accumulator") { stateMultiArray in
    // read/inspect the state buffer
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `withMultiArray(for:_:)` | method | Access a named state buffer via a closure |
| `withMultiArray(_:)` | method | Deprecated method to access the state buffer |

## Notes

- iOS 18.0+, iPadOS 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+, Mac Catalyst 18.0+
- Inherits from `NSObject`
- Obtained via `model.newState()`; the client must not read/write buffers during in-flight predictions
- Each stateful prediction using the same `MLState` must be serialized — concurrent predictions using the same state result in undefined behavior

## Related

- [MLStateConstraint](./mlstateconstraint.md)
- [MLModel](./mlmodel.md)
