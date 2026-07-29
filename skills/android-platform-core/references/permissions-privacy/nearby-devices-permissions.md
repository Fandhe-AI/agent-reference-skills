# Nearby Devices Permissions

Runtime permissions gating Bluetooth and Wi-Fi proximity APIs (`BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, `BLUETOOTH_ADVERTISE`, `NEARBY_WIFI_DEVICES`) and, starting Android 17 (API 37), raw local-network access (`ACCESS_LOCAL_NETWORK`) — all grouped under `NEARBY_DEVICES` so a single grant can cover multiple of them.

## Signature / Usage

```xml
<!-- Bluetooth: Android 12+ (API 31+) -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN"
    android:usesPermissionFlags="neverForLocation" />
<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

<!-- Legacy Bluetooth permissions for API 30 and below -->
<uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" android:maxSdkVersion="30" />

<!-- Wi-Fi proximity (Wi-Fi Aware / Wi-Fi Direct): Android 13+ (API 33+) -->
<uses-permission android:name="android.permission.NEARBY_WIFI_DEVICES"
    android:usesPermissionFlags="neverForLocation" />

<!-- Raw local-network sockets / mDNS / SSDP: Android 17+ (API 37+) -->
<uses-permission android:name="android.permission.ACCESS_LOCAL_NETWORK" />
```

```kotlin
// Runtime request, same pattern for all permissions in this group
ActivityCompat.requestPermissions(
    this,
    arrayOf(Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT),
    REQUEST_CODE
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `BLUETOOTH_SCAN` | dangerous permission (API 31+) | — | Required to scan for Bluetooth devices (classic or BLE); add `android:usesPermissionFlags="neverForLocation"` if scan results are never used to derive physical location. |
| `BLUETOOTH_ADVERTISE` | dangerous permission (API 31+) | — | Required to make the local device discoverable to other Bluetooth devices. |
| `BLUETOOTH_CONNECT` | dangerous permission (API 31+) | — | Required to communicate with already-paired Bluetooth devices, including retrieving a paired device's name. |
| `NEARBY_WIFI_DEVICES` | dangerous permission (API 33+) | — | Required for Wi-Fi Aware (NAN), Wi-Fi Direct, and related proximity APIs; add `android:usesPermissionFlags="neverForLocation"` if the app never derives location from Wi-Fi scan results. |
| `ACCESS_LOCAL_NETWORK` | runtime permission (API 37+, opt-in from API 36) | — | Required for apps targeting API 37+ that use raw sockets, mDNS, SSDP, or `NsdManager` against local-network addresses; without it, such traffic times out (TCP) or fails with `EPERM` (UDP). Apps targeting API 36 or lower keep implicit local-network access via `INTERNET`. |
| `android:usesPermissionFlags="neverForLocation"` | manifest attribute | — | Declares the Bluetooth/Wi-Fi permission is never used to derive physical location, which filters out some BLE beacons from scan results but avoids also requiring `ACCESS_FINE_LOCATION`. |

## Notes

- All five permissions belong to the `NEARBY_DEVICES` permission group, so once the user grants one, the system may pre-grant related ones in the same group without a repeated prompt.
- For apps supporting both Android 12+ and older versions, declare the legacy `BLUETOOTH`/`BLUETOOTH_ADMIN` permissions with `android:maxSdkVersion="30"` alongside the new runtime ones.
- `NsdManager` discovery requests built with `DiscoveryRequest.Builder(...).setFlags(DiscoveryRequest.FLAG_SHOW_PICKER)` let the user pick a device through a system picker without the app needing `ACCESS_LOCAL_NETWORK` at all — prefer this over the broad runtime permission when only device discovery/connection is needed.
- `ACCESS_LOCAL_NETWORK` should be declared only by apps targeting SDK 37+; declaring it on a lower-targeting app is not meaningful since enforcement is tied to the app's target SDK.
- On Android 16 (API 36), `ACCESS_LOCAL_NETWORK` enforcement is opt-in and can be toggled for testing with `adb shell am compat enable RESTRICT_LOCAL_NETWORK <package>` (and `disable` to revert), followed by a reboot; enforcement becomes mandatory starting Android 17 (API 37).

## Related

- [permission-groups-and-one-time-permission](./permission-groups-and-one-time-permission.md)
- [location-permissions](./location-permissions.md)
- [permission-types-and-protection-levels](./permission-types-and-protection-levels.md)
- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
