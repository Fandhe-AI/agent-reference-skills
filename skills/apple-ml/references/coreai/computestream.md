# ComputeStream

A stream of work to be run asynchronously. It is passed to `InferenceFunction.encode(inputs:states:outputViews:to:)` to encode inference work onto the stream.

## Signature / Usage

```swift
final class ComputeStream

convenience init()
init(commandQueue: any MTLCommandQueue)
func currentWorkCompleted() async
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init()` | `convenience init()` | Initialize an empty compute stream |
| `init(commandQueue:)` | `init(commandQueue: any MTLCommandQueue)` | Initialize a compute stream that encodes its work to the provided command queue |
| `currentWorkCompleted()` | `func currentWorkCompleted() async` | Waits for all previous work encoded to this stream to be complete |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Multiple inferences encoded to the same stream are serialized as needed, based on the values read and written.
- Source: https://developer.apple.com/documentation/coreai/computestream

## Related

- [InferenceFunction](./inferencefunction.md)
