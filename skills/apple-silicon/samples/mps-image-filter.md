# MPS Image Filter with In-Place Fallback

Encode a built-in `MPSImageGaussianBlur` kernel into a command buffer, letting it try to run in place and falling back to a fresh texture through a copy allocator when in-place isn't possible.

```swift
import MetalPerformanceShaders

// Called by the filter only if it cannot safely blur `texture` in place
// (e.g. the source is immutable, or edge handling needs extra texels);
// it must return a new texture of matching size and format.
let myAllocator: MPSCopyAllocator = { kernel, buffer, texture in
    let descriptor = MTLTextureDescriptor.texture2DDescriptor(
        pixelFormat: texture.pixelFormat,
        width: texture.width,
        height: texture.height,
        mipmapped: false)

    return buffer.device.makeTexture(descriptor: descriptor)!
}

// Blur `texture` in place if possible on `queue`, returning the (possibly
// reallocated) texture that now holds the blurred result.
func blurTextureInPlace(_ texture: inout MTLTexture, blurRadius: Float, queue: MTLCommandQueue) {
    let commandBuffer = queue.makeCommandBuffer()!

    let blur = MPSImageGaussianBlur(device: queue.device, sigma: blurRadius)

    // MPS kernels don't need a dedicated command buffer or compute
    // encoder of their own — they can be grouped with other work on an
    // existing buffer/encoder, unlike a hand-written compute pipeline
    // which must be set on the encoder before dispatch.
    blur.encode(commandBuffer: commandBuffer, inPlaceTexture: &texture, fallbackCopyAllocator: myAllocator)

    commandBuffer.commit()
    commandBuffer.waitUntilCompleted()
}
```

## Notes

- MPSGraph is a GPU compute graph API, not the Core ML model runtime covered by the separate apple-ml skill (this sample uses the older, non-graph MPS image-kernel API, `MPSImageGaussianBlur`, which predates MPSGraph).
- Passing a `fallbackCopyAllocator` (Swift) / `copyAllocator:` (Objective-C) means the call site doesn't need to know whether the filter actually ran in place — it always gets back a valid, blurred texture.
- Derived from the code listings on developer.apple.com/documentation/metalperformanceshaders/image-filters ("Image Filters").
