# AIModel

A specialized model for running inference on a device. Represents a `.aimodel` asset optimized for the current device's hardware.

## Signature / Usage

```swift
struct AIModel

let model = try await AIModel(contentsOf: modelURL)
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `init(contentsOf:options:)` | `init(contentsOf: URL, options: SpecializationOptions) async throws` | Creates an `AIModel` from a `.aimodel` or `.aimodelc` file |
| `init(resolvingBookmark:)` | `init?(resolvingBookmark: Data) throws` | Creates an `AIModel` by resolving bookmark data pointing to its specialized asset in a cache |
| `loadFunction(named:)` | `func loadFunction(named: String) throws -> InferenceFunction?` | Loads an inference function |
| `functionDescriptor(for:)` | `func functionDescriptor(for: String) -> InferenceFunctionDescriptor?` | Returns a descriptor for the specified function |
| `functionNames` | `var functionNames: [String]` | The names of the inference functions in this model |
| `specialize(contentsOf:options:cache:cachePolicy:)` | `static func specialize(contentsOf: URL, options: SpecializationOptions, cache: AIModelCache, cachePolicy: AIModelCache.Policy) async throws -> AIModel` | Specializes a model for the current device |
| `bookmarkData` | `var bookmarkData: Data` | Bookmark of this model's cached specialized asset entry as serialized data |
| `deviceArchitectureName` | `static var deviceArchitectureName: String` | The Core AI architecture name of the current device |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Sendable` and `SendableMetatype`.
- The instance is lightweight and does not own weights or intermediate buffers; those belong to the `InferenceFunction`s loaded from it.
- Use `functionDescriptor(for:)` to inspect a function's inputs and outputs, then load an `InferenceFunction` to run inference.

## Related

- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
- [AIModelAsset](./aimodelasset.md)
- [InferenceFunction](./inferencefunction.md)
- [InferenceFunctionDescriptor](./inferencefunctiondescriptor.md)
- [AIModelCache](./aimodelcache.md)
- [SpecializationOptions](./specializationoptions.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
- [Compiling Core AI models ahead of time](./compiling-core-ai-models-ahead-of-time.md)
