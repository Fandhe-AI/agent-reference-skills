# Pin a widget from in-app: requestPinGlanceAppWidget

Lets the app itself trigger the "Add to Home screen" system dialog for one of its Glance widgets (e.g. from an in-app "Add widget" button), instead of requiring the user to find it in the launcher's widget picker.

## Signature / Usage

```kotlin
suspend fun <T : GlanceAppWidgetReceiver> GlanceAppWidgetManager.requestPinGlanceAppWidget(
    receiver: Class<T>,
    preview: GlanceAppWidget? = null,
    previewState: Any? = null,
    successCallback: PendingIntent? = null,
): Boolean
```

```kotlin
@Composable
fun AddWidgetButton() {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    Button(
        onClick = {
            coroutineScope.launch {
                GlanceAppWidgetManager(context).requestPinGlanceAppWidget(
                    receiver = MyWidgetReceiver::class.java,
                    preview = MyWidget(),
                    previewState = DpSize(245.dp, 115.dp),
                )
            }
        },
    ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `receiver` | `Class<T : GlanceAppWidgetReceiver>` | — | The `GlanceAppWidgetReceiver` subclass that owns the widget being pinned. |
| `preview` | `GlanceAppWidget?` | `null` | The widget instance to render as the pin-request preview shown to the user. |
| `previewState` | `Any?` | `null` | State passed to `preview`'s composition to render the preview (e.g. a `DpSize` describing the target size). |
| `successCallback` | `PendingIntent?` | `null` | Fired only if the user accepts and the widget is actually placed on the home screen; not fired on denial or on launchers without pin support. |

## Notes

- Requires Android 8.0 (API 26) or higher; on lower versions the call returns `false` without prompting anything.
- Returns `true` once the pin request has been successfully handed to the system — this does **not** mean the user accepted it. Use `successCallback` to know whether the widget was actually added.
- If the user declines, or the device's launcher doesn't support pinning, the call resolves without error and nothing is added.
- Artifact: `androidx.glance:glance-appwidget`.

## Related

- [glance-app-widget-receiver](./glance-app-widget-receiver.md)
- [widget-configuration](./widget-configuration.md)
