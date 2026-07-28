# Time Elements (DigitalClock, AnalogClock, Hands)

Elements for rendering the current time: `<DigitalClock>`/`<TimeText>` for digital displays, `<AnalogClock>` with `<HourHand>`/`<MinuteHand>`/`<SecondHand>` for analog dials.

## Signature / Usage

```xml
<DigitalClock x="125" y="50" width="200" height="50">
    <TimeText x="0" y="0" width="200" height="50" format="hh:mm">
        <Font family="SYNC_TO_DEVICE" size="16" />
    </TimeText>
</DigitalClock>

<AnalogClock x="0" y="0" width="450" height="450">
    <HourHand resource="hour" x="220" y="55" width="20" height="190" pivotX="0.5" pivotY="0.9210" />
    <MinuteHand resource="minute" x="222" y="30" width="16" height="220" pivotX="0.5" pivotY="0.9" />
    <SecondHand resource="second" x="226" y="20" width="8" height="245" pivotX="0.5" pivotY="0.8571" />
</AnalogClock>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `TimeText.format` | string | — | Time format string, e.g. `"hh:mm"`. |
| `DigitalClock.x` / `y` / `width` / `height` | int | — | Bounding box of the digital clock. |
| `Localization.timeZone` | string | device zone | Child of `DigitalClock`; overrides displayed time zone (e.g. `"Europe/London"`) for world-clock faces. |
| `HourHand`/`MinuteHand`/`SecondHand`.`resource` | string | — | Drawable resource used to render the hand. |
| `*Hand.x` / `y` / `width` / `height` | int | — | Position and size of the hand image. |
| `*Hand.pivotX` / `pivotY` | float (0-1) | — | Rotation pivot as a ratio of the hand's width/height (pivot height ÷ full height). |
| `AnalogClock.tintColor` / `*Hand.tintColor` | color / expression | — | Uniform or per-hand tint, can reference `[CONFIGURATION.*]`. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- `DigitalClock`/`TimeText` is the preferred container for clock digits; use plain `PartText` for other text (see [text](./text.md)).
- Per-hand `tintColor="[CONFIGURATION.handColors.0]"` binds hand color to a `ColorConfiguration` (see [user-configurations](./user-configurations.md)).

## Related

- [text](./text.md)
- [user-configurations](./user-configurations.md)
- [expressions](./expressions.md)
