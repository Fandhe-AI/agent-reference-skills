# ModelEntity

A representation of a physical object that RealityKit renders and optionally simulates.

## Signature / Usage

```swift
@MainActor @preconcurrency class ModelEntity: Entity

// Create with mesh and material
let mesh = MeshResource.generateBox(size: 0.1, cornerRadius: 0.005)
let material = SimpleMaterial(color: .blue, isMetallic: false)
let entity = ModelEntity(mesh: mesh, materials: [material])

// With physics
let entity = ModelEntity(
    mesh: mesh,
    materials: [material],
    collisionShape: .generateBox(size: [0.1, 0.1, 0.1]),
    mass: 1.0
)
```

## Options / Props

| Component | Protocol | Description |
|-----------|----------|-------------|
| `ModelComponent` | `HasModel` | Mesh and materials defining visual appearance |
| `CollisionComponent` | `HasCollision` | Collision shape(s) for physics and hit-testing |
| `PhysicsBodyComponent` | `HasPhysicsBody` | Mass and physics behavior mode |
| `PhysicsMotionComponent` | `HasPhysicsMotion` | Linear and angular velocity |
| `Transform` | `HasTransform` | Position, rotation, scale |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Inherits all `Entity` methods including `addChild`, `findEntity`, `clone`, `playAnimation`.
- A `PhysicsBodyComponent` requires a `CollisionComponent` to participate in physics simulation.

## Related

- [Entity](./entity.md)
- [ModelComponent](./modelcomponent.md)
- [MeshResource](./meshresource.md)
- [SimpleMaterial](./simplematerial.md)
- [CollisionComponent](./collisioncomponent.md)
- [PhysicsBodyComponent](./physicsbodycomponent.md)
