---
source: https://www.electronjs.org/docs/latest/api/structures/cookie
---

# Session/network structures

Object structures used by `session`, `cookies`, `webRequest`, `net.WebSocket`, `serviceWorkers` and `extensions`: Cookie, ProxyConfig, ResolvedHost, ResolvedEndpoint, Certificate, CertificatePrincipal, Referrer, WebRequestFilter, WebSocketOptions, SharedDictionaryInfo, SharedDictionaryUsageInfo, ServiceWorkerInfo, Extension, ExtensionInfo, PreloadScript, PreloadScriptRegistration.

## Signature / Usage

The structure pages contain no code examples except the `proxyRules` grammar. Example from the `cookies` page (https://www.electronjs.org/docs/latest/api/cookies) using `Cookie`:

```js
const { session } = require('electron')

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = { url: 'https://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie).then(
  () => {
    // success
  },
  (error) => {
    console.error(error)
  }
)
```

`proxyRules` grammar (from ProxyConfig):

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

## Options / Props

### Cookie Object

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the cookie. |
| `value` | string | The value of the cookie. |
| `domain` | string (optional) | The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. |
| `hostOnly` | boolean (optional) | Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed. |
| `path` | string (optional) | The path of the cookie. |
| `secure` | boolean (optional) | Whether the cookie is marked as secure. |
| `httpOnly` | boolean (optional) | Whether the cookie is marked as HTTP only. |
| `session` | boolean (optional) | Whether the cookie is a session cookie or a persistent cookie with an expiration date. |
| `expirationDate` | Double (optional) | The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies. |
| `sameSite` | string | The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy applied to this cookie. Can be `unspecified`, `no_restriction`, `lax` or `strict`. |

### ProxyConfig Object

| Name | Type | Description |
| --- | --- | --- |
| `mode` | string (optional) | The proxy mode. Should be one of `direct`, `auto_detect`, `pac_script`, `fixed_servers` or `system`. Defaults to `pac_script` proxy mode if `pacScript` option is specified otherwise defaults to `fixed_servers`. |
| `pacScript` | string (optional) | The URL associated with the PAC file. |
| `proxyRules` | string (optional) | Rules indicating which proxies to use. |
| `proxyBypassRules` | string (optional) | Rules indicating which URLs should bypass the proxy settings. |

`mode` values:

* `direct` - In direct mode all connections are created directly, without any proxy involved.
* `auto_detect` - In auto_detect mode the proxy configuration is determined by a PAC script that can be downloaded at http://wpad/wpad.dat.
* `pac_script` - In pac_script mode the proxy configuration is determined by a PAC script that is retrieved from the URL specified in the `pacScript`. This is the default mode if `pacScript` is specified.
* `fixed_servers` - In fixed_servers mode the proxy configuration is specified in `proxyRules`. This is the default mode if `proxyRules` is specified.
* `system` - In system mode the proxy configuration is taken from the operating system. Note that the system mode is different from setting no proxy configuration. In the latter case, Electron falls back to the system settings only if no command-line options influence the proxy configuration.

When `mode` is unspecified, `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

`proxyRules` examples:

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

The `proxyBypassRules` is a comma separated list of rules described below:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]` - Match all hostnames that match the pattern HOSTNAME_PATTERN. Examples: "foobar.com", "\*foobar.com", "\*.foobar.com", "\*foobar.com:99", "https://x.\*.y.com:99"
* `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]` - Match a particular domain suffix. Examples: ".google.com", ".com", "http://.google.com"
* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]` - Match URLs which are IP address literals. Examples: "127.0.1", "\[0:0::1]", "\[::1]", "http://\[::1]:99"
* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS` - Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation. Examples: "192.168.1.1/16", "fefe:13::abc/33".
* `<local>` - Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

### ResolvedHost Object

| Name | Type | Description |
| --- | --- | --- |
| `endpoints` | ResolvedEndpoint[] | resolved DNS entries for the hostname |

### ResolvedEndpoint Object

| Name | Type | Description |
| --- | --- | --- |
| `address` | string | |
| `family` | string | One of the following: `ipv4` - Corresponds to `AF_INET`; `ipv6` - Corresponds to `AF_INET6`; `unspec` - Corresponds to `AF_UNSPEC` |

### Certificate Object

| Name | Type | Description |
| --- | --- | --- |
| `data` | string | PEM encoded data |
| `issuer` | CertificatePrincipal | Issuer principal |
| `issuerName` | string | Issuer's Common Name |
| `issuerCert` | Certificate | Issuer certificate (if not self-signed) |
| `subject` | CertificatePrincipal | Subject principal |
| `subjectName` | string | Subject's Common Name |
| `serialNumber` | string | Hex value represented string |
| `validStart` | number | Start date of the certificate being valid in seconds |
| `validExpiry` | number | End date of the certificate being valid in seconds |
| `fingerprint` | string | Fingerprint of the certificate |

### CertificatePrincipal Object

| Name | Type | Description |
| --- | --- | --- |
| `commonName` | string | Common Name. |
| `organizations` | string[] | Organization names. |
| `organizationUnits` | string[] | Organization Unit names. |
| `locality` | string | Locality. |
| `state` | string | State or province. |
| `country` | string | Country or region. |

### Referrer Object

| Name | Type | Description |
| --- | --- | --- |
| `url` | string | HTTP Referrer URL. |
| `policy` | string | Can be `default`, `unsafe-url`, `no-referrer-when-downgrade`, `no-referrer`, `origin`, `strict-origin-when-cross-origin`, `same-origin` or `strict-origin`. See the [Referrer-Policy spec](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) for more details on the meaning of these values. |

### WebRequestFilter Object

| Name | Type | Description |
| --- | --- | --- |
| `urls` | string[] | Array of [URL patterns](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) used to include requests that match these patterns. Use the pattern `<all_urls>` to match all URLs. |
| `excludeUrls` | string[] (optional) | Array of [URL patterns](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns) used to exclude requests that match these patterns. |
| `types` | string[] (optional) | Array of types that will be used to filter out the requests that do not match the types. When not specified, all types will be matched. Can be `mainFrame`, `subFrame`, `stylesheet`, `script`, `image`, `font`, `object`, `xhr`, `ping`, `cspReport`, `media` or `webSocket`. |

### WebSocketOptions Object

| Name | Type | Description |
| --- | --- | --- |
| `protocols` | string \| string[] (optional) | Requested WebSocket subprotocols. |
| `headers` | Record\<string, string\> (optional) | Extra HTTP headers to send with the opening handshake. |
| `origin` | string (optional) | Value of the `Origin` header to send with the opening handshake. Defaults to the `http(s)` equivalent of the WebSocket URL's origin (e.g. connecting to `wss://api.example.com` sends `Origin: https://api.example.com`), so that the connection is treated as same-origin by the server and by SameSite cookie rules. |
| `useSessionCookies` | boolean (optional) | Whether to send cookies from the session with the opening handshake and store cookies received in the handshake response. Default is `false`. |
| `session` | Session (optional) | The [`Session`](./session-module.md) the connection is associated with. |
| `partition` | string (optional) | The name of the [`partition`](./session-module.md) the connection is associated with. Defaults to the empty string, which corresponds to the default session. If `session` is provided, `partition` is ignored. |

### SharedDictionaryInfo Object

| Name | Type | Description |
| --- | --- | --- |
| `match` | string | The matching path pattern for the dictionary which was declared in 'use-as-dictionary' response header's `match` option. |
| `matchDestinations` | string[] | An array of matching destinations for the dictionary which was declared in 'use-as-dictionary' response header's `match-dest` option. |
| `id` | string | The Id for the dictionary which was declared in 'use-as-dictionary' response header's `id` option. |
| `dictionaryUrl` | string | URL of the dictionary. |
| `lastFetchTime` | Date | The time of when the dictionary was received from the network layer. |
| `responseTime` | Date | The time of when the dictionary was received from the server. For cached responses, this time could be "far" in the past. |
| `expirationDuration` | number | The expiration time for the dictionary which was declared in 'use-as-dictionary' response header's `expires` option in seconds. |
| `lastUsedTime` | Date | The time when the dictionary was last used. |
| `size` | number | The amount of bytes stored for this shared dictionary information object in Chromium's internal storage (usually Sqlite). |
| `hash` | string | The sha256 hash of the dictionary binary. |

### SharedDictionaryUsageInfo Object

| Name | Type | Description |
| --- | --- | --- |
| `frameOrigin` | string | The origin of the frame where the request originates. It’s specific to the individual frame making the request and is defined by its scheme, host, and port. In practice, will look like a URL. |
| `topFrameSite` | string | The site of the top-level browsing context (the main frame or tab that contains the request). It’s less granular than `frameOrigin` and focuses on the broader "site" scope. In practice, will look like a URL. |
| `totalSizeBytes` | number | The amount of bytes stored for this shared dictionary information object in Chromium's internal storage (usually Sqlite). |

### ServiceWorkerInfo Object

| Name | Type | Description |
| --- | --- | --- |
| `scriptUrl` | string | The full URL to the script that this service worker runs |
| `scope` | string | The base URL that this service worker is active for. |
| `renderProcessId` | number | The virtual ID of the process that this service worker is running in. This is not an OS level PID. This aligns with the ID set used for `webContents.getProcessId()`. |
| `versionId` | number | ID of the service worker version |

### Extension Object

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | |
| `manifest` | any | Copy of the [extension's manifest data](https://developer.chrome.com/extensions/manifest). |
| `name` | string | |
| `path` | string | The extension's file path. |
| `version` | string | |
| `url` | string | The extension's `chrome-extension://` URL. |

### ExtensionInfo Object

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | |
| `version` | string | |

### PreloadScript Object

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | Context type where the preload script will be executed. Possible values include `frame` or `service-worker`. |
| `id` | string | Unique ID of preload script. |
| `filePath` | string | Path of the script file. Must be an absolute path. |

### PreloadScriptRegistration Object

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | Context type where the preload script will be executed. Possible values include `frame` or `service-worker`. |
| `id` | string (optional) | Unique ID of preload script. Defaults to a random UUID. |
| `filePath` | string | Path of the script file. Must be an absolute path. |

## Notes

* Source pages (https://www.electronjs.org/docs/latest/api/structures/<name>): cookie, proxy-config, resolved-host, resolved-endpoint, certificate, certificate-principal, referrer, web-request-filter, web-socket-options, shared-dictionary-info, shared-dictionary-usage-info, service-worker-info, extension, extension-info, preload-script, preload-script-registration.
* `Cookie` is returned by [Cookies](./cookies.md); `ProxyConfig` by `ses.setProxy`; `ResolvedHost` / `ResolvedEndpoint` by `ses.resolveHost` / `net.resolveHost`; `Certificate` by `ses.setCertificateVerifyProc`; `WebRequestFilter` by [WebRequest](./web-request.md); `WebSocketOptions` by net.WebSocket; `PreloadScript` / `PreloadScriptRegistration` by `ses.registerPreloadScript`.
* `Referrer` is a standalone structure used elsewhere in the Electron API.
* These shapes describe browser-profile cookies and network configuration inside an Electron app; for authentication-session cookies see better-auth (it has an Electron integration).

## Related

* [session-module](./session-module.md)
* [cookies](./cookies.md)
* [web-request](./web-request.md)
* [service-workers](./service-workers.md)
* [extensions-api](./extensions-api.md)
