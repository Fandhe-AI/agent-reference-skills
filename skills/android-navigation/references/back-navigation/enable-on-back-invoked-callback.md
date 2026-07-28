# android:enableOnBackInvokedCallback

Manifest attribute that opts an app (or a single activity) into the platform predictive back dispatcher, enabling system predictive-back animations and `OnBackInvokedCallback` dispatch.

## Signature / Usage

```xml
<manifest ...>
    <application
        android:enableOnBackInvokedCallback="true">

        <!-- Override the app-level setting per activity (API 35+) -->
        <activity
            android:name=".SecondActivity"
            android:enableOnBackInvokedCallback="false" />
    </application>
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:enableOnBackInvokedCallback` (`<application>`) | `Boolean` | `false`, unless targetSdkVersion is 36 (Android 16)+ | App-wide opt-in to the predictive back dispatcher and system predictive-back animations. Set `false` to opt out and instruct the system to ignore `OnBackInvokedCallback` calls. |
| `android:enableOnBackInvokedCallback` (`<activity>`) | `Boolean` | inherits `<application>` value | Per-activity override of the app-level setting. |

## Notes

- API level dependency / opt-in: for apps with targetSdkVersion 36 (Android 16)+ running on an Android 16+ device, predictive back system animations (back-to-home, cross-task, cross-activity) are enabled **by default** and `onBackPressed()`/`KeyEvent.KEYCODE_BACK` are no longer dispatched — explicit opt-out requires setting this attribute to `false`. Below targetSdk 36, the attribute must be explicitly set to `true` to opt in.
- Setting it to `"false"` disables the predictive back gesture system animation and causes the system to ignore `OnBackInvokedCallback` registrations, but `OnBackPressedCallback` (AndroidX) continues to work unaffected — it is backward compatible regardless of this flag.
- On Android 13–14, users must enable **Settings > System > Developer options > Predictive back animations** to preview the system animation even when the app has opted in; on Android 15+ this developer option is no longer needed.
- Migrate away from `KeyEvent.KEYCODE_BACK` interception, `Activity.onBackPressed()`, and `Dialog.onBackPressed()` before opting in — these are not supported by the predictive back dispatch path.

## Related

- [OnBackInvokedDispatcher](./on-back-invoked-dispatcher.md)
- [Predictive back animations](./predictive-back-animations.md)
- [PredictiveBackHandler](./predictive-back-handler.md)
