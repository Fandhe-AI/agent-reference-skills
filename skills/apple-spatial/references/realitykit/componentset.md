# Entity.ComponentSet

A collection that stores the components attached to an entity. Accessed via `entity.components`.

## Signature / Usage

```swift
@MainActor @preconcurrency struct Entity.ComponentSet

// Add or replace a component
entity.components.set(ModelComponent(mesh: mesh, materials: [material]))

// Read a component
if let model = entity.components[ModelComponent.self] {
    print(model.mesh)
}

// Check presence
if entity.components.has(CollisionComponent.self) { ... }

// Remove
entity.components.remove(CollisionComponent.self)

// Iterate all components
for component in entity.components {
    print(type(of: component))
}
```

## Options / Props

| Method | Description |
|--------|-------------|
| `set<T>(_ component: T)` | Add or replace a component of type T |
| `set(_ components: [any Component])` | Batch-set multiple components |
| `subscript<T>(_ type: T.Type) -> T?` | Get component by type (get/set) |
| `has(_ componentType: any Component.Type) -> Bool` | Check if type is present |
| `remove(_ componentType: any Component.Type)` | Remove a component type |
| `removeAll()` | Remove all components |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Conforms to `Sequence`, `Collection`, `BidirectionalCollection`.
- At most one component per type is permitted.

## Related

- [Entity](./entity.md)
- [Component](./component.md)
