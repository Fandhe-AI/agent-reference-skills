# Updating a GlanceAppWidget: update, updateAll, WorkManager

APIs for triggering recomposition/refresh of running widget instances. Package: `androidx.glance.appwidget`.

## Signature / Usage

```kotlin
suspend fun GlanceAppWidget.update(context: Context, glanceId: GlanceId)
suspend fun GlanceAppWidget.updateAll(context: Context)
suspend fun <State> GlanceAppWidget.updateIf(
    context: Context,
    predicate: (State) -> Boolean,
    transform: suspend (State) -> State,
)
```

```kotlin
// Update a single instance
MyAppWidget().update(context, glanceId)

// Update every instance of this widget
MyAppWidget().updateAll(context)

// Obtain GlanceIds for a widget class
val manager = GlanceAppWidgetManager(context)
val glanceIds = manager.getGlanceIds(MyAppWidget::class.java)
glanceIds.forEach { id -> MyAppWidget().update(context, id) }

// Deferred update via WorkManager
class DataSyncWorker(
    context: Context,
    params: WorkerParameters,
) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result {
        MyAppWidget().updateAll(context)
        return Result.success()
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `update(context, glanceId)` | `suspend fun` | Re-runs composition for one widget instance and pushes the resulting `RemoteViews` to `AppWidgetManager`. |
| `updateAll(context)` | `suspend fun` | Updates every currently-placed instance of the widget class. |
| `updateIf(context, predicate, transform)` | `suspend fun` | Conditionally recomposes/updates instances whose stored state satisfies `predicate`. |
| `GlanceAppWidgetManager(context).getGlanceIds(widgetClass)` | `suspend fun` | Returns the `GlanceId`s of all currently placed instances of a `GlanceAppWidget` subclass. |

## Notes

- `update`/`updateAll`/`updateIf` are suspend functions — call them from a coroutine (e.g. inside an `ActionCallback`, a `CoroutineWorker`, or another background-safe scope), not directly on the main thread from a broadcast receiver.
- Recommended update timing: immediately in response to user interaction, app-foreground activity, or an FCM/broadcast event; for periodic background refresh use `updatePeriodMillis` (up to once every ~30 minutes) or schedule a `WorkManager` job (e.g. every 15 minutes) — avoid updating every minute while the app isn't awake to prevent battery drain.
- Artifact: `androidx.glance:glance-appwidget`. `WorkManager` itself is documented in the `android-background-work` skill; this page only covers the Glance-side call pattern.

## Related

- [glance-app-widget](./glance-app-widget.md)
- [state-management](./state-management.md)
