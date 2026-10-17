---
source: https://v2.tauri.app/security/http-headers/
---

# HTTP Headers

Headers defined in the configuration (`app.security.headers`) are sent along with responses to the webview. Available since Tauri 2.1.0.

## Signature / Usage

`src-tauri/tauri.conf.json`:

```javascript
{
 //...
  "app":{
    //...
    "security": {
      //...
      "headers": {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Timing-Allow-Origin": [
          "https://developer.mozilla.org",
          "https://example.com",
        ],
        "X-Content-Type-Options": null, // gets ignored
        "Access-Control-Expose-Headers": "Tauri-Custom-Header",
        "Tauri-Custom-Header": {
          "key1": "'value1' 'value2'",
          "key2": "'value3'"
        }
      },
      // notice how the CSP is not defined under headers
      "csp": "default-src 'self'; connect-src ipc: http://ipc.localhost",
    }
  }
}
```

Resulting response headers for the helloworld example:

```http
access-control-allow-origin:  http://tauri.localhost
access-control-expose-headers: Tauri-Custom-Header
content-security-policy: default-src 'self'; connect-src ipc: http://ipc.localhost; script-src 'self' 'sha256-Wjjrs6qinmnr+tOry8x8PPwI77eGpUFR3EEGZktjJNs='
content-type: text/html
cross-origin-embedder-policy: require-corp
cross-origin-opener-policy: same-origin
tauri-custom-header: key1 'value1' 'value2'; key2 'value3'
timing-allow-origin: https://developer.mozilla.org, https://example.com
```

## Options / Props

Allowed header names:

| Name | Type | Description |
| --- | --- | --- |
| Access-Control-Allow-Credentials | header | Permitted header name |
| Access-Control-Allow-Headers | header | Permitted header name |
| Access-Control-Allow-Methods | header | Permitted header name |
| Access-Control-Expose-Headers | header | Permitted header name |
| Access-Control-Max-Age | header | Permitted header name |
| Cross-Origin-Embedder-Policy | header | Permitted header name |
| Cross-Origin-Opener-Policy | header | Permitted header name |
| Cross-Origin-Resource-Policy | header | Permitted header name |
| Permissions-Policy | header | Permitted header name |
| Service-Worker-Allowed | header | Permitted header name |
| Timing-Allow-Origin | header | Permitted header name |
| X-Content-Type-Options | header | Permitted header name |
| Tauri-Custom-Header | header | Not intended for production use |

Value composition rules:

| Config value | Resulting header value |
| --- | --- |
| string | stays the same |
| array | items joined by `, ` |
| key-value object (values must be strings) | each item is key + space + value; items joined by `; ` |
| null | header is ignored |

## Notes

- Headers do not apply to IPC messages and error responses; every response sent via the `get_response` function in `crates/tauri/src/protocol/tauri.rs` includes them.
- The Content-Security-Policy is not defined under `headers`; see CSP.
- Header values are always converted to strings for the actual response.
- For tests, set `Access-Control-Expose-Headers` accordingly when using `Tauri-Custom-Header`.
- `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` in the example enable `SharedArrayBuffer`; `Timing-Allow-Origin` grants listed sites access to the Resource Timing API.
- Frameworks: headers must be defined in both the framework's dev-server config (dev mode) and the Tauri config (build mode), because frameworks do not include their config headers at build time and Tauri cannot inject headers into the framework's dev server. Vite-based setups (Qwik, React, Solid, Svelte, Vue) use `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  // ...
  server: {
      // ...
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Timing-Allow-Origin': 'https://developer.mozilla.org, https://example.com',
        'Access-Control-Expose-Headers': 'Tauri-Custom-Header',
        'Tauri-Custom-Header': "key1 'value1' 'value2'; key2 'value3'"
      },
    },
})
```

- Angular: `angular.json` under `projects.<name>.architect.serve.options.headers`. Nuxt: `nuxt.config.ts` under `vite.server.headers`. Next.js (not Vite): `async headers()` in `next.config.js` returning `[{ source: '/*', headers: [{ key, value }, ...] }]`. Yew / Leptos: `headers = { ... }` under `[serve]` in `Trunk.toml`.
- Framework build tools themselves (Vite / Next.js / Nuxt) are covered by vite / nextjs-app skills; only the Tauri-side interplay is described here.

## Related

- [Content Security Policy (CSP)](./csp.md)
