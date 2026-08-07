# MLComputePolicy

The compute policy determining which compute device, or devices, to execute `MLTensor` ML workloads on.

## Signature / Usage

```swift
struct MLComputePolicy

let policy = MLComputePolicy(.cpuAndGPU)
await withMLTensorComputePolicy(policy) {
    let result = tensorA.matmul(tensorB)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cpuAndGPU` (static) | `MLComputePolicy` | Execute ML workloads using the GPU if available, otherwise falling back to the CPU |
| `cpuOnly` (static) | `MLComputePolicy` | Execute ML workloads using the CPU |
| `init(_:)` | initializer | Creates a new compute policy from the given `MLComputeUnits` |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Applied to `MLTensor` operations via `withMLTensorComputePolicy(_:_:)`, which runs a closure within a task-local context using the specified policy

## Related

- [MLTensor](./mltensor.md)
- [MLComputeUnits](./mlcomputeunits.md)
- [MLComputePlan](./mlcomputeplan.md)
