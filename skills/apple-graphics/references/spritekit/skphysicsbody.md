# SKPhysicsBody

Adds physics simulation to an `SKNode`. Attach to `node.physicsBody` to make the node participate in the scene's physics world.

## Signature / Usage

```swift
// Circular body on a sprite
let body = SKPhysicsBody(circleOfRadius: sprite.size.width / 2)
body.categoryBitMask = PhysicsCategory.player
body.contactTestBitMask = PhysicsCategory.enemy
body.collisionBitMask = PhysicsCategory.wall
sprite.physicsBody = body
```

## Options / Props

### Shape Initializers

```swift
// Volume-based (dynamic)
init(circleOfRadius radius: CGFloat)
init(circleOfRadius radius: CGFloat, center: CGPoint)
init(rectangleOf size: CGSize)
init(rectangleOf size: CGSize, center: CGPoint)
init(polygonFrom path: CGPath)
init(texture: SKTexture, size: CGSize)
init(texture: SKTexture, alphaThreshold: Float, size: CGSize)
init(bodies: [SKPhysicsBody])                   // compound body

// Edge-based (static boundaries)
init(edgeFrom p1: CGPoint, to p2: CGPoint)
init(edgeLoopFrom rect: CGRect)
init(edgeLoopFrom path: CGPath)
init(edgeChainFrom path: CGPath)
```

### Dynamics

| Name | Type | Description |
|------|------|-------------|
| `isDynamic` | `Bool` | Whether the body responds to forces (default `true`) |
| `affectedByGravity` | `Bool` | Whether world gravity applies |
| `allowsRotation` | `Bool` | Whether angular forces/impulses affect the body |
| `isResting` | `Bool` | Whether the body is at rest in the simulation |
| `velocity` | `CGVector` | Linear velocity in points/second |
| `angularVelocity` | `CGFloat` | Rotational speed in radians/second |

### Physical Properties

| Name | Type | Description |
|------|------|-------------|
| `mass` | `CGFloat` | Mass in kilograms |
| `density` | `CGFloat` | Density in kg/m²; setting this recalculates `mass` |
| `area` | `CGFloat` | Cross-sectional area (read-only) |
| `friction` | `CGFloat` | Surface roughness (0–1) |
| `restitution` | `CGFloat` | Bounciness (0 = no bounce, 1 = perfectly elastic) |
| `linearDamping` | `CGFloat` | Drag reducing linear velocity each frame |
| `angularDamping` | `CGFloat` | Drag reducing rotational velocity each frame |

### Collision & Contact Masks

| Name | Type | Description |
|------|------|-------------|
| `categoryBitMask` | `UInt32` | Which physics categories this body belongs to |
| `collisionBitMask` | `UInt32` | Categories that physically push this body |
| `contactTestBitMask` | `UInt32` | Categories that trigger `contactDelegate` callbacks |
| `fieldBitMask` | `UInt32` | Field node categories that affect this body |
| `charge` | `CGFloat` | Electrical charge for electric/magnetic field interactions |
| `usesPreciseCollisionDetection` | `Bool` | Iterative (tunneling-safe) detection for fast bodies |

### Other

| Name | Type | Description |
|------|------|-------------|
| `pinned` | `Bool` | Pins the body to its parent node's position |
| `node` | `SKNode?` | The node this body is attached to (read-only) |
| `joints` | `[SKPhysicsJoint]` | Joints connecting this body to others (read-only) |

### Applying Forces & Impulses

```swift
func applyForce(_ force: CGVector)
func applyForce(_ force: CGVector, at point: CGPoint)
func applyTorque(_ torque: CGFloat)
func applyImpulse(_ impulse: CGVector)
func applyImpulse(_ impulse: CGVector, at point: CGPoint)
func applyAngularImpulse(_ impulse: CGFloat)
func allContactedBodies() -> [SKPhysicsBody]
```

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- Forces accumulate over a frame; impulses are applied instantly. Apply forces in `update(_:)` or physics-related scene callbacks.
- Edge-based bodies have no mass and cannot be moved by the simulation; use them for static boundaries.
- All units follow SI: meters, kilograms, seconds. Keep values proportional for believable results.

## Related

- [SKPhysicsWorld](./skphysicsworld.md)
- [SKFieldNode](./skfieldnode.md)
- [SKNode](./sknode.md)
