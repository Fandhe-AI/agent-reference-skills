# Scene

A container that holds the collection of entities an AR or 3D view renders.

## Signature / Usage

```swift
@MainActor @preconcurrency class Scene

// Access via ARView (iOS/macOS) or RealityView content (visionOS)
let scene = arView.scene

// Add an anchor
let anchor = AnchorEntity(plane: .horizontal)
scene.addAnchor(anchor)

// Find by name
if let target = scene.findEntity(named: "myBox") { ... }

// Query all entities with a component
let results = scene.performQuery(EntityQuery(where: .has(PhysicsBodyComponent.self)))

// Subscribe to events
scene.subscribe(to: CollisionEvents.Began.self) { event in
    print(event.entityA, event.entityB)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `anchors` | `Scene.AnchorCollection` | All anchors in the scene |
| `synchronizationService` | `(any SynchronizationService)?` | Network sync service |
| `timebase` | `CMTimebase` | Scene clock for custom time management |

## Key Methods

| Method | Description |
|--------|-------------|
| `addAnchor(_:)` | Add a `HasAnchoring` entity to the scene |
| `removeAnchor(_:)` | Remove an anchor |
| `findEntity(named:)` | Search all hierarchies by name |
| `findEntity(id:)` | Find by `Entity.ID` |
| `performQuery(_:)` | Return entities matching an `EntityQuery` |
| `raycast(origin:direction:length:query:mask:relativeTo:)` | Physics raycast |
| `convexCast(...)` | Convex-shape sweep test |
| `publisher(for:on:)` | Combine publisher for scene events |
| `subscribe(to:on:_:)` | Closure-based event subscription |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- You do not create `Scene` directly; obtain it from `ARView.scene` or `RealityViewContent`.
- Conforms to `EventSource`, `CoordinateSpace3D`, `Equatable`, `Hashable`, `Sendable`.

## Related

- [Entity](./entity.md)
- [AnchorEntity](./anchorentity.md)
- [RealityView](./realityview.md)
- [System](./system.md)
