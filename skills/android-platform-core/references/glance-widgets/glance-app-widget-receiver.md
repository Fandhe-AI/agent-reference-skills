# GlanceAppWidgetReceiver

`AppWidgetProvider` subclass that bridges platform app-widget broadcasts to a `GlanceAppWidget`. Package: `androidx.glance.appwidget`.

## Signature / Usage

```kotlin
public abstract class GlanceAppWidgetReceiver : AppWidgetProvider() {
    abstract val glanceAppWidget: GlanceAppWidget
    open val coroutineContext: CoroutineContext = Dispatchers.Default

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray)
    override fun onAppWidgetOptionsChanged(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int, newOptions: Bundle)
    override fun onDeleted(context: Context, appWidgetIds: IntArray)
    override fun onEnabled(context: Context)
    override fun onDisabled(context: Context)
    override fun onReceive(context: Context, intent: Intent)
}
```

```kotlin
class MyAppWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = MyAppWidget()
}
```

```xml
<!-- AndroidManifest.xml -->
<receiver
    android:name=".glance.MyAppWidgetReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/my_app_widget_info" />
</receiver>
```

```xml
<!-- res/xml/my_app_widget_info.xml -->
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="40dp"
    android:minHeight="40dp"
    android:targetCellWidth="1"
    android:targetCellHeight="1"
    android:maxResizeWidth="250dp"
    android:maxResizeHeight="120dp"
    android:updatePeriodMillis="86400000"
    android:description="@string/example_appwidget_description"
    android:previewLayout="@layout/example_appwidget_preview"
    android:initialLayout="@layout/glance_default_loading_layout"
    android:configure="com.example.android.ExampleAppWidgetConfigurationActivity"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen"
    android:widgetFeatures="reconfigurable|configuration_optional" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `glanceAppWidget` | `GlanceAppWidget` | — | Abstract; the widget instance used to generate content and send it to `AppWidgetManager`. |
| `coroutineContext` | `CoroutineContext` | `Dispatchers.Default` | Context used for background update work; overridable. |

### `appwidget-provider` XML attributes referenced from `<meta-data android:resource>`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `minWidth` / `minHeight` | `dp` | — | Default widget size; backward-compat path for Android 11 and lower. |
| `targetCellWidth` / `targetCellHeight` | grid cells | — | Default widget size in grid cells (Android 12+); takes precedence over `minWidth`/`minHeight`. |
| `maxResizeWidth` / `maxResizeHeight` | `dp` | — | Maximum recommended size when the widget is resized. |
| `updatePeriodMillis` | `Long` | `0` | Passive update frequency; recommended no more than once per hour. |
| `previewImage` | drawable resource | — | Static image preview for the widget picker (Android 11 and lower). |
| `initialLayout` | layout resource | — | Placeholder `RemoteViews` layout shown before Glance renders (typically `@layout/glance_default_loading_layout`). |
| `previewLayout` | layout resource | — | Scalable XML preview for the widget picker (Android 12+). |
| `configure` | Activity class name | — | Configuration `Activity` launched when the widget is placed. |
| `resizeMode` | `horizontal` \| `vertical` \| both | — | Enables user resizing along the given axes. |
| `widgetCategory` | `home_screen` \| `keyguard` | — | Where the widget can be placed. |

## Notes

- `onUpdate()`, `onAppWidgetOptionsChanged()`, `onDeleted()` delegate to Glance's async worker; if overridden, always call `super`.
- Callback methods run under a strict 10-second background execution limit; never call `goAsync()` yourself (Glance manages this).
- Package/artifact: `androidx.glance.appwidget` / `androidx.glance:glance-appwidget`.
- `<receiver>` and `appwidget-provider` XML declaration are the widget-specific manifest surface; general `<receiver>` semantics are covered by the `app-components` category.

## Related

- [GlanceAppWidget](./glance-app-widget.md)
- [widget-updates](./widget-updates.md)
