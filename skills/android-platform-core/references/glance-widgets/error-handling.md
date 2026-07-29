# Error handling in Glance: try/catch around data loading, errorUiLayout, onCompositionError

Patterns for surfacing a usable widget instead of a blank/broken one when data loading or composition fails. Compose forbids `try`/`catch` around composables themselves, so error handling wraps the non-composable data path and falls back to `errorUiLayout` / `onCompositionError` for anything that still throws during composition.

## Signature / Usage

```kotlin
// 1. Wrap non-composable logic (data loading) in try/catch, branch on the result.
provideContent {
    var isError = false
    var data: MyData? = null
    try {
        val repository = (context.applicationContext as MyApplication).myRepository
        data = repository.loadData()
    } catch (e: Exception) {
        isError = true
    }

    if (isError) {
        ErrorContent()
    } else {
        WidgetContent(data)
    }
}
```

```kotlin
// 2. Static fallback layout shown if composition itself throws an uncaught exception.
class UpgradeWidget : GlanceAppWidget(errorUiLayout = R.layout.error_layout)
```

```kotlin
// 3. Since Glance 1.1.0: custom handling of composition errors, e.g. to add a retry button.
override fun onCompositionError(
    context: Context,
    glanceId: GlanceId,
    appWidgetId: Int,
    throwable: Throwable,
) {
    val rv = RemoteViews(context.packageName, R.layout.error_layout)
    rv.setTextViewText(R.id.error_text_view, "Error: ${throwable.message}")
    AppWidgetManager.getInstance(context).updateAppWidget(appWidgetId, rv)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `GlanceAppWidget(errorUiLayout)` | `Int` (`@LayoutRes`) constructor param | `R.layout.glance_error_layout` | Static XML layout shown when the widget's composition throws an uncaught exception. |
| `GlanceAppWidget.onCompositionError(context, glanceId, appWidgetId, throwable)` | overridable `fun` (Glance 1.1.0+) | no-op (shows `errorUiLayout`) | Called when composition fails; override to render a custom `RemoteViews` (e.g. with a retry action) instead of the static `errorUiLayout`. |

## Notes

- Compose does not allow `try`/`catch` directly around composable calls — perform data loading and other fallible work in plain (non-composable) code inside `provideContent`, then branch on success/failure to decide which composable tree to emit.
- `errorUiLayout` is a last-resort static fallback for cases the app didn't catch itself (e.g. an unexpected exception during composition); it is plain `RemoteViews` XML, not a Glance composable.
- `onCompositionError` receives the `appWidgetId` directly and can call `AppWidgetManager.updateAppWidget()` with a custom `RemoteViews` (e.g. showing the error message and a retry `PendingIntent`), giving finer control than the static `errorUiLayout`.
- Artifact: `androidx.glance:glance-appwidget`.

## Related

- [glance-app-widget](./glance-app-widget.md)
- [actions](./actions.md)
