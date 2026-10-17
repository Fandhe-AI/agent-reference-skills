---
source: https://www.electronjs.org/docs/latest/tutorial/devtools-extension
---

# DevTools Extension

Electron supports Chrome DevTools extensions, which extend Chrome's developer tools for debugging popular web frameworks.

## Signature / Usage

Load an unpacked extension into a Session with `ses.extensions.loadExtension` (React Developer Tools v4.9.0 on macOS as the example):

Adapted (not in the official docs): the official tutorial still calls `session.defaultSession.loadExtension`, deprecated in Electron 36; this version uses `session.defaultSession.extensions.loadExtension`.

```js
const { app, session } = require('electron')

const os = require('node:os')
const path = require('node:path')

// on macOS
const reactDevToolsPath = path.join(
  os.homedir(),
  '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0'
)

app.whenReady().then(async () => {
  await session.defaultSession.extensions.loadExtension(reactDevToolsPath)
})
```

Steps: install the extension in Google Chrome; find its ID at `chrome://extensions`; locate Chrome's extension directory; pass the location to `ses.extensions.loadExtension`. Chrome's extension directory:

- Windows: `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`
- Linux: `~/.config/google-chrome/Default/Extensions/` (also `google-chrome-beta`, `google-chrome-canary`, `chromium` variants)
- macOS: `~/Library/Application Support/Google/Chrome/Default/Extensions`

Alternatively, use the third-party `electron-devtools-installer` npm package to automate loading.

## Notes

- Deprecated (v36): `session.loadExtension` / `removeExtension` / `getExtension` / `getAllExtensions` and the `extension-*` events moved to `session.extensions`.
- `loadExtension` returns a Promise with an Extension object. The promise must resolve (e.g. with `await`) before loading a page, otherwise the extension is not guaranteed to load.
- `loadExtension` cannot be called before the `ready` event of `app`, nor on in-memory (non-persistent) sessions.
- `loadExtension` must be called on every boot; loaded extensions are not persisted between launches.
- To remove an extension, pass its ID to `ses.extensions.removeExtension`.
- Adapted (not in the official docs): the official tutorial still uses the deprecated `ses.loadExtension` / `ses.removeExtension` form; this page uses `ses.extensions.*`.
- Electron supports only a limited set of `chrome.*` APIs, so extensions using unsupported APIs may not work.
- Tested to work: Ember Inspector, React Developer Tools, Backbone Debugger, jQuery Debugger, Vue.js devtools, Cerebral Debugger, Redux DevTools Extension, MobX Developer Tools.
- If an extension works in Chrome but not in Electron, file a bug in Electron's issue tracker; no additional support is provided for unmaintained extensions.
- Distance: this concerns Chrome DevTools browser extensions loaded into an Electron session, not React or Vue libraries themselves.

## Related

- [Application Debugging](./application-debugging.md)
- Chrome Extension Support
- Extensions class
