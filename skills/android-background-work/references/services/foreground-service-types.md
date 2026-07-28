# foregroundServiceType

Manifest attribute (and matching `ServiceInfo.FOREGROUND_SERVICE_TYPE_*` constant) that declares what kind of work a foreground service performs. Required for apps targeting API 34+ (Android 14), together with the corresponding runtime permission.

## Signature / Usage

```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

<service
    android:name=".LocationTrackingService"
    android:foregroundServiceType="location" />
```

```kotlin
// Inside onStartCommand()/onCreate(), matching the declared manifest type
ServiceCompat.startForeground(
    this,
    NOTIFICATION_ID,
    notification,
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
    else 0,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `camera` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_CAMERA`. Requires granted `CAMERA` runtime permission; while-in-use restricted; cannot start from background/`BOOT_COMPLETED`. |
| `connectedDevice` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_CONNECTED_DEVICE`. For Bluetooth/NFC/USB/network device interactions; needs a matching device permission (`BLUETOOTH_CONNECT`, `NFC`, etc.). |
| `dataSync` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_DATA_SYNC`. Upload/download, backup, import/export. No runtime prerequisite. Android 15+: cannot launch from `BOOT_COMPLETED`; subject to a 6-hour/24-hour timeout (see [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)). |
| `health` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_HEALTH`. Fitness/health tracking; needs `BODY_SENSORS`/`READ_HEART_RATE`/etc. |
| `location` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_LOCATION`. Needs `ACCESS_COARSE_LOCATION`/`ACCESS_FINE_LOCATION`; while-in-use restricted; `ACCESS_BACKGROUND_LOCATION` needed for background access. |
| `mediaPlayback` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MEDIA_PLAYBACK`. Audio/video playback. No runtime prerequisite. Android 15+: cannot launch from `BOOT_COMPLETED`. |
| `mediaProcessing` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MEDIA_PROCESSING`. Time-consuming media conversion. Subject to a 6-hour/24-hour timeout; must implement `Service.onTimeout(int, int)` (API 34+, Android 14+). |
| `mediaProjection` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MEDIA_PROJECTION`. Screen capture/projection; requires user consent via `createScreenCaptureIntent()`. Android 15+: cannot launch from `BOOT_COMPLETED`. |
| `microphone` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MICROPHONE`. Requires granted `RECORD_AUDIO`; while-in-use restricted; cannot start from background/`BOOT_COMPLETED`. |
| `phoneCall` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_PHONE_CALL`. Requires `MANAGE_OWN_CALLS` or default-dialer role. Android 15+: cannot launch from `BOOT_COMPLETED`. |
| `remoteMessaging` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_REMOTE_MESSAGING`. Cross-device text message transfer. No runtime prerequisite. |
| `shortService` | `foregroundServiceType` value | — | Permission: none (base `FOREGROUND_SERVICE` only). ~3-minute timeout from `startForeground()`; no sticky support; cannot start other foreground services; must implement `onTimeout()` (API 34+, Android 14+) or the app ANRs. |
| `specialUse` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_SPECIAL_USE`. For cases not covered by other types; must declare a `PROPERTY_SPECIAL_USE_FGS_SUBTYPE` `<property>` explaining the use case. |
| `systemExempted` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_SYSTEM_EXEMPTED`. Reserved for system apps, device/profile owners, VPN apps, emergency role holders, etc. |

## Notes

- All types still require the base `android.permission.FOREGROUND_SERVICE` in addition to the type-specific permission.
- Multiple types can be combined in the manifest with `|` (e.g. `camera|microphone`) and by bitwise-OR-ing the corresponding constants at `startForeground()` time.
- Calling `startForeground()` with a type not declared in the manifest throws `MissingForegroundServiceTypeException` on API 34+ (Android 14+).
- Apps targeting API 34+ must also declare the foreground service type in the Google Play Console (App content policy) for review.

## Related

- [Foreground service](./foreground-service.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
- [`<service>` manifest element](./service-manifest.md)
