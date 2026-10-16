# TextureUtils

Utility functions for textures, including CSS `object-fit`-like texture transforms.

## Signature / Usage

```js
TextureUtils.contain( texture : Texture, aspect : number ) : Texture
TextureUtils.cover( texture : Texture, aspect : number ) : Texture
TextureUtils.fill( texture : Texture ) : Texture
TextureUtils.getByteLength( width : number, height : number, format : number, type : number ) : number
```

## Methods

| Name | Description |
|------|-------------|
| `contain(texture, aspect)` | Scales the texture as large as possible within its surface without cropping or stretching, preserving aspect ratio. Akin to CSS `object-fit: contain`. `aspect` is the texture's aspect ratio. |
| `cover(texture, aspect)` | Scales the texture to the smallest possible size to fill the surface with no empty space, preserving aspect ratio. Akin to CSS `object-fit: cover`. |
| `fill(texture)` | Configures the texture to the default transformation. Akin to CSS `object-fit: fill`. |
| `getByteLength(width, height, format, type)` | Determines how many bytes are needed to represent the texture. |

`contain`, `cover` and `fill` return the updated texture.

## Notes

- Source: https://threejs.org/docs/pages/TextureUtils.html (three.js r186, `src/extras/TextureUtils.js`)

## Related

- [ImageUtils](./ImageUtils.md)
- [DataUtils](./DataUtils.md)
