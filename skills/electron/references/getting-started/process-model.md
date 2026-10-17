---
source: https://www.electronjs.org/docs/latest/tutorial/process-model
---

# Process Model

Electron inherits its multi-process architecture from Chromium, which makes the framework architecturally very similar to a modern web browser. As an app developer, you control two types of processes: main and renderer (analogous to Chrome's browser and renderer processes), plus optional utility processes.

## Signature / Usage

```js
// main.js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

## The main process

- Each Electron app has a single main process, the application's entry point. It runs in a Node.js environment (can `require` modules and use all Node.js APIs).
- Window management: creates and manages application windows with the `BrowserWindow` module. Each `BrowserWindow` instance loads a web page in a separate renderer process; interact with it from main via the window's `webContents` object. When a `BrowserWindow` instance is destroyed, its renderer process is terminated too. `BrowserWindow` is an `EventEmitter`.
- A renderer process is also created for web embeds such as the `BrowserView` module; `webContents` is accessible for embedded web content.
- Application lifecycle: controlled through the `app` module.

```js
// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

- Native APIs: the main process exposes modules that control native desktop functionality, such as menus, dialogs, and tray icons.

## The renderer process

- One renderer process per open `BrowserWindow` (and each web embed). Code should behave according to web standards: an HTML file is the entry point, styling via CSS, executable code via `<script>` elements.
- The renderer has no direct access to `require` or other Node.js APIs. To include npm modules in the renderer, use the same bundler toolchains (for example webpack or parcel) as on the web.
- Warning: renderer processes can be spawned with a full Node.js environment for ease of development. Historically this was the default, but the feature was disabled for security reasons.

## Preload scripts

Preload scripts contain code that executes in a renderer process before its web content begins loading. They run within the renderer context but have access to Node.js APIs. Attach one with the `preload` option of `webPreferences`:

```js
const { BrowserWindow } = require('electron')
const path = require('node:path')
// ...
const win = new BrowserWindow({
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
})
// ...
```

`webPreferences.preload` requires an absolute path; the original page writes the placeholder `'path/to/preload.js'`, which this page expands with `path.join(__dirname, ...)`.

Because of the `contextIsolation` default, you cannot directly attach variables from the preload script to `window` (`window.myAPI = { desktop: true }` in preload yields `undefined` in the renderer). Use `contextBridge`:

```js
// preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})
```

```js
// renderer.js
console.log(window.myAPI)
// => { desktop: true }
```

Useful for (1) exposing `ipcRenderer` helpers to trigger main process tasks via IPC, and (2) adding desktop-only properties to the `window` global when wrapping a remote web app.

## The utility process

Each app can spawn multiple child processes from the main process using the `UtilityProcess` API. It runs in a Node.js environment and can host untrusted services, CPU intensive tasks, or crash prone components. Unlike a process spawned with Node.js `child_process.fork`, a utility process can establish a communication channel with a renderer process using `MessagePort`s. Prefer `UtilityProcess` over `child_process.fork` when forking from the main process.

## Process-specific module aliases (TypeScript)

The npm package exports subpaths containing a subset of the TypeScript type definitions:

- `electron/main` - types for all main process modules.
- `electron/renderer` - types for all renderer process modules.
- `electron/common` - types for modules that can run in main and renderer processes.

These aliases have no impact on runtime.

```js
const { shell } = require('electron/common')
const { app } = require('electron/main')
```

## Notes

- Distance: BrowserWindow / BaseWindow here are Electron's Chromium-backed windows, distinct from the OS-native window APIs in windows-winui-ui (AppWindow) and apple-appkit (NSWindow). Menu, dialog and Tray here are OS-native elements created from the main process, distinct from the Web UI components in ark-ui, chakra-ui and fandhe-frontend.

## Related

- [Glossary](./glossary.md)
- [process](./process.md)
- [ES Modules (ESM) in Electron](./esm.md)
