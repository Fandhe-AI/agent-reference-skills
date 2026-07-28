# SmallImageComplicationData

Complication data type that shows a small, full-color image (as opposed to the tintable single-color `MonochromaticImage`).

## Signature / Usage

```kotlin
public class SmallImageComplicationData internal constructor(
    public val smallImage: SmallImage?,
    // ...tapAction, validTimeRange, persistencePolicy, displayPolicy, extras
) : ComplicationData

public class Builder(
    private val smallImage: SmallImage,
    private val contentDescription: ComplicationText,
) : BaseBuilder<Builder, SmallImageComplicationData>()
```

```kotlin
SmallImageComplicationData.Builder(
    smallImage = SmallImage.Builder(icon, SmallImageType.PHOTO).build(),
    contentDescription = PlainComplicationText.Builder("Weather icon").build(),
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `smallImage` | `SmallImage?` | required | Small colored image, with an associated `SmallImageType` (`PHOTO` or `ICON`). |
| `contentDescription` | `ComplicationText` | required | Accessibility description; passed via the `Builder` constructor. |
| `tapAction` | `PendingIntent?` | `null` | Set via `Builder.setTapAction`; fired when the user taps the rendered complication. |

## Notes

- Declared in the manifest's `SUPPORTED_TYPES` metadata as `SMALL_IMAGE`.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [MonochromaticImageComplicationData](./monochromaticimagecomplicationdata.md)
- [ComplicationDataSourceService](./complicationdatasourceservice.md)
