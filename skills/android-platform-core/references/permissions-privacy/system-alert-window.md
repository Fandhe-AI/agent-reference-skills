# SYSTEM_ALERT_WINDOW (Display Over Other Apps)

Special permission that lets an app draw a window on top of other apps. On Android 6.0 (API 23) and higher the user must explicitly grant it from a settings screen; there is no system permission dialog.

## Signature / Usage

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (Settings.canDrawOverlays(context)) {
        startOverlayWindow()
    } else {
        val intent = Intent(
            Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
            Uri.parse("package:$packageName")
        )
        startActivityForResult(intent, OVERLAY_PERMISSION_REQUEST_CODE)
    }
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (requestCode == OVERLAY_PERMISSION_REQUEST_CODE && Settings.canDrawOverlays(this)) {
        startOverlayWindow()
    }
}
```

```xml
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Settings.canDrawOverlays(context)` | function | — | Returns `true` if the app currently has overlay-drawing permission. |
| `Settings.ACTION_MANAGE_OVERLAY_PERMISSION` | intent action | — | Opens the system settings screen where the user grants/revokes the permission. |

## Notes

- Since Android 11 (API 30), `ACTION_MANAGE_OVERLAY_PERMISSION` always opens the top-level Settings list rather than an app-specific page (a per-package deep link was possible on earlier versions).
- Apps capturing the screen via `MediaProjection` are auto-granted `SYSTEM_ALERT_WINDOW` for the duration of the capture, unless the user has explicitly denied it; the grant is revoked when capture stops.
- Apps targeting Android 15 (API 35)+ must hold the permission and currently have a visible overlay window for certain overlay-dependent behaviors to apply.

## Related

- [special-permissions-overview](./special-permissions-overview.md)
- [manage-external-storage](./manage-external-storage.md)
