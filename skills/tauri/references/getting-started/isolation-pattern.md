---
source: https://v2.tauri.app/concept/inter-process-communication/isolation/
---

# Isolation Pattern

Intercept and modify Tauri API messages sent by the frontend before they reach Tauri Core, using a secure JavaScript "Isolation application" injected in a sandboxed iframe.

## Signature / Usage

`../dist-isolation/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Isolation Secure Script</title>
  </head>
  <body>
    <script src="index.js"></script>
  </body>
</html>
```

`../dist-isolation/index.js`:

```javascript
window.__TAURI_ISOLATION_HOOK__ = (payload) => {
  // let's not verify or modify anything, just print the content from the hook
  console.log('hook', payload);
  return payload;
};
```

`tauri.conf.json` (main frontend `frontendDist` is `../dist`, isolation app output is `../dist-isolation`):

```json
{
  "build": {
    "frontendDist": "../dist"
  },
  "app": {
    "security": {
      "pattern": {
        "use": "isolation",
        "options": {
          "dir": "../dist-isolation"
        }
      }
    }
  }
}
```

## Notes

- Why: protects against unwanted or malicious frontend calls to Tauri Core from untrusted content in the frontend (e.g. deeply nested build-time and bundled dependencies, the Development Threats model).
- When: highly recommended whenever it can be used. It intercepts all frontend messages, so it also covers always-on APIs such as Events. Use it to validate IPC inputs, e.g. that file read/write paths stay within expected locations, or that an HTTP fetch only sets the Origin header to what the app expects.
- How: the Isolation application runs in a sandboxed `<iframe>`; Tauri forces all IPC calls to route through it first. When the message is ready, it is encrypted with the browser's SubtleCrypto (AES-GCM, runtime-generated key) and passed back to the main frontend, then to Tauri Core, which decrypts it. New keys are generated each time the app runs.
- Approximate steps of an IPC message: (1) Tauri's IPC handler receives a message; (2) IPC handler -> Isolation application; (3) `[sandbox]` hook runs and may modify the message; (4) `[sandbox]` message is encrypted with AES-GCM; (5) `[encrypted]` Isolation application -> IPC handler; (6) `[encrypted]` IPC handler -> Tauri Core.
- Performance: encryption adds overhead compared to the Brownfield pattern, but most apps should not notice it. A cryptographically secure key is generated once at startup; in headless environments (e.g. WebDriver integration testing) without sufficient entropy, install an entropy service such as `haveged`.
- Limitation: external files do not load correctly inside sandboxed `<iframes>` on Windows, so script contents relative to the Isolation application are inlined at build time. `<script src="index.js"></script>` works, but newer mechanisms such as ES Modules will not load.
- Recommendation: keep the Isolation application and its build steps and dependencies minimal to avoid supply chain attacks on it.
- Tauri (Rust core + system WebView). Not Electron's `contextIsolation` / preload; see the electron skill for Electron.

## Related

- [Brownfield Pattern](./brownfield-pattern.md)
- [Inter-Process Communication](./inter-process-communication.md)
