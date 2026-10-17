---
source: https://v2.tauri.app/security/csp/
---

# Content Security Policy (CSP)

Tauri restricts the Content Security Policy of your HTML pages to reduce or prevent the impact of common web vulnerabilities such as cross-site scripting (XSS).

## Signature / Usage

Example CSP configuration from the Tauri `api` example (`tauri/examples/api/src-tauri/tauri.conf.json`):

```json
  "csp": {
        "default-src": "'self' customprotocol: asset:",
        "connect-src": "ipc: http://ipc.localhost",
        "font-src": ["https://fonts.gstatic.com"],
        "img-src": "'self' asset: http://asset.localhost blob: data:",
        "style-src": "'unsafe-inline' 'self' https://fonts.googleapis.com"
      },
```

## Notes

- The `csp` value lives at `app > security > csp` in `tauri.conf.json` (string or directive map); `app > security > devCsp` overrides it in development, and `dangerousDisableAssetCspModification` disables the injected nonces/hashes (config.schema.json SecurityConfig).
- Local scripts are hashed; styles and external scripts are referenced using a cryptographic nonce, which prevents unallowed content from being loaded. At compile time Tauri appends its nonces and hashes to the relevant CSP attributes of bundled code and assets automatically.
- CSP protection is only enabled if set in the Tauri configuration file. Make it as restrictive as possible, only allowing hosts you trust, preferably your own.
- Avoid loading remote content such as scripts served over a CDN; any untrusted file can introduce new attack vectors.
- When using Rust to develop your frontend, or if your frontend otherwise uses WebAssembly, include `'wasm-unsafe-eval'` as a `script-src`.
- Every application developer needs to tailor the CSP to their own needs. See MDN for `script-src`, `style-src` and CSP Sources.

## Related

- [HTTP Headers](./http-headers.md)
- [Asset Protocol](./asset-protocol.md)
- [Application Lifecycle Threats](./lifecycle.md)
