# SpecializationOptions

Options that control how a model is specialized for the device, including which compute units it may use.

## Signature / Usage

```swift
struct SpecializationOptions

static let `default`: SpecializationOptions
static let cpuOnly: SpecializationOptions
init(preferredComputeUnitKind: ComputeUnitKind)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `default` | `SpecializationOptions` (static) | Options that allow the model to use all available compute units |
| `cpuOnly` | `SpecializationOptions` (static) | Options that restrict compute to the CPU only |
| `init(preferredComputeUnitKind:)` | `ComputeUnitKind` | Creates options with a preferred compute unit kind |
| `allowedComputeUnitKinds` | `Set<ComputeUnitKind>` | The set of compute units the specialized model can use |
| `preferredComputeUnitKind` | `ComputeUnitKind?` | The preferred compute unit kind, if one was specified |
| `expectFrequentReshapes` | `Bool` | Allows more optimal specialization if the model performs frequent reshapes based on usage |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Equatable`, `Hashable`, `Sendable`.
- Passed to `AIModel(contentsOf:options:)`, `AIModel.specialize(...)`, and `AIModelCache` lookup / delete methods.
- Name distance: this is Core AI, not Core ML's `MLModelConfiguration` / `MLComputeUnits`.
- Source: https://developer.apple.com/documentation/coreai/specializationoptions

## Related

- [ComputeUnitKind](./computeunitkind.md)
- [AIModel](./aimodel.md)
- [AIModelCache](./aimodelcache.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
