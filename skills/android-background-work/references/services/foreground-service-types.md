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
| `connectedDevice` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_CONNECTED_DEVICE`. For Bluetooth/NFC/IR/USB/network device interactions; needs at least one of: a manifest permission among `CHANGE_NETWORK_STATE`, `CHANGE_WIFI_STATE`, `CHANGE_WIFI_MULTICAST_STATE`, `NFC`, `TRANSMIT_IR`; a granted runtime permission among `BLUETOOTH_CONNECT`, `BLUETOOTH_ADVERTISE`, `BLUETOOTH_SCAN`, `UWB_RANGING`; or a call to `UsbManager.requestPermission()`. |
| `dataSync` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_DATA_SYNC`. Upload/download, backup, import/export. No runtime prerequisite. Android 15+: cannot launch from `BOOT_COMPLETED`; subject to a 6-hour/24-hour timeout (see [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)). |
| `health` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_HEALTH`. Fitness/health tracking; needs the `HIGH_SAMPLING_RATE_SENSORS` manifest permission, or a granted runtime permission among `BODY_SENSORS` (API 35 and lower), `READ_HEART_RATE`, `READ_SKIN_TEMPERATURE`, `READ_OXYGEN_SATURATION`, `ACTIVITY_RECOGNITION`; while-in-use restricted for body-sensor and sensor-based `READ_*` permissions (background use needs `BODY_SENSORS_BACKGROUND` on API 33-35 or `READ_HEALTH_DATA_IN_BACKGROUND` on API 36). |
| `location` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_LOCATION`. Needs `ACCESS_COARSE_LOCATION`/`ACCESS_FINE_LOCATION`; while-in-use restricted; `ACCESS_BACKGROUND_LOCATION` needed for background access. |
| `mediaPlayback` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MEDIA_PLAYBACK`. Audio/video playback. No runtime prerequisite. Android 15+: cannot launch from `BOOT_COMPLETED`. |
| `mediaProcessing` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MEDIA_PROCESSING`. Time-consuming media conversion. Subject to a 6-hour/24-hour timeout; should implement `Service.onTimeout(int, int)`, which exists only on Android 15 (API 35)+ (the `mediaProcessing` type and its timeout are Android 15 (API 35)+ features). |
| `mediaProjection` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MEDIA_PROJECTION`. Screen capture/projection; requires user consent via `createScreenCaptureIntent()`. Android 15+: cannot launch from `BOOT_COMPLETED`. |
| `microphone` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_MICROPHONE`. Requires granted `RECORD_AUDIO`; while-in-use restricted; cannot start from background/`BOOT_COMPLETED`. |
| `phoneCall` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_PHONE_CALL`. Requires `MANAGE_OWN_CALLS` or default-dialer role. Android 15+: cannot launch from `BOOT_COMPLETED`. |
| `remoteMessaging` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_REMOTE_MESSAGING`. Cross-device text message transfer. No runtime prerequisite. |
| `shortService` | `foregroundServiceType` value | — | Permission: none (base `FOREGROUND_SERVICE` only). ~3-minute timeout from `startForeground()`; no sticky support; cannot start other foreground services; implement `Service.onTimeout()` (API 34+, Android 14+; absent on Android 13 and lower) or the app ANRs after the timeout; calling `startForeground()` again with the type while visible or exempt extends the timeout by another ~3 minutes. |
| `specialUse` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_SPECIAL_USE`. For cases not covered by other types; must declare a `PROPERTY_SPECIAL_USE_FGS_SUBTYPE` `<property>` explaining the use case. |
| `systemExempted` | `foregroundServiceType` value | — | Permission: `FOREGROUND_SERVICE_SYSTEM_EXEMPTED`. Reserved for system apps and specific integrations: demo-mode devices, device owners, profile owners, `ROLE_EMERGENCY` safety apps, device admin apps, apps holding `SCHEDULE_EXACT_ALARM` or `USE_EXACT_ALARM`, and VPN apps; otherwise `ForegroundServiceTypeNotAllowedException` is thrown. |

## Notes

- All types still require the base `android.permission.FOREGROUND_SERVICE` in addition to the type-specific permission.
- Multiple types can be combined in the manifest with `|` (e.g. `camera|microphone`) and by bitwise-OR-ing the corresponding constants at `startForeground()` time.
- API 34+ (Android 14+) apps that declare no `foregroundServiceType` at all in the manifest throw `MissingForegroundServiceTypeException` from `startForeground()`. Calling `startForeground()` with a type that is not among the type(s) actually declared in the manifest throws `IllegalArgumentException`. Missing the base `FOREGROUND_SERVICE` permission or a type's runtime permission throws `SecurityException`.
- Apps targeting API 34+ must also declare the foreground service type in the Google Play Console (App content policy) for review.
- A `shortService` combined with another foreground service type is ignored (the other types' prerequisites still apply); disabling battery optimization does not lift the `shortService` timeout; an ANR from an ignored `shortService` timeout occurs even if other foreground services are running.
- `mediaProcessing` timeout and `Service.onTimeout(int, int)`: introduced in Android 15 (API 35) together with the `mediaProcessing` type, per the foreground service timeouts page.
- Source: https://developer.android.com/develop/background-work/services/fgs/service-types (fetched 2026-11-14)

## Related

- [Foreground service](./foreground-service.md)
- [Foreground service time limits (Android 15+)](./foreground-service-timeout.md)
- [`<service>` manifest element](./service-manifest.md)
