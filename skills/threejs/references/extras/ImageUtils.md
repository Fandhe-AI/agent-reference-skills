# ImageUtils

Utility functions for images.

## Signature / Usage

```js
ImageUtils.getDataURL( image : HTMLImageElement | HTMLCanvasElement, type : string ) : string
ImageUtils.sRGBToLinear( image : HTMLImageElement | HTMLCanvasElement | ImageBitmap | Object ) : HTMLCanvasElement | Object
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `image` | HTMLImageElement \| HTMLCanvasElement (`sRGBToLinear` also ImageBitmap \| Object) | — | The image object |
| `type` | string | `'image/png'` | Image format for `getDataURL` |

## Methods

- `getDataURL(image, type)`: returns a data URI containing a representation of the given image.
- `sRGBToLinear(image)`: converts the given sRGB image data to linear color space and returns the converted image.

## Notes

- Source: https://threejs.org/docs/pages/ImageUtils.html (three.js r186, `src/extras/ImageUtils.js`)

## Related

- [DataUtils](./DataUtils.md)
- [TextureUtils](./TextureUtils.md)
