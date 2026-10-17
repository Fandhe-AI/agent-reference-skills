---
source: https://www.electronjs.org/docs/latest/glossary
---

# Glossary

Terminology commonly used in Electron development.

## Signature / Usage

```json
{
  "main": "main.js"
}
```

The main process file is specified in the `main` property in `package.json`; this is how `electron .` knows what file to execute at startup.

## Terms

| Term | Definition |
|------|------------|
| ASAR | Atom Shell Archive Format. A `tar`-like format that concatenates files into a single file; Electron can read arbitrary files from it without unpacking. Created primarily to improve performance on Windows when reading many small files. |
| ASAR integrity | Security feature validating the ASAR archive header hash at runtime; if no hash is present or hashes mismatch, the app forcefully terminates. |
| code signing | Developer digitally signs code to ensure it has not been tampered with after packaging. Windows and macOS implement their own versions. |
| context isolation | Security measure ensuring the preload script cannot leak privileged Electron or Node.js APIs to web contents; with it enabled, the only way to expose APIs from preload is `contextBridge`. |
| CRT | C Runtime Library; the part of the C++ Standard Library incorporating the ISO C99 standard library. |
| DMG | Apple Disk Image; packaging format used by macOS, commonly for "installers". |
| IME | Input Method Editor; lets users enter characters not found on their keyboard. |
| IDL | Interface description language; function signatures and data types in a format used to generate interfaces in Java, C++, JavaScript, etc. |
| IPC | Inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes. |
| main process | Entry point to every Electron app (commonly `main.js`); controls the app life from open to close, manages native elements such as Menu, Menu Bar, Dock, Tray, and creates each renderer process. Full Node API is built in. Called the "browser process" in Chromium. |
| MAS | Apple's Mac App Store. |
| Mojo | An IPC system for communicating intra- or inter-process, used by Chromium. |
| MSI | Packages used by the Windows Installer service to install and configure applications. |
| native modules | Modules (addons in Node.js) written in C or C++ loadable with `require()`. Electron likely uses a different V8 version from the system Node binary, so you must manually specify Electron's headers location when building them. |
| notarization | macOS-specific process where a code-signed app is sent to Apple servers to be verified for malicious components. |
| OSR | Offscreen rendering; render a page without showing it on screen. |
| preload script | Code that executes in a renderer process before its web contents begin loading; runs within the renderer context with access to Node.js APIs. |
| process | Instance of a running program. In Node.js and Electron each running process has a global `process` object. |
| renderer process | A browser window in your app. Unlike the main process there can be multiple, each in a separate process, and they can be hidden. |
| sandbox | Chromium security feature restricting renderer processes to a limited set of permissions. |
| Squirrel | Open-source framework enabling Electron apps to update automatically; see the `autoUpdater` API. |
| userland | Term from the Unix community, popularized in Node/npm: features from packages published by the user community versus "core". |
| utility process | Child of the main process that runs untrusted services that cannot run in the main process; created with the `UtilityProcess` API. |
| V8 | Google's open source JavaScript engine (C++). Electron builds V8 as part of Chromium and points Node to it. V8 version numbers correspond to those of Google Chrome. |
| webview | `webview` tags embed 'guest' content (such as external web pages); similar to `iframe`s but each runs in a separate process, with asynchronous interaction. |

## Notes

- The glossary's IPC wording (serialized JSON) is outdated: ipcRenderer / webContents IPC arguments are serialized with the Structured Clone Algorithm (see ipc-renderer.md); sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw, and sending DOM objects or special Electron objects will throw an exception.
- Distance: code signing, notarization, MAS, MSI and Squirrel are defined here only as Electron terminology. For Apple distribution workflows see apple-distribution; for MSIX / Microsoft Store packaging see windows-packaging-publish. The webview tag is not the WebView2 control (windows-winui-controls).

## Related

- [Process Model](./process-model.md)
- [process](./process.md)
