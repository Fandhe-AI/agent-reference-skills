# NavigationController

An interface for finding paths for an entity moving across a scene's navigation mesh.

## Signature / Usage

```swift
struct NavigationController

let controller = try NavigationController(entity: agentEntity)
controller.requestPath(to: targetPosition)

// or async
if let path = await controller.computePath(to: targetPosition) {
    // consume path nodes
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pathfindStatus` | `NavigationController.PathfindStatus` | Current status of the pathfind operation |
| `currentPath` | `[NavigationMeshResource.PathNode]` | Path computed by `requestPath()`; partial/suboptimal if read before completion, empty if pathfinding failed or wasn't requested |

## Notes

- Available (beta): iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- `init(entity:)` throws and requires the entity to already carry a `NavigationComponent`.
- Synchronous/callback style: `requestPath(to:)`, `requestPath(from:to:)`, `stopPathfind()` cancels an in-progress pathfind; read the result from `currentPath`.
- Async style: `computePath(to:)`, `computePath(from:to:)` return `[NavigationMeshResource.PathNode]?` directly (`nil` on failure).
- This is RealityKit's ECS pathfinding type, distinct from view/screen navigation controllers of the same or similar name in other UI frameworks.

## Related

- [NavigationComponent](./navigationcomponent.md)
- [NavigationMeshComponent](./navigationmeshcomponent.md)
