# Images (PartImage, Image, Images)

`<PartImage>` renders a single image via `<Image>`, or a set of conditionally-swapped images via `<Images>`.

## Signature / Usage

```xml
<PartImage x="0" y="0" width="450" height="450">
    <Image resource="watch_face_dial"/>
</PartImage>

<PartImage x="150" y="150" width="150" height="150">
    <Images change="ON_NEXT_HOUR">
        <Image resource="red"/>
        <Image resource="orange"/>
        <Image resource="green"/>
    </Images>
</PartImage>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PartImage.x` / `y` / `width` / `height` | int | — | Bounding box. |
| `Image.resource` | string | — | Drawable resource name (no file extension), from `res/drawable`. |
| `Images.change` | enum | — | Trigger for switching among child `<Image>` elements, e.g. `"ON_NEXT_HOUR"`. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- `PartImage` also supports `renderMode`, `blendMode`, and `tintColor` (see [effects](./effects.md)) and `<Transform>` / `<Variant>` children (see [transform](./transform.md)).
- For user-selectable photos instead of bundled drawables, use `<Photos>` (see [personalization-and-photos](./personalization-and-photos.md)).
- Full-screen background images should be sized to the display to avoid excess decompressed memory (see [memory-optimization](./memory-optimization.md)).

## Related

- [scene-and-parts](./scene-and-parts.md)
- [effects](./effects.md)
- [personalization-and-photos](./personalization-and-photos.md)
