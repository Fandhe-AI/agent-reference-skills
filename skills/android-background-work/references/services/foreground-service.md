# Foreground service

A service that performs an operation noticeable to the user (e.g. music playback, active navigation) and therefore must display a persistent status bar notification while it runs.

## Signature / Usage

```kotlin
// 1. Start the service
val intent = Intent(context, MyCameraService::class.java)
context.startForegroundService(intent)

// 2. Inside the service, promote it to the foreground (e.g. in onStartCommand())
class MyCameraService : Service() {
    private fun promoteToForeground() {
        val cameraPermission =
            PermissionChecker.checkSelfPermission(this, Manifest.permission.CAMERA)
        if (cameraPermission != PermissionChecker.PERMISSION_GRANTED) {
            stopSelf()
            return
        }
        try {
            val notification = NotificationCompat.Builder(this, "CHANNEL_ID").build()
            ServiceCompat.startForeground(
                this,
                100, // notification id, must not be 0
                notification,
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R)
                    ServiceInfo.FOREGROUND_SERVICE_TYPE_CAMERA
                else 0,
            )
        } catch (e: Exception) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S &&
                e is ForegroundServiceStartNotAllowedException
            ) {
                // App was not in a valid state to start a foreground service.
            }
        }
    }
}

// Stop the service: notification is removed automatically
stopSelf()

// Or drop out of the foreground while the service keeps running
stopForeground(Service.STOP_FOREGROUND_REMOVE)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ServiceCompat.startForeground(service, id, notification, foregroundServiceType)` | method | — | Promotes the service to the foreground. `id` must be non-zero; `notification` must use `PRIORITY_LOW` or higher; `foregroundServiceType` must match a type declared in the manifest (API 29+), or `IllegalArgumentException`/`MissingForegroundServiceTypeException` is thrown (see Notes). Can be called again later with an additional/combined type to add a type to an already-running foreground service. |
| `Service.stopForeground(Int)` | method | — | Removes the service from the foreground while it keeps running. Accepts `STOP_FOREGROUND_REMOVE` or `STOP_FOREGROUND_DETACH` to control notification removal. |

## Notes

- Only use a foreground service for work the user should be actively aware of; for everything else prefer the `workmanager` category or plain background work.
- Launching requires two steps: `startForegroundService()` from the caller, then `ServiceCompat.startForeground()`/`startForeground()` inside the service, which must happen within a few seconds or the system throws `ForegroundServiceDidNotStartInTimeException`.
- API 34+ (Android 14): must request the appropriate `foregroundServiceType` and matching permission, or a `SecurityException` is thrown when promoting to foreground; if the manifest declares no `foregroundServiceType` at all, `startForeground()` throws `MissingForegroundServiceTypeException`; if the manifest declares some type(s) but a different type is passed to `startForeground()`, it throws `IllegalArgumentException`. See [foregroundServiceType](./foreground-service-types.md).
- API 31+ (Android 12): background-start restrictions apply; see [Foreground service launch restrictions](./foreground-service-restrictions.md).
- API 35+ (Android 15): `dataSync`/`mediaProcessing`/`shortService` types are subject to running-time limits; see [Foreground service time limits (Android 15+)](./foreground-service-timeout.md).
- Stopping the service completely (`stopSelf()`/`stopService()`) automatically removes its notification.

## Related

- [foregroundServiceType](./foreground-service-types.md)
- [Foreground service launch restrictions](./foreground-service-restrictions.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
- [`<service>` manifest element](./service-manifest.md)
