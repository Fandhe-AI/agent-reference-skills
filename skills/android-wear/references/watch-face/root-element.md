# WatchFace (Root Element)

`<WatchFace>` is the required root element of `res/raw/watchface.xml`, defining the coordinate space of the watch face.

## Signature / Usage

```xml
<WatchFace width="450" height="450">
    <Scene>
        <!-- content -->
    </Scene>
</WatchFace>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | int | — | Width of the coordinate space (not actual device pixels; scaled to fit the device). |
| `height` | int | — | Height of the coordinate space (not actual device pixels; scaled to fit the device). |
| `clipShape` | enum | — | Clipping shape applied to the watch face (e.g. matching a `CIRCLE` device shape declared in `watch_face_shapes.xml`). |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Must contain a single `<Scene>` child; see [scene-and-parts](./scene-and-parts.md).
- For devices with multiple physical shapes, declare one `<WatchFace>` per shape in `res/xml/watch_face_shapes.xml` and reference separate `res/raw/*.xml` files via the `file` attribute (see [setup](./setup.md)).

## Related

- [setup](./setup.md)
- [scene-and-parts](./scene-and-parts.md)
