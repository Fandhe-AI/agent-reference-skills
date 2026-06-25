# Entity

The fundamental building block of a RealityKit scene. Attach components to provide appearance and behavior.

## Signature / Usage

```swift
@MainActor @preconcurrency class Entity

// Create and configure
let entity = Entity()
entity.name = "myObject"

// Attach a component
entity.components.set(Transform(translation: [0, 0, -1]))

// Add to hierarchy
anchorEntity.addChild(entity)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `String` | Human-readable identifier |
| `components` | `Entity.ComponentSet` | All attached components |
| `children` | `Entity.ChildCollection` | Direct child entities |
| `parent` | `Entity?` | Parent entity, if any |
| `isEnabled` | `Bool` | Whether entity and descendants are active |
| `isEnabledInHierarchy` | `Bool` | Whether entity and all ancestors are enabled |
| `isAnchored` | `Bool` | Whether entity is anchored to the real world |
| `scene` | `Scene?` | The scene that contains this entity |
| `anchor` | `HasAnchoring?` | Nearest ancestor anchor |
| `availableAnimations` | `[AnimationResource]` | Animations attached to this entity |

## Key Methods

| Method | Description |
|--------|-------------|
| `addChild(_:)` | Add a child entity |
| `removeFromParent()` | Detach from parent |
| `findEntity(named:)` | Recursively search descendants by name |
| `clone(recursive:)` | Deep-copy the entity subtree |
| `generateCollisionShapes(recursive:)` | Auto-generate collision shapes from mesh |
| `playAnimation(_:)` | Play an `AnimationResource` |
| `stopAllAnimations(recursive:)` | Stop all running animations |
| `playAudio(_:)` | Play a spatial audio resource |
| `move(to:relativeTo:duration:timingFunction:)` | Animate to a target transform |

## Notes

- Available: iOS 13.0+, iPadOS 13.0+, macOS 10.15+, Mac Catalyst 13.0+, tvOS 26.0+, visionOS 1.0+
- Every `Entity` inherits `Transform` and `SynchronizationComponent` by default.
- At most one component of each type can be attached per entity.
- Loading from file: `Entity(named:in:)` and `Entity(contentsOf:)` are `async throws`.

## Related

- [ModelEntity](./modelentity.md)
- [AnchorEntity](./anchorentity.md)
- [Component](./component.md)
- [Transform](./transform.md)
- [Scene](./scene.md)
