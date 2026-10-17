---
source: https://www.electronjs.org/docs/latest/tutorial/security
---

# Security: preface, general guidelines, checklist index

A set of guidelines for building secure Electron apps. This page covers the preface, the general guidelines and the index of the 20-item checklist (items 1-10 and 11-20 are on separate pages).

## Signature / Usage

```js
// Security warnings can be force-enabled or force-disabled
// via ELECTRON_ENABLE_SECURITY_WARNINGS / ELECTRON_DISABLE_SECURITY_WARNINGS
// set on either `process.env` or the `window` object.
```

> **Reporting security issues:** For information on how to properly disclose an Electron vulnerability, see SECURITY.md. For upstream Chromium vulnerabilities: Electron keeps up to date with alternating Chromium releases. For more information, see the Electron Release Timelines document.

## Preface

As web developers, we usually enjoy the strong security net of the browser — the risks associated with the code we write are relatively small. Our websites are granted limited powers in a sandbox, and we trust that our users enjoy a browser built by a large team of engineers that is able to quickly respond to newly discovered security threats.

When working with Electron, it is important to understand that Electron is not a web browser. It allows you to build feature-rich desktop applications with familiar web technologies, but your code wields much greater power. JavaScript can access the filesystem, user shell, and more. This allows you to build high quality native applications, but the inherent security risks scale with the additional powers granted to your code.

With that in mind, be aware that displaying arbitrary content from untrusted sources poses a severe security risk that Electron is not intended to handle. In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) — if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious.

## General guidelines

### Security is everyone's responsibility

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (_Chromium_, _Node.js_), Electron itself, all NPM dependencies and your code. As such, it is your responsibility to follow a few important best practices:

* **Keep your application up-to-date with the latest Electron framework release.** When releasing your product, you're also shipping a bundle composed of Electron, Chromium shared library and Node.js. Vulnerabilities affecting these components may impact the security of your application. By updating Electron to the latest version, you ensure that critical vulnerabilities (such as _nodeIntegration bypasses_) are already patched and cannot be exploited in your application. For more information, see "Use a current version of Electron" (checklist item 16).

* **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.

* **Adopt secure coding practices.** The first line of defense for your application is your own code. Common web vulnerabilities, such as Cross-Site Scripting (XSS), have a higher security impact on Electron applications hence it is highly recommended to adopt secure software development best practices and perform security testing.

### Isolation for untrusted content

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default `BrowserWindow`. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> **Warning:** Under no circumstances should you load and execute remote code with Node.js integration enabled. Instead, use only local files (packaged together with your application) to execute Node.js code. To display remote content, use the `<webview>` tag or a `WebContentsView` and make sure to disable the `nodeIntegration` and enable `contextIsolation`.

> **Electron security warnings:** Security warnings and recommendations are printed to the developer console. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.
>
> You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Checklist: Security recommendations

You should at least follow these steps to improve the security of your application:

1. Only load secure content
2. Do not enable Node.js integration for remote content
3. Enable context isolation in all renderers
4. Enable process sandboxing
5. Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
6. Do not disable `webSecurity`
7. Define a `Content-Security-Policy` and use restrictive rules (i.e. `script-src 'self'`)
8. Do not enable `allowRunningInsecureContent`
9. Do not enable experimental features
10. Do not use `enableBlinkFeatures`
11. `<webview>`: Do not use `allowpopups`
12. `<webview>`: Verify options and params
13. Disable or limit navigation
14. Disable or limit creation of new windows
15. Do not use `shell.openExternal` with untrusted content
16. Use a current version of Electron
17. Validate the `sender` of all IPC messages
18. Avoid usage of the `file://` protocol and prefer usage of custom protocols
19. Check which fuses you can change
20. Do not expose Electron APIs to untrusted web content

## Notes

* The "Isolation for untrusted content" sentence predates the current defaults: `nodeIntegration: false`, `contextIsolation: true` (since 12.0.0) and `sandbox: true` (since 20.0.0). Under those defaults, script injected into remote content cannot reach native code without something more: Node.js integration enabled, `contextIsolation` or `sandbox` disabled, a preload that exposes privileged APIs over `contextBridge` or IPC, or a separate Chromium or Electron vulnerability.
* Items 1-10 are in [security-checklist-1-10.md](./security-checklist-1-10.md); items 11-20 are in [security-checklist-11-20.md](./security-checklist-11-20.md).
* Source anchors for the checklist items: `#1-only-load-secure-content`, `#11-do-not-use-allowpopups-for-webviews` (rendered-site ids).

## Related

* [security-checklist-1-10.md](./security-checklist-1-10.md)
* [security-checklist-11-20.md](./security-checklist-11-20.md)
* [sandbox.md](./sandbox.md)
* [fuses.md](./fuses.md)
* [context-isolation.md](../ipc-preload/context-isolation.md)
