# NavigationMeshComponent

A component that provides the navigation meshes an entity uses to find paths through a scene.

## Signature / Usage

```swift
struct NavigationMeshComponent: Component

let meshComponent = NavigationMeshComponent(navigationMeshes: [bakedMesh])
sceneRootEntity.components.set(meshComponent)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `navigationMeshes` | `[NavigationMeshResource]` | The set of navigation mesh resources supplying walkable surfaces |

## Notes

- Available (beta): iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Component`.
- Each `NavigationMeshResource` represents a baked, walkable region of the scene; agents with a matching `NavigationComponent` can travel across it.
- Define a `NavigationMeshResource` via the Swift API or bake it in Reality Composer Pro 3.
- This is RealityKit's ECS pathfinding type, distinct from view/screen navigation types of the same or similar name in other frameworks.

## Related

- [NavigationComponent](./navigationcomponent.md)
- [NavigationController](./navigationcontroller.md)
