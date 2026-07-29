# manifest element

Root element of `AndroidManifest.xml`. Declares the app's namespace, package identity, and version.

## Signature / Usage

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="_string_"
          android:sharedUserId="_string_"
          android:sharedUserLabel="_string resource_"
          android:sharedUserMaxSdkVersion="_integer_"
          android:versionCode="_integer_"
          android:versionName="_string_"
          android:installLocation=["auto" | "internalOnly" | "preferExternal"] >
    ...
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `xmlns:android` | String | — | Namespace declaration, always `"http://schemas.android.com/apk/res/android"`. |
| `package` | String | — | App's universally unique application ID. Since AGP 7.3, set `applicationId` in build config instead of this attribute directly. Changing it after release creates a new app; existing users won't get updates. |
| `android:versionCode` | Integer | — | Internal version number for comparison logic only, not shown to users. Must be greater than 0. |
| `android:versionName` | String | — | Version string shown to users; can be a raw string or string resource reference. |
| `android:sharedUserId` | String | — | Deprecated (API 29+). Linux user ID shared with other apps. |
| `android:sharedUserLabel` | String resource | — | Deprecated (API 29+). Label for the shared user ID. |
| `android:sharedUserMaxSdkVersion` | Integer | — | Deprecated. Max SDK version to use `sharedUserId` (introduced API 33). |
| `android:installLocation` | Enum | `"internalOnly"` | Default install location: `"internalOnly"`, `"auto"`, or `"preferExternal"`. Introduced API 8. |
| `android:targetSandboxVersion` | Integer | `1` | Sandbox security level: `1` or `2`. Level 2 disables cleartext traffic by default and disallows UID sharing. |

## Notes

- Contained in: none (root element). Must contain `<application>`.
- Can also contain `<attribution>`, `<compatible-screens>`, `<instrumentation>`, `<permission>`, `<permission-group>`, `<permission-tree>`, `<queries>`, `<supports-gl-texture>`, `<supports-screens>`, `<uses-configuration>`, `<uses-feature>`, `<uses-library>`, `<uses-native-library>`, `<uses-permission>`, `<uses-permission-sdk-23>`, `<uses-sdk>`.
- Introduced in API level 1.

## Related

- [application element](./application-element.md)
- [manifest merging and placeholders](./manifest-merging.md)
- [permission / permission-group / permission-tree elements](./permission-element.md)
- [instrumentation / profileable elements](./instrumentation-element.md)
- [compatible-screens / supports-screens / supports-gl-texture / uses-configuration elements](./supports-screens-element.md)
