# CIImageProcessorKernel

An abstract base class for integrating non–Core Image processing technologies (Metal compute, Metal Performance Shaders, Accelerate/vImage, or CPU code) directly into a Core Image filter chain. Subclass and override `process(with:arguments:output:)`.

## Signature / Usage

```swift
class ThresholdKernel: CIImageProcessorKernel {
    override class func process(
        with inputs: [CIImageProcessorInput]?,
        arguments: [String: Any]?,
        output: CIImageProcessorOutput
    ) throws {
        guard
            let commandBuffer = output.metalCommandBuffer,
            let sourceTexture = inputs?.first?.metalTexture,
            let destTexture = output.metalTexture,
            let threshold = arguments?["threshold"] as? Float
        else { return }

        let mps = MPSImageThresholdBinary(
            device: commandBuffer.device,
            thresholdValue: threshold,
            maximumValue: 1.0,
            linearGrayColorTransform: nil)
        mps.encode(commandBuffer: commandBuffer,
                   sourceTexture: sourceTexture,
                   destinationTexture: destTexture)
    }
}

// Create output CIImage
let result = try ThresholdKernel.apply(
    withExtent: inputImage.extent,
    inputs: [inputImage],
    arguments: ["threshold": 0.25])
```

## Options / Props

### Class Methods (Call Site)

| Method | Description |
|--------|-------------|
| `apply(withExtent:inputs:arguments:) throws -> CIImage` | Create output from a single extent |
| `apply(withExtents:inputs:arguments:) throws -> [CIImage]` | Create multiple outputs |
| `apply(withTiledExtent:inputs:arguments:) throws -> CIImage` | Create tiled output |

### Class Methods (Override in Subclass)

| Method | Description |
|--------|-------------|
| `process(with:arguments:output:) throws` | Core processing logic — must override |
| `roi(forInput:arguments:outputRect:) -> CGRect` | Map output rect to input ROI; override when they differ (e.g., blur) |
| `formatForInput(at:) -> CIFormat` | Pixel format for each input; default `.BGRA8` |
| `outputFormat -> CIFormat` | Pixel format for the output; default `.BGRA8` |
| `outputIsOpaque -> Bool` | Whether output alpha is always 1.0; default `false` |
| `synchronizeInputs -> Bool` | Whether to synchronize GPU inputs before CPU access; default `true` |

### CIImageProcessorInput / Output (in `process`)

| Property | Description |
|----------|-------------|
| `metalTexture` | Input/output as `MTLTexture` |
| `metalCommandBuffer` | Active `MTLCommandBuffer` (output only) |
| `baseAddress` | CPU pointer to pixel data |
| `bytesPerRow` | Row stride for CPU access |
| `region` | The `CGRect` being processed |
| `format` | Pixel format |

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.12+, Mac Catalyst 13.1+, tvOS 10.0+, visionOS 1.0+
- Abstract class; do not instantiate directly. All methods are class-level.
- Processors must be **stateless** — no per-invocation instance state.
- Core Image **cannot concatenate** processor kernels into fewer GPU passes (unlike `CIKernel`); use only when your algorithm cannot be expressed in CIKL or Metal shading language.

## Related

- [CIKernel](./cikernel.md)
- [CIColorKernel](./cicolorkernel.md)
- [CIImage](./ciimage.md)
- [CIContext](./cicontext.md)
