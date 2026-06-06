# VideoTexture

Creates a texture from an HTML `<video>` element, updating automatically as video frames advance. Extends `Texture`.

## Signature / Usage

```js
const video = document.getElementById('video');
const texture = new THREE.VideoTexture(video);
const material = new THREE.MeshBasicMaterial({ map: texture });
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `video` | HTMLVideoElement | — | The video element to use as texture source |
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
| `generateMipmaps` | boolean | `false` | Mipmap generation (overrides Texture default) |
| `isVideoTexture` | boolean (readonly) | `true` | Type-testing flag |

## Methods

| Signature | Description |
|-----------|-------------|
| `.update()` | Called automatically by the renderer; sets `needsUpdate = true` when a new frame is available. Only relevant when `requestVideoFrameCallback` is unsupported. |

## Notes

- When using `WebGPURenderer`, set `colorSpace = THREE.SRGBColorSpace`.
- After initial use, texture dimensions, format, and type cannot be changed.
- For manual per-frame control (e.g. WebCodecs), use `VideoFrameTexture` instead.

## Related

- [Texture](./Texture.md)
- [VideoFrameTexture](./VideoFrameTexture.md)
- [CanvasTexture](./CanvasTexture.md)
