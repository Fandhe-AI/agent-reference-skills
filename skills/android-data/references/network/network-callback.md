# ConnectivityManager.NetworkCallback

Callback interface for observing changes to network availability, capabilities, and link properties over time, registered via `ConnectivityManager`.

## Signature / Usage

```kotlin
connectivityManager.registerDefaultNetworkCallback(object : ConnectivityManager.NetworkCallback() {
    override fun onAvailable(network: Network) {
        Log.i(TAG, "The default network is now: $network")
    }

    override fun onLost(network: Network) {
        Log.i(TAG, "Lost default network: $network")
    }

    override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
        Log.i(TAG, "Capabilities changed: $networkCapabilities")
    }

    override fun onLinkPropertiesChanged(network: Network, linkProperties: LinkProperties) {
        Log.i(TAG, "Link properties changed: $linkProperties")
    }
})
```

```kotlin
// For non-default networks, filter with a NetworkRequest
val request = NetworkRequest.Builder()
    .addCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED)
    .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    .build()

connectivityManager.registerNetworkCallback(request, myNetworkCallback)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onAvailable(network)` | override | — | Called when a matching network becomes available. |
| `onLost(network)` | override | — | Called when the network disconnects. |
| `onCapabilitiesChanged(network, caps)` | override | — | Called when capabilities change; use this instead of polling. |
| `onLinkPropertiesChanged(network, linkProperties)` | override | — | Called when link properties (DNS, IP, routes) change. |

## Notes

- Unregister the callback (e.g. in `onPause()`) when it is no longer needed.
- Don't call synchronous `ConnectivityManager` getters from inside a callback due to race conditions; rely on the data passed into `onCapabilitiesChanged()` / `onLinkPropertiesChanged()`.
- Most apps only need `registerDefaultNetworkCallback()`; `registerNetworkCallback(request, ...)` with a `NetworkRequest` is for specialized multi-network use cases.
- No special permission is required to register callbacks and read network state beyond `ACCESS_NETWORK_STATE`.
- For scheduling retries that require connectivity, prefer WorkManager's `NetworkType.CONNECTED` constraint over polling with this API (see [caching-and-retry](./caching-and-retry.md)).

## Related

- [ConnectivityManager](./connectivitymanager.md)
- [NetworkCapabilities](./networkcapabilities.md)
