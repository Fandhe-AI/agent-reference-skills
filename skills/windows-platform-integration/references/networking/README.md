# networking

| Name | Description | Path |
| --- | --- | --- |
| BackgroundDownloader | Configures a background download before creating the DownloadOperation via CreateDownload. | [background-downloader.md](./background-downloader.md) |
| Network communications in the background (SocketActivityTrigger / ControlChannelTrigger) | Continues network communication while the app is not in the foreground, using SocketActivityTrigger or ControlChannelTrigger. | [background-network-communications.md](./background-network-communications.md) |
| BackgroundUploader | Configures a background upload before creating the UploadOperation via CreateUpload. | [background-uploader.md](./background-uploader.md) |
| ConnectionProfile | Represents a network connection (current or prior) with connectivity level, cost, data-plan, and usage information. | [connection-profile.md](./connection-profile.md) |
| DatagramSocket | Supports UDP datagram socket communication for client and server scenarios, including multicast. | [datagram-socket.md](./datagram-socket.md) |
| Windows.Networking.ServiceDiscovery.Dnssd | Supports registration and discovery of services advertised via DNS Service Discovery (DNS-SD, RFC 6763). | [dnssd.md](./dnssd.md) |
| DownloadOperation | Represents and performs an asynchronous background download operation created via BackgroundDownloader.CreateDownload. | [download-operation.md](./download-operation.md) |
| HttpBaseProtocolFilter | The base protocol filter used by an HttpClient when no custom IHttpFilter is supplied; exposes low-level HTTP stack behaviors. | [http-base-protocol-filter.md](./http-base-protocol-filter.md) |
| HttpClient | Sends HTTP requests and receives HTTP responses from a URI-identified resource using HTTP 2.0 and HTTP 1.1. | [http-client.md](./http-client.md) |
| HttpCookieManager | Adds, deletes, or views the HttpCookie instances associated with an app. | [http-cookie-manager.md](./http-cookie-manager.md) |
| HttpRequestMessage | Represents an HTTP request message including HTTP verb, headers, and content, for use with HttpClient. | [http-request-message.md](./http-request-message.md) |
| HttpResponseMessage | Represents an HTTP response message including headers, status code, and content, returned by HttpClient requests. | [http-response-message.md](./http-response-message.md) |
| Loopback exemption | Communicating with a server listening on localhost is blocked by default for packaged apps; loopback access must be explicitly enabled. | [loopback-exemption.md](./loopback-exemption.md) |
| MessageWebSocket | Provides a message-based abstraction of the WebSocket protocol; the entire message is read or written in a single operation. | [message-web-socket.md](./message-web-socket.md) |
| Network capability declarations | App manifest capabilities that gate network API access for packaged apps: internetClient, internetClientServer, privateNetworkClientServer. | [network-capabilities.md](./network-capabilities.md) |
| NetworkInformation | Static class providing access to network connection information for the local machine and connectivity monitoring. | [network-information.md](./network-information.md) |
| Networking basics (capabilities, triggers, TLS, authentication, exceptions) | Covers what every network-enabled app must do: declare capabilities, choose a background network trigger, secure connections with TLS, supply credentials, and handle exceptions. | [networking-basics.md](./networking-basics.md) |
| Windows.Networking.Proximity | Supports tap-based peer discovery and data exchange between devices running the same app (PeerFinder, ProximityDevice). | [proximity.md](./proximity.md) |
| StreamSocketListener | Listens for incoming network connections using a TCP stream socket or Bluetooth RFCOMM. | [stream-socket-listener.md](./stream-socket-listener.md) |
| StreamSocket | Supports network communication using a stream socket over TCP or Bluetooth RFCOMM. | [stream-socket.md](./stream-socket.md) |
| StreamWebSocket | Provides a stream-based abstraction of the WebSocket protocol, reading large messages section by section (for example photos or video). | [stream-web-socket.md](./stream-web-socket.md) |
| Windows.Web.Syndication | Retrieves and parses RSS and Atom web feeds asynchronously via SyndicationClient. | [syndication.md](./syndication.md) |
| Which networking technology? | Overview of the networking technologies available to a Windows developer and when to choose each. | [which-networking-technology.md](./which-networking-technology.md) |
| Windows.Web.Http vs System.Net.Http | Guidance for choosing between the WinRT Windows.Web.Http.HttpClient and the .NET System.Net.Http.HttpClient. | [windows-vs-dotnet-http.md](./windows-vs-dotnet-http.md) |
