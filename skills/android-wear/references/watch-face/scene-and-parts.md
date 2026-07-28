# Scene, Group, and Part Elements

`<Scene>` is the top-level container of drawable content inside `<WatchFace>`. `<Group>` organizes child elements into a logical unit for shared transforms/variants; `<PartDraw>`, `<PartText>`, and `<PartImage>` are the leaf containers that render shapes, text, and images respectively.

## Signature / Usage

```xml
<Scene>
    <Group name="decorations" x="100" y="100" width="200" height="200">
        <PartText x="0" y="0" width="50" height="50">
            <Text><Font family="SYNC_TO_DEVICE" size="16" color="#FF00FF"><![CDATA[12]]></Font></Text>
        </PartText>
    </Group>
</Scene>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Group.name` | string | — | Identifier for the group. |
| `Group.x` / `y` / `width` / `height` | int | — | Position and size of the group's bounding box. |
| `PartDraw.x` / `y` / `width` / `height` | int | — | Bounding box for shape drawing content (see [shapes](./shapes.md)). |
| `PartText.x` / `y` / `width` / `height` | int | — | Bounding box for text content (see [text](./text.md)). |
| `PartImage.x` / `y` / `width` / `height` | int | — | Bounding box for image content (see [images](./images.md)). |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- `<Group>` accepts `<Variant>` and `<Transform>` children applied to the whole group instead of each child individually — useful for ambient-mode visibility (see [ambient-mode](./ambient-mode.md)) and rotation (see [transform](./transform.md)).
- `<Group>` also supports `renderMode`, `blendMode`, and `tintColor` for masking/blending/tinting all children at once (see [effects](./effects.md)).
- `angle` on `<Group>` rotates the group's content, commonly used to lay out repeated elements (e.g. hour markers) around a center point.

## Related

- [shapes](./shapes.md)
- [text](./text.md)
- [images](./images.md)
- [transform](./transform.md)
- [effects](./effects.md)
