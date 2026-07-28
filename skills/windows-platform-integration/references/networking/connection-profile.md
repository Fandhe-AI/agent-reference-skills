# ConnectionProfile

Represents a network connection (current or prior), providing connectivity level, cost, data-plan, and usage information for the underlying network interface.

## Signature / Usage

```csharp
using Windows.Networking.Connectivity;

ConnectionProfile profile = NetworkInformation.GetInternetConnectionProfile();
if (profile != null)
{
    var level = profile.GetNetworkConnectivityLevel();
    var cost = profile.GetConnectionCost();
    bool metered = cost.NetworkCostType != NetworkCostType.Unrestricted || cost.Roaming || cost.OverDataLimit;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IsWlanConnectionProfile` / `IsWwanConnectionProfile` | `Boolean` | Whether the profile is a WLAN (Wi-Fi) or WWAN (mobile) connection. |
| `WlanConnectionProfileDetails` / `WwanConnectionProfileDetails` | object | Technology-specific detail objects (SSID, roaming state, etc.), non-null only when the matching `Is*ConnectionProfile` flag is `true`. |
| `NetworkAdapter` | `NetworkAdapter` | The network adapter providing connectivity. |
| `ProfileName` | `String` | Name of the connection profile. |
| `CanDelete` | `TriStates` | Whether `TryDeleteAsync` is likely to succeed. |
| `GetNetworkConnectivityLevel()` | method | Returns `None`, `LocalAccess`, `ConstrainedInternetAccess`, or `InternetAccess`; a profile's level can evolve, so re-check at the decision point. |
| `GetConnectionCost()` | method | Returns `ConnectionCost` with `NetworkCostType`, `Roaming`, `OverDataLimit`, `ApproachingDataLimit`, `BackgroundDataUsageRestricted`. |
| `GetDataPlanStatus()` | method | Returns current data plan status. |
| `GetSignalBars()` | method | Returns the signal bar count shown by Windows UI. |
| `GetDomainConnectivityLevel()` | method | Returns domain authentication trust state (`None` / `Unauthenticated` / `Authenticated`). |
| `IsDomainAuthenticatedBy(DomainAuthenticationKind)` | method | Checks whether LDAP or TLS-based domain authentication succeeded. |
| `GetNetworkUsageAsync(...)` / `GetAttributedNetworkUsageAsync(...)` | method | Retrieves per-interval or per-attribution data usage statistics. |
| `TryDeleteAsync()` | method | Attempts to delete a user-removable profile (for example, a saved Wi-Fi profile); check the returned `ConnectionProfileDeleteStatus`. |

## Notes

- Namespace: `Windows.Networking.Connectivity` (WinRT). Obtained via `NetworkInformation.GetInternetConnectionProfile()` or `NetworkInformation.FindConnectionProfilesAsync(ConnectionProfileFilter)`.
- Re-query the profile on every `NetworkInformation.NetworkStatusChanged` event; cached instances can hold stale properties even though the reference itself remains valid.
- Respect metered connections: delay large background transfers unless `connectionCost.NetworkCostType == NetworkCostType.Unrestricted` and `Roaming`/`OverDataLimit` are both `false`.

## Related

- [NetworkInformation](./network-information.md)
