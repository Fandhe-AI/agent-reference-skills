# GaussianSplatComponent

A component that renders 3D Gaussian splat data, displaying volumetric imagery captured from real environments as 3D Gaussian primitives (3DGS) viewable from novel angles.

## Signature / Usage

```swift
struct GaussianSplatComponent: Component

// Attach a splat resource loaded from PLY-derived buffers
let resource = GaussianSplatResource(bufferResource)
let splatEntity = Entity()
splatEntity.components.set(GaussianSplatComponent(resource))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `splatResource` | `GaussianSplatResource` | The splat data and rendering options the component displays |

## Notes

- Available (beta): iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+
- Conforms to `Component`.
- Unlike mesh-based rendering with `ModelComponent`, this component uses no developer-visible shaders; RealityKit renders each splat as an ellipsoid during the transparency render pass, blending back-to-front.
- Scene lighting does not affect Gaussian splat assets; rendered color reflects the lighting conditions from the original capture.
- Requires a device with Apple7 GPU family support.
- Each splat requires position, scale, rotation (quaternion), opacity, and spherical-harmonic color coefficients, supplied via `GaussianSplatResource.BufferDescriptor`.
- Rendering cost correlates with splat count and overdraw; RealityKit enforces an internal splat limit. Reduce cost by pruning splat count during training and culling low-opacity splats.

## Related

- [ModelComponent](./modelcomponent.md)
- [Component](./component.md)
- [MeshResource](./meshresource.md)
