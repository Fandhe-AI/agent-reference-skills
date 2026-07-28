# App process priority and memory trimming

How Android ranks an app's process for the purpose of deciding which processes to kill under memory pressure, and how `onTrimMemory()` lets a component react before that happens.

## Signature / Usage

```kotlin
class MyComponent : ComponentCallbacks2 {
    override fun onTrimMemory(level: Int) {
        when {
            level >= ComponentCallbacks2.TRIM_MEMORY_COMPLETE -> {
                // Release everything non-essential; process is a strong kill candidate
            }
            level >= ComponentCallbacks2.TRIM_MEMORY_BACKGROUND -> {
                // App moved to the background cache; release UI-adjacent resources
            }
            level >= ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW -> {
                // Still running in foreground, but system is under moderate pressure
            }
        }
    }
    override fun onConfigurationChanged(newConfig: Configuration) {}
    override fun onLowMemory() {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Foreground process | priority tier | — | Hosts an `Activity` with `onResume()` called, a `BroadcastReceiver` currently in `onReceive()`, or a `Service` executing `onCreate()`/`onStart()`/`onDestroy()`. Killed only as a last resort. |
| Visible process | priority tier | — | Hosts an `Activity` visible but not focused (after `onPause()`), a foreground `Service` (`startForeground()`), or a system service the user is aware of. |
| Service process | priority tier | — | Hosts a `Service` started with `startService()` doing work the user cares about; long-running (30+ min) services may be demoted unless promoted to foreground. |
| Cached / background process | priority tier | — | Not currently needed; holds stopped activities (`onStop()` called); killed first, in reverse-priority order, to reclaim memory. |
| `onTrimMemory(level: Int)` | `ComponentCallbacks2` method | — | Called with an increasing severity level as memory pressure rises, letting components proactively release caches before the process is killed. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- A process's priority is determined by the most important active component it hosts, and can be escalated by dependency (e.g. a process bound to another process's `Service` via `BIND_AUTO_CREATE`, or holding an active `ContentProvider` connection, inherits at least that process's priority).
- The system kills processes, not individual components — everything running in a killed process's Linux process is destroyed together.
- This page covers process-priority and `onTrimMemory()`; the app's single/multi-thread execution model (main thread, worker threads, `Service` threading) is owned by the `android-background-work` skill (`references/services/processes-and-threads.md`).

## Related

- [Activity lifecycle](./activity-lifecycle.md)
- [Application class and initialization](./application-class.md)
