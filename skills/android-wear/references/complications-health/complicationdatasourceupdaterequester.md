# ComplicationDataSourceUpdateRequester

Requests that the system immediately call back into a `ComplicationDataSourceService` for updated data, instead of waiting for the manifest's `UPDATE_PERIOD_SECONDS` poll interval.

## Signature / Usage

```kotlin
public interface ComplicationDataSourceUpdateRequester {
    public companion object {
        @JvmStatic
        public fun create(
            context: Context,
            complicationDataSourceComponent: ComponentName,
        ): ComplicationDataSourceUpdateRequester
    }

    public fun requestUpdateAll()
    public fun requestUpdate(vararg complicationInstanceIds: Int)
}
```

```kotlin
val updateRequester = ComplicationDataSourceUpdateRequester.create(
    context,
    ComponentName(context, MyComplicationDataSourceService::class.java),
)
updateRequester.requestUpdate(complicationId)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `Context` | required | Used to bind to the system's complication update service. |
| `complicationDataSourceComponent` | `ComponentName` | required | The `ComplicationDataSourceService` implementation to request an update from. |
| `requestUpdateAll` | `() -> Unit` | — | Requests `onComplicationRequest` for every active complication currently using this data source. |
| `requestUpdate` | `(vararg Int) -> Unit` | — | Requests `onComplicationRequest` only for the given complication instance IDs; ignores inactive or reconfigured complications. |

## Notes

- Don't call more than roughly once every 5 minutes on average; frequent push updates negate the battery savings of the poll model.
- Complication instance IDs come from `onComplicationActivated` / `onComplicationRequest`.
- Package: `androidx.wear.watchface.complications.datasource`. Artifact: `androidx.wear.watchface:watchface-complications-data-source`.

## Related

- [ComplicationDataSourceService](./complicationdatasourceservice.md)
