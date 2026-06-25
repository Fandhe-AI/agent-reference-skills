# System

A protocol for objects that apply behavior to multiple entities every scene update.

## Signature / Usage

```swift
protocol System

// 1. Define a custom system
struct GravitySystem: System {
    static let query = EntityQuery(where: .has(PhysicsBodyComponent.self))

    init(scene: Scene) { }

    func update(context: SceneUpdateContext) {
        for entity in context.entities(matching: Self.query,
                                        updatingSystemWhen: .rendering) {
            // Modify components each frame
            var body = entity.components[PhysicsBodyComponent.self]!
            // ... apply custom forces
            entity.components.set(body)
        }
    }
}

// 2. Register once at startup
GravitySystem.registerSystem()
```

## Options / Props

| Requirement | Description |
|-------------|-------------|
| `init(scene: Scene)` | Called once when the system is registered |
| `func update(context: SceneUpdateContext)` | Called every frame (or as specified by `dependencies`) |
| `static var dependencies: [SystemDependency]` | Optional execution-order constraints |

## Key Types

| Type | Description |
|------|-------------|
| `SceneUpdateContext` | Provides `entities(matching:updatingSystemWhen:)` and scene access |
| `EntityQuery` | Filter predicate — `.has(T.self)`, `.has(T.self) && .has(U.self)`, etc. |
| `SystemDependency` | Declares `.before` / `.after` ordering relative to another system |

## Notes

- Available: iOS 15.0+, iPadOS 15.0+, macOS 12.0+, Mac Catalyst 15.0+, tvOS 26.0+, visionOS 1.0+
- Systems must **not** store per-entity data as properties; use `Component` instances on entities instead.
- Systems execute in a topologically sorted order determined by `dependencies`.
- Call `registerSystem()` once before the first scene update (e.g., `App.init`).

## Related

- [Component](./component.md)
- [Entity](./entity.md)
- [Scene](./scene.md)
