# RangedValueComplicationData

Complication data type for a numerical value within a range, such as a percentage or a battery/goal gauge.

## Signature / Usage

```kotlin
public class RangedValueComplicationData internal constructor(
    public val value: Float,
    public val min: Float,
    public val max: Float,
    public val monochromaticImage: MonochromaticImage?,
    public val smallImage: SmallImage?,
    public val title: ComplicationText?,
    public val text: ComplicationText?,
    public val colorRamp: ColorRamp?,
    @RangedValueType public val valueType: Int,
    // ...tapAction, validTimeRange, persistencePolicy, displayPolicy, extras
) : ComplicationData

public class Builder(
    private val value: Float,
    private val min: Float,
    private val max: Float,
    private val contentDescription: ComplicationText,
) : BaseBuilder<Builder, RangedValueComplicationData>()
```

```kotlin
RangedValueComplicationData.Builder(
    value = 8500f,
    min = 0f,
    max = 10000f,
    contentDescription = PlainComplicationText.Builder("Daily steps").build(),
)
    .setText(PlainComplicationText.Builder("8.5k").build())
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Float` | required | Current value within `[min, max]`. |
| `min` | `Float` | required | Lower bound of the range. |
| `max` | `Float` | required | Upper bound of the range. |
| `contentDescription` | `ComplicationText` | required | Accessibility description; passed via the `Builder` constructor. |
| `title` / `text` | `ComplicationText?` | `null` | Optional label rendered alongside the value. Set via `Builder.setTitle` / `Builder.setText`. |
| `colorRamp` | `ColorRamp?` | `null` | Optional gradient used to render the ranged value. Set via `Builder.setColorRamp`. |
| `valueType` | `@RangedValueType Int` | `TYPE_UNDEFINED` | Semantic hint (e.g. rating, percentage) for how the value should be rendered. |

## Notes

- Declared in the manifest's `SUPPORTED_TYPES` metadata as `RANGED_VALUE`.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [ShortTextComplicationData](./shorttextcomplicationdata.md)
- [ComplicationDataSourceService](./complicationdatasourceservice.md)
