---
source: https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content
---

# Security checklist 1-10

Security recommendations 1-10 from the Electron security guide: secure content, Node.js integration, context isolation, sandboxing, permission requests, webSecurity, CSP, mixed content, experimental features, Blink features.

## Signature / Usage

```js
// Good: HTTPS, no Node.js integration, preload exposed via contextBridge
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

## 1. Only load secure content

Any resources not included with your application should be loaded using a secure protocol like `HTTPS`. In other words, do not use insecure protocols like `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

**Why?** `HTTPS` has two main benefits:

1. It ensures data integrity, asserting that the data was not modified while in transit between your application and the host.
1. It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

```js
// Bad
browserWindow.loadURL('http://example.com')

// Good
browserWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2. Do not enable Node.js integration for remote content

> This recommendation is the default behavior in Electron since 5.0.0.

It is paramount that you do not enable Node.js integration in any renderer (`BrowserWindow`, `WebContentsView`, or `<webview>`) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at `https://example.com/`, you can give that website exactly the abilities it needs, but no more.

**Why?** A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content via the contextBridge API.

## 3. Enable Context Isolation

> Context Isolation is the default behavior in Electron since 12.0.0.

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's Content Scripts to enable this behavior.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

Beware that _disabling context isolation_ for a renderer process by setting `nodeIntegration: true` _also disables process sandboxing_ for that process. See section below.

For more information on what `contextIsolation` is and how to enable it please see the dedicated Context Isolation document.

## 4. Enable process sandboxing

> This recommendation is the default behavior in Electron since 20.0.0.
>
> Additionally, process sandboxing can be enforced for all renderer processes application wide: "Enabling the sandbox globally" in the Process Sandboxing document.
>
> _Disabling context isolation_ (see above) _also disables process sandboxing_, regardless of the default, `sandbox: false` or globally enabled sandboxing!

Sandboxing is a Chromium feature that uses the operating system to significantly limit what renderer processes have access to. You should enable the sandbox in all renderers. Loading, reading or processing any untrusted content in an unsandboxed process, including the main process, is not advised.

For more information on what Process Sandboxing is and how to enable it please see the dedicated Process Sandboxing document.

## 5. Handle session permission requests from remote content

You may have seen permission requests while using Chrome: they pop up whenever the website attempts to use a feature that the user has to manually approve (like notifications).

The API is based on the Chromium permissions API and implements the same types of permissions.

**Why?** By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

```js
const { session } = require('electron')

const { URL } = require('node:url')

session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
  const parsedUrl = new URL(webContents.getURL())

  if (permission === 'notifications') {
    // Approves the permissions request
    callback(true)
  }

  // Verify URL
  if (parsedUrl.protocol !== 'https:' || parsedUrl.host !== 'example.com') {
    // Denies the permissions request
    return callback(false)
  }
})
```

Note: `session.defaultSession` is only available after `app.whenReady` is called.

## 6. Do not disable `webSecurity`

> This recommendation is Electron's default.

You may have already guessed that disabling the `webSecurity` property on a renderer process (`BrowserWindow`, `WebContentsView`, or `<webview>`) disables crucial security features.

Do not disable `webSecurity` in production applications.

**Why?** Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 7. Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

**Why?** CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://example.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

The following CSP will allow Electron to execute scripts from the current website and from `apis.example.com`.

```plaintext
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP headers

Electron respects the `Content-Security-Policy` HTTP header which can be set using Electron's `webRequest.onHeadersReceived` handler:

```js
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ["default-src 'none'"]
    }
  })
})
```

Note: `session.defaultSession` is only available after `app.whenReady` is called.

### CSP meta tag

CSP's preferred delivery mechanism is an HTTP header. However, it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 8. Do not enable `allowRunningInsecureContent`

> This recommendation is Electron's default.

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

**Why?** Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See item 1 (only load secure content) for more details.

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 9. Do not enable experimental features

> This recommendation is Electron's default.

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

**Why?** Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 10. Do not use `enableBlinkFeatures`

> This recommendation is Electron's default.

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

**Why?** Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## Notes

* Items 5 and 7 use `session.defaultSession`, which is only available after `app.whenReady`. `ses.setPermissionRequestHandler` and `webRequest.onHeadersReceived` are Electron main-process APIs for the Electron `session` object, not HTTP-server cookie/session handling (see better-auth for auth sessions and cookies, which has an Electron integration).
* Item 5: the official example does not express a safe policy as written. (1) It calls `callback(true)` for `'notifications'` before the origin check, so any origin is granted notifications. (2) The function does not `return` after `callback(true)`, so it can go on to call the callback a second time. (3) For other permissions from an allowed origin, it never calls the callback. A safe pattern, described in prose (not from the official source): check both the origin (protocol + host) and the permission first, then call `callback` exactly once on every path, approving only allowlisted pairs and denying everything else.
* Item 3: `contextIsolation` and `nodeIntegration` are independent `webPreferences`; setting `nodeIntegration: true` does not by itself set `contextIsolation: false`. The effects are separate: `contextIsolation: false` makes the preload/Electron context share globals with the page, while `nodeIntegration: true` exposes Node.js to the renderer and turns off the renderer sandbox. The sentence above is kept verbatim from the official text.
* The `<webview>` snippets above use the Electron `<webview>` tag; for the WebView2 control see windows-winui-controls, and for testing see playwright.

## Related

* [security-overview.md](./security-overview.md)
* [security-checklist-11-20.md](./security-checklist-11-20.md)
* [sandbox.md](./sandbox.md)
* [context-isolation.md](../ipc-preload/context-isolation.md)
* web-preferences.md
