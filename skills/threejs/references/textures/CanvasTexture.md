# CanvasTexture

Creates a texture from an HTML `<canvas>` element. Automatically sets `needsUpdate = true` on construction. Extends `Texture`.

## Signature / Usage

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// draw on ctx ...
const texture = new THREE.CanvasTexture(canvas);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `canvas` | HTMLCanvasElement | — | The canvas element to use as texture source |
| `mapping` | number | `Texture.DEFAULT_MAPPING` | Texture mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `LinearFilter` | Magnification filter |
| `minFilter` | number | `LinearMipmapLinearFilter` | Minification filter |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering samples |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isCanvasTexture` | boolean (readonly) | `true` | Type-testing flag |

## Notes

- After drawing on the canvas, set `texture.needsUpdate = true` to push the new content to the GPU.
- All other properties and methods are inherited from `Texture`.

## Related

- [Texture](./Texture.md)
- [VideoTexture](./VideoTexture.md)
- [HTMLTexture](./HTMLTexture.md)
