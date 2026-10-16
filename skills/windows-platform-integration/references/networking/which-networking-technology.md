# Which networking technology?

Overview of the networking technologies available to a Windows developer and when to choose each.

## Signature / Usage

```csharp
// HTTP(S) to a web service: Windows.Web.Http.HttpClient
var client = new Windows.Web.Http.HttpClient();

// Custom protocol over TCP/UDP: Windows.Networking.Sockets
var socket = new Windows.Networking.Sockets.StreamSocket();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Sockets (`Windows.Networking.Sockets`, Winsock) | technology | Own protocol over TCP or UDP. Windows.Networking.Sockets is the modern API for new code; use Winsock for cross-platform libraries or existing Winsock code. |
| WebSockets (`StreamWebSocket`, `MessageWebSocket`) | technology | Full-duplex, ongoing two-way communication with a server (real-time gaming, notifications, live data). |
| HttpClient (`Windows.Web.Http`) | technology | HTTP(S) to web services or servers, small number of smaller file transfers, streaming content. |
| Background transfer | technology | Reliable large or many-file HTTP(S) upload/download (FTP download only), runs during suspension, resumable, Data Sense and Battery Sense aware, supports post-processing. |
| `Windows.Networking.Connectivity` (`ConnectionProfile`) | technology | Connectivity, cost and usage information. |
| `Windows.Networking.ServiceDiscovery.Dnssd` | technology | Advertise a network service via DNS-SD (RFC 6763). |
| `Windows.Devices.Bluetooth` | technology | Connect to and transfer data with other devices over Bluetooth. |
| `Windows.Networking.PushNotifications` | technology | Receive push notifications via Windows Notification Service (WNS). |
| `Windows.Networking.Proximity` | technology | Near-field communications / tap. |
| `Windows.Web.Syndication` | technology | RSS and Atom feeds. |
| `Windows.Devices.WiFi` | technology | Enumerate Wi-Fi adapters, scan for networks, connect an adapter. |
| `Windows.Devices.Radios` | technology | Find and control radios (Wi-Fi, Bluetooth). |
| `Windows.Devices.WiFiDirect` | technology | Connect to local devices over Wi-Fi Direct ad-hoc networks. |
| `Windows.Devices.WiFiDirect.Services` | technology | Provide and connect to Wi-Fi Direct services (Service Advertiser / Service Seeker). |
| `Windows.Networking.NetworkOperators` | technology | Phone configuration and provisioning; capability limited to device manufacturers and telecom providers. |
| `Windows.Devices.Sms` | technology | Low-level SMS for mobile operators; capability not approved for most developers. Use `Windows.ApplicationModel.Chat` instead for messaging apps. |

## Notes

- Do not implement your own HTTP(S) stack on sockets; use `HttpClient`. If WebSockets meet the need (TCP to/from a web server), prefer them over custom sockets.
- WebSockets: for infrequent data, individual HTTP requests may be simpler. They may not suit very high volume; model and simulate traffic first.
- `HttpClient`: for large files or many files, or to limit transfers by connection type or resume after interruption, use background transfer. If two devices communicate and neither is an HTTP(S) server, use sockets; do not implement your own HTTP server.
- Background transfer: for a few small files with no post-processing, `HttpClient` PUT or POST is sufficient; to stream data and use it locally as it arrives, use `HttpClient`.
- The official page cites IETF RFC 2782 for DNS-SD; RFC 2782 actually defines DNS SRV records, while DNS-SD itself is specified in RFC 6763 (see dnssd.md).
- Mobile operator APIs are gated by capabilities that Microsoft must approve before publication.

## Related

- [HttpClient](./http-client.md)
- [Windows.Web.Http vs System.Net.Http](./windows-vs-dotnet-http.md)
- [StreamSocket](./stream-socket.md)
- [MessageWebSocket](./message-web-socket.md)
- [BackgroundDownloader](./background-downloader.md)
- [ConnectionProfile](./connection-profile.md)
- [DNS-SD](./dnssd.md)
- [Proximity](./proximity.md)
- [Syndication](./syndication.md)
- [Official docs: Which networking technology](https://learn.microsoft.com/en-us/windows/apps/develop/networking/which-networking-technology)
