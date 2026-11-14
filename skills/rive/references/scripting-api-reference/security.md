# Scripting Security

How Rive sandboxes the scripts and shaders inside `.riv` files, and how to ship those files safely. Runtimes treat code in a file as untrusted: it runs in a sandbox and can only do what Rive allows.

## Signature / Usage

Script fetch (scripts calling `fetch()`) is off by default and can only be turned on by the app. On the web, use `@rive-app/webgl2-threads` on a cross-origin isolated page:

```typescript
import { RuntimeLoader } from "@rive-app/webgl2-threads";

// Scripts can fetch only from api.example.com.
RuntimeLoader.setScriptFetch({ allowedHosts: ["api.example.com"] });

// Later: raise the response limit and keep the other options.
RuntimeLoader.setScriptFetch({
  ...RuntimeLoader.getScriptFetch(),
  maxResponseBytes: 32 * 1024 * 1024,
});
```

Snippet taken from https://rive.app/docs/runtimes/web/rive-parameters.md (`RuntimeLoader.setScriptFetch()`).

To check a downloaded file against a SHA-256 hash built into the app, use `shasum -a 256 your-file.riv` on macOS or `sha256sum your-file.riv` on Linux.

## Options / Props

What a file can and cannot do:

| Can | Cannot |
|-----|--------|
| Draw inside its view; play sounds stored in the file | Draw outside the view or change the app's UI |
| React to input in its view (pointer, keyboard, gamepad, text entry) | Read or write files on the device; read location, contacts, photos, camera, microphone or clipboard |
| Read and change the View Model data the app binds to it; report events to the app | Read app data that is not bound to the file; reach other loaded Rive files |
| Scripts: read the current time, print to the debug console, draw with GPU Canvas shaders | Navigate the app; open URLs (only the web runtime can, via deprecated `automaticallyHandleEvents`, default `false`) |
| Send HTTPS requests only if the app turns on script fetch | Make network requests otherwise; load code from outside the file (except `decodeFile` where script fetch is supported) |

Script languages:

| | AnimaScript | Luau |
|---|---|---|
| Status | Recommended for new scripts | Deprecated; existing scripts keep running |
| Stored as | WebAssembly module | Luau bytecode |
| Apple / Android runtimes | Not yet supported (files load and play without running them) | Runs on the Luau VM |
| Signed | No (contained by the WebAssembly sandbox) | Yes (plus the Luau sandbox) |

Script fetch options (`RuntimeLoader.setScriptFetch()`):

| Option | Description | Default |
|--------|-------------|---------|
| `allowedHosts` | Hosts scripts can fetch from: exact host, `"*.example.com"` (subdomains only), or `"*"`; empty array allows none. The page's own host works only when listed by exact name | Every host |
| `proxyUrl` | Proxy page on a separate domain with no cookies; requests leave from its origin | None |
| `maxRequestsPerMinute` | Requests each file's scripts can start per minute, counted separately for AnimaScript and Luau; `0` means no limit | `60` |
| `maxResponseBytes` | Largest response body in bytes, up to 64 MiB; `0` keeps the default | 16 MiB |

Turning off scripting (no per-file setting; use a runtime build without scripting):

| Platform | Runtime without scripting |
|----------|---------------------------|
| Web | `@rive-app/canvas-lite` or `@rive-app/react-canvas-lite` (also leave out text, layouts, audio, Vector Feathering) |
| Apple | Build `rive-ios` from source with `--no-scripting` |
| Android | Build `rive-android` from source with the `noScripting` Gradle property (`-PnoScripting`) |

## Notes

- Signing: Rive signs compiled Luau scripts and shaders (not AnimaScript) with one key for every export, so a valid signature proves Rive's compilers produced the code and nobody edited it, not that it is yours. It does not cover artboards, state machines, text, images, fonts, audio, default View Model values, event settings (such as an Open URL address), script-to-object assignments or AnimaScript modules. Whole-file signing is announced as coming soon. A bad Luau or shader signature stops all of that file's Luau scripts and shaders; the rest of the file still plays.
- Time limits: AnimaScript calls run under a 200 ms budget (in browsers only if the module was built with fuel checks, `wasmFuel: true`; `dangerouslyFast` builds have none); Luau calls are interrupted after 200 ms. Treat limits as protection against mistakes, not attacks.
- Script fetch is available today in the web runtime (`@rive-app/webgl2-threads` on a cross-origin isolated page) and the Rive CLI (`--allow-net`); other runtimes are marked coming soon. Requests are `https:` to host names only (no IP addresses, `localhost`, one-word or `.local` / `.internal` names), never carry cookies, saved credentials or cache, and are not sent to Rive's own servers; at most 8 concurrent requests per file, 8 MiB request bodies, 16 MiB responses and 30 s timeouts by default (60 s max). On the web a redirect fails the request.
- Once script fetch is on it covers every file the app loads: scripts can send any bound View Model data and text typed into Text Inputs to allowed hosts. Turn it on only if you trust every file, and list only needed hosts.
- Hosted assets: the web runtime and legacy Apple / Android runtimes download them by default (web: set `enableRiveAssetCDN: false`; Apple legacy: `loadCdn: false`; Android legacy: `setShouldLoadCDNAssets(false)`, `app:riveShouldLoadCDNAssets="false"` or `FallbackAssetLoader` with `loadCDNAssets = false`). The new Apple and Android runtimes do not.
- Files downloaded at runtime should be served over HTTPS and checked against a SHA-256 hash (or your own signature) built into the app, not fetched from the same server; bundled files should live in version control with recorded hashes. Files decoded by scripts (`decodeFile`) are never seen by the app, so limit script fetch hosts instead.
- Sensitive data: bind only the data a file needs, never passwords, tokens or full card numbers; use native text fields for secrets; `.riv` files are not encrypted; treat events and View Model values coming back from a file as untrusted input.
- The official page covers both AnimaScript and Luau; the rest of this skill's scripting pages describe the Luau API as published at `rive.app/docs/scripting/`.
- Source: https://rive.app/docs/scripting/security.md (fetched 2026-11-14)
- Source: https://rive.app/docs/runtimes/web/rive-parameters.md (fetched 2026-11-14)

## Related

- [getting-started.md](./getting-started.md)
- [wgsl-shaders.md](./wgsl-shaders.md)
- [artboard-events.md](./artboard-events.md)
