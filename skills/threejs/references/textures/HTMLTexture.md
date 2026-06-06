# HTMLTexture

Creates a texture from any HTML element. Automatically sets `needsUpdate = true` on construction and listens for parent canvas paint events to trigger re-uploads. Extends `Texture`.

## Signature / Usage

```js
const div = document.getElementById('my-panel');
const texture = new THREE.HTMLTexture(div);
const material = new THREE.MeshBasicMaterial({ map: texture });
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `element` | HTMLElement | — | The HTML element to use as texture source |
| `mapping` | number | `Texture.DEFAULT_MAPPING` | Mapping mode |
| `wrapS` | number | `ClampToEdgeWrapping` | Horizontal wrapping |
| `wrapT` | number | `ClampToEdgeWrapping` | Vertical wrapping |
| `magFilter` | number | `LinearFilter` | Magnification filter |
| `minFilter` | number | `LinearMipmapLinearFilter` | Minification filter |
| `format` | number | `RGBAFormat` | Texture format |
| `type` | number | `UnsignedByteType` | Data type |
| `anisotropy` | number | `Texture.DEFAULT_ANISOTROPY` | Anisotropic filtering |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isHTMLTexture` | boolean (readonly) | `true` | Type-testing flag |

## Notes

- Unlike `CanvasTexture` (which takes a `<canvas>` element), `HTMLTexture` accepts any `HTMLElement`.
- Automatically triggers updates when the parent canvas repaints.

## Related

- [Texture](./Texture.md)
- [CanvasTexture](./CanvasTexture.md)
- [VideoTexture](./VideoTexture.md)
