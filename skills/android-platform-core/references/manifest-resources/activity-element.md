# activity element

Declares an `Activity` component within `<application>` and its window/behavior attributes.

## Signature / Usage

```xml
<application>
    <activity
        android:name=".MainActivity"
        android:exported="true"
        android:launchMode="singleTask"
        android:configChanges="orientation|screenSize"
        android:windowSoftInputMode="adjustResize|stateHidden"
        android:screenOrientation="portrait">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:exported` | Boolean | `"false"` if no intent filters | Whether the activity can be launched by components of other apps. **Required to be declared explicitly at API level 31+ if the activity has an `<intent-filter>`.** If `"false"` and another app tries to start it, `ActivityNotFoundException` is thrown. |
| `android:launchMode` | Enum | `"standard"` | `"standard"` (new instance per intent), `"singleTop"` (reuses top-of-stack instance via `onNewIntent()`), `"singleTask"` (root of a new task, reused by affinity), `"singleInstance"` (sole member of its task), `"singleInstancePerTask"` (root of any task it appears in). |
| `android:configChanges` | Flags | — | Configuration changes the activity handles itself instead of being restarted, e.g. `"orientation"`, `"screenSize"`, `"keyboardHidden"`, `"locale"`, `"uiMode"`, `"density"`, `"fontScale"`. When handled, `onConfigurationChanged(Configuration)` is called instead of a restart. For multi-window (API 24+) also declare `"screenLayout"` and `"smallestScreenSize"`. |
| `android:windowSoftInputMode` | Flags | `"stateUnspecified\|adjustUnspecified"` | Soft keyboard visibility (`stateHidden`, `stateVisible`, `stateAlwaysHidden`, `stateAlwaysVisible`, ...) and layout adjustment (`adjustResize`, `adjustPan`) when the activity gains focus. |
| `android:screenOrientation` | Enum | `"unspecified"` | Requested orientation, e.g. `"portrait"`, `"landscape"`, `"sensorLandscape"`, `"userPortrait"`, `"locked"`, `"fullSensor"`. Declaring landscape/portrait enables Google Play device filtering. |
| `android:parentActivityName` | String | — | Logical parent for Up navigation. |
| `android:permission` | String | inherited from `<application>` | Permission required to launch this activity. |

## Notes

- Contained in: `<application>`. Can contain: `<intent-filter>`, `<meta-data>`, `<layout>`, `<property>`.
- API level 36 (Android 16): the system ignores fixed-orientation `screenOrientation` values (`portrait`, `landscape`, `reversePortrait`, `reverseLandscape`, `sensorPortrait`, `sensorLandscape`, `userPortrait`, `userLandscape`) for apps targeting Android 16+ on devices with smallest width ≥ 600dp.
- To be consistent with `screenOrientation` filtering, also declare a matching `<uses-feature android:name="android.hardware.screen.portrait"/>`.
- Multi-window mode treats `screenOrientation` as a suggestion only; may result in letterboxing. Device manufacturers can ignore it on API 12+ to improve layout.

## Related

- [application element](./application-element.md)
- [queries element](./queries-element.md)
