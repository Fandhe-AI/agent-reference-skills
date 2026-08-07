# Background Body Sensor Access

Runtime permission flow required for reading body sensor data (e.g. heart rate) via `PassiveMonitoringClient` while the app is backgrounded, introduced in Android 13 / Wear OS 4.

## Signature / Usage

```xml
<!-- App targets Android 13+ -->
<uses-permission android:name="android.permission.BODY_SENSORS" />
<uses-permission android:name="android.permission.BODY_SENSORS_BACKGROUND" />
```

```kotlin
// Request in two SEPARATE operations — requesting both at once causes the
// system to ignore the request and grant neither permission.
requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS), REQUEST_CODE_FOREGROUND)
// ...after BODY_SENSORS is granted:
requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS_BACKGROUND), REQUEST_CODE_BACKGROUND)
```

## Notes

- Request `BODY_SENSORS` and `BODY_SENSORS_BACKGROUND` in separate calls; a simultaneous request is ignored by the system and neither permission is granted.
- `BODY_SENSORS_BACKGROUND` is a restricted permission — it cannot be held until the installer allowlists the app or the user grants it via system settings. On Android 13+ the runtime dialog has no "Allow all the time" option, so users must enable all-the-time access from Settings.
- Apps targeting API level 36+ that use `PassiveMonitoringClient` should request `READ_HEALTH_DATA_IN_BACKGROUND` instead (see [Health Services Permissions](./healthservicespermissions.md)); this page's `BODY_SENSORS_BACKGROUND` flow applies to API level 33–35 targets.
- If background access is declined, the app loses `BODY_SENSORS` while backgrounded and `PassiveListenerService.onPermissionLost()` is invoked.
- Only request `BODY_SENSORS_BACKGROUND` when critical to a user-facing feature, and disclose it per the platform's privacy best practices.

## Related

- [Health Services Permissions](./healthservicespermissions.md)
- [PassiveMonitoringClient](./passivemonitoringclient.md)
