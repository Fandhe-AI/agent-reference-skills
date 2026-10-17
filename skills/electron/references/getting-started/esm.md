---
source: https://www.electronjs.org/docs/latest/tutorial/esm
---

# ES Modules (ESM) in Electron

Chromium and Node.js have their own implementations of the ESM specification, and Electron chooses which module loader to use depending on the context. Added in `electron@28.0.0`.

## Signature / Usage

```js
// index.mjs (Main Process)
// add an await call here to guarantee that path setup will finish before `ready`
import('./set-up-paths.mjs')

app.whenReady().then(() => {
  console.log('This code may execute before the above import')
})
```

## ESM support matrix

| Process | ESM Loader | ESM Loader in Preload | Applicable Requirements |
|---------|------------|-----------------------|-------------------------|
| Main | Node.js | N/A | Use `await` generously before the app's `ready` event |
| Renderer (Sandboxed) | Chromium | Unsupported | Sandboxed preload scripts can't use ESM imports |
| Renderer (Unsandboxed & Context Isolated) | Chromium | Node.js | Unsandboxed ESM preload scripts run after page load on pages with no content; ESM preload scripts must have the `.mjs` extension |
| Renderer (Unsandboxed & Non Context Isolated) | Chromium | Node.js | Same as above |

## Main process

Runs in a Node.js context with its ESM loader. To enable ESM in a main-process file, either the file ends with `.mjs`, or the nearest parent package.json has `"type": "module"`.

- ES Modules load **asynchronously**: only side effects from the entry point's imports execute before `ready`. Some Electron APIs (e.g. `app.setPath`) must be called **before** `ready`, so `await` every Promise needed before `ready` (top-level `await` is available). This matters for dynamic `import()`; static imports are unaffected.
- Transpilers (Babel, TypeScript) historically turned ESM imports into synchronous CommonJS `require` calls (e.g. `@babel/plugin-transform-modules-commonjs`). Be careful about timing differences when migrating transpiled CJS code to native ESM.

## Renderer process

Uses Chromium's ESM loader: `import` statements will not have access to Node.js built-in modules and cannot load npm packages from `node_modules`.

```html
<script type="module">
    import { exists } from 'node:fs' // will not work!
</script>
```

Use a bundler such as webpack or Vite to load npm packages in the renderer.

## Preload scripts

A renderer's preload script uses the Node.js ESM loader when available, depending on the renderer's `sandbox` and `contextIsolation` preferences.

- ESM preload scripts must have the `.mjs` extension; preload scripts ignore `"type": "module"`.
- Sandboxed preload scripts run as plain JavaScript without an ESM context; use a bundler for external modules. The `electron` API is still loaded via `require('electron')`.
- If the response body of the loaded page is completely empty (`Content-Length: 0`), an unsandboxed ESM preload script will not block the page load (race conditions). Put something in the body (e.g. `<html></html>`) or use a CommonJS preload script (`.js` or `.cjs`).
- Without `contextIsolation`, an unsandboxed renderer cannot dynamically `import()` files via Node's ESM loader:

```js
// preload.mjs
// these won't work without context isolation
const fs = await import('node:fs')
await import('./foo')
```

## Related

- [Process Model](./process-model.md)
