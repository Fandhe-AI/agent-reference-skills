# GlanceAppWidget

Base class for defining an app widget built with Glance. Package: `androidx.glance.appwidget`.

## Signature / Usage

```kotlin
public abstract class GlanceAppWidget(
    @LayoutRes internal open val errorUiLayout: Int = R.layout.glance_error_layout,
) {
    open val sizeMode: SizeMode = SizeMode.Single
    open val previewSizeMode: SizeMode = SizeMode.Single
    open val stateDefinition: GlanceStateDefinition<*>? = PreferencesGlanceStateDefinition

    open suspend fun provideGlance(context: Context, id: GlanceId)
    open suspend fun providePreview(context: Context, widgetCategory: Int)
    suspend fun update(context: Context, id: GlanceId)
    suspend fun updateAll(context: Context)
    suspend fun <State> updateIf(context: Context, predicate: (State) -> Boolean, transform: suspend (State) -> State)
}
```

```kotlin
class MyAppWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        // Load data needed to render the widget (use withContext for long operations)
        provideContent {
            Text("Hello World")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sizeMode` | `SizeMode` | `SizeMode.Single` | Controls how the widget composes for different sizes (`Single` / `Exact` / `Responsive`). |
| `previewSizeMode` | `SizeMode` | `SizeMode.Single` | Size mode used when rendering the widget-picker preview via `providePreview`. |
| `stateDefinition` | `GlanceStateDefinition<*>?` | `PreferencesGlanceStateDefinition` | Data store definition used for `currentState()` in the composition. `null` disables state. |
| `errorUiLayout` | `Int` (`@LayoutRes`) | `R.layout.glance_error_layout` | Layout shown if the widget composition throws. |

## Notes

- `provideGlance()` must call `provideContent { ... }` to emit the composable tree; it runs as a background worker with an initial ~10-minute budget, then ~45 seconds per recomposition.
- Use `withContext()` inside `provideGlance` to move long-running data loading off the caller thread.
- `update(context, id)` re-runs the composition for one widget and pushes the result to `AppWidgetManager`; `updateAll(context)` updates every instance; `updateIf` updates conditionally based on stored state.
- `providePreview(context, widgetCategory)` (Android 15+, `compileSdk` 35+) renders a single, non-recomposing preview; combine with `GlanceAppWidgetManager.setWidgetPreview()` (rate-limited to ~2 calls/hour) to publish personalized widget-picker previews. Override `previewSizeMode` if elements are missing from the preview at minimum size.
- Artifact: `androidx.glance:glance-appwidget`.
- Distinct from mobile Jetpack Compose; a `GlanceAppWidget` composition compiles down to `RemoteViews`, so only Glance-specific composables (not `androidx.compose.*`) can be used inside `provideContent`.

## Related

- [GlanceAppWidgetReceiver](./glance-app-widget-receiver.md)
- [size-modes](./size-modes.md)
- [state-management](./state-management.md)
- [widget-updates](./widget-updates.md)
