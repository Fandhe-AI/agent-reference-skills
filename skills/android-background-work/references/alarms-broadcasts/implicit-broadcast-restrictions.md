# Implicit broadcast restrictions

Since Android 8.0 (API 26), manifest-declared receivers cannot register for most implicit broadcasts (broadcasts not explicitly targeting the app), with a documented exception list.

## Signature / Usage

```kotlin
// Workaround: use a context-registered receiver while the app is active
ContextCompat.registerReceiver(context, receiver, filter, ContextCompat.RECEIVER_NOT_EXPORTED)
```

## Notes

- **Android 8.0+ (API 26)**: manifest-declared receivers can no longer register for most implicit broadcasts; use context-registered receivers instead for non-exempted actions.
- **Exempted implicit broadcasts** (still deliverable to manifest-declared receivers) include, among others: `ACTION_LOCKED_BOOT_COMPLETED`, `ACTION_BOOT_COMPLETED`, `ACTION_USER_INITIALIZE`, `USER_ADDED`/`USER_REMOVED`, `TIME_SET`, `ACTION_TIMEZONE_CHANGED`, `ACTION_NEXT_ALARM_CLOCK_CHANGED`, `ACTION_LOCALE_CHANGED`, USB attach/detach actions, Bluetooth connection-state actions, `ACTION_CARRIER_CONFIG_CHANGED`, telephony subscription-changed actions, `ACTION_PHONE_STATE_CHANGED`, account-changed actions, `ACTION_PACKAGE_DATA_CLEARED`, `ACTION_PACKAGE_FULLY_REMOVED`, `ACTION_NEW_OUTGOING_CALL`, media mount/eject actions, `SMS_RECEIVED_ACTION`, `WAP_PUSH_RECEIVED_ACTION`, `ACTION_DEVICE_OWNER_CHANGED`, `ACTION_EVENT_REMINDER`. Google recommends avoiding registering for these where possible even though they're exempted.
- **Android 7.0+ (API 24)**: `ACTION_NEW_PICTURE` and `ACTION_NEW_VIDEO` are no longer sent; `CONNECTIVITY_ACTION` must be received via `registerReceiver()`, not manifest declaration.
- **Android 9+ (API 28)**: `NETWORK_STATE_CHANGED_ACTION` no longer includes SSID/BSSID/connection info in its extras; use `WifiManager.getConnectionInfo()` instead.
- **Android 14**: while an app is in a cached state, lower-importance broadcasts like `ACTION_SCREEN_ON` are deferred until the app returns to an active lifecycle; broadcasts marked "important" temporarily pull the app out of the cached state for delivery.
- **Android 16**: `android:priority`/`IntentFilter.setPriority()` ordering for ordered broadcasts is only guaranteed within the same app process; cross-process ordering is not guaranteed, and non-system callers' priority values are clamped to a system-reserved range.

## Related

- [Registering broadcast receivers](./registering-receivers.md)
- [BroadcastReceiver](./broadcastreceiver.md)
- [Rescheduling alarms on BOOT_COMPLETED](./boot-completed.md)
