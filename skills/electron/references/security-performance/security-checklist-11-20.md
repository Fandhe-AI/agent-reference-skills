---
source: https://www.electronjs.org/docs/latest/tutorial/security#11-do-not-use-allowpopups-for-webviews
---

# Security checklist 11-20

Security recommendations 11-20 from the Electron security guide: webview options, navigation, new windows, shell.openExternal, current Electron version, IPC sender validation, custom protocols, fuses, exposing Electron APIs.

## Signature / Usage

```js
const { app } = require('electron')

const { URL } = require('node:url')

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 11. Do not use `allowpopups` for WebViews

> This recommendation is Electron's default.

If you are using `<webview>`, you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new `BrowserWindows` using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.

**Why?** If you do not need popups, you are better off not allowing the creation of new `BrowserWindows` by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 12. Verify WebView options before creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new `<webview>` tags from the main process and to verify that their webPreferences do not disable security features.

**Why?** Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created `<webview>` tags.

Before a `<webview>` tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, but does not remove it. If your goal is to display a website, a browser will be a more secure option.

## 13. Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

**Why?** Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

If your app has no need for navigation, you can call `event.preventDefault()` in a `will-navigate` handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const { app } = require('electron')

const { URL } = require('node:url')

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 14. Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

**Why?** Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

`webContents` will delegate to its window open handler (`contents.setWindowOpenHandler`) before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { app, shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 15. Do not use `shell.openExternal` with untrusted content

The shell module's `openExternal` API allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

**Why?** Improper use of `openExternal` can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

```js
//  Bad
const { shell } = require('electron')

shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
//  Good
const { shell } = require('electron')

shell.openExternal('https://example.com/index.html')
```

## 16. Use a current version of Electron

You should strive for always using the latest available version of Electron. Whenever a new major version is released, you should attempt to update your app as quickly as possible.

**Why?** An application built with an older version of Electron, Chromium, and Node.js is an easier target than an application that is using more recent versions of those components. Generally speaking, security issues and exploits for older versions of Chromium and Node.js are more widely available.

Both Chromium and Node.js are impressive feats of engineering built by thousands of talented developers. Given their popularity, their security is carefully tested and analyzed by equally skilled security researchers. Many of those researchers disclose vulnerabilities responsibly, which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Your application will be more secure if it is running a recent version of Electron (and thus, Chromium and Node.js) for which potential security issues are not as widely known.

**How?** Migrate your app one major version at a time, while referring to Electron's Breaking Changes document to see if any code needs to be updated.

## 17. Validate the `sender` of all IPC messages

You should always validate incoming IPC messages `sender` property to ensure you aren't performing actions or sending information to untrusted renderers.

**Why?** All Web Frames can in theory send IPC messages to the main process, including iframes and child windows in some scenarios. If you have an IPC message that returns user data to the sender via `event.reply` or performs privileged actions that the renderer can't natively, you should ensure you aren't listening to third party web frames.

You should be validating the `sender` of **all** IPC messages by default.

```js
// Bad
ipcMain.handle('get-secrets', () => {
  return getSecrets()
})

// Good
ipcMain.handle('get-secrets', (e) => {
  if (!validateSender(e.senderFrame)) return null
  return getSecrets()
})

function validateSender(frame) {
  // Validate the frame's origin against an allowlist. Use the origin, not the
  // URL: about:blank, blob: and sandboxed documents have URLs that do not
  // identify who controls them, and the frame may be null if it has gone away.
  if (frame && frame.origin === 'https://electronjs.org') return true
  return false
}
```

## 18. Avoid usage of the `file://` protocol and prefer usage of custom protocols

You should serve local pages from a custom protocol instead of the `file://` protocol.

**Why?** The `file://` protocol gets more privileges in Electron than in a web browser and even in browsers it is treated differently to http/https URLs. Using a custom protocol allows you to be more aligned with classic web url behavior while retaining even more control about what can be loaded and when.

Pages running on `file://` have unilateral access to every file on your machine meaning that XSS issues can be used to load arbitrary files from the users machine. Using a custom protocol prevents issues like this as you can limit the protocol to only serving a specific set of files.

**How?** Follow the `protocol.handle` examples (API docs: `protocolhandlescheme-handler`) to learn how to serve files / content from a custom protocol.

## 19. Check which fuses you can change

Electron ships with a number of options that can be useful but a large portion of applications probably don't need. In order to avoid having to build your own version of Electron, these can be turned off or on using Fuses.

**Why?** Some fuses, like `runAsNode` and `nodeCliInspect`, allow the application to behave differently when run from the command line using specific environment variables or CLI arguments. These can be used to execute commands on the device through your application.

This can let external scripts run commands that they potentially would not be allowed to, but that your application might have the rights for.

**How?** `@electron/fuses` is a module we made to make flipping these fuses easy. Check out the README of that module for more details on usage and potential error cases, and refer to "How do I flip fuses?" in the Fuses documentation.

## 20. Do not expose Electron APIs to untrusted web content

You should not directly expose Electron's APIs, especially IPC, to untrusted web content in your preload scripts.

**Why?** Exposing raw APIs like `ipcRenderer.on` is dangerous because it gives renderer processes direct access to the entire IPC event system, allowing them to listen for any IPC events, not just the ones intended for them.

To avoid that exposure, we also cannot pass callbacks directly through: The first argument to IPC event callbacks is an `IpcRendererEvent` object, which includes properties like `sender` that provide access to the underlying `ipcRenderer` instance. Even if you only listen for specific events, passing the callback directly means the renderer gets access to this event object.

In short, we want the untrusted web content to only have access to necessary information and APIs.

```js
// Bad
contextBridge.exposeInMainWorld('electronAPI', {
  on: ipcRenderer.on
})

// Also bad
contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
})

// Good
contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
})
```

For more information on what `contextIsolation` is and how to use it to secure your app, please see the Context Isolation document.

## Notes

* Items 11 and 12 concern the Electron `<webview>` tag. For the WebView2 control see windows-winui-controls, and for webview test automation see playwright.
* Item 14 uses `shell.openExternal` and `setWindowOpenHandler`, which are Electron main-process APIs; they are not related to Web UI components such as ark-ui or chakra-ui.
* The `isSafeForExternalOpen`, `USER_CONTROLLED_DATA_HERE`, and `getSecrets` identifiers in the snippets are placeholders from the original docs, not Electron APIs.

## Related

* [security-overview.md](./security-overview.md)
* [security-checklist-1-10.md](./security-checklist-1-10.md)
* [fuses.md](./fuses.md)
* [context-isolation.md](../ipc-preload/context-isolation.md)
* [web-preferences.md](../windows/web-preferences.md)
