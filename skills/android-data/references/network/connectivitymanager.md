# ConnectivityManager

System service that reports the state of network connectivity: the active network, its capabilities, and link properties.

## Signature / Usage

```kotlin
val connectivityManager = getSystemService(ConnectivityManager::class.java)
val currentNetwork = connectivityManager.activeNetwork
val caps = connectivityManager.getNetworkCapabilities(currentNetwork)
val linkProperties = connectivityManager.getLinkProperties(currentNetwork)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getActiveNetwork()` | `Network?` | — | Returns the `Network` currently considered the default. |
| `getNetworkCapabilities(network)` | `NetworkCapabilities?` | — | Returns capabilities/transports for the given `Network`. |
| `getLinkProperties(network)` | `LinkProperties?` | — | Returns DNS servers, IP addresses, and routes for the given `Network`. |
| `registerDefaultNetworkCallback(callback)` | `void` | — | Subscribes to changes of the default network (see [network-callback](./network-callback.md)). |
| `registerNetworkCallback(request, callback)` | `void` | — | Subscribes to networks matching a `NetworkRequest`. |
| `isActiveNetworkMetered()` | `Boolean` | — | Whether the active network is metered (used for Data Saver checks; see [data-saver](./data-saver.md)). |
| `getRestrictBackgroundStatus()` | `Int` | — | Data Saver restriction status for the app. |

## Notes

- Obtain the instance via `getSystemService(ConnectivityManager::class.java)`.
- `Network` becomes unusable once the underlying network disconnects; don't cache it long-term.
- Reading instantaneous state (`getActiveNetwork()` / `getNetworkCapabilities()`) requires no special permission beyond `ACCESS_NETWORK_STATE`.
- Prefer callback-based monitoring (`NetworkCallback`) over polling.

## Related

- [NetworkCapabilities](./networkcapabilities.md)
- [network-callback](./network-callback.md)
- [data-saver](./data-saver.md)
