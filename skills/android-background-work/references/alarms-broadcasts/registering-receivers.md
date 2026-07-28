# Registering broadcast receivers

Two ways to make a `BroadcastReceiver` known to the system: declaring it in the manifest, or registering it dynamically in code with `registerReceiver()`.

## Signature / Usage

```kotlin
// Context-registered
val filter = IntentFilter("com.example.snippets.ACTION_UPDATE_DATA")
val flags = ContextCompat.RECEIVER_NOT_EXPORTED
ContextCompat.registerReceiver(context, myBroadcastReceiver, filter, flags)
// ...
context.unregisterReceiver(myBroadcastReceiver)
```

```xml
<!-- Manifest-declared -->
<receiver
    android:name=".MyBroadcastReceiver"
    android:exported="false">
    <intent-filter>
        <action android:name="com.example.snippets.ACTION_UPDATE_DATA" />
    </intent-filter>
</receiver>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ContextCompat.registerReceiver(context, receiver, filter, flags)` | method | — | Registers a context-registered receiver, active only between registration and `unregisterReceiver()`. |
| `RECEIVER_EXPORTED` | `int` flag | — | Receiver is visible to broadcasts from the system, other apps, and privileged apps. |
| `RECEIVER_NOT_EXPORTED` | `int` flag | — | Receiver only receives its own app's broadcasts and select system broadcasts (not from privileged apps like Bluetooth). |
| `android:exported` | manifest attribute (`<receiver>`) | — | Manifest equivalent of the export flags; set `true` only if other apps/the system must trigger it. |

## Notes

- **Android 13+/targeting Android 14 (API 34)**: context-registered receivers must explicitly pass `RECEIVER_EXPORTED` or `RECEIVER_NOT_EXPORTED` to `registerReceiver()`, except when registering only for system broadcasts (e.g. battery, connectivity, boot) via plain `Context#registerReceiver()`, which should not specify a flag. Omitting the flag where required is a runtime error.
- Manifest-declared receivers cannot register for most *implicit* broadcasts on Android 8+ (API 26) — see [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md).
- Always unregister context-registered receivers (e.g. in `onDestroy()`/`onStop()`) to avoid leaks; register in the smallest lifecycle scope needed.
- The `<receiver>` manifest element and general `<intent-filter>`/manifest conventions are covered by the `android-platform-core` skill; this page covers the broadcast-specific registration flags only.

## Related

- [BroadcastReceiver](./broadcastreceiver.md)
- [Implicit broadcast restrictions](./implicit-broadcast-restrictions.md)
- [Sending broadcasts](./sending-broadcasts.md)
