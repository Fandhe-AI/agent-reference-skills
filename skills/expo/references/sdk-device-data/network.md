---
source: https://docs.expo.dev/versions/v58.0.0/sdk/network/
---

# Network

`expo-network` provides information about the device's network such as its IP address, MAC address, and airplane mode status.

## Signature / Usage

```sh
npx expo install expo-network
```

```js
import * as Network from 'expo-network';

const networkState = Network.useNetworkState();
console.log(`Current network type: ${networkState.type}`);

await Network.getNetworkStateAsync();
// { type: NetworkStateType.CELLULAR, isConnected: true, isInternetReachable: true }
```

## Options / Props

Hook:

| Name | Returns | Description |
| --- | --- | --- |
| `useNetworkState()` | `NetworkState` | Current network state. Starts a listener for changes and cleans up before unmounting. (Android, iOS, tvOS, Web) |

Methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Network.getIpAddressAsync()` | Android, iOS, tvOS, Web | `Promise<string>` | Current IPv4 address of the main network interface; `0.0.0.0` if it could not be retrieved. On web uses the third-party ipify service to get the public IP. |
| `Network.getNetworkStateAsync()` | Android, iOS, tvOS, Web | `Promise<NetworkState>` | Current network connection state. On web `navigator.connection.type` is unavailable: `type` is `UNKNOWN` with an active connection, otherwise `NONE`. |
| `Network.isAirplaneModeEnabledAsync()` | Android | `Promise<boolean>` | Whether the device is in airplane mode. |
| `Network.addNetworkStateListener(listener: (event: NetworkState) => void)` | Android, iOS, tvOS, Web | `EventSubscription` | Fires whenever the network state changes; call `remove()` to unregister. |

`NetworkState` (also the type of `NetworkStateEvent`; all optional):

| Property | Type | Description |
| --- | --- | --- |
| isConnected | `boolean` | Active network connection exists (does not mean internet is reachable). `false` if type is `NONE` or `UNKNOWN`, `true` otherwise. |
| isInternetReachable | `boolean` | Internet reachable via the active connection. Android requires `NET_CAPABILITY_INTERNET`, `NET_CAPABILITY_VALIDATED` and a usable connection state; VPN also requires non-zero downstream bandwidth. On iOS always equal to `isConnected`. |
| type | `NetworkStateType` | Current connection type. |

`NetworkStateType` enum:

| Value | Platforms | Description |
| --- | --- | --- |
| `BLUETOOTH` | Android | Over Bluetooth. |
| `CELLULAR` | Android, iOS | Over mobile data or DUN-specific mobile connection for tethering. |
| `ETHERNET` | Android, iOS | Over Ethernet. |
| `NONE` | all | No active network connection. |
| `OTHER` | Android | Other connection types. |
| `UNKNOWN` | all | Connection type could not be determined. |
| `VPN` | Android | Over VPN. |
| `WIFI` | Android, iOS | Over Wi-Fi. |
| `WIMAX` | Android | Over WiMAX. |

Error codes:

| Code | Description |
| --- | --- |
| `ERR_NETWORK_IP_ADDRESS` | Android: unknown Wi-Fi host when accessing `WifiManager` in `getIpAddressAsync`. iOS: no network interfaces could be retrieved. |
| `ERR_NETWORK_UNDEFINED_INTERFACE` | Undefined `interfaceName` passed to `getMacAddressAsync`. |
| `ERR_NETWORK_SOCKET_EXCEPTION` | Error creating or accessing the socket in `getMacAddressAsync`. |
| `ERR_NETWORK_INVALID_PERMISSION_INTERNET` | Invalid permissions for `android.permission.ACCESS_WIFI_STATE` in `getMacAddressAsync`. |
| `ERR_NETWORK_NO_ACCESS_NETWORKINFO` | Unable to access network information. |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, tvOS, Web, Included in Expo Go.
- On Android the permissions `ACCESS_NETWORK_STATE` and `ACCESS_WIFI_STATE` are added automatically.
- The API section of this version lists no `getMacAddressAsync` method, although error codes mention it.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-network

## Related

- [Device](./device.md)
