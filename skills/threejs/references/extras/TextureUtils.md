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
| `contain(texture, aspect)` | Scales the texture as large as possible within its surface without cropping or stretching, preserving aspect ratio. Akin to CSS `object-fit: contain`. `aspect` is the aspect ratio (width / height) of the surface the texture is displayed on; the image's own ratio is read from `texture.image`. |
| `cover(texture, aspect)` | Scales the texture to the smallest possible size to fill the surface with no empty space, preserving aspect ratio. Akin to CSS `object-fit: cover`. `aspect` is the aspect ratio (width / height) of the surface the texture is displayed on; the image's own ratio is read from `texture.image`. |
| `fill(texture)` | Configures the texture to the default transformation. Akin to CSS `object-fit: fill`. |
| `getByteLength(width, height, format, type)` | Determines how many bytes are needed to represent the texture. |

`contain`, `cover` and `fill` return the updated texture.

## Notes

- The official docs/JSDoc describe `aspect` as "The texture's aspect ratio", but the implementation compares it against `texture.image.width / texture.image.height`, so pass the display surface's aspect ratio (e.g. plane width / height or `camera.aspect` for a full-screen quad).
- Source: https://threejs.org/docs/pages/TextureUtils.html (three.js r186, `src/extras/TextureUtils.js`)

## Related

- [ImageUtils](./ImageUtils.md)
- [DataUtils](./DataUtils.md)
