# session-network

| Name | Description | Path |
|------|-------------|------|
| ClientRequest | Make HTTP/HTTPS requests. | [client-request.md](./client-request.md) |
| Cookies | Query and modify a session's cookies. | [cookies.md](./cookies.md) |
| Device structures | Object structures for device selection and permission events: BluetoothDevice, HIDDevice, SerialPort, USBDevice, WebAuthnAccount. | [device-structures.md](./device-structures.md) |
| DownloadItem | Control file downloads from remote sources. | [download-item.md](./download-item.md) |
| Extensions class | Load and interact with extensions. | [extensions-api.md](./extensions-api.md) |
| Chrome Extension Support | Electron supports a subset of the [Chrome Extensions API](https://developer.chrome.com/extensions/api_index), primarily to support DevTools extensions and Chromium-internal extensions, but it also happens to support some other extension capabilities. | [extensions.md](./extensions.md) |
| IncomingMessage | Handle responses to HTTP/HTTPS requests. | [incoming-message.md](./incoming-message.md) |
| netLog | Logging network events for a session. | [net-log.md](./net-log.md) |
| net | Issue HTTP/HTTPS requests using Chromium's native networking library | [net.md](./net.md) |
| Permission request structures | Object structures passed as `details` to `ses.setPermissionRequestHandler`: PermissionRequest, FilesystemPermissionRequest, MediaAccessPermissionRequest, OpenExternalPermissionRequest. | [permission-request-structures.md](./permission-request-structures.md) |
| protocol: handle, registerSchemesAsPrivileged, registerSource | Register a custom protocol and intercept existing protocol requests. | [protocol-handle.md](./protocol-handle.md) |
| protocol: register*/intercept* (deprecated) | Deprecated `protocol.register*Protocol` and `protocol.intercept*Protocol` methods (replaced by `protocol.handle`), plus `unregisterProtocol`, `uninterceptProtocol`, `isProtocolRegistered` and `isProtocolIntercepted`. | [protocol-legacy-register-intercept.md](./protocol-legacy-register-intercept.md) |
| Protocol structures | Object structures used by `protocol`, `webRequest` and window-open handlers: ProtocolRequest, ProtocolResponse, ProtocolResponseUploadData, ProtocolRoute, ProtocolSource, CustomScheme, UploadData, UploadFile, UploadRawData, PostBody, MimeTypedBuffer, FilePathWithHeaders. | [protocol-structures.md](./protocol-structures.md) |
| ServiceWorkerMain | An instance of a Service Worker representing a version of a script for a given scope. | [service-worker-main.md](./service-worker-main.md) |
| ServiceWorkers | Query and receive events from a sessions active service workers. | [service-workers.md](./service-workers.md) |
| Session events: HID, serial, USB, WebAuthn device selection | Instance events of Session for selecting HID, serial and USB devices and WebAuthn accounts requested from the renderer. | [session-events-devices.md](./session-events-devices.md) |
| Session events: will-download, extensions, file system access, preconnect, spellcheck | Instance events of the `Session` class (will-download, extension lifecycle, file-system-access-restricted, preconnect, spellcheck dictionary). | [session-events-downloads-extensions.md](./session-events-downloads-extensions.md) |
| Session methods: cache, storage, proxy, resolveHost, network emulation, fetch, certificate verify | Instance methods of `Session` for cache and storage, proxy configuration, DNS resolution, network emulation, `ses.fetch` and certificate verification. | [session-methods-cache-proxy-network.md](./session-methods-cache-proxy-network.md) |
| Session methods: extensions (deprecated), clearData; instance properties | Deprecated extension methods on `Session`, `ses.getStoragePath()`, `ses.clearData()` and the `Session` instance properties. | [session-methods-extensions-properties.md](./session-methods-extensions-properties.md) |
| Session methods: user agent, SSL, downloads, preload scripts, code cache, shared dictionary, spellchecker | Instance methods of `Session` for host resolver cache, NTLM, user agent, SSL config, downloads, preload scripts, V8 code cache, shared dictionaries and the built-in spellchecker. | [session-methods-misc.md](./session-methods-misc.md) |
| Session methods: permission, display media, device, USB, Bluetooth handlers | Instance methods of `Session` that install handlers for permission requests and checks, display media requests, device permissions, protected USB classes and Bluetooth pairing. | [session-methods-permissions.md](./session-methods-permissions.md) |
| session module | Manage browser sessions, cookies, cache, proxy settings, etc. | [session-module.md](./session-module.md) |
| Session/network structures | Object structures used by `session`, `cookies`, `webRequest`, `net.WebSocket`, `serviceWorkers` and `extensions`: Cookie, ProxyConfig, ResolvedHost, ResolvedEndpoint, Certificate, CertificatePrincipal, Referrer, WebRequestFilter, WebSocketOptions, SharedDictionaryInfo, SharedDictionaryUsageInfo, ServiceWorkerInfo, Extension, ExtensionInfo, PreloadScript, PreloadScriptRegistration. | [session-structures.md](./session-structures.md) |
| WebRequest | Intercept and modify the contents of a request at various stages of its lifetime. | [web-request.md](./web-request.md) |
| WebSocket (main process) | Create WebSocket connections from the main process using Chromium's native networking library | [web-socket.md](./web-socket.md) |
