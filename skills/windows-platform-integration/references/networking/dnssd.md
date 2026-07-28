# Windows.Networking.ServiceDiscovery.Dnssd

Supports registration and discovery of services that advertise themselves using DNS Service Discovery (DNS-SD, RFC 6763), commonly used for local-network / mDNS-style service announcement.

## Signature / Usage

```csharp
using Windows.Networking;
using Windows.Networking.ServiceDiscovery.Dnssd;
using Windows.Networking.Sockets;

// Server: advertise a TCP service.
var listener = new StreamSocketListener();
await listener.BindServiceNameAsync("5000");

var serviceInstance = new DnssdServiceInstance("mygame", new HostName("localhost"), 5000);
DnssdRegistrationResult result = await serviceInstance.RegisterStreamSocketListenerAsync(listener);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DnssdServiceInstance` | class | Encapsulates a service instance: `DnssdServiceInstanceName`, `HostName`, `Port`, `Priority`, `Weight`, `TextAttributes` (name/value pairs). |
| `DnssdServiceInstance.RegisterStreamSocketListenerAsync(StreamSocketListener)` | method | Registers a TCP service listener for DNS-SD advertisement. |
| `DnssdServiceInstance.RegisterDatagramSocketAsync(DatagramSocket)` | method | Registers a UDP service listener for DNS-SD advertisement. |
| `DnssdRegistrationResult` | class | Result of a registration attempt, including `HasInstanceNameChanged` if a name conflict caused renaming. |
| `DnssdServiceWatcher` | class | Enumerates available DNS-SD service instances via `Start()` / `Stop()` and `Added` / `EnumerationCompleted` / `Stopped` events. |

## Notes

- Namespace: `Windows.Networking.ServiceDiscovery.Dnssd` (WinRT). If a registered service name conflicts with an existing one, Windows renames it (for example, `mygame (2)`) and sets `HasInstanceNameChanged` on the result.
- `DnssdServiceWatcher` and `DnssdServiceInstanceCollection` are marked by Microsoft as not supported for future releases; prefer the `Windows.Devices.Enumeration` API for discovering DNS-SD services going forward.
- Actual client/server data communication happens over the sockets whose ports/protocols were advertised via DNS-SD (typically `StreamSocket` / `StreamSocketListener` or `DatagramSocket`); DNS-SD itself only handles announcement and discovery.

## Related

- [StreamSocketListener](./stream-socket-listener.md)
- [DatagramSocket](./datagram-socket.md)
