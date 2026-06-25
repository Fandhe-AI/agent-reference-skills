# CIKernel

A GPU-based image-processing routine used to create custom Core Image filters that operate on both color and geometry. The base class for `CIColorKernel`, `CIWarpKernel`, and `CIBlendKernel`.

## Signature / Usage

```swift
// Load from a compiled Metal library
guard let url = Bundle.main.url(forResource: "default", withExtension: "metallib"),
      let data = try? Data(contentsOf: url) else { return }
let kernel = try! CIKernel(functionName: "myKernel", fromMetalLibraryData: data)

// Apply kernel
let output = kernel.apply(
    extent: inputImage.extent,
    roiCallback: { _, rect in rect },
    arguments: [inputImage]
)
```

### Metal Kernel Source

```metal
#include <CoreImage/CoreImage.h>

extern "C" {
    namespace coreimage {
        float4 myKernel(sampler src) {
            return src.sample(src.coord());
        }
    }
}
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(functionName:fromMetalLibraryData:) throws` | Load kernel from compiled Metal library (recommended) |
| `init(functionName:fromMetalLibraryData:outputPixelFormat:) throws` | Same, with explicit output format |
| `class kernels(withMetalString:) throws -> [CIKernel]` | Load multiple kernels from Metal source string |
| `class kernelNames(fromMetalLibraryData:) -> [String]` | List kernel function names in a library |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `String` | The kernel function's name |

### Methods

| Method | Description |
|--------|-------------|
| `apply(extent:roiCallback:arguments:) -> CIImage?` | Execute kernel and return output CIImage |

The `roiCallback: CIKernelROICallback` closure maps output rects to input rects for each input image — return the same rect if input/output regions match.

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Metal Shading Language is recommended; Core Image Kernel Language (GLSL dialect) is deprecated.
- Use `CIColorKernel` when the kernel only modifies color (no geometry); it performs better.
- Core Image cannot concatenate `CIImageProcessorKernel` passes, but can concatenate `CIKernel` passes into fewer GPU dispatches.

## Related

- [CIColorKernel](./cicolorkernel.md)
- [CIFilter](./cifilter.md)
- [CISampler](./cisampler.md)
- [CIImageProcessorKernel](./ciimageprocessorkernel.md)
