# RealityKit

| Name | Description | Path |
|------|-------------|------|
| Entity | Base class for all scene objects; attach components to define appearance and behavior | [entity.md](./entity.md) |
| ModelEntity | Renderable entity with mesh and materials, supporting physics and collision | [modelentity.md](./modelentity.md) |
| AnchorEntity | Tethers virtual content to real-world surfaces, images, faces, or world positions | [anchorentity.md](./anchorentity.md) |
| Component | Protocol for attaching a single aspect of geometry or behavior to an entity | [component.md](./component.md) |
| Entity.ComponentSet | Type-keyed collection of components stored on an entity | [componentset.md](./componentset.md) |
| ModelComponent | Component providing a MeshResource and Material array for rendering | [modelcomponent.md](./modelcomponent.md) |
| Scene | Container that holds all anchors and entities rendered by an AR/3D view | [scene.md](./scene.md) |
| RealityView | SwiftUI view that hosts RealityKit content with make/update closures | [realityview.md](./realityview.md) |
| MeshResource | Procedural or custom 3D geometry (box, sphere, plane, cylinder, text, etc.) | [meshresource.md](./meshresource.md) |
| Material | Protocol adopted by all surface-appearance types (PBR, unlit, video, etc.) | [material.md](./material.md) |
| SimpleMaterial | Basic light-responsive material with color, roughness, and metallic properties | [simplematerial.md](./simplematerial.md) |
| PhysicallyBasedMaterial | Full PBR material with baseColor, roughness, metallic, emissive, clearcoat, and blending | [physicallybasedmaterial.md](./physicallybasedmaterial.md) |
| Transform | Component defining scale, rotation, and translation of an entity | [transform.md](./transform.md) |
| System | Protocol for per-frame ECS logic that queries and updates multiple entities | [system.md](./system.md) |
| BodyTrackingComponent | Animates a rigged character by tracking a real person's body pose (iOS only) | [bodytrackingcomponent.md](./bodytrackingcomponent.md) |
| CollisionComponent | Enables collision detection and physics-simulation participation | [collisioncomponent.md](./collisioncomponent.md) |
| PhysicsBodyComponent | Defines physics behavior mode (dynamic/static/kinematic), mass, and damping | [physicsbodycomponent.md](./physicsbodycomponent.md) |
