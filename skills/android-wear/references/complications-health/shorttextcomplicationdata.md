# ShortTextComplicationData

Complication data type whose primary content is a short piece of text, expected to be no more than seven characters in length.

## Signature / Usage

```kotlin
public class ShortTextComplicationData internal constructor(
    public val text: ComplicationText,
    public val title: ComplicationText?,
    public val monochromaticImage: MonochromaticImage?,
    public val smallImage: SmallImage?,
    // ...tapAction, validTimeRange, persistencePolicy, displayPolicy, extras
) : ComplicationData

public class Builder(
    private val text: ComplicationText,
    private val contentDescription: ComplicationText,
) : BaseBuilder<Builder, ShortTextComplicationData>()
```

```kotlin
ShortTextComplicationData.Builder(
    text = PlainComplicationText.Builder("72°").build(),
    contentDescription = PlainComplicationText.Builder("Temperature").build(),
)
    .setTapAction(pendingIntent)
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `ComplicationText` | required | Primary short text, expected no more than 7 characters. |
| `contentDescription` | `ComplicationText` | required | Accessibility description; passed via the `Builder` constructor alongside `text`. |
| `title` | `ComplicationText?` | `null` | Optional short title shown alongside the text. Set via `Builder.setTitle`. |
| `monochromaticImage` | `MonochromaticImage?` | `null` | Optional single-color icon. Set via `Builder.setMonochromaticImage`. |
| `smallImage` | `SmallImage?` | `null` | Optional small colored image. Set via `Builder.setSmallImage`. |
| `tapAction` | `PendingIntent?` | `null` | Set via `Builder.setTapAction`; fired when the user taps the rendered complication. |

## Notes

- Declared in the manifest's `SUPPORTED_TYPES` metadata as `SHORT_TEXT`.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [ComplicationDataSourceService](./complicationdatasourceservice.md)
- [LongTextComplicationData](./longtextcomplicationdata.md)
- [ComplicationText](./complicationtext.md)
