---
source: https://www.electronjs.org/docs/latest/api/session#instance-methods
---

# Session methods: cache, storage, proxy, resolveHost, network emulation, fetch, certificate verify

Instance methods of `Session` for cache and storage, proxy configuration, DNS resolution, network emulation, `ses.fetch` and certificate verification.

## Signature / Usage

Process: Main

```js
const win = new BrowserWindow()

// To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
win.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
win.webContents.session.enableNetworkEmulation({ offline: true })
```

The following methods are available on instances of `Session`:

### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

Clears the session’s HTTP cache.

### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` string (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
  * `storages` string[] (optional) - The types of storages to clear, can be `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `serviceworkers`, `cachestorage`. If not specified, clear all storage types.

Returns `Promise<void>` - resolves when the storage data has been cleared.

### `ses.flushStorageData()`

Writes any unwritten DOMStorage data to disk.

### `ses.setProxy(config)`

* `config` [ProxyConfig](./session-structures.md)

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

Sets the proxy settings.

You may need `ses.closeAllConnections` to close currently in flight connections to prevent pooled sockets using previous proxy from being reused by future requests.

### `ses.resolveHost(host, [options])`

* `host` string - Hostname to resolve.
* `options` Object (optional)
  * `queryType` string (optional) - Requested DNS query type. If unspecified, resolver will pick A or AAAA (or both) based on IPv4/IPv6 settings:
    * `A` - Fetch only A records
    * `AAAA` - Fetch only AAAA records.
  * `source` string (optional) - The source to use for resolved addresses. Default allows the resolver to pick an appropriate source. Only affects use of big external sources (e.g. calling the system for resolution or using DNS). Even if a source is specified, results can still come from cache, resolving "localhost" or IP literals, etc. One of the following values:
    * `any` (default) - Resolver will pick an appropriate source. Results could come from DNS, MulticastDNS, HOSTS file, etc
    * `system` - Results will only be retrieved from the system or OS, e.g. via the `getaddrinfo()` system call
    * `dns` - Results will only come from DNS queries
    * `mdns` - Results will only come from Multicast DNS queries
    * `localOnly` - No external sources will be used. Results will only come from fast local sources that are available no matter the source setting, e.g. cache, hosts file, IP literal resolution, etc.
  * `cacheUsage` string (optional) - Indicates what DNS cache entries, if any, can be used to provide a response. One of the following values:
    * `allowed` (default) - Results may come from the host cache if non-stale
    * `staleAllowed` - Results may come from the host cache even if stale (by expiration or network changes)
    * `disallowed` - Results will not come from the host cache.
  * `secureDnsPolicy` string (optional) - Controls the resolver's Secure DNS behavior for this request. One of the following values:
    * `allow` (default)
    * `disable`

Returns [`Promise<ResolvedHost>`](./session-structures.md) - Resolves with the resolved IP addresses for the `host`.

### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<string>` - Resolves with the proxy information for `url`.

### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when the all internal states of proxy service is reset and the latest proxy configuration is reapplied if it's already available. The pac script will be fetched from `pacScript` again if the proxy mode is `pac_script`.

### `ses.setDownloadPath(path)`

* `path` string - The download location.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` boolean (optional) - Whether to emulate network outage. Defaults to false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emulates network with the given configuration for the `session`.

### `ses.preconnect(options)`

* `options` Object
  * `url` string - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` number (optional) - number of sockets to preconnect. Must be between 1 and 6. Defaults to 1.

Preconnects the given number of sockets to an origin.

### `ses.closeAllConnections()`

Returns `Promise<void>` - Resolves when all connections are closed.

> NOTE: It will terminate / fail all requests currently in flight.

### `ses.fetch(input[, init])`

* `input` string | [GlobalRequest](https://nodejs.org/api/globals.html#request)
* `init` [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/fetch#options) & \{ bypassCustomProtocolHandlers?: boolean \} (optional)

Returns `Promise<GlobalResponse>` - see [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).

Sends a request, similarly to how `fetch()` works in the renderer, using Chromium's network stack. This differs from Node's `fetch()`, which uses Node.js's HTTP stack.

Example:

```js
async function example() {
  const response = await net.fetch('https://my.app')
  if (response.ok) {
    const body = await response.json()
    // ... use the result.
  }
}
```

See also [`net.fetch()`](./net.md), a convenience method which issues requests from the default session (`session.defaultSession`, see [session-module.md](./session-module.md)).

See the MDN documentation for [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for more details.

Limitations:

* `net.fetch()` does not support the `data:` or `blob:` schemes.
* The value of the `integrity` option is ignored.
* The `.type` and `.url` values of the returned `Response` object are incorrect.

By default, requests made with `net.fetch` can be made to custom protocols ([protocol-handle.md](./protocol-handle.md)) as well as `file:`, and will trigger [webRequest](./web-request.md) handlers if present. When the non-standard `bypassCustomProtocolHandlers` option is set in RequestInit, custom protocol handlers will not be called for this request. This allows forwarding an intercepted request to the built-in handler. [webRequest](./web-request.md) handlers will still be triggered when bypassing custom protocols.

```js
protocol.handle('https', (req) => {
  if (req.url === 'https://my-app.com') {
    return new Response('<body>my app</body>')
  } else {
    return net.fetch(req, { bypassCustomProtocolHandlers: true })
  }
})
```

### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * `request` Object
    * `hostname` string
    * `certificate` [Certificate](./session-structures.md)
    * `validatedCertificate` [Certificate](./session-structures.md)
    * `isIssuedByKnownRoot` boolean - `true` if Chromium recognises the root CA as a standard root. If it isn't then it's probably the case that this certificate was generated by a MITM proxy whose root has been installed locally (for example, by a corporate proxy). This should not be trusted if the `verificationResult` is not `OK`.
    * `verificationResult` string - `OK` if the certificate is trusted, otherwise an error like `CERT_REVOKED`.
    * `errorCode` Integer - Error code.
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Indicates success and disables Certificate Transparency verification.
      * `-2` - Indicates failure.
      * `-3` - Uses the verification result from chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(-3)
  } else {
    callback(-2)
  }
})
```

> **NOTE:** The result of this procedure is cached by the network service.

## Notes

* `ses.fetch` / `net.fetch` use Chromium's network stack and honour `protocol.handle` handlers and `webRequest`; they are client-side requests from the Electron app, not an HTTP server API (for server-side HTTP see fastify / hono).
* Adapted (not in the official docs): the official example calls callback(0) for github.com, which accepts the certificate without verification and disables Certificate Transparency checks; this page uses callback(-3) (Chromium's verification result) instead. Never call callback(0) without your own certificate validation.
* `ses.setCertificateVerifyProc(null)` reverts to the default verify proc; the result is cached by the network service.

## Related

* [session-module](./session-module.md)
* [net](./net.md)
* [protocol-handle](./protocol-handle.md)
* [web-request](./web-request.md)
* [session-structures](./session-structures.md)
