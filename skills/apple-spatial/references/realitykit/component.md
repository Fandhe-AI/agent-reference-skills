# Component

A protocol that represents a single geometry or behavior aspect attached to an entity.

## Signature / Usage

```swift
protocol Component

// Define a custom component
struct SpeedComponent: Component {
    var metersPerSecond: Float = 1.0
}

// Register once before use (e.g., in App.init or at startup)
SpeedComponent.registerComponent()

// Attach to an entity
entity.components.set(SpeedComponent(metersPerSecond: 2.5))

// Read back
if let speed = entity.components[SpeedComponent.self] {
    print(speed.metersPerSecond)
}
```

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- An entity can hold **at most one component of each type**.
- Call `registerComponent()` once before first use; built-in components do not need registration.
- Store per-entity state in components; `System` types read and write components each frame.
- Subscribe to `ComponentEvents` to react when components are added or removed.

## Related

- [Entity](./entity.md)
- [ModelComponent](./modelcomponent.md)
- [Transform](./transform.md)
- [CollisionComponent](./collisioncomponent.md)
- [PhysicsBodyComponent](./physicsbodycomponent.md)
- [System](./system.md)
