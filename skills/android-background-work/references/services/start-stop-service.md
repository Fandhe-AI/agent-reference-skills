# startService / startForegroundService / stopSelf / stopService

`Context` and `Service` methods for launching and terminating a started service.

## Signature / Usage

```kotlin
// Start a regular started service
context.startService(Intent(context, HelloService::class.java))

// API 26+: use startForegroundService() when the service will promote itself
// to the foreground; the service must call startForeground() within a few
// seconds of being created.
context.startForegroundService(Intent(context, HelloService::class.java))

// From within the service
stopSelf()           // stop immediately
stopSelf(startId)    // stop only if this was the most recent start request

// From another component
context.stopService(Intent(context, HelloService::class.java))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Context.startService(Intent)` | method | — | Starts a service; on API 26+ throws `IllegalStateException` if the app is in the background and the target requires foreground promotion. |
| `Context.startForegroundService(Intent)` | method | — | Starts a service that is expected to call `startForeground()` shortly after creation. Required for launching foreground services on API 26+. |
| `Service.stopSelf()` | method | — | Stops the service unconditionally, regardless of pending start requests. |
| `Service.stopSelf(Int startId)` | method | — | Stops the service only if `startId` matches the most recent `onStartCommand()` call; use this when handling multiple concurrent requests. |
| `Context.stopService(Intent)` | method | — | Stops the service from outside; also removes the notification if the service was in the foreground. |

## Notes

- After `startForegroundService()`, the service must call `startForeground()` promptly (see [Foreground service](./foreground-service.md)) or the system throws `ForegroundServiceDidNotStartInTimeException`.
- Stopping a service does not immediately destroy it if other components are still bound to it; see [Bound service](./bound-service.md) for combined started+bound lifecycle.
- API 31+ (Android 12+, targeting): `startForegroundService()` from the background is restricted; see [Foreground service launch restrictions](./foreground-service-restrictions.md).

## Related

- [Service](./service.md)
- [onStartCommand() return values](./start-command-return-values.md)
- [Foreground service](./foreground-service.md)
