# NetworkInformation

Static class providing access to network connection information for the local machine, and the entry point for querying and monitoring connectivity.

## Signature / Usage

```csharp
using Windows.Networking.Connectivity;

NetworkInformation.NetworkStatusChanged += sender =>
{
    var profile = NetworkInformation.GetInternetConnectionProfile();
    var level = profile?.GetNetworkConnectivityLevel();
    if (level == NetworkConnectivityLevel.InternetAccess)
    {
        // Safe to (re)try outbound requests.
    }
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetInternetConnectionProfile()` | static method | Returns the `ConnectionProfile` for the preferred interface most likely to send/receive internet traffic; may be `null`, and the returned profile may or may not actually have internet access. |
| `GetConnectionProfiles()` | static method | Enumerates all connection profiles (active or not) known to the system. |
| `FindConnectionProfilesAsync(ConnectionProfileFilter)` | static method | Returns profiles matching a filter (for example, `IsWlanConnectionProfile`, `IsConnected`). |
| `GetHostNames()` | static method | Gets host names associated with the local machine. |
| `GetProxyConfigurationAsync(Uri)` | static method | Gets proxy configuration for a connection to the specified URI. |
| `GetSortedEndpointPairs(IIterable<EndpointPair>, HostNameSortOptions)` | static method | Sorts a set of endpoint pairs by connection preference. |
| `NetworkStatusChanged` | static event | Raised when network status changes; always re-query `GetInternetConnectionProfile()` inside the handler rather than caching a previous profile. |

## Notes

- Namespace: `Windows.Networking.Connectivity` (WinRT). There is no separate `InternetConnectionProfile` class in current WinRT — `GetInternetConnectionProfile()` returns a `ConnectionProfile` instance representing the internet-facing connection.
- The network status reported by these APIs is a hint; apps should attempt to connect to their services whenever `LocalAccess` or higher connectivity is reported rather than blocking strictly on `InternetAccess`.
- `NetworkStatusChanged` can fire frequently (captive portal transitions, cost policy changes); keep handlers lightweight and re-query only what changed when using `NetworkStateChangeEventDetails` flags.

## Related

- [ConnectionProfile](./connection-profile.md)
