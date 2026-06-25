# CIColorKernel

A GPU-based image-processing routine that processes only the color information of each pixel. A subclass of `CIKernel` optimized for color-only transformations; no geometry or coordinate information is available inside the kernel.

## Signature / Usage

```swift
// Load from compiled Metal library
let kernel = try! CIColorKernel(functionName: "invertColors",
                                fromMetalLibraryData: metalLibData)

// Apply to an image
let output = kernel.apply(extent: inputImage.extent,
                          arguments: [inputImage])
```

### Metal Kernel Source

```metal
#include <CoreImage/CoreImage.h>

extern "C" {
    namespace coreimage {
        // sample_t is a single pre-sampled pixel color
        float4 invertColors(sample_t s) {
            return float4(1.0 - s.rgb, s.a);
        }
    }
}
```

## Options / Props

### Initializers

Inherits Metal-based initializers from `CIKernel`:

| Initializer | Description |
|-------------|-------------|
| `init(functionName:fromMetalLibraryData:) throws` | Load from compiled Metal library |
| `init?(source: String)` | (**Deprecated**) Create from CIKL source string |

### Methods

| Method | Description |
|--------|-------------|
| `apply(extent: CGRect, arguments: [Any]) -> CIImage?` | Execute the color kernel; no ROI callback needed |

The `apply` signature is simpler than `CIKernel.apply` because color kernels do not need ROI mapping — the output extent equals the input extent.

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Kernel receives a `sample_t` (MSL) / `__sample` (CIKL) — a single pre-sampled pixel color, not a sampler object.
- Cannot access destination coordinates (`destCoord()`) or sample neighboring pixels.
- Use `CIKernel` when geometry or multi-pixel access is needed.
- Subclassed by `CIBlendKernel`.

## Related

- [CIKernel](./cikernel.md)
- [CISampler](./cisampler.md)
- [CIFilter](./cifilter.md)
