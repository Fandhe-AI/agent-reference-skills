# CIFilterShape

A description of the bounding shape of a filter and the domain of definition for a filter operation. Used with `CIFilter`, `CIKernel`, and `CISampler` when building custom filters.

## Signature / Usage

```swift
let shape = CIFilterShape(rect: inputImage.extent)
let inset = shape.insetBy(x: 10, y: 10)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(rect: CGRect)` | Initializes a filter shape with a rectangle |

### Properties

| Property | Type | Description |
|----------|------|--------------|
| `extent` | `CGRect` | The extent of the filter shape |

### Methods

| Method | Description |
|--------|-------------|
| `insetBy(x: Int32, y: Int32) -> CIFilterShape` | Insets the filter shape by the specified x/y values |
| `intersect(with: CIFilterShape) -> CIFilterShape` | Intersects with another filter shape |
| `intersect(with: CGRect) -> CIFilterShape` | Intersects with a rectangle |
| `transform(by: CGAffineTransform, interior: Bool) -> CIFilterShape` | Applies a transform to the filter shape |
| `union(with: CIFilterShape) -> CIFilterShape` | Unions with another filter shape |
| `union(with: CGRect) -> CIFilterShape` | Unions with a rectangle |

## Notes

- iOS 9.0+, iPadOS 9.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+

## Related

- [CIKernel](./cikernel.md)
- [CIWarpKernel](./ciwarpkernel.md)
- [CIBlendKernel](./ciblendkernel.md)
- [CISampler](./cisampler.md)
