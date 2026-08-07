# ClothBodyComponent

A component that simulates an entity as a deformable cloth body, when part of a cloth simulation.

## Signature / Usage

```swift
struct ClothBodyComponent: Component

let clothMesh: ClothMeshResource = try .generate(from: descriptor)
let cloth = ClothBodyComponent(mesh: clothMesh, meshDraping: nil)
entity.components.set(cloth)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mesh` | `ClothMeshResource` | The simulation mesh of the cloth body, defining its rest pose |
| `initialMeshDraping` | `ClothPoseResource?` | Optional already-draped pose at the start of the simulation |
| `visualMesh` | (read-only) | The dynamically deforming visual mesh of the cloth body |
| `visualMeshWeights` | — | Optional weights mapping the visual mesh to the simulation mesh |
| `materialNames` | `[String]` | Names of the body materials used by this cloth body |
| `motionTypes` | — | Motion type for each particle in the body (e.g. kinematic pinning) |
| `mass` | `Float` | Mass of the body as a whole, in kg |
| `targetShapes` | — | Target shapes associated with the body |
| `externalForces` | — | External forces applied to the body's particles, in Newtons |
| `inflationConstraint` | — | Optional inflation constraint for inflatable (watertight) bodies |
| `colliderBinding` | — | Configuration for binding the body to a mesh collider |
| `collisionFilters` | — | Collision groups each particle belongs to |

## Notes

- Available (beta): iOS 27.0+, iPadOS 27.0+, visionOS 27.0+; also supported on Mac Catalyst.
- Conforms to `Component`.
- Kinematic vertices (via `motionTypes`) can only be moved by the entity's transform, not by the cloth simulation — use this to pin cloth in place (flags, curtains, garments).
- Works alongside `ClothSimulationComponent`, `ClothColliderComponent`, `ClothGrabComponent`, `ClothForceVolumeComponent`, and `ClothQueryVolumeComponent`.
- Methods: `resetDeformation(entity:)` resets the cloth to its initial pose and motion; `enableCollisions(towards:)` / `disableCollisions(towards:)` toggle one-way collisions per particle group.
- Related resource types: `ClothMeshResource`, `ClothPoseResource`, `ClothBodyMaterial`, `ClothCoordinateSpace`, `PerClothVertexData`.

## Related

- [PhysicsBodyComponent](../physicsbodycomponent.md)
- [CollisionComponent](../collisioncomponent.md)
