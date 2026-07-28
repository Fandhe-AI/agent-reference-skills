# Complication Slots (ComplicationSlot, Complication)

`<ComplicationSlot>` reserves a region of the watch face where a system or app-provided complication renders; `<Complication>` defines how a given complication data type is drawn within that slot.

## Signature / Usage

```xml
<ComplicationSlot slotId="1" supportedTypes="SHORT_TEXT SMALL_IMAGE EMPTY" x="100" y="100" width="100" height="100">
    <BoundingOval x="0" y="0" width="100" height="100" />
    <DefaultProviderPolicy defaultSystemProvider="STEP_COUNT" defaultSystemProviderType="SHORT_TEXT" />
    <Complication type="SHORT_TEXT">
        <PartText x="0" y="0" width="100" height="100">
            <Text><Font size="32"><Template><![CDATA[%s]]><Parameter expression="[COMPLICATION.TEXT]" /></Template></Font></Text>
        </PartText>
    </Complication>
</ComplicationSlot>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ComplicationSlot.slotId` | string | — | Unique identifier for the slot. |
| `ComplicationSlot.supportedTypes` | space-separated enum list | — | Complication types the slot can render, e.g. `SHORT_TEXT`, `SMALL_IMAGE`, `EMPTY`, `RANGED_VALUE`, `GOAL_PROGRESS`. |
| `ComplicationSlot.x` / `y` / `width` / `height` | int | — | Slot position and size. |
| `BoundingOval` / `BoundingRectangle` / `BoundingArc` | element | — | Defines the rendering bounds shape within the slot. |
| `Complication.type` | enum | — | The complication data type being rendered inside this variant. |
| `DefaultProviderPolicy.defaultSystemProvider` | string | — | System provider used before the user picks one, e.g. `STEP_COUNT`, `WATCH_BATTERY`. |
| `DefaultProviderPolicy.defaultSystemProviderType` | enum | — | Complication type for the default system provider. |
| `[COMPLICATION.TEXT]` / `[COMPLICATION.SMALL_IMAGE]` / `[COMPLICATION.VALUE]` / `[COMPLICATION.TARGET_VALUE]` | data source | — | Access complication data within the slot's rendering elements. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills. It covers the watch face's **placement/rendering** side of complications; the data-providing side (`ComplicationDataSourceService`) is documented in this skill's `complications-health` category.
- `GOAL_PROGRESS` and `WEIGHTED_ELEMENTS` complication types, and the heart-rate system data source, were added in WFF v2.
- `<Flavors>` can override a slot's `<DefaultProviderPolicy>` per preset (see [user-configurations](./user-configurations.md)).

## Related

- [expressions](./expressions.md)
- [user-configurations](./user-configurations.md)
