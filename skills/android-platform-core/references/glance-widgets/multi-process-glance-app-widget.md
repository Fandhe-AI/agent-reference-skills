# MultiProcessGlanceAppWidget

A `GlanceAppWidget` subclass that lets a `GlanceAppWidgetReceiver` and its worker run in a non-default `android:process`, for apps that split widget receivers across processes. Package: `androidx.glance.appwidget.multiprocess`.

## Signature / Usage

```kotlin
public abstract class MultiProcessGlanceAppWidget(
    @LayoutRes internal open val errorUiLayout: Int = R.layout.glance_error_layout,
) : GlanceAppWidget(errorUiLayout) {
    public open fun getMultiProcessConfig(context: Context): MultiProcessConfig? = null
}

public class MultiProcessConfig(
    public val remoteWorkerService: ComponentName,
    public val actionTrampolineActivity: ComponentName,
    public val invisibleActionTrampolineActivity: ComponentName,
    public val actionCallbackBroadcastReceiver: ComponentName,
    public val remoteViewsService: ComponentName,
) {
    public companion object {
        public fun getDefault(context: Context): MultiProcessConfig
    }
}
```

```kotlin
class MyAppWidget : MultiProcessGlanceAppWidget() {
    // MultiProcessConfig.getDefault() wires the standard multiprocess
    // RemoteWorkerService and Glance components; construct MultiProcessConfig
    // directly instead if a custom remoteWorkerService is needed.
    override fun getMultiProcessConfig(context: Context): MultiProcessConfig =
        MultiProcessConfig.getDefault(context)

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            Text("Hello World")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getMultiProcessConfig(context)` | overridable `fun`, returns `MultiProcessConfig?` | `null` | Supplies the components (worker service, action trampolines, callback receiver, `RemoteViewsService`) that run in the same process as the attached `GlanceAppWidgetReceiver`. Returning `null` falls back to normal single-process `WorkManager` behavior, identical to `GlanceAppWidget`. |
| `MultiProcessConfig.remoteWorkerService` | `ComponentName` | — | The `androidx.work.multiprocess.RemoteWorkerService` used to run jobs for this widget; must run in the same `android:process` as the receiver. |
| `MultiProcessConfig.actionTrampolineActivity` / `invisibleActionTrampolineActivity` | `ComponentName` | — | Action-trampoline activities that must run in the same process as the receiver and `remoteWorkerService`. |
| `MultiProcessConfig.actionCallbackBroadcastReceiver` | `ComponentName` | — | `BroadcastReceiver` that handles action callbacks; same process constraint. |
| `MultiProcessConfig.remoteViewsService` | `ComponentName` | — | Glance's `RemoteViewsService` implementation; same process constraint. |
| `MultiProcessConfig.getDefault(context)` | companion `fun`, returns `MultiProcessConfig` | — | Builds a config from the app's default Glance components, pointing `remoteWorkerService` at `androidx.work.multiprocess.RemoteWorkerService::class.java`. Construct `MultiProcessConfig(...)` directly to supply a custom `remoteWorkerService`. |

## Notes

- `errorUiLayout` (constructor) and the widget's `provideGlance`/`provideContent` lifecycle are otherwise identical to `GlanceAppWidget`; `MultiProcessGlanceAppWidget` only adds the multi-process wiring in `getMultiProcessConfig`.
- The worker itself must still run in the same process as the `GlanceAppWidgetReceiver` — only the receiver's *process* can differ from the app's default process, not the worker's process relative to the receiver's.
- If the widget runs in a non-default process, also declare a subclass of `androidx.glance.appwidget.MyPackageReplacedReceiver` in `AndroidManifest.xml` for that process, to handle `ACTION_MY_PACKAGE_REPLACED` broadcasts.
- Added in `androidx.glance:glance-appwidget-multiprocess` 1.2.0-alpha01; distinct Gradle artifact from `androidx.glance:glance-appwidget`, depends on `androidx.work:work-multiprocess`.

## Related

- [GlanceAppWidget](./glance-app-widget.md)
- [GlanceAppWidgetReceiver](./glance-app-widget-receiver.md)
- [widget-updates](./widget-updates.md)
