# Widget engagement metrics: AppWidgetEvent, queryAppWidgetEvents, setAppWidgetEventTag

Android 16 platform API for tracking widget taps, scrolls, impressions, and on-screen position, independent of the Glance composition layer. Package: `android.appwidget`.

## Signature / Usage

```kotlin
@RequiresApi(Build.VERSION_CODES_FULL.BAKLAVA_1)
fun getWidgetEngagementMetrics(context: Context) {
    val manager = AppWidgetManager.getInstance(context)

    val endTime = System.currentTimeMillis()
    val startTime = endTime - (24 * 60 * 60 * 1000) // a day ago

    val events = manager.queryAppWidgetEvents(startTime, endTime)

    for (event in events) {
        val widgetId = event.appWidgetId
        val clickedIds = event.clickedIds       // tapped component IDs
        val scrolledIds = event.scrolledIds     // scrolled list/view IDs
        val visibleMs = event.visibleDuration.toMillis()
        val position = event.position           // left/right/top/bottom on screen
    }
}
```

```kotlin
// Tag a specific view so its taps/scrolls are attributable in AppWidgetEvent
RemoteViews.setAppWidgetEventTag(viewId, tagInteger)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AppWidgetManager.queryAppWidgetEvents(startTime, endTime)` | function | Returns `AppWidgetEvent`s recorded in the given time range (`Long` epoch millis). |
| `AppWidgetEvent.appWidgetId` | `Int` | Widget instance the event belongs to. |
| `AppWidgetEvent.clickedIds` | `List<Int>?` | Component IDs tapped during the event window. |
| `AppWidgetEvent.scrolledIds` | `List<Int>?` | List/scroll-view IDs (or tags) scrolled during the event window. |
| `AppWidgetEvent.visibleDuration` | `Duration` | How long the widget was visible. |
| `AppWidgetEvent.position` | position object with `left`/`right`/`top`/`bottom` | Widget's on-screen bounds at report time. |
| `RemoteViews.setAppWidgetEventTag(viewId, tag)` | function | Assigns a custom tag `Int` to a view so its clicks/scrolls are identifiable in `clickedIds`/`scrolledIds`. |

## Notes

- Requires `compileSdk` 36.1+ and a device (physical device recommended) running Android 16+ (`Build.VERSION_CODES_FULL.BAKLAVA_1`); this is a platform API, not part of `androidx.glance`.
- Events are reported once per hour by default (device manufacturers may customize the interval); e.g. 10 scrolls in the same list within an hour report as a single scroll event.
- For immediate testing, override the reporting window: `adb shell device_config override systemui widget_events_report_interval_ms 0`.
- Pair with `WorkManager` to poll `queryAppWidgetEvents` periodically (daily, weekly, or on app open) rather than querying on every widget update.

## Related

- [widget-updates](./widget-updates.md)
- [actions](./actions.md)
