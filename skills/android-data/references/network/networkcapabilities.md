# NetworkCapabilities

Describes the transports and capabilities of a `Network`, such as whether it is Wi-Fi/cellular and whether it currently has validated internet access.

## Signature / Usage

```kotlin
val caps = connectivityManager.getNetworkCapabilities(network)
val hasWifi = caps?.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) == true
val hasInternet = caps?.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED) == true
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `hasTransport(int)` | `Boolean` | — | Checks a transport constant, e.g. `TRANSPORT_WIFI`, `TRANSPORT_CELLULAR`, `TRANSPORT_BLUETOOTH`, `TRANSPORT_VPN`. |
| `hasCapability(int)` | `Boolean` | — | Checks a capability constant. |
| `NET_CAPABILITY_INTERNET` | constant | — | Network is configured for internet access (not a guarantee of actual reachability). |
| `NET_CAPABILITY_VALIDATED` | constant | — | Network has confirmed actual public internet access (no captive portal). |
| `NET_CAPABILITY_NOT_METERED` | constant | — | Network does not bill the user for data. |
| `NET_CAPABILITY_NOT_VPN` | constant | — | Network is not a VPN. |
| `NET_CAPABILITY_CAPTIVE_PORTAL` | constant | — | Network is behind a captive portal. |

## Notes

- `NET_CAPABILITY_INTERNET` only means the network is *configured* for internet, not that it currently works; use `NET_CAPABILITY_VALIDATED` to check actual reachability.
- Used both for reading instantaneous state via `ConnectivityManager.getNetworkCapabilities()` and for building a `NetworkRequest` filter passed to `registerNetworkCallback()`.

## Related

- [ConnectivityManager](./connectivitymanager.md)
- [network-callback](./network-callback.md)
