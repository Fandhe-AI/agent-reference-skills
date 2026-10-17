---
source: https://v2.tauri.app/reference/javascript/http/
---

# @tauri-apps/plugin-http

Make HTTP requests with the Rust backend.

## Signature / Usage

```ts
import { fetch } from '@tauri-apps/plugin-http';
const response = await fetch("http://my.json.host/data.json");
console.log(response.status);  // e.g. 200
console.log(response.statusText); // e.g. "OK"
const jsonData = await response.json();
```

```ts
function fetch(input: URL | Request | string, init?: RequestInit & ClientOptions): Promise<Response>   // @since 2.0.0

interface ClientOptions {
  maxRedirections?: number
  connectTimeout?: number
  proxy?: Proxy
  danger?: DangerousSettings
}
interface Proxy {
  all?: string | ProxyConfig
  http?: string | ProxyConfig
  https?: string | ProxyConfig
}
interface ProxyConfig {
  url: string
  basicAuth?: { username: string; password: string }
  noProxy?: string
}
interface DangerousSettings {   // @since 2.3.0
  acceptInvalidCerts?: boolean
  acceptInvalidHostnames?: boolean
}
```

## Options / Props

`ClientOptions` (merged into the standard `fetch` `init`)

| Name | Type | Description |
| --- | --- | --- |
| maxRedirections | `number` | Maximum number of redirects the client should follow. If set to 0, no redirects will be followed. When the `scopeRedirects` plugin configuration is enabled, every redirect must also be allowed by the configured scope, otherwise the request fails instead of being followed. |
| connectTimeout | `number` | Timeout in milliseconds. |
| proxy | `Proxy` | Configuration of a proxy that a Client should pass requests to. |
| danger | `DangerousSettings` | Dangerous settings such as disabling SSL verification. |

`Proxy`

| Name | Type | Description |
| --- | --- | --- |
| all | `string \| ProxyConfig` | Proxy all traffic to the passed URL. |
| http | `string \| ProxyConfig` | Proxy all HTTP traffic to the passed URL. |
| https | `string \| ProxyConfig` | Proxy all HTTPS traffic to the passed URL. |

`ProxyConfig`

| Name | Type | Description |
| --- | --- | --- |
| url | `string` | The URL of the proxy server. |
| basicAuth | `{ username: string; password: string }` | Set the `Proxy-Authorization` header using Basic auth. |
| noProxy | `string` | Filter for requests that should not be proxied. Entries are comma-separated (whitespace between entries is ignored). |

`DangerousSettings` (since 2.3.0)

| Name | Type | Description |
| --- | --- | --- |
| acceptInvalidCerts | `boolean` | Disables SSL verification. |
| acceptInvalidHostnames | `boolean` | Disables hostname verification. |

## Notes

- The request is performed by the Rust backend instead of the webview, so it is not subject to CORS, but the URL must be allowed by the plugin scope.
- Security: this API has a scope configuration that restricts accessible URLs with glob patterns. Executing any API with a URL not configured on the scope results in a promise rejection due to denied access. Example capability allowing all subdomains of `tauri.app` except `https://private.tauri.app`:

```json
{
  "permissions": [
    {
      "identifier": "http:default",
      "allow": [{ "url": "https://*.tauri.app" }],
      "deny": [{ "url": "https://private.tauri.app" }]
    }
  ]
}
```

- The `signal` option of `init` can be used to abort the request; an aborted request fails with `Request cancelled`.
- The returned `Response` exposes `set-cookie` via `response.headers`, which is not Fetch-spec compliant for network responses in browsers (source comment).
- Tauri plugin (Rust-backed `fetch`), not an HTTP client library or server framework (see the fastify / hono skills for server frameworks).
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@http-v2.8.3` `plugins/http/guest-js/index.ts`

## Related

- [HTTP Client plugin](../plugins-core/http-client.md)
- [Upload plugin JS API](./upload.md)
