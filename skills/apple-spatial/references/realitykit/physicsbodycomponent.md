# PhysicsBodyComponent

A component that defines how an entity behaves in the physics simulation.

## Signature / Usage

```swift
struct PhysicsBodyComponent: Component

// Dynamic body with mass from shape and density
let physics = PhysicsBodyComponent(
    shapes: [.generateSphere(radius: 0.05)],
    mass: 0.5,
    material: .generate(friction: 0.3, restitution: 0.5),
    mode: .dynamic
)
entity.components.set(physics)

// Kinematic body (manually controlled, not affected by forces)
var kinematic = PhysicsBodyComponent()
kinematic.mode = .kinematic
entity.components.set(kinematic)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mode` | `PhysicsBodyMode` | `.dynamic` (simulated), `.static` (immovable), or `.kinematic` (script-driven) |
| `massProperties` | `PhysicsMassProperties` | Mass, inertia tensor, and center of mass |
| `material` | `PhysicsMaterialResource?` | Friction and restitution |
| `isAffectedByGravity` | `Bool` | Whether gravity acts on this body |
| `linearDamping` | `Float` | Damping applied to linear velocity |
| `angularDamping` | `Float` | Damping applied to angular velocity |
| `isTranslationLocked` | `(x:Bool, y:Bool, z:Bool)` | Prevent movement along specific axes |
| `isRotationLocked` | `(x:Bool, y:Bool, z:Bool)` | Prevent rotation around specific axes |
| `isContinuousCollisionDetectionEnabled` | `Bool` | Prevent tunnelling for fast objects |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Requires a `CollisionComponent` on the same entity; without one the body is ignored by simulation.
- To move a kinematic body, set `PhysicsMotionComponent.linearVelocity` or use `entity.move(to:)`.
- Conforms to `Component`, `Equatable`.

## Related

- [CollisionComponent](./collisioncomponent.md)
- [ModelEntity](./modelentity.md)
- [Entity](./entity.md)
