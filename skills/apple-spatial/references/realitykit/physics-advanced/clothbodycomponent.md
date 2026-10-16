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
| `visualMesh` | `LowLevelMesh?` (read-only) | The dynamically deforming visual mesh of the cloth body |
| `visualMeshWeights` | `PerClothVertexData<Float>?` | Optional weights mapping the visual mesh to the simulation mesh |
| `materialNames` | `[String]` | Names of the body materials used by this cloth body |
| `motionTypes` | `PerClothVertexData<ClothBodyComponent.ParticleMotionType>` | Motion type for each particle in the body (e.g. kinematic pinning) |
| `mass` | `Float` | Mass of the body as a whole, in kg |
| `targetShapes` | `[ClothBodyComponent.TargetShape]` | Target shapes associated with the body |
| `externalForces` | `PerClothVertexData<ClothBodyComponent.ExternalForce>` | External forces applied to the body's particles, in Newtons |
| `inflationConstraint` | `ClothBodyComponent.InflationConstraint?` | Optional inflation constraint for inflatable (watertight) bodies |
| `colliderBinding` | `ClothBodyComponent.ColliderBinding` | Configuration for binding the body to a mesh collider |
| `collisionFilters` | `PerClothVertexData<ClothCollisionFilter>` | Collision groups each particle belongs to |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, visionOS 27.0+
- Conforms to `Component`.
- The initializer label is `meshDraping:` (`init(mesh:meshDraping:)`); it is stored in the `initialMeshDraping` property.
- Kinematic vertices (via `motionTypes`) can only be moved by the entity's transform, not by the cloth simulation — use this to pin cloth in place (flags, curtains, garments).
- Works alongside `ClothSimulationComponent`, `ClothColliderComponent`, `ClothGrabComponent`, `ClothForceVolumeComponent`, and `ClothQueryVolumeComponent`.
- Methods: `resetDeformation(entity:)` resets the cloth to its initial pose and motion; `enableCollisions(towards:)` / `disableCollisions(towards:)` toggle one-way collisions per particle group.
- Related resource types: `ClothMeshResource`, `ClothPoseResource`, `ClothBodyMaterial`, `ClothCoordinateSpace`, `PerClothVertexData`.

## Related

- [PhysicsBodyComponent](../physicsbodycomponent.md)
- [CollisionComponent](../collisioncomponent.md)
