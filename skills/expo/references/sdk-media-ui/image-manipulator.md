---
source: https://docs.expo.dev/versions/v58.0.0/sdk/imagemanipulator/
---

# ImageManipulator

`expo-image-manipulator` provides an API to modify images stored on the local file system (rotate, flip, resize, crop, extent).

## Signature / Usage

```sh
npx expo install expo-image-manipulator
```

Rotates 90 degrees clockwise, flips vertically, and saves as PNG:

```jsx
import { FlipType, SaveFormat, useImageManipulator } from 'expo-image-manipulator';

const context = useImageManipulator(imageUri);

const rotate90andFlip = async () => {
  context.rotate(90).flip(FlipType.Vertical);
  const renderedImage = await context.renderAsync();
  const result = await renderedImage.saveAsync({
    format: SaveFormat.PNG,
  });
  setImageUri(result.uri);
};
```

```js
import * as ImageManipulator from 'expo-image-manipulator';
```

- `useImageManipulator(source: string | SharedRef<'image'>, options?: ImageLoadOptions): ImageManipulatorContext`
- `ImageManipulator.manipulate(source, options?): ImageManipulatorContext` loads an image from the URI and creates a new manipulation context.
- `ImageManipulatorContext` (extends `SharedObject`): synchronous, chainable functions that schedule transformations on a background thread. Use `renderAsync` to await all transformations.
- `ImageRef` (extends `SharedRef<'image'>`): reference to a native image instance.

## Options / Props

### ImageManipulatorContext methods

All support Android, iOS, tvOS, Web unless noted. All but `renderAsync` return `ImageManipulatorContext`.

| Method | Parameters | Description |
| --- | --- | --- |
| crop(rect) | `{ height: number, originX: number, originY: number, width: number }` | Crops to the rectangle (top-left corner and dimensions). |
| extent(options) (Web only) | `{ backgroundColor: string \| null, height: number, originX: number, originY: number, width: number }` | Sets image size and offset. If enlarged, unfilled areas use `backgroundColor`; position with `originX` / `originY`. |
| flip(flipType) | `'vertical' \| 'horizontal'` | Flips the image. Only one flip per transformation; use two for both axes. |
| renderAsync() | — | Awaits all manipulation tasks; returns `Promise<ImageRef>`. |
| reset() | — | Resets the context to the originally loaded image. |
| resize(size) | `{ height: number \| null, width: number \| null }` | Resizes to the given size. If only one value is given, the other is computed to preserve ratio. |
| rotate(degrees) | `number` | Clockwise for positive, counter-clockwise for negative. |

### ImageRef

| Name | Type | Description |
| --- | --- | --- |
| height | `number` | Height of the image. |
| width | `number` | Width of the image. |
| nativeRefType | `string` | The type of the native reference. |
| saveAsync(options?) | `(SaveOptions) => Promise<ImageResult>` | Saves the image to the file system in the cache directory. |

### ImageLoadOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| maxHeight | `number` | — | Decode so the source does not exceed this height in pixels, preserving aspect ratio. Large images are downsampled while decoding, reducing peak memory and avoiding out-of-memory crashes. |
| maxWidth | `number` | — | Same as `maxHeight`, for width. |

### SaveOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| base64 | `boolean` | — | Also include the image data in Base64. |
| compress | `number` | — | `0.0` - `1.0`. `1` means no compression (highest quality), `0` the highest compression. |
| format | `SaveFormat` | `SaveFormat.JPEG` | Compression type and result extension. PNG is lossless but slower; JPEG is faster with visible artifacts. |

### ImageResult

| Name | Type | Description |
| --- | --- | --- |
| uri | `string` | URI to the modified image (usable as source for `Image` / `Video`). |
| width | `number` | Width of the image or video. |
| height | `number` | Height of the image or video. |
| base64 | `string` | Included if the `base64` save option was truthy; JPEG/PNG data in Base64. Prepend `'data:image/xxx;base64,'` (`jpeg` or `png`) for a data URI. |

### Enums

- `FlipType`: `Horizontal = "horizontal"`, `Vertical = "vertical"`.
- `SaveFormat`: `JPEG = "jpeg"`, `PNG = "png"`, `WEBP = "webp"`.

### Deprecated API

`ImageManipulator.manipulateAsync(uri: string, actions?: Action[], saveOptions?: SaveOptions): Promise<ImageResult>` — `actions` defaults to `[]`, `saveOptions` to `{}`. `uri` must be local or a base64 data URI. Each invocation creates a new file; each `Action` object should have only one of the keys. `Action` is a union of `ActionResize` (`{ resize: { height, width } }`), `ActionRotate` (`{ rotate: number }`), `ActionFlip` (`{ flip: FlipType }`), `ActionCrop` (`{ crop: { height, originX, originY, width } }`), `ActionExtent` (`{ extent: {...} }`, Web only).

## Notes

- Platforms: Android, iOS, tvOS, Web, included in Expo Go. Source `https://github.com/expo/expo/tree/sdk-58/packages/expo-image-manipulator`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- Deprecated: `manipulateAsync` "has been replaced by the new, contextual and object-oriented API. Use `ImageManipulator.manipulate` or `useImageManipulator` instead."
- `manipulateAsync` note: overwriting the source file has no visible effect because images are cached.

## Related

- [ImagePicker](./image-picker.md)
- [Image](./image.md)
