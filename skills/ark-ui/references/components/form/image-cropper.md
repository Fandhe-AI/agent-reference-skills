# Image Cropper

Crop and transform images with zoom, rotation, and aspect ratio controls.

## Anatomy

- `Root` — container element
- `Viewport` — display area for the image
- `Image` — the `<img>` element being cropped
- `Selection` — the crop area boundary
- `Handle` — resize handles on the selection
- `Grid` — visual guide lines (horizontal/vertical axis options)

## Signature / Usage

```tsx
import { ImageCropper } from '@ark-ui/react/image-cropper'

<ImageCropper.Root>
  <ImageCropper.Viewport>
    <ImageCropper.Image src="/photo.jpg" />
    <ImageCropper.Selection>
      <ImageCropper.Handle />
      <ImageCropper.Grid />
    </ImageCropper.Selection>
  </ImageCropper.Viewport>
</ImageCropper.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `aspectRatio` | `number` | Maintains width/height ratio (e.g. `16/9`) |
| `cropShape` | `'circle' \| 'rectangle'` | Shape of the crop selection |
| `zoom` / `maxZoom` / `minZoom` | `number` | Control magnification levels |
| `rotation` | `number` | Image rotation in degrees |
| `flip` | `object` | Horizontal/vertical flip options |
| `initialCrop` | `object` | Pre-defined crop area coordinates |
| `fixedCropArea` | `boolean` | Locks crop area while image pans underneath |

## Notes

- Drag handles to resize; drag inside the selection to pan the image
- Keyboard arrow keys support nudging with modifier keys (Shift/Ctrl)
- `getCroppedImage()` returns the cropped result as a Blob or data URL; `reset()` restores initial state
- `api.setCrop(rect)` (5.39.3) places the crop area programmatically, in viewport coordinates. The rect is constrained like `initialCrop`, and unlike `api.reset()` it keeps the current zoom, rotation, flip, and pan.
- `getCropData()` returns the exact `corners` and `outputSize` of the crop in natural-image pixels (5.38.0), so the region can be handed to a server-side cropper.
- `getCroppedImage({ maxSize })` (5.38.0) caps the output dimensions; the crop keeps its aspect ratio and scales down to fit: `await imageCropper.getCroppedImage({ maxSize: { width: 512, height: 512 } })`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Color Picker](./color-picker.md)
