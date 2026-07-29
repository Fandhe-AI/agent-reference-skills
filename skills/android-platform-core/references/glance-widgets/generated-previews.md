# Generated widget-picker previews: providePreview, setWidgetPreviews

An Android 15+ (API 35+) API that lets a widget push a live, personalized preview to the widget picker instead of relying on a single static `previewImage` drawable.

## Signature / Usage

```kotlin
class ExampleGlanceWidget : GlanceAppWidget() {
    // Rendered once, with no recomposition or side effects, purely for the picker preview.
    override suspend fun providePreview(context: Context, widgetCategory: Int) {
        provideContent {
            // Load real (or representative) data and render the same layout
            // used in the actual widget so the preview matches reality.
            ExampleWidgetContent(data = loadPreviewData(context))
        }
    }
}
```

```kotlin
// Publish the generated preview, e.g. on first app launch or after sign-in.
coroutineScope.launch {
    GlanceAppWidgetManager(context).setWidgetPreviews<ExampleGlanceWidgetReceiver>()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GlanceAppWidget.providePreview(context, widgetCategory)` | overridable `suspend fun` | Emits the composable content shown as the generated preview; a single one-shot composition, no recomposition or effects. |
| `GlanceAppWidgetManager(context).setWidgetPreviews<T : GlanceAppWidgetReceiver>(widgetCategories)` | reified `suspend fun`, requires API 35 (`VANILLA_ICE_CREAM`) | Renders the preview from `providePreview` and pushes it to the system so the widget picker can show it; returns the number of categories successfully set. Rate-limited to roughly two calls per hour per widget. |
| `previewSizeMode` | `SizeMode` | Override to `SizeMode.Responsive` (with breakpoints from the widget's minimum size) if elements are missing from the generated preview — the default `SizeMode.Single` only renders what's visible at `android:minWidth`/`android:minHeight`. |
| `previewImage` | `AppWidgetProviderInfo` XML attribute | Static fallback preview drawable, still required for devices below Android 15 and as a fallback if a generated preview hasn't been set yet. |

## Notes

- Requires `compileSdk = 35` or higher; on devices below Android 15 the system falls back to the static `previewImage` attribute, so declare that regardless.
- Call `setWidgetPreviews` at a point where you have real or representative data — first app launch for static/quick-action widgets, after sign-in for account-scoped widgets, or on a periodic schedule for widgets whose content changes over time. Update it again whenever the widget's visual appearance changes.
- `providePreview` is a single, side-effect-free composition — it does not recompose and is distinct from the widget's normal `provideGlance`/`provideContent` lifecycle.
- Artifact: `androidx.glance:glance-appwidget`.

## Related

- [glance-app-widget](./glance-app-widget.md)
- [size-modes](./size-modes.md)
