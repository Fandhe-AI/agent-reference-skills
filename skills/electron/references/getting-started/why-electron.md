---
source: https://www.electronjs.org/docs/latest/why-electron
---

# Why Electron

Electron is a framework enabling developers to build cross-platform desktop applications for macOS, Windows, and Linux by combining web technologies (HTML, JavaScript, CSS) with Node.js and native code. It is open-source, MIT-licensed, and free for both commercial and personal use.

## Signature / Usage

```sh
# Anything on npm runs inside Electron; install as a dev dependency
npm install electron --save-dev
```

## Notes

- Why web technologies (per the maintainers): versatility, reliability, interoperability, ubiquity.
- Why Electron: enterprise-grade, mature (OpenJS Foundation impact project), and stability / security / performance by bundling the latest Chromium, V8, and Node.js with the application binary.
- Mature: a new major version is released in lockstep with every second major Chromium release, usually on the same day as Chromium; Electron is maintained by a diverse set of companies (Microsoft, Slack/Salesforce, Notion, and more).
- Why bundle: relying on the OS built-in web view limits you to the browser version of the oldest supported OS version (stability, security, performance concerns). The trade-off is a larger disk size (most apps are >100MB; zipped apps are usually around 80 to 100 MB).
- Native code: via Node.js native addons you can write native code in C, C++, Objective-C, Rust, or another native language.
- Developer experience: npm ecosystem, built-in OS-integration APIs (window customization, Apple Push Notification Network, custom URL protocol), open source.
- Why choose something else: resource-constrained environments and IoT, small disk footprint requirements, apps built mostly from OS UI frameworks (WinUI, SwiftUI, AppKit), games and real-time graphics, embedding lightweight websites in a primarily native app.
- Distance: apple-appkit, apple-swiftui and windows-winui-ui cover the OS-native UI frameworks mentioned above; this skill covers Electron only.

## Related

- [Introduction](./introduction.md)
- [Electron Release Timelines](./electron-timelines.md)
