# NavigationMeshResource

A representation of a scene's navigable surfaces that the system uses to compute paths.

## Signature / Usage

```swift
class NavigationMeshResource

convenience init(mesh: MeshResource, offMeshConnections: [NavigationMeshResource.OffMeshConnection], configuration: NavigationMeshResource.Configuration) throws
convenience init(mesh: MeshResource, offMeshConnections: [NavigationMeshResource.OffMeshConnection], configuration: NavigationMeshResource.Configuration) async throws
```

Build a navigation mesh from a model's geometry or from raw vertex and polygon data, then mark areas and flags to describe where agents can travel and at what cost. Provide the resulting resource to a `NavigationMeshComponent` so a `NavigationController` can find paths across it.

## Options / Props

Initializers (creating a navigation mesh):

| Name | Type | Description |
|------|------|-------------|
| `init(mesh:offMeshConnections:configuration:)` | `MeshResource`, `[OffMeshConnection]`, `Configuration` | Creates from a `MeshResource`; `throws` and `async throws` variants |
| `init(meshDescriptor:offMeshConnections:configuration:)` | `MeshDescriptor`, `[OffMeshConnection]`, `Configuration` | Creates from a `MeshDescriptor`; `throws` and `async throws` variants |
| `init(triangleIndices:vertices:offMeshConnections:configuration:)` | `[UInt32]`, `[SIMD3<Float>]`, `[OffMeshConnection]`, `Configuration` | Creates from triangle indices and vertices; `throws` and `async throws` variants |
| `init(polygonIndices:vertices:offMeshConnections:configuration:areas:flags:heightData:)` | `[[Int]]`, `[SIMD3<Float>]`, `[OffMeshConnection]`, `Configuration`, `[Area]`, `[[Flag]]`, `HeightData` | Creates from existing navigation mesh data; does not regenerate the mesh, `throws` |
| `init(named:in:)` | name, bundle | Asynchronously imports an existing `NavigationMeshResource` from a `Bundle` (main bundle if unspecified); does not process a new mesh |

Marking and removing areas and flags:

| Name | Description |
|------|-------------|
| `markAreaInBox(boundingBox:area:)` / `markFlagInBox(boundingBox:flag:)` | Marks all polygons in the box with an area / flag |
| `markAreaInCylinder(position:radius:halfHeight:area:)` / `markFlagInCylinder(position:radius:halfHeight:flag:)` | Marks all polygons in the cylinder with an area / flag |
| `markAreaOnPolygons(polygonIndices:area:)` / `markFlagOnPolygons(polygonIndices:flag:)` | Marks the polygons at these indices |
| `markAreaOnOffMeshConnections(offMeshConnectionIndices:area:)` / `markFlagOnOffMeshConnections(offMeshConnectionIndices:flag:)` | Marks the off-mesh connections at these indices |
| `removeAreaInBox(boundingBox:area:)` / `removeFlagInBox(boundingBox:flag:)` | Removes the area / flag from all polygons in the box |
| `removeAreaInCylinder(position:radius:halfHeight:area:)` / `removeFlagInCylinder(position:radius:halfHeight:flag:)` | Removes the area / flag from all polygons in the cylinder |
| `removeAreaOnPolygons(polygonIndices:area:)` / `removeFlagOnPolygons(polygonIndices:flag:)` | Removes the area / flag from the polygons at these indices |
| `removeAreaOnOffMeshConnections(offMeshConnectionIndices:area:)` / `removeFlagOnOffMeshConnections(offMeshConnectionIndices:flag:)` | Removes the area / flag from the off-mesh connections at these indices |

Properties (accessing mesh data):

| Name | Type | Description |
|------|------|-------------|
| `vertices` | | The vertices of the generated navigation mesh |
| `polygonIndices` | | Each entry is a list of indices into `vertices` for one polygon (polygons may have different vertex counts) |
| `areas` | `[NavigationMeshResource.Area]` | The areas associated with each polygon |
| `flags` | `[[NavigationMeshResource.Flag]]` | The flags associated with each polygon |
| `offMeshConnections` | | The off-mesh connections of the generated navigation mesh |
| `heightData` | `NavigationMeshResource.HeightData` | The detailed height data of the generated mesh |
| `layer` | `NavigationMeshResource.Layer?` | Identification used when entities search for a specific resource in a scene |
| `configuration` | `NavigationMeshResource.Configuration` | The configuration the mesh was created with |

Supporting types: `Configuration` (defines how the mesh is created), `Area`, `Flag`, `FlagGroup` (a collection of flags), `OffMeshConnection`, `HeightData`, `Layer` (selects a specific mesh for pathfinding via `NavigationComponent`), `PathNode`.

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Resource`, `Sendable`, `SendableMetatype`.
- Processing input geometry may not match the final geometry: the system simplifies regions and applies the configuration to decide which areas are walkable.
- This is RealityKit's ECS pathfinding type, distinct from view/screen navigation types of the same or similar name in other frameworks.
- Source: https://developer.apple.com/documentation/realitykit/navigationmeshresource (fetched 2026-10 from the DocC JSON).

## Related

- [NavigationMeshComponent](./navigationmeshcomponent.md)
- [NavigationController](./navigationcontroller.md)
- [NavigationComponent](./navigationcomponent.md)
