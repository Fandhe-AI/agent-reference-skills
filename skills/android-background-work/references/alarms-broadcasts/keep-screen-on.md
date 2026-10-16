# Keep the screen on (FLAG_KEEP_SCREEN_ON / android:keepScreenOn)

Keep the device screen on from an activity, for apps such as games or movie apps; some Android APIs already keep the screen on automatically.

## Signature / Usage

```kotlin
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }
}
```

Layout XML alternative:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:keepScreenOn="true">
    ...
</RelativeLayout>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON` | window flag | Set via `window.addFlags(...)` in an activity; clear via `clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)`. |
| `android:keepScreenOn` | layout XML attribute | `true` is equivalent to `FLAG_KEEP_SCREEN_ON`. |

## Notes

- The flag may only be set in an activity, never in a service or other app component.
- Setting the flag programmatically allows clearing it later so the screen can turn off; the XML attribute has no such option.
- If an app with the flag goes into the background, the system lets the screen turn off normally; no explicit clear is needed. Clear it when the app no longer needs the screen on.
- TV: use `FLAG_KEEP_SCREEN_ON` to prevent Ambient Mode during active video playback; without it on the foreground activity, the device enters Ambient Mode after a period of inactivity.
- Keeping the screen on can drain the battery quickly; do so for as short a time as possible.

## Related

- [Choose the right API to keep the device awake](./keep-device-awake.md)
- [WakeLock and PowerManager](./wakelock.md)
