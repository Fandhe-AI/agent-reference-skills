# MPSImage

A texture that may have more than four channels, used to move image and feature-map data between MPS image filters and CNN kernels. Unlike a plain `MTLTexture`, an `MPSImage` can pack more than 4 feature channels by allocating an array of 2D texture slices internally.

## Signature / Usage

```swift
let descriptor = MPSImageDescriptor(channelFormat: .unorm8, width: 256, height: 256, featureChannels: 32)
let image = MPSImage(device: device, imageDescriptor: descriptor)

// Or wrap an existing MTLTexture directly:
let wrapped = MPSImage(texture: mtlTexture, featureChannels: 4)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `featureChannels` | `Int` | from descriptor | Number of channels stored per pixel; > 4 spills into additional texture-array slices |
| `numberOfImages` | `Int` | `1` | Batch size — number of images stacked in this `MPSImage` |
| `texture` | `MTLTexture` | — | Underlying Metal texture (for `featureChannels <= 4`, this is a plain 2D texture) |

## Notes

- `MPSTemporaryImage` is the short-lived counterpart: it is valid only for the lifetime of the `MPSCommandBuffer` that created it and lets MPS reuse GPU memory across a filter chain without explicit allocation, at the cost of being invalid to read back on the CPU after the buffer completes.
- `init(parentImage:sliceRange:featureChannels:)` creates a view over a subset of another `MPSImage`'s feature channels/images without copying.
- Available since iOS/tvOS 10.0, macOS 10.13, visionOS 1.0.
- Distinct from Core Image's `CIImage`/`CIFilter` pipeline (apple-graphics skill) — `MPSImage` is a raw multi-channel GPU buffer for MPS/CNN kernels, not a filter-graph node with color-management semantics.

## Related

- [MPSKernel](./mpskernel.md)
- [image-filters](./image-filters.md)
- [cnn-kernels](./cnn-kernels.md)
