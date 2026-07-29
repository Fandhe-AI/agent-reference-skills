# WiFiAdapter / WiFiDirectDevice / Radio

Three related but distinct WinRT surfaces for wireless hardware: `Windows.Devices.WiFi` enumerates Wi-Fi adapters and connects them to networks; `Windows.Devices.WiFiDirect` sets up ad-hoc device-to-device Wi-Fi Direct connections; `Windows.Devices.Radios` finds and toggles the radios (Wi-Fi, Bluetooth, etc.) present on the local device.

## Signature / Usage

```csharp
using Windows.Devices.Enumeration;
using Windows.Devices.WiFi;
using Windows.Devices.WiFiDirect;
using Windows.Devices.Radios;

// --- Windows.Devices.WiFi: enumerate adapters, scan, connect ---
DeviceInformationCollection adapterInfos = await DeviceInformation.FindAllAsync(WiFiAdapter.GetDeviceSelector());
WiFiAdapter adapter = await WiFiAdapter.FromIdAsync(adapterInfos[0].Id);

await adapter.ScanAsync();
WiFiAvailableNetwork network = adapter.NetworkReport.AvailableNetworks[0];
WiFiConnectionResult connectResult = await adapter.ConnectAsync(
    network, WiFiReconnectionKind.Automatic);

// --- Windows.Devices.WiFiDirect: connect ad hoc to a nearby device ---
DeviceInformationCollection wfdDeviceInfos = await DeviceInformation.FindAllAsync(
    WiFiDirectDevice.GetDeviceSelector(WiFiDirectDeviceSelectorType.AssociationEndpoint));
WiFiDirectDevice wfdDevice = await WiFiDirectDevice.FromIdAsync(wfdDeviceInfos[0].Id);
Windows.Networking.HostName remoteHostName =
    wfdDevice.GetConnectionEndpointPairs()[0].RemoteHostName;

// --- Windows.Devices.Radios: enumerate and toggle local radios ---
IReadOnlyList<Radio> radios = await Radio.GetRadiosAsync();
Radio wifiRadio = radios.FirstOrDefault(r => r.Kind == RadioKind.WiFi);
if (wifiRadio != null)
{
    await wifiRadio.SetStateAsync(RadioState.On);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `WiFiAdapter.NetworkReport` | `WiFiNetworkReport` | Most recent scan results (`AvailableNetworks`). |
| `WiFiAvailableNetwork.Ssid` / `Bsid` / `SignalBars` | `string` / `string` / `int` | Identifying and signal-quality info for a discovered network. |
| `WiFiDirectDevice.ConnectionStatus` / `ConnectionStatusChanged` | `WiFiDirectConnectionStatus` | Whether the Wi-Fi Direct link is currently connected. |
| `Radio.Kind` | `RadioKind` | Type of radio (`WiFi`, `Bluetooth`, `MobileBroadband`, `FM`). |
| `Radio.State` | `RadioState` | Current state (`On`, `Off`, `Disabled`, `Unknown`). |

### Key methods

| Name | Description |
|------|-------------|
| `WiFiAdapter.GetDeviceSelector()` / `FromIdAsync(string)` | AQS selector + instantiation pattern for enumerating and creating adapters. |
| `WiFiAdapter.ScanAsync()` | Triggers a network scan; results land in `NetworkReport`. |
| `WiFiAdapter.ConnectAsync(WiFiAvailableNetwork, WiFiReconnectionKind, ...)` | Connects the adapter to a discovered network (overloads accept a passphrase credential). |
| `WiFiDirectDevice.GetDeviceSelector(WiFiDirectDeviceSelectorType)` / `FromIdAsync(string)` | Enumerates and instantiates a Wi-Fi Direct peer connection. |
| `WiFiDirectDevice.GetConnectionEndpointPairs()` | Returns local/remote `HostName` pairs for opening a socket over the Wi-Fi Direct link. |
| `Radio.GetRadiosAsync()` | Enumerates all radios on the local device. |
| `Radio.SetStateAsync(RadioState)` | Turns a radio on/off/disabled. |
| `Radio.GetRadioAccessStatusAsync()` (static) | Checks whether the app is permitted to access radios at all before enumerating. |

### Events

| Name | Description |
|------|-------------|
| `WiFiAdapter.AvailableNetworksChanged` | Raised when the scan results change. |
| `WiFiDirectDevice.ConnectionStatusChanged` | Raised when the Wi-Fi Direct connection status changes. |
| `Radio.StateChanged` | Raised when a radio's `State` changes (including changes made outside the app, e.g. via Airplane Mode). |

## Notes

- Namespaces: `Windows.Devices.WiFi`, `Windows.Devices.WiFiDirect` (with a further `Windows.Devices.WiFiDirect.Services` for advertiser/seeker service scenarios), and `Windows.Devices.Radios` (WinRT/UWP). All three require app capabilities gated by Microsoft approval (`wiFiControl`, `wiFiDirect`, `radios`) and are primarily aimed at device manufacturers and networking-focused apps rather than general apps.
- Wi-Fi Direct establishes a direct ad-hoc wireless link between two devices without a shared access point; `Windows.Devices.WiFiDirect.Services` builds a service-advertisement layer (Advertiser/Seeker roles) on top of that link.
- `Radio` covers all radio hardware on the device (Wi-Fi, Bluetooth, mobile broadband, FM), not just Wi-Fi — use `RadioKind` to filter to the one you need.
- Classic and BLE Bluetooth connectivity itself is covered by `Windows.Devices.Bluetooth`/`Windows.Devices.Bluetooth.Rfcomm`, not by this namespace group; `Radio` only lets you turn the Bluetooth radio itself on/off.

## Related

- [RfcommDeviceService / RfcommServiceProvider](./bluetooth-rfcomm.md)
- [BluetoothLEDevice](./bluetooth-le-device.md)
- [DeviceInformation / DeviceInformation.FindAllAsync](./device-information.md)
- [ConnectionProfile](../networking/connection-profile.md)
