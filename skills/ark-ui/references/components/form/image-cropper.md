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
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Color Picker](./color-picker.md)
