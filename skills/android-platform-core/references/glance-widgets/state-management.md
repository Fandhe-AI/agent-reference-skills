# GlanceStateDefinition / PreferencesGlanceStateDefinition

Defines where and how a `GlanceAppWidget`'s persisted state is stored, and how to read it in composition. Package: `androidx.glance.state` (`androidx.glance.appwidget.state` for the app-widget-scoped helpers).

## Signature / Usage

```kotlin
public interface GlanceStateDefinition<T> {
    public suspend fun getLocation(context: Context, fileKey: String): File
    public suspend fun getDataStore(context: Context, fileKey: String): DataStore<T>
}

public object PreferencesGlanceStateDefinition : GlanceStateDefinition<Preferences>

@Composable
public fun <T> currentState(): T

public suspend fun updateAppWidgetState(
    context: Context,
    glanceId: GlanceId,
    updateAction: suspend (prefs: MutablePreferences) -> Unit,
)
```

```kotlin
class MyAppWidget : GlanceAppWidget() {
    override val stateDefinition = PreferencesGlanceStateDefinition

    @Composable
    override fun Content() {
        val prefs = currentState<Preferences>()
        val isChecked = prefs[booleanPreferencesKey("checked")] ?: false
        CheckBox(checked = isChecked, onCheckedChange = actionRunCallback<ToggleAction>())
    }
}

class ToggleAction : ActionCallback {
    override suspend fun onAction(context: Context, glanceId: GlanceId, parameters: ActionParameters) {
        updateAppWidgetState(context, glanceId) { prefs ->
            prefs[booleanPreferencesKey("checked")] = !(prefs[booleanPreferencesKey("checked")] ?: false)
        }
        MyAppWidget().update(context, glanceId)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getLocation(context, fileKey)` | `suspend fun` | — | File path used to persist the widget's state. |
| `getDataStore(context, fileKey)` | `suspend fun` | — | Creates the underlying `DataStore<T>`. |
| `PreferencesGlanceStateDefinition` | `GlanceStateDefinition<Preferences>` | — | Built-in definition backed by Jetpack DataStore `Preferences`; the default `stateDefinition` on `GlanceAppWidget`. |
| `currentState<T>()` | `@Composable fun` | — | Reads the current state value inside a Glance composition. |
| `updateAppWidgetState(context, glanceId, updateAction)` | `suspend fun` | — | Mutates the persisted `Preferences` for one widget instance. |

## Notes

- A `GlanceAppWidget` is stateless and instantiated on demand — any in-memory state can be destroyed at any time, since widgets run in a separate process; persist widget-specific state through `stateDefinition`, not fields on the class.
- Distinguish **Application State** (your app's own data source, e.g. a repository/database, read directly in `provideGlance`/composition) from **Glance State** (widget-local state such as a checkbox toggle, stored via `GlanceStateDefinition`).
- Use a distinct `GlanceStateDefinition` per widget UI variant; the definition itself should not change once set, only the stored data.
- Package: `androidx.glance.state` (base module) with app-widget update helpers in `androidx.glance.appwidget.state`, artifacts `androidx.glance:glance` / `androidx.glance:glance-appwidget`.

## Related

- [widget-updates](./widget-updates.md)
- [glance-app-widget](./glance-app-widget.md)
