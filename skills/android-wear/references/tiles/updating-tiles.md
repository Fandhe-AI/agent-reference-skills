# Updating tiles (freshness interval, manual updates, timeline validity)

Three complementary strategies keep tile content current: a periodic `freshnessIntervalMillis`, manual `TileService.getUpdater(context).requestUpdate()` calls triggered by external events, and timeline entries with validity windows for predictable future changes.

## Signature / Usage

```kotlin
// 1. Periodic refresh
override fun onTileRequest(
    requestParams: RequestBuilders.TileRequest
): ListenableFuture<TileBuilders.Tile?> =
    Futures.immediateFuture(
        TileBuilders.Tile.Builder()
            .setResourcesVersion(RESOURCES_VERSION)
            .setFreshnessIntervalMillis(60 * 60 * 1000) // 60 minutes
            .setTileTimeline(TimelineBuilders.Timeline.fromLayoutElement(getWeatherLayout()))
            .build()
    )

// 2. Manual update in response to an external event
fun eventDeletedCallback() {
    TileService.getUpdater(context).requestUpdate(MyTileService::class.java)
}

// 3. Timeline with validity windows
val timeline = TimelineBuilders.Timeline.Builder()
    .addTimelineEntry(
        TimelineBuilders.TimelineEntry.Builder().setLayout(getNoMeetingsLayout()).build()
    )
meetings.forEach { meeting ->
    timeline.addTimelineEntry(
        TimelineBuilders.TimelineEntry.Builder()
            .setLayout(getMeetingLayout(meeting))
            .setValidity(
                TimelineBuilders.TimeInterval.Builder()
                    .setEndMillis(meeting.dateTimeMillis)
                    .build()
            )
            .build()
    )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Tile.Builder().setFreshnessIntervalMillis` | `Long` | Time after which the system calls `onTileRequest` again. `0` (default) disables automatic refresh. Should not be set below ~1 minute; the system may throttle more frequent requests. |
| `TileService.getUpdater(context: Context): TileUpdateRequester` | static | Obtains an updater bound to the current app. |
| `TileUpdateRequester.requestUpdate(MyTileService::class.java)` | method | Immediately triggers a new `onTileRequest` call, e.g. after data changes elsewhere in the app. |
| `TimelineBuilders.TimelineEntry.Builder().setValidity(TimeInterval)` | builder | Restricts an entry to a time window (`setStartMillis` / `setEndMillis`), letting the renderer switch layouts without polling. |

## Notes

- Strategy guidance from the official guide: predictable future changes (next calendar event) → timeline validity; platform sensor data → dynamic data binding (`platform-data.md`); quick on-device recalculation → `freshnessIntervalMillis`; expensive/background work (weather polling) → `WorkManager` + `requestUpdate()`; external push events → FCM triggers the app, which then calls `requestUpdate()`.
- For unpredictable content with a fixed layout shape, a single-entry `Timeline.fromLayoutElement(...)` without a freshness interval is sufficient — refresh explicitly via `requestUpdate()` when the underlying data changes.
- Package: `androidx.wear.tiles.TileService` / `androidx.wear.protolayout.TimelineBuilders`.

## Related

- [tile-builders](./tile-builders.md)
- [platform-data](./platform-data.md)
- [tile-service](./tile-service.md)
