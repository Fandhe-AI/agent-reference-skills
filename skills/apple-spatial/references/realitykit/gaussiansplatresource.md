# GaussianSplatResource

A container for the splat data and rendering options that a Gaussian splat component displays: scale and opacity activation functions, projection mode, sorting mode, and color space.

## Signature / Usage

```swift
final class GaussianSplatResource

let resource = GaussianSplatResource(bufferResource)
let entity = Entity()
entity.components.set(GaussianSplatComponent(resource))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(_:)` | `init(_: GaussianSplatResource.BufferResource)` | Creates a resource from a buffer resource |
| `bufferResource` | `GaussianSplatResource.BufferResource?` (`let`) | The buffer-based splat data the resource renders, if any |
| `colorSpace` | `CGColorSpace` | The color space used to interpret splat colors |
| `opacityActivation` | `GaussianSplatResource.ActivationFunction` | Transformation applied to opacity values before rendering |
| `scaleActivation` | `GaussianSplatResource.ActivationFunction` | Transformation applied to scale values before rendering |
| `projectionMode` | `GaussianSplatResource.ProjectionMode` | Projection technique used for splat footprints |
| `sortingMode` | `GaussianSplatResource.SortingMode` | Order in which splats are drawn to blend opacity |
| `BufferResource` | `struct` | A set of buffer descriptors that supplies the per-splat data |
| `BufferDescriptor` | `struct` | Describes where one per-splat property lives within a buffer |
| `SphericalHarmonicDegree` | `enum` | The amount of view-dependent color detail stored per splat |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+ (no tvOS)
- The framework references the resource's buffers rather than copying them, so you can update the contents of the underlying `LowLevelBuffer` instances to animate the splats over time.
- Attach to an entity through `GaussianSplatComponent`.

## Related

- [GaussianSplatComponent](./gaussiansplatcomponent.md)
- [GaussianSplatEvents](./gaussiansplatevents.md)
