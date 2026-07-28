# MonochromaticImageComplicationData

Complication data type for a single-color image that watch faces can tint according to their own styling.

## Signature / Usage

```kotlin
public class MonochromaticImageComplicationData internal constructor(
    public val monochromaticImage: MonochromaticImage,
    // ...tapAction, validTimeRange, persistencePolicy, displayPolicy, extras
) : ComplicationData

public class Builder(
    private val monochromaticImage: MonochromaticImage,
    private val contentDescription: ComplicationText,
) : BaseBuilder<Builder, MonochromaticImageComplicationData>()
```

```kotlin
MonochromaticImageComplicationData.Builder(
    monochromaticImage = MonochromaticImage.Builder(icon).build(),
    contentDescription = PlainComplicationText.Builder("Alarm set").build(),
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `monochromaticImage` | `MonochromaticImage` | required | Single-color icon (preferably a vector drawable) tintable by the watch face. |
| `contentDescription` | `ComplicationText` | required | Accessibility description; passed via the `Builder` constructor. |
| `tapAction` | `PendingIntent?` | `null` | Set via `Builder.setTapAction`; fired when the user taps the rendered complication. |

## Notes

- Declared in the manifest's `SUPPORTED_TYPES` metadata as `MONOCHROMATIC_IMAGE`.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [SmallImageComplicationData](./smallimagecomplicationdata.md)
- [ComplicationDataSourceService](./complicationdatasourceservice.md)
