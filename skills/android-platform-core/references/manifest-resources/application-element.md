# application element

Declares the application and its global attributes; the container for all app components.

## Signature / Usage

```xml
<application
    android:name=".MyApplication"
    android:label="@string/app_name"
    android:icon="@drawable/ic_launcher"
    android:theme="@style/AppTheme"
    android:allowBackup="true"
    android:networkSecurityConfig="@xml/network_security_config"
    android:enableOnBackInvokedCallback="true">

    <activity android:name=".MainActivity" />
    <service android:name=".MyService" />
    <provider android:name=".MyContentProvider" />
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | none (base `Application` class) | Fully qualified name of an `Application` subclass. |
| `android:icon` | Drawable resource | — | Default icon for the app and all components. |
| `android:label` | String resource | — | Default user-readable label for the app and all components. |
| `android:theme` | Style resource | — | Default theme for all activities; individual activities can override. |
| `android:debuggable` | Boolean | `"false"` | Whether the app can be debugged in user mode. |
| `android:allowBackup` | Boolean | `"true"` | Whether the app participates in the backup/restore infrastructure. On API 31+ affects cloud backups; device-to-device migration may still occur regardless. |
| `android:networkSecurityConfig` | XML resource | — | Reference to a Network Security Configuration file (HTTPS, cleartext traffic, certificate pinning). Introduced API 24. |
| `android:enableOnBackInvokedCallback` | Boolean | `"true"` | Opts the app in/out of predictive back animations and the `OnBackInvokedCallback` platform API. |
| `android:extractNativeLibs` | Boolean | depends on `minSdkVersion`/AGP | Whether the installer extracts native libraries to disk. Deprecated in AGP 4.2.0+ in favor of `useLegacyPackaging` in Gradle. |
| `android:usesCleartextTraffic` | Boolean | `"true"` for API ≤27, `"false"` for API ≥28 | Whether the app intends to use unencrypted HTTP traffic. Deprecated for API 38+ in favor of Network Security Configuration. Honored for WebView on API 26+. |
| `android:requestLegacyExternalStorage` | Boolean | `"false"` | Opts out of scoped storage. The system may not honor this depending on policy. |
| `android:enabled` | Boolean | `"true"` | If `"false"`, overrides all component-level `enabled` settings. |
| `android:permission` | String | — | Default permission clients need to interact with the app; overridable per component. |
| `android:hardwareAccelerated` | Boolean | `"true"` if `minSdkVersion`/`targetSdkVersion` ≥14 | Enables OpenGL hardware acceleration for 2D graphics. |
| `android:supportsRtl` | Boolean | `"false"` | Enables RTL layout support; requires `targetSdkVersion` ≥17 for RTL APIs to activate. Introduced API 17. |
| `android:description` | String resource | — | Longer descriptive text about the app. |

## Notes

- Contained in: `<manifest>`.
- Can contain: `<activity>`, `<activity-alias>`, `<service>`, `<receiver>`, `<provider>`, `<meta-data>`, `<uses-library>`, `<uses-native-library>`, `<profileable>`, `<property>`.

## Related

- [manifest element](./manifest-element.md)
- [activity element](./activity-element.md)
- [style and theme resources](./style-theme-resources.md)
