# BroadcastReceiver

Component that receives broadcast messages from the Android system or other apps, similar to a publish-subscribe pattern. Delivery timing is not guaranteed.

## Signature / Usage

```kotlin
class MyBroadcastReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == "com.example.snippets.ACTION_UPDATE_DATA") {
            val data = intent.getStringExtra("com.example.snippets.DATA")
            // must return quickly; offload long work via goAsync()
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onReceive(context, intent)` | abstract method | — | Called on the main thread when a matching broadcast arrives; the process is treated as foreground while it runs but the receiver instance is only valid for the duration of this call. |
| `goAsync()` | method | — | Returns a `PendingResult`, allowing work to continue asynchronously past `onReceive()`'s return; must call `pendingResult.finish()` and complete within roughly 10 seconds. |

## Notes

- `onReceive()` must execute quickly (no blocking calls like `Thread.sleep`); the system may kill the hosting process once it returns if no other components are active.
- After `onReceive()` completes, the receiver instance is deactivated; if the process only hosts a manifest-declared receiver, the system may reclaim it.
- For work longer than `goAsync()`'s ~10 second budget, use `JobScheduler`/WorkManager instead. See the [workmanager README](../workmanager/README.md) for periodic/deferrable work.
- For low-latency IPC, prefer a bound service over broadcasts. See the [services README](../services/README.md) for `Service`/bound-service details.

## Related

- [Registering broadcast receivers](./registering-receivers.md)
- [Sending broadcasts](./sending-broadcasts.md)
- [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md)
