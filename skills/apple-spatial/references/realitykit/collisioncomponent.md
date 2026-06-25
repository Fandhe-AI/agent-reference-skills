# CollisionComponent

A component that enables collision detection and physics participation for an entity.

## Signature / Usage

```swift
struct CollisionComponent: Component

// Trigger — detects overlap, no physics response
let trigger = CollisionComponent(
    shapes: [.generateBox(size: [0.2, 0.2, 0.2])],
    mode: .trigger,
    filter: .default
)

// Rigid body — full physics collision
let rigid = CollisionComponent(
    shapes: [.generateSphere(radius: 0.05)],
    mode: .default,         // .rigidBody in older APIs
    filter: CollisionFilter(group: .default, mask: .all)
)
entity.components.set(rigid)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shapes` | `[ShapeResource]` | Collision shape(s) bounding the entity |
| `mode` | `CollisionComponent.Mode` | `.trigger` (overlap only) or `.default`/`.rigidBody` (full physics) |
| `filter` | `CollisionFilter` | Group/mask bitmask controlling which entities collide |
| `isStatic` | `Bool` | Mark collider as static for performance |
| `collisionOptions` | `CollisionComponent.CollisionOptions` | Fine-grained collision reporting options |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- If the entity also has a `PhysicsBodyComponent`, `CollisionComponent.mode` is overridden by physics behavior.
- Non-uniform scaling applies only to box, convex, and triangle mesh shapes.
- Subscribe to `CollisionEvents.Began/Updated/Ended` via `scene.subscribe(to:)`.
- Conforms to `Component`, `Equatable`.

## Related

- [Entity](./entity.md)
- [PhysicsBodyComponent](./physicsbodycomponent.md)
- [ModelEntity](./modelentity.md)
- [Scene](./scene.md)
