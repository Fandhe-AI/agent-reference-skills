# AndroidManifest.xml Structure

Required XML configuration file at the root of an app's source set describing app components, permissions, and device compatibility to the build tools, OS, and Google Play.

## Signature / Usage

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-sdk android:minSdkVersion="15" android:targetSdkVersion="26" />

    <application
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## Notes

- Only `<manifest>` (root) and `<application>` (must be the last element inside `<manifest>`) are required top-level elements.
- App components (`<activity>`, `<service>`, `<receiver>`, `<provider>`) must be declared with a fully qualified class name, or a relative name with a leading period (e.g. `.MainActivity`) which auto-completes the app's package namespace.
- All attribute names except on the root `<manifest>` element begin with the `android:` prefix. Values are set via attributes, never element text content.
- Multiple values are expressed by repeating an element (e.g. multiple `<action>` inside one `<intent-filter>`), not by listing values in one attribute.
- Manifest limits: max 1000 `<package>`, 1000 `<meta-data>`, 1000 `<uses-library>` elements; attribute name length max 1024 chars; `versionName` max 1024 chars; host attribute max 255 chars.

## Related

- [manifest element](./manifest-element.md)
- [application element](./application-element.md)
- [activity element](./activity-element.md)
