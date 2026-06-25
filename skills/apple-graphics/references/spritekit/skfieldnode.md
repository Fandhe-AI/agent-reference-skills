# SKFieldNode

A node that applies physics forces to nearby `SKPhysicsBody` objects. A body is affected only when it is inside the field's region and its `fieldBitMask` overlaps the field's `categoryBitMask`.

## Signature / Usage

```swift
// Radial gravity pulling toward a black hole
let gravity = SKFieldNode.radialGravityField()
gravity.strength = 5
gravity.falloff = 1
gravity.position = CGPoint(x: 200, y: 300)
scene.addChild(gravity)
```

## Options / Props

### Field Behavior

| Name | Type | Description |
|------|------|-------------|
| `strength` | `Float` | Magnitude of the field's force |
| `falloff` | `Float` | Exponent controlling how force decays with distance |
| `minimumRadius` | `Float` | Minimum distance to prevent infinite force at the origin |
| `region` | `SKRegion?` | Area (relative to the node) the field affects; `nil` = infinite |

### Activation & Filtering

| Name | Type | Description |
|------|------|-------------|
| `isEnabled` | `Bool` | Whether the field is currently active |
| `isExclusive` | `Bool` | Whether this field prevents other fields from affecting bodies in its region |
| `categoryBitMask` | `UInt32` | Field category; must overlap body's `fieldBitMask` to affect it |

### Field-Specific Properties

| Name | Type | Used By |
|------|------|---------|
| `direction` | `vector_float3` | Direction vector for linear gravity / velocity fields |
| `texture` | `SKTexture?` | Velocity map texture for texture-based velocity fields |
| `smoothness` | `Float` | Smoothness of noise/turbulence fields |
| `animationSpeed` | `Float` | Animation rate of noise/turbulence fields |

### Factory Methods

```swift
// Gravity & spring
SKFieldNode.radialGravityField()                          // pulls toward field node
SKFieldNode.linearGravityField(withVector: vector_float3) // constant direction gravity
SKFieldNode.springField()                                  // spring restoring force

// Velocity & drag
SKFieldNode.velocityField(withVector: vector_float3)      // constant velocity
SKFieldNode.velocityField(with: SKTexture)                // texture-mapped velocity
SKFieldNode.dragField()                                    // opposes motion

// Rotation
SKFieldNode.vortexField()                                  // perpendicular (rotational) force

// Electromagnetic
SKFieldNode.electricField()                                // proportional to body.charge
SKFieldNode.magneticField()                               // velocity × charge cross product

// Randomized
SKFieldNode.noiseField(withSmoothness: Float, animationSpeed: Float)
SKFieldNode.turbulenceField(withSmoothness: Float, animationSpeed: Float)

// Custom
SKFieldNode.customField(evaluationBlock:
    (vector_float3, vector_float3, Float, Float, TimeInterval) -> vector_float3)
```

## Notes

- Available: iOS 8+, macOS 10.10+, tvOS 9+, visionOS 1+, watchOS 10+.
- Set `SKPhysicsBody.fieldBitMask` on bodies that should be affected; bodies with `fieldBitMask == 0` ignore all fields.
- SpriteKit uses SI units; keep strength values proportional to body masses for predictable results.
- `isExclusive` is useful for localized gravity wells that override the global gravity field.

## Related

- [SKPhysicsBody](./skphysicsbody.md)
- [SKPhysicsWorld](./skphysicsworld.md)
- [SKNode](./sknode.md)
