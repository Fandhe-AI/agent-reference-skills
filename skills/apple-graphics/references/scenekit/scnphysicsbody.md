# SCNPhysicsBody

The physics simulation attributes attached to a scene graph node. Controls how a node responds to gravity, forces, and collisions.

## Signature / Usage

```swift
// Dynamic body (moves freely)
let body = SCNPhysicsBody(type: .dynamic, shape: nil)  // shape inferred from geometry
body.mass = 2.0
body.restitution = 0.5
body.isAffectedByGravity = true
node.physicsBody = body

// Apply an impulse
body.applyForce(SCNVector3(0, 10, 0), asImpulse: true)

// Convenience constructors
node.physicsBody = SCNPhysicsBody.static()
node.physicsBody = SCNPhysicsBody.dynamic()
node.physicsBody = SCNPhysicsBody.kinematic()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `SCNPhysicsBodyType` | `.static`, `.dynamic`, `.kinematic` |
| `physicsShape` | `SCNPhysicsShape?` | Collision volume (simple shapes recommended) |
| `mass` | `CGFloat` | Mass in kilograms |
| `friction` | `CGFloat` | Resistance to sliding |
| `rollingFriction` | `CGFloat` | Resistance to rolling |
| `restitution` | `CGFloat` | Energy retained after collision (0–1) |
| `damping` | `CGFloat` | Linear velocity reduction over time |
| `angularDamping` | `CGFloat` | Angular velocity reduction over time |
| `isAffectedByGravity` | `Bool` | Whether global gravity applies |
| `velocity` | `SCNVector3` | Linear velocity in m/s |
| `angularVelocity` | `SCNVector4` | Rotation axis + angular speed in rad/s |
| `velocityFactor` | `SCNVector3` | Per-axis translation multiplier |
| `angularVelocityFactor` | `SCNVector3` | Per-axis rotation multiplier |
| `categoryBitMask` | `Int` | Categories this body belongs to |
| `collisionBitMask` | `Int` | Categories this body collides with |
| `contactTestBitMask` | `Int` | Categories that generate contact events without physical response |
| `continuousCollisionDetectionThreshold` | `CGFloat` | Threshold for tunneling prevention |
| `isResting` | `Bool` | Whether the body is currently at rest |
| `allowsResting` | `Bool` | Allow SceneKit to auto-rest the body |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- All values use SI units (kg, N, m, rad/s).
- `resetTransform()` syncs physics simulation state with the node's current transform after manual moves.
- `clearAllForces()` cancels accumulated forces for the current frame.
- Use simple collision shapes (box, sphere) rather than mesh shapes for performance.

## Related

- [SCNPhysicsWorld](./scnphysicsworld.md)
- [SCNNode](./scnnode.md)
- [SCNScene](./scnscene.md)
