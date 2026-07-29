# Widget configuration: APPWIDGET_CONFIGURE activity, reconfigurable / configuration_optional

A per-instance setup screen that launches when a widget is added (and, on Android 12+, re-opened later) so the user can customize settings before the widget first renders. Declared via manifest + `AppWidgetProviderInfo` XML; the activity itself is a normal `Activity`, not a Glance composable.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<activity android:name=".ExampleAppWidgetConfigurationActivity">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_CONFIGURE"/>
    </intent-filter>
</activity>
```

```xml
<!-- res/xml/example_appwidget_info.xml -->
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:configure="com.example.android.ExampleAppWidgetConfigurationActivity"
    android:widgetFeatures="reconfigurable|configuration_optional"
    ... />
```

```kotlin
class ExampleAppWidgetConfigurationActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val appWidgetId = intent?.extras?.getInt(
            AppWidgetManager.EXTRA_APPWIDGET_ID,
            AppWidgetManager.INVALID_APPWIDGET_ID,
        ) ?: AppWidgetManager.INVALID_APPWIDGET_ID

        // Assume cancelled until configuration completes.
        setResult(
            Activity.RESULT_CANCELED,
            Intent().putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId),
        )

        // ... let the user pick settings, persist them (e.g. to DataStore) ...

        val glanceId = GlanceAppWidgetManager(this).getGlanceIdBy(appWidgetId)
        lifecycleScope.launch {
            ExampleGlanceWidget().update(this@ExampleAppWidgetConfigurationActivity, glanceId)
            setResult(
                Activity.RESULT_OK,
                Intent().putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId),
            )
            finish()
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `android:configure` | `AppWidgetProviderInfo` XML attribute | Fully-qualified class name of the configuration `Activity`, launched on `APPWIDGET_CONFIGURE`. |
| `android:widgetFeatures="reconfigurable"` | manifest flag (Android 12+) | Adds a long-press "Reconfigure" entry that re-launches the configuration activity for an already-placed instance. |
| `android:widgetFeatures="reconfigurable\|configuration_optional"` | manifest flag (Android 12+) | Skips the configuration activity on initial add (widget uses default settings immediately) while still allowing later reconfiguration. |
| `AppWidgetManager.EXTRA_APPWIDGET_ID` | `Intent` extra | The App Widget ID being configured; read it from the launching intent's extras. |
| `GlanceAppWidgetManager(context).getGlanceIdBy(appWidgetId)` | function | Resolves the `GlanceId` for a given App Widget ID, needed to call `update()` from the configuration activity. |

## Notes

- The system does **not** send an `ACTION_APPWIDGET_UPDATE` broadcast when a configuration activity is registered — the configuration activity itself is responsible for calling `GlanceAppWidget.update()` (or `updateAll`) once the user finishes, otherwise the widget never renders its first frame.
- The configuration activity **must always call `setResult()`** with the App Widget ID: `RESULT_CANCELED` set immediately on entry so backing out removes the pending widget placement, then `RESULT_OK` once configuration and the update call have completed.
- `reconfigurable` / `configuration_optional` only take effect on Android 12 (API 31) and above; earlier versions ignore both flags and always show the configuration activity on add.
- Artifact: `androidx.glance:glance-appwidget`.

## Related

- [glance-app-widget-receiver](./glance-app-widget-receiver.md)
- [widget-updates](./widget-updates.md)
- [state-management](./state-management.md)
