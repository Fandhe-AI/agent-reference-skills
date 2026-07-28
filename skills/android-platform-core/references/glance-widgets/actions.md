# Actions: actionStartActivity, actionRunCallback, actionSendBroadcast, actionStartService, ActionParameters

`Action` classes describing what happens on user interaction, applied via `GlanceModifier.clickable` or a composable's `onClick`. Package: `androidx.glance.appwidget.action` / `androidx.glance.action`.

## Signature / Usage

```kotlin
public inline fun <reified T : Activity> actionStartActivity(
    parameters: ActionParameters = actionParametersOf(),
): Action

public inline fun <reified T : Service> actionStartService(
    parameters: ActionParameters = actionParametersOf(),
    isForegroundService: Boolean = false,
): Action

public inline fun <reified T : BroadcastReceiver> actionSendBroadcast(
    parameters: ActionParameters = actionParametersOf(),
): Action

public inline fun <reified T : ActionCallback> actionRunCallback(
    parameters: ActionParameters = actionParametersOf(),
): Action

public interface ActionCallback {
    public suspend fun onAction(context: Context, glanceId: GlanceId, parameters: ActionParameters)
}
```

```kotlin
Button(text = "Home", onClick = actionStartActivity<MyActivity>())

Image(
    provider = ImageProvider(R.drawable.ic_hourglass_animated),
    contentDescription = "Refresh",
    modifier = GlanceModifier.clickable(onClick = actionRunCallback<RefreshAction>()),
)

class RefreshAction : ActionCallback {
    override suspend fun onAction(context: Context, glanceId: GlanceId, parameters: ActionParameters) {
        MyAppWidget().update(context, glanceId)
    }
}
```

```kotlin
private val destinationKey = ActionParameters.Key<String>("destination")

Button(
    text = "Work",
    onClick = actionStartActivity<NavigationActivity>(
        actionParametersOf(destinationKey to "work"),
    ),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actionStartActivity<T>()` | inline reified `Activity` (or `ComponentName`/`Intent` overloads) | — | Launches an activity. |
| `actionStartService<T>(isForegroundService)` | inline reified `Service` | `isForegroundService = false` | Launches a service. |
| `actionSendBroadcast<T>()` | inline reified `BroadcastReceiver` (or `String` action/`ComponentName`/`Intent` overloads) | — | Sends a broadcast. |
| `actionRunCallback<T>()` | inline reified `ActionCallback` | — | Runs custom suspend logic via a registered `ActionCallback`. |
| `ActionParameters.Key<T>(name)` | class | — | Typed key for passing data into an `Action`. |
| `actionParametersOf(vararg pairs)` | function | — | Builds an immutable `ActionParameters` from `key to value` pairs. |
| `toParametersKey()` | extension on `Preferences.Key<T>` | — | Converts a DataStore `Preferences.Key` into an `ActionParameters.Key`. |

## Notes

- Actions execute in a remote process; they are translated into `PendingIntent`s under the hood.
- `ActionCallback.onAction` runs via a custom async `BroadcastReceiver` with extended execution time — delegate long-running work to `WorkManager`.
- `GlanceModifier.clickable(block: () -> Unit)` (a plain lambda) runs in a `WorkManager` worker context; avoid starting activities from it on Android 12+ — use `actionStartActivity` instead.
- After state changes inside an action, call `GlanceAppWidget().update(context, glanceId)` (or `updateAll`) to refresh the widget.
- Package: `androidx.glance.appwidget.action` (`actionRunCallback`, `ActionCallback`) and `androidx.glance.action` (`ActionParameters`), artifact `androidx.glance:glance-appwidget`.

## Related

- [glance-modifier](./glance-modifier.md)
- [widget-updates](./widget-updates.md)
