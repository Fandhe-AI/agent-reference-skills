# SCNPhysicsWorld

The global physics simulation for a scene, providing gravity, collision detection, and behavior management. Accessed via `SCNScene.physicsWorld`; never instantiated directly.

## Signature / Usage

```swift
let world = scene.physicsWorld
world.gravity = SCNVector3(0, -9.8, 0)
world.speed = 1.0
world.contactDelegate = self  // SCNPhysicsContactDelegate

// Add a joint behavior
let joint = SCNPhysicsBallSocketJoint(bodyA: bodyA, anchorA: anchorA,
                                      bodyB: bodyB, anchorB: anchorB)
world.addBehavior(joint)

// Raycast for physics bodies
let hits = world.rayTestWithSegment(from: SCNVector3(0, 10, 0),
                                    to: SCNVector3(0, -10, 0),
                                    options: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `gravity` | `SCNVector3` | Gravitational acceleration applied to all dynamic bodies |
| `speed` | `CGFloat` | Simulation playback speed multiplier |
| `timeStep` | `TimeInterval` | Interval between simulation steps |
| `contactDelegate` | `SCNPhysicsContactDelegate?` | Receives contact begin/end callbacks |
| `allBehaviors` | `[SCNPhysicsBehavior]` | Currently registered behaviors (joints, vehicles, fields) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, visionOS 1.0+. Deprecated in version 26.0.
- `addBehavior(_:)` / `removeBehavior(_:)` / `removeAllBehaviors()` manage joints and vehicles.
- `contactTestBetween(_:_:options:)` tests two specific bodies for overlap.
- `contactTest(with:options:)` tests one body against all others.
- `convexSweepTest(with:from:to:options:)` sweeps a shape through space for contact detection.
- `updateCollisionPairs()` forces re-evaluation of possible collisions immediately.
- Conforms to `NSCoding`, `NSSecureCoding`.

## Related

- [SCNScene](./scnscene.md)
- [SCNPhysicsBody](./scnphysicsbody.md)
- [SCNNode](./scnnode.md)
