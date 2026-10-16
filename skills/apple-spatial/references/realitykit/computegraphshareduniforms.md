# ComputeGraphSharedUniforms

A transient component that stores typed uniform values shared across all ComputeGraph simulations, such as gravity, wind, attractor locations, or a global time offset.

## Signature / Usage

```swift
class ComputeGraphSharedUniforms: Component, TransientComponent

let uniforms = ComputeGraphSharedUniforms()
// func setUniform<V>(_ value: borrowing V)
// func uniform<V>(_ type: V.Type) -> V?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | `init()` | Creates an empty component |
| `setUniform(_:)` | `func setUniform<V>(_: borrowing V)` | Stores a uniform value, replacing any previously stored value of the same type |
| `uniform(_:)` | `func uniform<V>(_: V.Type) -> V?` | Returns the stored uniform value for the type, or `nil` if none has been set |
| `setUniformTransform(_:)` | `func setUniformTransform<V>((V, Entity) -> V)` | Registers a closure that transforms a uniform value of type `V` on a per-entity basis |
| `setUniformTransform(type:transform:)` | `func setUniformTransform<V>(type: V.Type, transform: (inout MutableRawSpan, Entity) -> Void)` | Registers a raw-data transformer closure for a uniform of type `V` |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Only one instance of this component should exist in a scene at a time.
- Conforms to `Component` and `TransientComponent` (not saved to file or cloned).

## Related

- [ComputeGraphComponent](./computegraphcomponent.md)
- [Component](./component.md)
