# Network capability declarations

App manifest capabilities that gate network API access for packaged Windows apps: `internetClient`, `internetClientServer`, and `privateNetworkClientServer`.

## Signature / Usage

```xml
<Package ...>
  <Capabilities>
    <Capability Name="internetClient" />
    <Capability Name="privateNetworkClientServer" />
  </Capabilities>
</Package>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `internetClient` | capability | App can receive incoming data from the Internet; cannot act as a server; no local network access. Most apps with a web service component only need this. |
| `internetClientServer` | capability | App can receive incoming data from the Internet and can act as a server; no local network access. Needed for peer-to-peer (P2P) scenarios where the app listens for incoming connections. Includes the access `internetClient` provides, so declaring both is unnecessary. |
| `privateNetworkClientServer` | capability | Inbound and outbound access to home and work (private) networks through the firewall. Typical for LAN games and apps sharing data across local devices. Does not by itself provide internet access. |

## Notes

- Declared under `<Capabilities>` in the app package manifest (`Package.appxmanifest`).
- `StreamSocket` / `StreamSocketListener` used over TCP or LAN need `internetClient` (client-only) or `internetClientServer` (listening) plus `privateNetworkClientServer` for LAN reachability; Bluetooth RFCOMM additionally needs the `bluetooth.rfcomm` device capability.
- `DatagramSocket`, `MessageWebSocket`, `StreamWebSocket` typically need `internetClient` and `privateNetworkClientServer`.
- `BackgroundDownloader` / `BackgroundUploader` typically need `internetClient`, `internetClientServer`, and `privateNetworkClientServer`.
- Loopback (`localhost`) connections are blocked by default even with `privateNetworkClientServer` declared; see the loopback exemption notes for enabling them.

## Related

- [Loopback exemption](./loopback-exemption.md)
- [StreamSocket](./stream-socket.md)
- [DatagramSocket](./datagram-socket.md)
