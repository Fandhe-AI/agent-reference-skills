# mpsf-color-conversion

`MPSFColorConversion` and `MPSFunction` (iOS / macOS 27.0+, `MetalPerformanceShaders`) build a Metal Shading Language function that converts texels between color spaces; the resulting `MTLFunction` is linked into your own shader.

## Signature / Usage

Adapted (not in the official docs): conversion built from the declared `init(device:start:end:functionName:sourceRange:options:)` signature; `device`, `sourceSpace`, and `destinationSpace` are assumed to exist, and the function name is an example.

```swift
let conversion = try MPSFColorConversion(device: device,
                                         start: sourceSpace,
                                         end: destinationSpace,
                                         functionName: "myColorConversion",
                                         sourceRange: nil,
                                         options: [])

// Waits for the asynchronous compilation task; the result is nil if compilation failed (see `error`)
let function = conversion.function
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `init(device:conversion:functionName:sourceRange:options:)` | `throws` | Builds from a `CGColorConversionInfo?`; with `nil` the function returns its argument, and `inputColorChannels` / `outputColorChannels` are 0. Returns `nil` (with an error) if the conversion consumes or produces more than four channels |
| `init(device:start:end:functionName:sourceRange:options:)` | `throws` | Builds from starting and ending `CGColorSpace` values. For sRGB / PQ / HLG with hardware pixel-format linearization, pass the result of `CGColorSpaceCreateLinearized(start)` and configure the `MTLTexture` with the matching `MTLPixelFormat` variant |
| `init(device:startColorSpace:endColorSpace:functionName:sourceRange:options:)` | `throws` | Convenience variant with the same meaning |
| `sourceRange` | `UnsafePointer<MPSFunctions_AABB>?` | Guarantees input texels stay inside the axis-aligned bounding box, which together with the precision options may speed up the conversion; out-of-range inputs give undefined results |
| `options` | `MPSFColorConversionOptions` | Precision (`converisonOptionsPrecisionFloat16`, `converisonOptionsPrecisionFloat32`, `converisonOptionsPrecisionSnorm8`, `converisonOptionsPrecisionSnorm16`, `converisonOptionsPrecisionUnorm8`, `converisonOptionsPrecisionUnorm16`, `colorConversionOptionsPrecisionMask`), `colorConversionOptionsReturnGrayscaleAsRGB`, `colorConversionOptionsVerboseLogging` |
| `inputColorChannels` / `outputColorChannels` | `Int` | Color channels used or produced in the float4 texel |
| `effectiveRange(_:)` | `(MPSFunctions_AABB) -> MPSFunctions_AABB` | Estimates the gamut produced by the function for a range of inputs |
| `initialize1DTexture1(_:)` / `initialize3DTexture1(_:)` / `initialize3DTexture2(_:)` | `(MTLTexture?)` | Overwrite `tex1d_1` / `tex3d_1` / `tex3d_2` with the LUT data the conversion needs |
| `MPSFunction.function` / `name` / `error` / `device` | — | The `MTLFunction` to link into your shader, the MSL function name, the error from building it, and the device |
| `MPSFunction.functionPrototype()` | `String` | Source-level function prototype for apps that build shaders from source at run time |

## Notes

- The compilation task starts asynchronously at initialization; reading `function` or `error` waits for it, so create the object as soon as the conversion is known to be needed.
- The option name `converisonOptionsPrecision*` is spelled this way in the official declarations.
- When `conversion` is `nil`, the object cannot tell the number of result channels and assumes grayscale output, remapping it to `{Y,Y,Y,A}` if `colorConversionOptionsReturnGrayscaleAsRGB` is set; prefer the two-color-space initializer unless the content is known to be grayscale.
- Apps that build kernels offline from a `.metallib` can instead `#include <MPSFunctions/MPSFunctions.h>` in their `.metal` file and declare the function with `MPSFUNCTION_DECLARE_COLOR_CONVERSION( _functionName );` (name matching the one passed to the initializer), per the `functionPrototype()` documentation.
- Distinct from Core Image / Core Graphics color management (apple-graphics skill) and from the `MPSImage*` filters in `image-filters.md`; this class generates an MSL function, not an encoded `MPSKernel`.
- Source (retrieved 2026-11-14; DocC JSON, `introducedAt` 27.0, no beta flag): https://developer.apple.com/documentation/metalperformanceshaders/mpsfcolorconversion, https://developer.apple.com/documentation/metalperformanceshaders/mpsfcolorconversionoptions, https://developer.apple.com/documentation/metalperformanceshaders/mpsfunction

## Related

- [image-filters](./image-filters.md)
- [mpskernel](./mpskernel.md)
