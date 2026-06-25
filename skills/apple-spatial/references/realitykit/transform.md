# Transform

A component that defines the scale, rotation, and translation of an entity.

## Signature / Usage

```swift
@frozen struct Transform: Component

// Create with individual components
let t = Transform(
    scale: SIMD3<Float>(1, 1, 1),
    rotation: simd_quatf(angle: .pi / 4, axis: [0, 1, 0]),
    translation: SIMD3<Float>(0, 0.5, -1)
)
entity.transform = t

// From Euler angles
let t2 = Transform(pitch: 0, yaw: .pi / 2, roll: 0)

// From matrix
let t3 = Transform(matrix: float4x4(rotationY: .pi))

// Identity
entity.transform = .identity
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `translation` | `SIMD3<Float>` | Position along x, y, z axes (meters) |
| `rotation` | `simd_quatf` | Orientation as a unit quaternion |
| `scale` | `SIMD3<Float>` | Scale factor per axis |
| `matrix` | `float4x4` | Combined 4×4 transform matrix |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Every `Entity` inherits `Transform`; access via `entity.transform` (shorthand from `HasTransform`).
- Conforms to `Component`, `AnimatableData`, `BindableData`, `Codable`, `Equatable`, `Hashable`.
- Use `entity.move(to:relativeTo:duration:)` to animate the transform.

## Related

- [Entity](./entity.md)
- [ModelEntity](./modelentity.md)
