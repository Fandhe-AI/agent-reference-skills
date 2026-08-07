# NavigationComponent

A component that defines which areas of a navigation mesh an entity can move through.

## Signature / Usage

```swift
struct NavigationComponent: Component

var nav = NavigationComponent(layer: nil, filter: nil)
entity.components.set(nav)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `layer` | `NavigationMeshResource.Layer?` | Layer to search for a `NavigationMeshResource` in a `Scene`; if unset, the first available resource is used |
| `filter` | `NavigationComponent.Filter?` | Filter used when pathfinding: flags to ignore/include and area costs |

## Notes

- Available (beta): iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Component`.
- Attach to an entity together with a `NavigationController` to compute paths across a `NavigationMeshResource` supplied by a `NavigationMeshComponent`.
- This is RealityKit's ECS pathfinding type, distinct from SwiftUI's `NavigationStack`/`NavigationView` and from routing APIs of the same name in other frameworks (e.g. `react-router-v7`, `android-navigation`) — it has no relation to view/screen navigation.

## Related

- [NavigationController](./navigationcontroller.md)
- [NavigationMeshComponent](./navigationmeshcomponent.md)
- [Entity](../entity.md)
