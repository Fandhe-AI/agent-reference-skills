# PlainComplicationText / TimeDifferenceComplicationText

`ComplicationText` implementations used as the `text`/`title`/`contentDescription` of `ComplicationData` builders: static plain text, and text that renders a live time difference without polling.

## Signature / Usage

```kotlin
public class PlainComplicationText internal constructor(delegate: WireComplicationText) : ComplicationText {
    public class Builder(private var text: CharSequence) {
        public fun build(): PlainComplicationText
    }
}

public class TimeDifferenceComplicationText internal constructor(delegate: WireComplicationText) :
    ComplicationText by DelegatingComplicationText(delegate) {
    public class Builder private constructor(
        private val style: TimeDifferenceStyle,
        private val startInstant: Instant?,
        private val endInstant: Instant?,
    ) {
        // Builder(style, countUpTimeReference: CountUpTimeReference)
        // Builder(style, countDownTimeReference: CountDownTimeReference)
        public fun setDisplayAsNow(displayAsNow: Boolean): Builder
        public fun setMinimumTimeUnit(minimumUnit: TimeUnit): Builder
        public fun build(): TimeDifferenceComplicationText
    }
}
```

```kotlin
PlainComplicationText.Builder("72°").build()

TimeDifferenceComplicationText.Builder(
    style = TimeDifferenceStyle.STOPWATCH,
    countDownTimeReference = CountDownTimeReference(Instant.now().plus(1, ChronoUnit.HOURS)),
).build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `CharSequence` | required | Static string wrapped by `PlainComplicationText`. |
| `style` | `TimeDifferenceStyle` | required | Rendering style for `TimeDifferenceComplicationText` (e.g. `STOPWATCH`, `SHORT_DUAL_UNIT`). |
| `countUpTimeReference` / `countDownTimeReference` | `CountUpTimeReference` / `CountDownTimeReference` | one required | Reference instant the difference counts from/to. |
| `displayAsNow` | `Boolean` | style-dependent | Set via `Builder.setDisplayAsNow`; whether to show "now" near the reference instant. |
| `minimumTimeUnit` | `TimeUnit` | style-dependent | Set via `Builder.setMinimumTimeUnit`; smallest unit shown (e.g. minutes). |

## Notes

- `TimeFormatComplicationText` (not detailed here) similarly formats an absolute date/time without polling.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [ShortTextComplicationData](./shorttextcomplicationdata.md)
- [ComplicationDataSourceService](./complicationdatasourceservice.md)
