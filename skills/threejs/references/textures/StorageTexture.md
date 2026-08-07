# StorageTexture

A special texture type for use with compute shaders — computes and stores texture data directly via compute shaders. Extends `Texture`.

## Signature / Usage

```js
const texture = new THREE.StorageTexture( width, height );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `1` | The storage texture's width |
| `height` | number | `1` | The storage texture's height |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | Object | — | Image object representing the texture's dimensions (overrides `Texture.image`) |
| `isStorageTexture` | boolean (readonly) | `true` | Type-testing flag |
| `magFilter` | number | `LinearFilter` | Magnification filter (overrides `Texture.magFilter`) |
| `minFilter` | number | `LinearFilter` | Minification filter (overrides `Texture.minFilter`) |
| `mipmapsAutoUpdate` | boolean | `true` | When `true`, mipmaps auto-generate after compute writes; when `false`, mipmaps must be written manually via compute shaders |

## Methods

- `setSize( width, height )` — Sets the dimensions of the storage texture.

## Notes

- Only compatible with `WebGPURenderer` and a WebGPU backend.

## Related

- [Texture](./Texture.md)
