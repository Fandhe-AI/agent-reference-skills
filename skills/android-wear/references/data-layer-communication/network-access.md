# Direct network access on standalone devices (ConnectivityManager / FCM / WorkManager)

A Wear OS watch can communicate with a network directly, without a paired phone. Do not use the Data Layer API to connect a Wear OS app to a network; use standard Android networking, FCM and WorkManager.

## Signature / Usage

Request a high-bandwidth (Wi-Fi) network:

```kotlin
val callback = object : ConnectivityManager.NetworkCallback() {
    override fun onAvailable(network: Network) {
        super.onAvailable(network)
        // The Wi-Fi network has been acquired. Bind it to use this network by default.
        connectivityManager.bindProcessToNetwork(network)
    }

    override fun onLost(network: Network) {
        super.onLost(network)
        // Called when a network disconnects or otherwise no longer satisfies this request
        // or callback.
        // Not in the official sample: unbind so traffic is not pinned to a lost network.
        connectivityManager.bindProcessToNetwork(null)
    }
}

fun requestWifiNetwork() {
    connectivityManager.requestNetwork(
        NetworkRequest.Builder().addTransportType(NetworkCapabilities.TRANSPORT_WIFI).build(),
        callback
    )
}
```

Release the network when done:

```kotlin
connectivityManager.bindProcessToNetwork(null)
connectivityManager.unregisterNetworkCallback(callback)
```

Send the user to add a Wi-Fi network (requires the `CHANGE_WIFI_STATE` permission):

```kotlin
val networkSettingsAction = "com.google.android.clockwork.settings.connectivity.wifi.ADD_NETWORK_SETTINGS"
val intent = Intent(networkSettingsAction).apply {
    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
}
context.startActivity(intent)
```

## Options / Props

| Item | Detail |
| --- | --- |
| Protocols | HTTP, TCP and UDP can be used |
| WorkManager `NetworkType` | `CONNECTED` for small transfers, `UNMETERED` for large transfers |
| WorkManager constraints | Network required; while charging; while device idle (low-priority sync) |
| FCM payloads | Notification payload (shown in the notification stream; tap launches the app) and/or data payload (custom key/value pairs delivered to the Wear OS app) |

## Notes

- With a Bluetooth connection to a phone, watch traffic is generally proxied through the phone; otherwise Wi-Fi and cellular are used depending on hardware. The platform handles network transitions.
- `android.webkit` APIs, including `CookieManager`, are not available; use cookies by reading and writing request/response headers.
- Use `WorkManager` for asynchronous requests, including periodic polling. Background tasks must account for Doze and App Standby; WorkManager gives Doze-safe execution.
- The default active network balances battery life and bandwidth, so it may lack bandwidth for large files or streaming; request Wi-Fi explicitly via `ConnectivityManager`.
- `onAvailable()` is not called if the watch cannot connect (radio may be off to save battery). Once available, the device tries to stay on Wi-Fi until the `NetworkCallback` is released; release it to preserve battery.
- UI: acquire and release Wi-Fi seamlessly; if none is available, explain that the feature needs Wi-Fi and offer the Wi-Fi settings activity. Do not block features that do not need high bandwidth.
- Defer nonessential networking (analytics, log collection) until Bluetooth or Wi-Fi is re-established rather than LTE/metered.
- No Wear OS-specific APIs for network access or FCM. FCM works well with Doze and is the recommended way to notify a watch: collect the device registration token at runtime and include it when your server calls the FCM REST endpoint.
- Notifications are bridged from phone to watch by default; a standalone Wear OS app plus a phone app can show duplicates for one FCM notification. Prevent with the bridging APIs.
- The official sample leaves onLost() empty; this page adds bindProcessToNetwork(null) there because a process stays bound to a network that has been lost, so other traffic fails until it is unbound. Alternatively, bind only specific sockets with Network.socketFactory / Network.bindSocket() instead of the whole process.
- Source: https://developer.android.com/training/wearables/data/network-communication (page last updated 2026-09-22 UTC).

## Related

- [Data Layer API overview](./data-layer-overview.md)
- [Cloud backup and restore on Wear OS](./cloud-backup-restore.md)
