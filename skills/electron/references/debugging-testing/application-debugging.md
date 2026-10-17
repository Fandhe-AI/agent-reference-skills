---
source: https://www.electronjs.org/docs/latest/tutorial/application-debugging
---

# Application Debugging

Overview of the tools for finding coding errors, performance bottlenecks, or optimization opportunities in an Electron app: Chromium DevTools for renderers, an external inspector for the main process, and logging for V8 crashes.

## Signature / Usage

Open the Chromium Developer Tools of a renderer programmatically via `openDevTools()` on the instance's `webContents`. DevTools are available for all renderer processes, including instances of `BrowserWindow`, `BrowserView`, and `WebView`.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

## Notes

- Main process: you cannot open developer tools for it. The Chromium Developer Tools can be used to debug Electron's main process thanks to Node.js inspector support, but oddities such as `require` not being present in the console may occur. See the main-process debugging page.
- V8 crashes: if the V8 context crashes, the DevTools display `DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`
- Chromium logs can be enabled via the `ELECTRON_ENABLE_LOGGING` environment variable (see Environment Variables), or by passing the command line argument `--enable-logging` (see Supported Command Line Switches).

## Related

- [Debugging the Main Process](./debugging-main-process.md)
- [DevTools Extension](./devtools-extension.md)
- [Environment Variables](../getting-started/environment-variables.md)
- [Supported Command Line Switches](../getting-started/command-line-switches.md)
