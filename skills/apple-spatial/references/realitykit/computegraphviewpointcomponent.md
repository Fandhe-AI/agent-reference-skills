# ComputeGraphViewpointComponent

A transient component that provides camera viewpoint information to the particle simulation.

## Signature / Usage

```swift
struct ComputeGraphViewpointComponent: Component, TransientComponent

var viewPosition: SIMD3<Float>?
var viewDirection: SIMD3<Float>?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | `init()` | Creates the component |
| `viewPosition` | `SIMD3<Float>?` | The position of the observer, in world space |
| `viewDirection` | `SIMD3<Float>?` | The direction the observer is facing, in world space |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Attach to an entity to supply the simulation with an observer's position and direction, used for view-dependent effects such as billboard orientation or camera-facing particles.
- Both properties are optional; when `nil`, the simulation falls back to its default viewpoint behavior.
- Conforms to `Component` and `TransientComponent`.
- Source: https://developer.apple.com/documentation/realitykit/computegraphviewpointcomponent (fetched 2026-10 from the DocC JSON).

## Related

- [ComputeGraphComponent](./computegraphcomponent.md)
- [Component](./component.md)
