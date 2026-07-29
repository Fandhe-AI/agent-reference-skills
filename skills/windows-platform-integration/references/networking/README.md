# networking

| Name | Description | Path |
| --- | --- | --- |
| BackgroundDownloader | Configures a background download before creating the actual `DownloadOperation` via `CreateDownload`. Downloads persist across app suspension and termination. | [background-downloader.md](./background-downloader.md) |
| BackgroundUploader | Configures a background upload before creating the actual `UploadOperation` via `CreateUpload`. Uploads persist across app suspension and termination. | [background-uploader.md](./background-uploader.md) |
| ConnectionProfile | Represents a network connection (current or prior), providing connectivity level, cost, data-plan, and usage information for the underlying network interface. | [connection-profile.md](./connection-profile.md) |
| DatagramSocket | Supports network communication using a UDP datagram socket, for both client (send/receive to a single endpoint) and server (bind and listen) scenarios, including multicast. | [datagram-socket.md](./datagram-socket.md) |
| Windows.Networking.ServiceDiscovery.Dnssd | Supports registration and discovery of services that advertise themselves using DNS Service Discovery (DNS-SD, RFC 6763), commonly used for local-network / mDNS-style service announcement. | [dnssd.md](./dnssd.md) |
| DownloadOperation | Represents and performs an asynchronous background download operation created via `BackgroundDownloader.CreateDownload`. | [download-operation.md](./download-operation.md) |
| HttpBaseProtocolFilter | The base protocol filter used by an `HttpClient` instance when no custom `IHttpFilter` is supplied; exposes low-level HTTP stack behaviors. | [http-base-protocol-filter.md](./http-base-protocol-filter.md) |
| HttpClient | Sends HTTP requests and receives HTTP responses from a resource identified by a URI, using the HTTP 2.0 and HTTP 1.1 protocols. | [http-client.md](./http-client.md) |
| HttpCookieManager | Adds, deletes, or views the `HttpCookie` instances associated with an app. | [http-cookie-manager.md](./http-cookie-manager.md) |
| HttpRequestMessage | Represents an HTTP request message including HTTP verb, headers, and content, for use with `HttpClient`. | [http-request-message.md](./http-request-message.md) |
| HttpResponseMessage | Represents an HTTP response message including headers, status code, and content, returned by `HttpClient` requests. | [http-response-message.md](./http-response-message.md) |
| Loopback exemption | Communicating with a server listening on `localhost` (loopback) is blocked by default for packaged Windows apps due to network isolation; loopback access must be explicitly enabled. | [loopback-exemption.md](./loopback-exemption.md) |
| MessageWebSocket | Provides a message-based abstraction of the WebSocket protocol; the entire message is read or written in a single operation. | [message-web-socket.md](./message-web-socket.md) |
| Network capability declarations | App manifest capabilities that gate network API access for packaged Windows apps: `internetClient`, `internetClientServer`, and `privateNetworkClientServer`. | [network-capabilities.md](./network-capabilities.md) |
| NetworkInformation | Static class providing access to network connection information for the local machine, and the entry point for querying and monitoring connectivity. | [network-information.md](./network-information.md) |
| Windows.Networking.Proximity | Supports near-field, tap-based peer discovery and data exchange between devices running the same app. `PeerFinder` advertises/browses for peer apps and creates a `StreamSocket` connection (via tap, Wi-Fi Direct, Bluetooth, or infrastructure Wi-Fi); `ProximityDevice` publishes/subscribes short messages over NFC tap without establishing a socket. | [proximity.md](./proximity.md) |
| StreamSocketListener | Listens for incoming network connections using a TCP stream socket or Bluetooth RFCOMM. | [stream-socket-listener.md](./stream-socket-listener.md) |
| StreamSocket | Supports network communication using a stream socket over TCP or Bluetooth RFCOMM. | [stream-socket.md](./stream-socket.md) |
| StreamWebSocket | Provides a stream-based abstraction of the WebSocket protocol, allowing sections of a message to be read per read operation instead of requiring the whole message at once; useful for large transfers such as photos or video. | [stream-web-socket.md](./stream-web-socket.md) |
| Windows.Web.Syndication | Retrieves and parses RSS and Atom web feeds asynchronously. `SyndicationClient` downloads a feed from a URI and materializes it as a `SyndicationFeed` object graph (`SyndicationItem`, `SyndicationCategory`, etc.), auto-detecting the wire format via `SyndicationFormat`. | [syndication.md](./syndication.md) |
| Windows.Web.Http vs System.Net.Http | Guidance for choosing between the WinRT `Windows.Web.Http.HttpClient` and the .NET `System.Net.Http.HttpClient` in a Windows app. | [windows-vs-dotnet-http.md](./windows-vs-dotnet-http.md) |
