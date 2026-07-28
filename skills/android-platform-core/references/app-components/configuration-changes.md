# Configuration changes and state restoration

By default, a configuration change (screen rotation, language, input device) destroys and recreates the current `Activity`; state must be explicitly saved and restored across that transition.

## Signature / Usage

```kotlin
// Automatically saved/restored across configuration change and process death
var userTypedQuery by rememberSaveable(
    typedQuery,
    stateSaver = TextFieldValue.Saver
) {
    mutableStateOf(TextFieldValue(text = typedQuery, selection = TextRange(typedQuery.length)))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rememberSaveable` | Compose API | — | Saves lightweight UI state (text input, scroll position) into the instance-state `Bundle`; survives both configuration changes and system-initiated process death. |
| `ViewModel` | androidx class | — | Holds business logic / screen state that survives configuration changes but not process death by itself; combine with `rememberSaveable` or persistent storage for full durability. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- On a configuration change, the sequence is: original instance `onPause()` → `onStop()` → `onDestroy()`, then new instance `onCreate()` → `onStart()` → `onResume()`.
- Instance-state saving is triggered when the system destroys the activity due to constraints (rotation, low memory) — **not** when the user presses Back, which should discard state.
- `rememberSaveable` is the Compose-first replacement for manually overriding `onSaveInstanceState()` / `onRestoreInstanceState()`; it is not intended for complex or large data — use `ViewModel` plus persistent storage for that.
- `ViewModel` alone does **not** survive process death (only configuration changes); use `SavedStateHandle` (owned by the `android-architecture` skill) for that case.
- Multi-window mode (API 24+) can put the app into a config-change notification without full destroy/recreate in some cases; only the focused window is in the Resumed state.

## Related

- [Activity lifecycle](./activity-lifecycle.md)
- [Activity](./activity.md)
