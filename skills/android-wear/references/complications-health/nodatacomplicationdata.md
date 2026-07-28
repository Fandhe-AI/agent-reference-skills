# NoDataComplicationData

Complication data type that can be sent by any complication data source, regardless of its configured type, when it has no data to display.

## Signature / Usage

```kotlin
public class NoDataComplicationData internal constructor(
    public val placeholder: ComplicationData?,
    public val invalidatedData: ComplicationData?,
    // ...extras
) : ComplicationData
```

```kotlin
// Without a placeholder
NoDataComplicationData()

// With a placeholder shown while real data loads
NoDataComplicationData(placeholder = shortTextPlaceholder)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `ComplicationData?` | `null` | Optional data rendered as a loading placeholder while the real value is unavailable. |
| `invalidatedData` | `ComplicationData?` | `null` | Internal reference to the data this `NoDataComplicationData` invalidated, if applicable. |

## Notes

- Return this from `onComplicationRequest` when the data source has no data to display for the requested type.
- Package: `androidx.wear.watchface.complications.data`. Artifact: `androidx.wear.watchface:watchface-complications-data`.

## Related

- [ComplicationDataSourceService](./complicationdatasourceservice.md)
