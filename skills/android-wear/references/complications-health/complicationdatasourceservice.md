# ComplicationDataSourceService

Base `Service` class that a complication data source app implements to supply data to watch face complications. The system binds to it and calls back for live data and preview content.

## Signature / Usage

```kotlin
public abstract class ComplicationDataSourceService : Service() {
    @MainThread
    public abstract fun onComplicationRequest(
        request: ComplicationRequest,
        listener: ComplicationRequestListener,
    )

    public abstract fun getPreviewData(type: ComplicationType): ComplicationData?
}
```

```kotlin
class MyComplicationDataSourceService : SuspendingComplicationDataSourceService() {
    override suspend fun onComplicationRequest(request: ComplicationRequest): ComplicationData? {
        val text = getLatestData()
        return ShortTextComplicationData.Builder(
            text = PlainComplicationText.Builder(text).build(),
            contentDescription = PlainComplicationText.Builder(text).build(),
        ).build()
    }

    override fun getPreviewData(type: ComplicationType): ComplicationData? =
        ShortTextComplicationData.Builder(
            text = PlainComplicationText.Builder("Event 1").build(),
            contentDescription = PlainComplicationText.Builder("Event 1").build(),
        ).build()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onComplicationRequest` | `(ComplicationRequest, ComplicationRequestListener) -> Unit` | — | Called on the main thread when the system needs updated data; must invoke the listener within roughly 20 seconds (under 100ms if `request.immediateResponseRequired`), or the system may unbind. |
| `getPreviewData` | `(ComplicationType) -> ComplicationData?` | — | Returns static, representative data for the complication picker UI. Runs on a background thread; results may be cached by the system. |

## Notes

- `androidx.wear.watchface:watchface-complications-data-source-ktx` adds `SuspendingComplicationDataSourceService` / `SuspendingTimelineComplicationDataSourceService`, coroutine-friendly subclasses used in the example above (`onComplicationRequest` as a `suspend fun`).
- Register the service in `AndroidManifest.xml` with `android:permission="com.google.android.wearable.permission.BIND_COMPLICATION_PROVIDER"`, an intent filter for action `android.support.wearable.complications.ACTION_COMPLICATION_UPDATE_REQUEST`, and `<meta-data>` entries `android.support.wearable.complications.SUPPORTED_TYPES` (list of supported types, e.g. `SHORT_TEXT`) and `android.support.wearable.complications.UPDATE_PERIOD_SECONDS` (minimum 300 seconds; `0` for push-only updates via `ComplicationDataSourceUpdateRequester`).
- Each `ComplicationData` subtype's `Builder` accepts `setTapAction(pendingIntent: PendingIntent?)`, launched when the user taps the rendered complication.
- For sequences of values valid at pre-defined times (e.g. calendar events), extend `SuspendingTimelineComplicationDataSourceService` and return a `ComplicationDataTimeline` instead of a single `ComplicationData`.
- Package: `androidx.wear.watchface.complications.datasource`. Artifact: `androidx.wear.watchface:watchface-complications-data-source` (base) / `-ktx` (coroutine helpers).
- Watch faces that *render* complications (rather than provide their data) belong to the Watch Face API — see the `watch-face` category.

## Related

- [ComplicationDataSourceUpdateRequester](./complicationdatasourceupdaterequester.md)
- [ShortTextComplicationData](./shorttextcomplicationdata.md)
- [ComplicationText](./complicationtext.md)
