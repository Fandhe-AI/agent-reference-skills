# onStartCommand() return values

Constants returned from `Service.onStartCommand()` that tell the system how to handle the service if it is killed while running.

## Signature / Usage

```kotlin
override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
    // ... do work ...
    return START_STICKY
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `START_NOT_STICKY` | `Int` constant | — | Do not recreate the service after it's killed, unless there are pending intents to deliver. Safest option; avoids running the service unnecessarily. |
| `START_STICKY` | `Int` constant | — | Recreate the service after it's killed, but do not redeliver the last intent — `onStartCommand()` is called with a `null` intent. Suitable for services like media players that don't act on commands but run indefinitely. |
| `START_REDELIVER_INTENT` | `Int` constant | — | Recreate the service after it's killed and redeliver the last intent that was delivered. Suitable for services actively performing work that should resume, such as file downloads. |

## Notes

- The return value only affects behavior when the system kills the process to reclaim memory; it has no effect on a normal `stopSelf()`/`stopService()` shutdown.
- Applies only to started services (`startService()`/`startForegroundService()`), not to bound services.

## Related

- [Service](./service.md)
- [startService / startForegroundService / stopSelf / stopService](./start-stop-service.md)
