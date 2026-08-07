# CIRenderDestination

A specification for configuring all attributes of a render task's destination and issuing asynchronous render tasks. Provides an API for buffer format, alpha mode, clamping, blending, and color space — properties formerly tied to `CIContext`.

## Signature / Usage

```swift
let destination = CIRenderDestination(mtlTexture: texture, commandBuffer: commandBuffer)
destination.colorSpace = CGColorSpaceCreateDeviceRGB()
let task = try context.startTask(toRender: image, to: destination)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(pixelBuffer:)` | Creates a render destination based on a Core Video pixel buffer |
| `init(ioSurface:)` | Creates a render destination based on an `IOSurface` object |
| `init(mtlTexture:commandBuffer:)` | Creates a render destination based on a Metal texture |
| `init(width:height:pixelFormat:commandBuffer:mtlTextureProvider:)` | Creates a render destination based on a Metal texture with a specified pixel format |
| `init(glTexture:target:width:height:)` | Creates a render destination based on an OpenGL texture |
| `init(bitmapData:width:height:bytesPerRow:format:)` | Creates a render destination based on a client-managed buffer |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `alphaMode` | `CIRenderDestinationAlphaMode` | The destination's representation of alpha (transparency) values |
| `blendKernel` | `CIBlendKernel?` | The destination's blend kernel |
| `blendsInDestinationColorSpace` | `Bool` | Whether to blend in the destination's color space |
| `colorSpace` | `CGColorSpace?` | The destination's color space |
| `width` | `Int` | The render destination's row width |
| `height` | `Int` | The render destination's buffer height |
| `isClamped` | `Bool` | Whether the destination clamps |
| `isDithered` | `Bool` | Whether the destination dithers |
| `isFlipped` | `Bool` | Whether the destination is flipped |
| `captureTraceURL` | `URL?` | Tells the next render using this destination to capture a Metal trace |

## Notes

- iOS 11.0+, iPadOS 11.0+, macOS 10.13+, Mac Catalyst 13.1+, tvOS 11.0+, visionOS 1.0+
- Renders return to the caller as soon as the CPU has issued the task (not after the GPU finishes), so subsequent frames can start without waiting.
- A single `CIRenderDestination` can be reused across renders by mutating properties (e.g. color space, blend mode) between renders.

## Related

- [CIContext](./cicontext.md)
- [CIBlendKernel](./ciblendkernel.md)
