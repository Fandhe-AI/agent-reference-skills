# LongTextComplicationData

Complication data type whose primary content is a longer piece of text, with no strict character limit (unlike `ShortTextComplicationData`).

## Signature / Usage

```kotlin
public class LongTextComplicationData internal constructor(
    public val text: ComplicationText,
    public val title: ComplicationText?,
    public val monochromaticImage: MonochromaticImage?,
    public val smallImage: SmallImage?,
    // ...tapAction, validTimeRange, persistencePolicy, displayPolicy, extras
) : ComplicationData

public class Builder(
    private val text: ComplicationText,
    private val contentDescription: ComplicationText,
) : BaseBuilder<Builder, LongTextComplicationData>()
```

```kotlin
LongTextComplicationData.Builder(
    text = PlainComplicationText.Builder("Next meeting: Design review at 3pm").build(),
    contentDescription = PlainComplicationText.Builder("Next event").build(),
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `ComplicationText` | required | Primary text content, no fixed length limit. |
| `contentDescription` | `ComplicationText` | required | Accessibility description; passed via the `Builder` constructor alongside `text`. |
| `title` | `ComplicationText?` | `null` | Optional title. Set via `Builder.setTitle`. |
| `monochromaticImage` | `MonochromaticImage?` | `null` | Optional single-color icon. Set via `Builder.setMonochromaticImage`. |
| `smallImage` | `SmallImage?` | `null` | Optional small colored image. Set via `Builder.setSmallImage`. |
| `tapAction` | `PendingIntent?` | `null` | Set via `Builder.setTapAction`; fired when the user taps the rendered complication. |

## Notes

- Declared in the manifest's `SUPPORTED_TYPES` metadata as `LONG_TEXT`.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [ShortTextComplicationData](./shorttextcomplicationdata.md)
- [ComplicationText](./complicationtext.md)
