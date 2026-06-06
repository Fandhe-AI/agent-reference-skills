# VideoFrameTexture

Allows manual per-frame video data assignment, intended for use with the WebCodecs API. Extends `VideoTexture`.

## Signature / Usage

```js
const texture = new THREE.VideoFrameTexture();

// In your decode loop:
decoder.decode(chunk);
// When a VideoFrame is ready:
texture.setFrame(videoFrame);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mapping` | number | `Texture.DEFAULT_MAPPING` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `LinearFilter` | Magnification filter |
| `minFilter` | number | `LinearFilter` | Minification filter |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isVideoFrameTexture` | boolean (readonly) | `true` | Type-testing flag |

## Methods

| Signature | Description |
|-----------|-------------|
| `.setFrame(frame)` | Sets the current `VideoFrame` and marks texture for GPU update |
| `.update()` | Empty override; frame updates happen via `setFrame()` instead |

## Notes

- Use with the browser WebCodecs API (`VideoDecoder` / `VideoFrame`) for custom video decoding pipelines.
- Unlike `VideoTexture`, the renderer does not auto-update; you must call `setFrame()` each frame.

## Related

- [VideoTexture](./VideoTexture.md)
- [Texture](./Texture.md)
