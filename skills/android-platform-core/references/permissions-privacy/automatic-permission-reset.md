# Automatic Permission Reset for Unused Apps

If an app targets Android 11 (API level 30) or higher and is unused for a few months, the system automatically resets all runtime permissions the user had granted, equivalent to the user manually setting each to "Deny" in system settings.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Trigger | behavior | — | The app enters the restricted App Standby Bucket after prolonged inactivity, then has its granted runtime (dangerous) permissions reset. |
| Restricted bucket inactivity threshold | duration | — | Android 12/12L (API 31/32): 45 days without user interaction. Android 13+ (API 33+): 8 days. Device-off time does not count toward the threshold. |
| Scope | — | — | Applies only to runtime permissions (those requiring a user prompt); install-time (`normal`/`signature`) permissions are unaffected. |

## Signature / Usage

```bash
# Inspect permission flags to see whether they've been reset (USER_SET/USER_FIXED)
adb shell dumpsys package PACKAGE_NAME

# Check the app's current standby bucket
adb shell am get-standby-bucket PACKAGE_NAME
```

## Notes

- No code change is required if the app already follows runtime-permission best practices (checking `checkSelfPermission()` before every protected operation) — the app simply re-requests the permission the next time the relevant feature is used.
- The user can opt an app out of auto-reset from the app's system settings page ("Remove permissions if app isn't used").
- Introduced in Android 11 (API 30); applies to apps that target API 30+, regardless of the device's actual OS version once support was backported via Google Play system updates.

## Related

- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [permission-groups-and-one-time-permission](./permission-groups-and-one-time-permission.md)
