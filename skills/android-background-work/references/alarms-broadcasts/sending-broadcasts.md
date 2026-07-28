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
| `sendOrderedBroadcast(intent, receiverPermission)` | method | — | Delivers to one receiver at a time in priority order (`android:priority`); each receiver can propagate result data to the next or call `abortBroadcast()` to stop delivery. |
| `setPackage(String)` | `Intent` method | — | Restricts an implicit broadcast `Intent` to a specific package. |

## Notes

- Local (intra-app) broadcasting via `LocalBroadcastManager` is **deprecated**; use it only for backward compatibility. Prefer context-registered receivers with `RECEIVER_NOT_EXPORTED`, or reactive in-process solutions (`Flow`/`SharedFlow`, `LiveData`) — see the [coroutines-flow README](../coroutines-flow/README.md) for `Flow`/`SharedFlow` usage.
- Don't broadcast sensitive data via implicit intents; any registered app could receive it. Use `setPackage()` and/or a permission to scope delivery.
- Don't start activities from a `BroadcastReceiver` in response to a broadcast; prefer a notification for user-facing follow-up.

## Related

- [BroadcastReceiver](./broadcastreceiver.md)
- [Registering broadcast receivers](./registering-receivers.md)
- [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md)
