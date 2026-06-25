# CIContext

An evaluation context for rendering `CIImage` objects using Metal, OpenGL, or CPU. The context manages color space conversion, GPU resources, and the actual rendering pipeline. Create one context per view or background task and reuse it.

## Signature / Usage

```swift
// Metal-based context (recommended)
let device = MTLCreateSystemDefaultDevice()!
let context = CIContext(mtlDevice: device)

// Render to CGImage for display
let cgImage = context.createCGImage(ciImage, from: ciImage.extent)!
let uiImage = UIImage(cgImage: cgImage)

// Render to CVPixelBuffer (e.g., for video)
context.render(ciImage, to: pixelBuffer, bounds: ciImage.extent, colorSpace: colorSpace)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(mtlDevice: MTLDevice, options:)` | Metal GPU context (recommended) |
| `init(mtlCommandQueue: MTLCommandQueue, options:)` | Metal context sharing a command queue |
| `init(cgContext: CGContext, options:)` | Quartz 2D context |
| `init(options:)` | Default context (system-chosen backend) |

### Rendering Methods

| Method | Description |
|--------|-------------|
| `createCGImage(_:from:)` | Render to a new CGImage |
| `createCGImage(_:from:format:colorSpace:deferred:)` | Render with explicit format and color space |
| `render(_:toBitmap:rowBytes:bounds:format:colorSpace:)` | Render to raw bitmap memory |
| `render(_:to: MTLTexture, commandBuffer:bounds:colorSpace:)` | Render into a Metal texture |
| `render(_:to: CVPixelBuffer, bounds:colorSpace:)` | Render into a CVPixelBuffer |
| `draw(_:in:from:)` | Draw into the current CGContext |

### Export Methods

| Method | Description |
|--------|-------------|
| `jpegRepresentation(of:colorSpace:options:)` | Encode as JPEG Data |
| `pngRepresentation(of:format:colorSpace:options:)` | Encode as PNG Data |
| `heifRepresentation(of:format:colorSpace:options:)` | Encode as HEIF Data |
| `writeJPEGRepresentation(of:to:colorSpace:options:)` | Write JPEG to URL |
| `writePNGRepresentation(of:to:format:colorSpace:options:)` | Write PNG to URL |

### Resource Management

| Method / Property | Description |
|-------------------|-------------|
| `clearCaches()` | Free cached data and run garbage collection |
| `reclaimResources()` | Reclaim internal GPU/CPU resources |
| `workingColorSpace` | The context's working color space |
| `workingFormat` | The context's working pixel format |

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Immutable and thread-safe; multiple threads can render using the same context simultaneously.
- Automatically color-matches inputs from their color space into the working space, and outputs from the working space to the destination space.
- Do not create many CIContext instances; one per view or background task is the guideline.

## Related

- [CIImage](./ciimage.md)
- [CIFilter](./cifilter.md)
- [CIKernel](./cikernel.md)
