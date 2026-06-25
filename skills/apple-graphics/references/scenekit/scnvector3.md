# SCNVector3

A three-component vector used throughout SceneKit for positions, normals, translation/scale transforms, and other 3D quantities.

## Signature / Usage

```swift
// Initialization
let pos = SCNVector3(1.0, 2.0, 3.0)
let zero = SCNVector3Zero

// Use as node position
node.position = SCNVector3(0, 5, -10)

// Convert to/from SIMD
let simd: simd_float3 = node.simdPosition
let vec = SCNVector3(simd)

// C function helpers
let equal = SCNVector3EqualToVector3(pos, zero)
let made  = SCNVector3Make(1, 2, 3)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `x` | `Float` (iOS/tvOS/watchOS) / `CGFloat` (macOS) | First component |
| `y` | `Float` / `CGFloat` | Second component |
| `z` | `Float` / `CGFloat` | Third component |

### Constants & functions

| Symbol | Description |
|--------|-------------|
| `SCNVector3Zero` | Zero vector `(0, 0, 0)` |
| `SCNVector3Make(_:_:_:)` | C-compatible vector constructor |
| `SCNVector3EqualToVector3(_:_:)` | Component-wise equality test |
| `SCNVector3FromGLKVector3(_:)` | Convert from GLKVector3 |
| `SCNVector3ToGLKVector3(_:)` | Convert to GLKVector3 |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+. Deprecated in version 26.0.
- On macOS, components are `CGFloat` (64-bit); on iOS/tvOS/watchOS they are `Float` (32-bit) — be careful when sharing code across platforms.
- For performance-critical math, prefer `simd_float3` (`node.simdPosition`, etc.) which avoids `SCNVector3` boxing overhead.
- Conforms to `BitwiseCopyable`, `Sendable`.

## Related

- [SCNNode](./scnnode.md)
- [SCNPhysicsBody](./scnphysicsbody.md)
- [SCNGeometrySource](./scngeometrysource.md)
