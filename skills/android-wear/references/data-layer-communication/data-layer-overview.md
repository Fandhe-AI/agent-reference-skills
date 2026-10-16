# Data Layer API overview (Wearable / WearableOptions / client comparison)

The Wearable Data Layer API (part of Google Play services) is the communication channel between a Wear OS watch and a connected Android handheld, used to synchronize and transfer data between them. Clients such as `DataClient` and `MessageClient` are obtained from the `Wearable` class.

## Signature / Usage

```kotlin
// build.gradle.kts of the Wear module
dependencies {
    implementation("com.google.android.gms:play-services-wearable:20.0.1")
}
```

```kotlin
val dataClient = Wearable.getDataClient(this)
```

Check availability before use (otherwise an exception occurs):

```kotlin
val available = try {
    GoogleApiAvailability.getInstance()
        .checkApiAvailability(client)
        .await()
    true
} catch (e: AvailabilityException) {
    // API is not available in this device.
    false
}
```

## Options / Props

| Topic | Detail |
| --- | --- |
| Transport: Bluetooth | Used when devices are connected over Bluetooth; a single encrypted channel using standard Bluetooth encryption, managed by Google Play services. |
| Transport: Cloud | Data is automatically routed through Google Cloud when Bluetooth is unavailable; end-to-end encrypted. Assume data may at some point use Google-owned servers. |
| Security | The package name and the package signature must match across the Wear OS and handheld apps; no other apps can access the data. |
| `Wearable.getDataClient(context)` | Gets a `DataClient` (also `MessageClient` and other clients). With an `Activity` context, some interactions (e.g. asking the user to update Google Play services) appear as dialogs rather than notifications. |
| `WearableOptions` | Specify a custom `Looper` so listener callbacks are not made on the main UI thread (see `WearableOptions.Builder`). Default: callbacks on the app's main UI thread. |

Use the Data Layer API when the interaction is strictly between watch and phone (remote control, "Open on Phone" app launching, authentication bridging such as sending a session token from phone to watch during setup). Use existing cloud infrastructure for saving data, fetching content and syncing state.

## Notes

- Only available on Wear OS watches and paired Android devices. For watches paired with iOS phones, apps query cloud-based APIs when internet is available (see Direct network access).
- Caution (source): the data layer APIs are the only APIs to set up handheld-wearable communication; do not open low-level sockets.
- Wearable API clients are inexpensive to create: recreate them as needed instead of holding onto them. Client state (e.g. registered listeners) is shared across all clients and survives a Google Play services update while the app runs.
- Horologist provides a data layer helper library to ease initial pairing: install or launch the app on the other device, launch a specific activity on it, launch the companion app.
- Distinct from Wear Compose / Jetpack Compose APIs: this is a Google Play services (`com.google.android.gms.wearable`) API, not an `androidx.*` library.
- Source page last updated 2026-10-14 UTC; sample at `android/wear-os-samples` (`DataLayer`).

## Related

- [DataClient](./dataclient.md)
- [MessageClient](./messageclient.md)
- [ChannelClient](./channelclient.md)
- [CapabilityClient](./capabilityclient.md)
- [NodeClient](./nodeclient.md)
- [Direct network access on standalone devices](./network-access.md)
