# CIBlendKernel

A GPU-based image-processing routine optimized for blending two images. A subclass of `CIColorKernel` with two `sample_t`/`__sample` arguments (foreground, background).

## Signature / Usage

```swift
// Use a builtin blend kernel
let output = CIBlendKernel.multiply.apply(foreground: fgImage, background: bgImage)
```

```metal
#include <CoreImage/CoreImage.h>

float4 averageBlend(sample_t foreground, sample_t background) {
    return (foreground + background) / 2.0;
}
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init?(source: String)` | (**Deprecated**) Create a custom blend kernel from a program string |

### Methods

| Method | Description |
|--------|-------------|
| `apply(foreground:background:) -> CIImage?` | Creates a new image using the blend kernel and the specified foreground/background images |
| `apply(foreground:background:colorSpace:) -> CIImage?` | Same, blending in the specified color space |

### Builtin Blend Kernels (type properties, selected)

| Group | Names |
|-------|-------|
| Color Composition | `clear`, `source`, `destination`, `sourceOver`, `destinationOver`, `sourceIn`, `sourceOut`, `sourceAtop`, `destinationIn`, `destinationOut`, `destinationAtop`, `exclusiveOr` |
| Component Operations | `componentAdd`, `componentMultiply`, `componentMin`, `componentMax` |
| Multiply & Screen | `multiply`, `screen`, `overlay`, `softLight`, `hardLight` |
| Darken & Lighten | `darken`, `lighten`, `darkerColor`, `lighterColor` |
| Burn & Dodge | `colorBurn`, `colorDodge`, `linearBurn`, `linearDodge`, `vividLight`, `linearLight`, `pinLight`, `hardMix` |
| Difference | `difference`, `exclusion`, `subtract`, `divide` |
| HSL Color | `hue`, `saturation`, `color`, `luminosity` |

## Notes

- iOS 11.0+, iPadOS 11.0+, macOS 10.13+, Mac Catalyst 13.1+, tvOS 11.0+, visionOS 1.0+
- Output extent is generally the union of the foreground and background extents.
- Prefer the builtin type properties (e.g. `.multiply`, `.sourceOver`) over writing a custom Metal blend kernel when a standard compositing/blend mode suffices.

## Related

- [CIColorKernel](./cicolorkernel.md)
- [CIKernel](./cikernel.md)
- [CIWarpKernel](./ciwarpkernel.md)
- [CISampler](./cisampler.md)
- [CIFilterShape](./cifiltershape.md)
