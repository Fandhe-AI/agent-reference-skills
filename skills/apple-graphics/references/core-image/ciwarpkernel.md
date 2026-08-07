# CIWarpKernel

A GPU-based image-processing routine that processes only the geometry information in an image, used to create custom Core Image filters. A subclass of `CIKernel`.

## Signature / Usage

```swift
let warpKernel = try! CIWarpKernel(functionName: "myWarp",
                                    fromMetalLibraryData: metalLibData)
let output = warpKernel.apply(
    extent: inputImage.extent,
    roiCallback: { _, rect in rect },
    image: inputImage,
    arguments: [scaleValue]
)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init?(source: String)` | (**Deprecated**) Create from CIKL source string |

### Methods

| Method | Description |
|--------|-------------|
| `apply(extent:roiCallback:image:arguments:) -> CIImage?` | Creates a new image using the kernel and the specified input image and arguments |

## Notes

- iOS 8.0+, iPadOS 8.0+, macOS 10.11+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Processes only geometry (pixel coordinates), not color — the counterpart to `CIColorKernel`, which processes only color.
- Inherits Metal-based initializers from `CIKernel` (e.g. `init(functionName:fromMetalLibraryData:)`).

## Related

- [CIKernel](./cikernel.md)
- [CIColorKernel](./cicolorkernel.md)
- [CIBlendKernel](./ciblendkernel.md)
- [CISampler](./cisampler.md)
- [CIFilterShape](./cifiltershape.md)
