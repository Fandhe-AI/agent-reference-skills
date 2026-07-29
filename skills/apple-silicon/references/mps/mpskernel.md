# MPSKernel

A standard interface for Metal Performance Shaders kernels. Every MPS operation (image filter, matrix routine, neural-network layer, MPSGraph operation) is ultimately encoded onto a `MTLCommandBuffer` through a subclass of `MPSKernel`, which stores the `MTLDevice` and shared encode options (`options`, `label`).

## Signature / Usage

```swift
let device = MTLCreateSystemDefaultDevice()!
let filter = MPSImageGaussianBlur(device: device, sigma: 3.0) // MPSKernel subclass
filter.options = [.skipZeroSizeImages]

let commandBuffer = commandQueue.makeCommandBuffer()!
filter.encode(commandBuffer: commandBuffer, sourceTexture: srcTexture, destinationTexture: dstTexture)
commandBuffer.commit()
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `device` | `MTLDevice` | — | GPU the kernel was created for; kernels cannot be reused across devices |
| `options` | `MPSKernelOptions` | `.none` | Bitmask controlling padding, zero-size skipping, and internal buffer allocation |
| `label` | `String?` | `nil` | Debug label surfaced in GPU frame capture |

## Notes

- `MPSCommandBuffer` wraps `MTLCommandBuffer` to let MPS kernels reuse temporary resources (`MPSTemporaryImage`, `MPSTemporaryMatrix`, `MPSTemporaryNDArray`) safely across multiple encode calls within the same buffer.
- `MPSSupportsMTLDevice(_:)` checks whether a given `MTLDevice` supports MPS before creating any kernel — call it once at startup rather than per-kernel.
- "Tuning Hints" (official article) documents `MPSKernel.options`, threadgroup sizing hints, and heap-based temporary-resource reuse for reducing allocation overhead across frames.
- Available since iOS/tvOS 9.0, macOS 10.13, visionOS 1.0 (per `MPSKernel` platform metadata).
- This page covers the MPS kernel abstraction itself, not Metal's own command-encoding classes (`MTLCommandBuffer`, `MTLComputeCommandEncoder`) — those are covered by the apple-graphics skill.

## Related

- [MPSImage](./mpsimage.md)
- [image-filters](./image-filters.md)
- [MPSMatrix](./mpsmatrix.md)
