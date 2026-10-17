# Sending broadcasts

Dispatch an `Intent` to matching receivers, either as a normal (unordered) broadcast or an ordered broadcast that receivers can propagate results through or abort.

## Signature / Usage

```kotlin
// Normal broadcast
val intent = Intent("com.example.snippets.ACTION_UPDATE_DATA").apply {
    putExtra("com.example.snippets.DATA", newData)
    setPackage("com.example.snippets")
}
context.sendBroadcast(intent)

// Ordered broadcast, permission-restricted
context.sendOrderedBroadcast(intent, android.Manifest.permission.ACCESS_COARSE_LOCATION)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sendBroadcast(intent)` | method | — | Delivers to all matching receivers in undefined order; receivers cannot read each other's results or abort delivery. More efficient than ordered broadcasts. |
| `sendBroadcast(intent, receiverPermission)` | method | — | Restricts delivery to receivers holding the given permission. |
| `sendOrderedBroadcast(intent, receiverPermission)` | method | — | Delivers to one receiver at a time; order can be controlled with the intent-filter `android:priority` within the same app process (same-priority receivers run in arbitrary order). On Android 16+, priority ordering across processes is not guaranteed and priorities are clamped to (`SYSTEM_LOW_PRIORITY` + 1, `SYSTEM_HIGH_PRIORITY` - 1); see [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md). Each receiver can propagate result data to the next or call `abortBroadcast()` to stop delivery. |
| `setPackage(String)` | `Intent` method | — | Restricts an implicit broadcast `Intent` to a specific package. |

## Notes

- Local (intra-app) broadcasting via `LocalBroadcastManager` is **deprecated**; use it only for backward compatibility. Prefer context-registered receivers with `RECEIVER_NOT_EXPORTED`, or reactive in-process solutions (`Flow`/`SharedFlow`, `LiveData`) — see the [coroutines-flow README](../coroutines-flow/README.md) for `Flow`/`SharedFlow` usage.
- Don't broadcast sensitive data via implicit intents; any registered app could receive it. Use `setPackage()` and/or a permission to scope delivery.
- Avoid broadcasts within the same process. A self-broadcast (all receivers run in the sending process) is very inefficient, creates unnecessary system overhead, and is strongly discouraged. For in-process communication use Kotlin `SharedFlow` / `StateFlow`, a shared `ViewModel`, or callbacks and listeners. For jobs, alarms, or system callbacks, do the work directly inside the `JobService` / WorkManager worker / alarm handler instead of re-broadcasting.
- Per the "Avoid broadcasts within the same process" section of https://developer.android.com/develop/background-work/background-tasks/broadcasts: on devices running Android 17 QPR2 or higher, the system delivers self-broadcasts more efficiently by returning them to the sending process, which delivers them to its own receivers on the main thread. A self-broadcast doesn't raise the process's importance and doesn't prevent a cached process from being frozen, so don't rely on it to keep the app running or to do background work.
- Don't start activities from a `BroadcastReceiver` in response to a broadcast; prefer a notification for user-facing follow-up.

## Related

- [BroadcastReceiver](./broadcastreceiver.md)
- [Registering broadcast receivers](./registering-receivers.md)
- [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md)
