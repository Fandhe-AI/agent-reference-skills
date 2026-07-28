# service element

Declares a `Service` component and its access-control attributes. See `android-background-work` for service behavior.

## Signature / Usage

```xml
<service
    android:name=".MyBackgroundService"
    android:exported="false"
    android:foregroundServiceType="location"
    android:permission="com.example.permission.USE_SERVICE" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Fully qualified class name of the `Service` subclass. |
| `android:enabled` | Boolean | `"true"` | Whether the system can instantiate the service; both `<application>` and `<service>` must be `"true"`. |
| `android:exported` | Boolean | `"true"` if intent filters present, else `"false"` | Whether other apps can invoke the service. |
| `android:foregroundServiceType` | Enum flags | none | Use-case declared for a foreground service, e.g. `"location"`, `"camera"`, `"microphone"`, `"mediaPlayback"`, `"phoneCall"`, `"dataSync"`, `"health"`, `"specialUse"`. |
| `android:isolatedProcess` | Boolean | `"false"` | If `"true"`, runs in an isolated process with no permissions of its own; accessible only via the Service API. |
| `android:permission` | String | inherited from `<application>` | Permission required to start/bind the service. |
| `android:process` | String | default app process | Process the service runs in; `:`-prefix for private, lowercase name for global. |
| `android:directBootAware` | Boolean | `"false"` | Whether the service can run before the user unlocks the device. |
| `android:stopWithTask` | Boolean | `"false"` | If `"true"`, the system stops the service automatically when the user removes its task. |

## Notes

- Contained in: `<application>`. Can contain `<intent-filter>`, `<meta-data>`, `<property>`.
- This page covers manifest attributes only; `Service` implementation, foreground-service behavior, and background execution limits are owned by `android-background-work`.
- Changing the service class name after publication breaks existing installs unless `exported="false"`.

## Related

- [receiver element](./receiver-element.md)
- [application element](./application-element.md)
