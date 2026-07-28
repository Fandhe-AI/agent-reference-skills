# Data Saver (restrictBackgroundStatus)

APIs for respecting the user's Data Saver preference (Android 7.0/API 24+) and limiting data consumption on metered networks.

## Signature / Usage

```kotlin
(getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager).apply {
    if (isActiveNetworkMetered) {
        when (restrictBackgroundStatus) {
            RESTRICT_BACKGROUND_STATUS_ENABLED -> {
                // Background data blocked; limit foreground usage too
            }
            RESTRICT_BACKGROUND_STATUS_WHITELISTED -> {
                // App is whitelisted, but still limit data usage
            }
            RESTRICT_BACKGROUND_STATUS_DISABLED -> {
                // Data Saver disabled; still use less data on a metered network
            }
        }
    }
}
```

```kotlin
// Monitor changes dynamically (manifest-registered receivers won't get this broadcast)
context.registerReceiver(broadcastReceiver, IntentFilter(ConnectivityManager.ACTION_RESTRICT_BACKGROUND_CHANGED))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isActiveNetworkMetered` | `Boolean` | — | Whether the current default network bills the user for data. |
| `restrictBackgroundStatus` | `Int` | — | One of `RESTRICT_BACKGROUND_STATUS_DISABLED` / `_ENABLED` / `_WHITELISTED`. |
| `ACTION_RESTRICT_BACKGROUND_CHANGED` | broadcast action | — | Fired when the user changes the Data Saver setting; must be registered dynamically. |

## Notes

- `RESTRICT_BACKGROUND_STATUS_WHITELISTED` means the app may bypass background data blocking, but should still minimize usage.
- Requesting an exemption from restrictions requires sending the user to `Settings.ACTION_IGNORE_BACKGROUND_DATA_RESTRICTIONS_SETTINGS`.
- For local testing, use `adb shell cmd netpolicy set restrict-background true|false`.

## Related

- [ConnectivityManager](./connectivitymanager.md)
