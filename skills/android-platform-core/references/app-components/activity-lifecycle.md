# Activity lifecycle

The set of states an `Activity` transitions through, from creation to destruction, and the callbacks the system invokes at each transition.

## Signature / Usage

```kotlin
class ExampleActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { /* ... */ }
    }

    override fun onStop() {
        super.onStop()
        // Heavy shutdown work, e.g. persist to database via ViewModel
        noteViewModel.saveDraft()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onCreate(savedInstanceState: Bundle?)` | callback | — | Called once on first creation (or after destruction). Initialize UI, bind data, associate `ViewModel`. `savedInstanceState` is non-null when recreated from saved state. |
| `onStart()` | callback | — | Activity becoming visible. Initialize UI maintenance code. |
| `onResume()` | callback | — | Activity in the foreground and interactive. Enable functionality that needs the foreground (camera preview, location updates). |
| `onPause()` | callback | — | Focus taken away (call, new activity, dialog) but may still be partially visible. Pause operations, release sensors/GPS. Must execute briefly — don't save data or make network/DB calls here. |
| `onStop()` | callback | — | Activity no longer visible. Release/adjust resources not needed while invisible; do CPU-intensive shutdown and persistence work here instead of `onPause()`. |
| `onRestart()` | callback | — | Called before `onStart()` when a stopped activity is about to restart. |
| `onDestroy()` | callback | — | Called before the activity is destroyed, either because it finished or because the system destroyed it for a configuration change. Release remaining resources. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Order when Activity A starts Activity B: A's `onPause()` → B's `onCreate()`/`onStart()`/`onResume()` → (if A becomes invisible) A's `onStop()`.
- The system kills **processes**, not individual activities; process kill likelihood increases in order: foreground (Resumed) < visible (Started/Paused) < background (Stopped) < empty (Destroyed).
- In Compose, prefer not to hook lifecycle callbacks directly: use `rememberSaveable` for lightweight UI state and `ViewModel` for state that must survive configuration changes; observe lifecycle via `LocalLifecycleOwner` or `collectAsStateWithLifecycle()`.
- `onDestroy()` is not guaranteed to be called when the system kills a background process to reclaim memory — don't rely on it for persistence.

## Related

- [Activity](./activity.md)
- [Configuration changes and state restoration](./configuration-changes.md)
- [Tasks and back stack](./tasks-and-back-stack.md)
