# ComputeUnitKind

A type of hardware compute unit available for model inference. Used with `SpecializationOptions` to control which hardware the framework targets when specializing a model.

## Signature / Usage

```swift
enum ComputeUnitKind {
    case cpu
    case gpu
    case neuralEngine

    static var availableKinds: Set<ComputeUnitKind>
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `cpu` | The central processing unit |
| `gpu` | The graphics processing unit |
| `neuralEngine` | The Neural Engine |
| `availableKinds` | Static. The compute unit kinds available on the current device (`Set<ComputeUnitKind>`) |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Equatable`, `Hashable`, `Sendable`.
- By default, specialization uses all available compute units on the device.
- Name distance: Core AI `ComputeUnitKind` (selected via `SpecializationOptions`) is distinct from Core ML `MLComputeUnits` (set via `MLModelConfiguration.computeUnits`).

## Related

- [SpecializationOptions](./specializationoptions.md)
- [AIModelCache](./aimodelcache.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
