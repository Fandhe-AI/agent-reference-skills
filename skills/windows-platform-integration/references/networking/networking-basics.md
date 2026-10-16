# Networking basics (capabilities, triggers, TLS, authentication, exceptions)

Things you must do for any network-enabled app: declare capabilities, choose a background network trigger, secure connections with TLS, supply credentials, and handle network exceptions.

## Signature / Usage

```csharp
using Windows.Networking;
using Windows.Networking.Sockets;

StreamSocket clientSocket = new StreamSocket();
HostName serverHost = new HostName("www.contoso.com");
string serverServiceName = "https";

try {
    // Connect and negotiate SSL/TLS immediately
    await clientSocket.ConnectAsync(serverHost, serverServiceName, SocketProtectionLevel.Ssl);
}
catch (Exception exception) {
    // Unknown status means the error is fatal and retry will likely fail.
    if (SocketError.GetStatus(exception.HResult) == SocketErrorStatus.Unknown) {
        throw;
    }
    clientSocket.Dispose();
    clientSocket = null;
}
```

## Options / Props

Most-used capabilities:

| Name | Type | Description |
|------|------|-------------|
| internetClient | capability | Outbound access to the Internet and networks in public places. Most apps that require Internet access should use this. |
| internetClientServer | capability | Inbound and outbound network access from the Internet and networks in public places. |
| privateNetworkClientServer | capability | Inbound and outbound network access at the user's trusted places, like home and work. |

Capabilities needed in certain circumstances:

| Name | Type | Description |
|------|------|-------------|
| enterpriseAuthentication | capability | Connect to network resources that require domain credentials (for example SharePoint on a private intranet); the app can impersonate the user on the network. Not needed to access the Internet via an authenticating proxy. Restricted capability. |
| proximity | capability | Near-field proximity communication with devices close to the computer, with user consent to send or accept an invite. |
| sharedUserCertificates | capability | Access software and hardware certificates such as smart card certificates; the user must act at runtime (insert a card or select a certificate). |

Credential properties by API (each takes a `PasswordCredential`):

| API | Members |
|-----|---------|
| WebSockets | `MessageWebSocketControl.ServerCredential` / `ProxyCredential`, `StreamWebSocketControl.ServerCredential` / `ProxyCredential` |
| Background Transfer | `BackgroundDownloader.ServerCredential` / `ProxyCredential`, `BackgroundUploader.ServerCredential` / `ProxyCredential` |
| Syndication | `SyndicationClient(PasswordCredential)`, `SyndicationClient.ServerCredential` / `ProxyCredential` |
| AtomPub | `AtomPubClient(PasswordCredential)`, `AtomPubClient.ServerCredential` / `ProxyCredential` |

Client certificate on a `StreamSocket` (set before the TLS handshake starts):

```csharp
var socket = new StreamSocket();
Windows.Security.Cryptography.Certificates.Certificate certificate = await GetClientCert();
socket.Control.ClientCertificate = certificate;
await socket.ConnectAsync(destination, SocketProtectionLevel.Tls12);
```

## Notes

- With no network capability in the manifest, the app has no networking capability and any attempt to connect fails.
- Background network triggers: `ControlChannelTrigger` is supported; the socket broker with `SocketActivityTrigger` is newer, has fewer restrictions and a smaller memory footprint, supports listening on TCP sockets (CCT does not), can be used by apps that are not lock screen apps, and activates the app even when it is not running. It works with `DatagramSocket`, `StreamSocket`, `StreamSocketListener`.
- Choosing a trigger: with `IXMLHTTPRequest2`, `System.Net.Http.HttpClient` or `HttpClientHandler` you must use `ControlChannelTrigger`; for push-enabled `StreamSocket` prefer `SocketActivityTrigger`; prefer it also to minimize memory footprint when idle and to receive data in Connected Standby.
- TLS on `StreamSocket` is client-side only; a `StreamSocket` created by `StreamSocketListener` cannot negotiate SSL/TLS as a server.
- Two ways to secure a `StreamSocket`: `ConnectAsync` (with a `SocketProtectionLevel`, negotiate immediately) or `UpgradeToSslAsync(protectionLevel, validationHostName)` (connect unencrypted, then upgrade).
- `SocketProtectionLevel.Ssl` requires encryption and never allows a NULL cipher. The final level is negotiated with the other endpoint and can be lower than requested; `StreamSocketInformation.ProtectionLevel` reports the requested level, not the actual one. Do not rely on a default level: specify it explicitly and verify it.
- Secure WebSockets (`StreamWebSocket` / `MessageWebSocket`) are recommended since many proxies reject unencrypted WebSocket connections. A server may require a `Sec-WebSocket-Protocol` value, exposed via `StreamWebSocketInformation.Protocol` / `MessageWebSocketInformation.Protocol`.
- Exceptions project as an `HRESULT`. Some APIs offer a helper that converts the HRESULT to an enumeration (for example `SocketError.GetStatus`); others offer a method to retrieve the actual HRESULT. Network communication is inherently unreliable, so keep state and implement retry/re-establish logic.

## Related

- [Network capability declarations](./network-capabilities.md)
- [Network communications in the background](./background-network-communications.md)
- [StreamSocket](./stream-socket.md)
- [StreamWebSocket](./stream-web-socket.md)
- [MessageWebSocket](./message-web-socket.md)
- [Official docs: Networking basics](https://learn.microsoft.com/en-us/windows/apps/develop/networking/networking-basics)
