# `<service>` manifest element

Every `Service` subclass must be declared in `AndroidManifest.xml` with a `<service>` element before it can be started or bound.

## Signature / Usage

```xml
<manifest ...>
  <application ...>
      <service android:name=".ExampleService" android:exported="false" />
  </application>
</manifest>
```

```xml
<!-- Foreground service with a declared type (API 34+) and multiple types (API 34+) -->
<service
    android:name=".MyMediaPlaybackService"
    android:foregroundServiceType="mediaPlayback"
    android:exported="false" />

<service
    android:name=".MyService"
    android:foregroundServiceType="camera|microphone"
    android:exported="false" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | string | — | Fully-qualified class name of the `Service` subclass. Required. |
| `android:exported` | boolean | varies | Whether other apps' components can start/bind this service. Set `false` to restrict access to the app itself (recommended unless IPC with other apps is intended). |
| `android:foregroundServiceType` | string | — | Declares the foreground service type(s) this service performs; required for foreground services targeting API 34+. Multiple types separated by `|`. See [foregroundServiceType](./foreground-service-types.md). |
| `android:description` | string resource | — | Explains what the service does; recommended for foreground services. |
| `android:process` | string | app's default process | Process the service runs in. A leading `:` creates a private process local to the app. |

## Notes

- Always start services with explicit intents; avoid implicit intent filters on `<service>` for security reasons.
- Foreground service permissions (base `FOREGROUND_SERVICE` and type-specific `FOREGROUND_SERVICE_*`) are declared separately as `<uses-permission>` elements, not on the `<service>` element itself.
- Calling `startForeground()` for a type not declared in the manifest throws `MissingForegroundServiceTypeException` on API 34+ (Android 14+).

## Related

- [Service](./service.md)
- [foregroundServiceType](./foreground-service-types.md)
- [Foreground service](./foreground-service.md)
