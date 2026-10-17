---
source: https://www.electronjs.org/docs/latest/tutorial/fuses
---

# Electron Fuses

Package time feature toggles: "magic bits" in the Electron binary that can be flipped when packaging your app to enable or disable certain features/restrictions.

## Signature / Usage

```js
const { flipFuses, FuseVersion, FuseV1Options } = require('@electron/fuses')

flipFuses(
  // Path to electron
  require('electron'),
  // Fuses to flip
  {
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: false
  }
)
```

```bash
npx @electron/fuses read --app /Applications/Foo.app
```

## What are fuses?

From a security perspective, it makes sense to disable certain unused Electron features that are powerful but may make your app's security posture weaker. For example, any app that doesn't use the `ELECTRON_RUN_AS_NODE` environment variable would want to disable the feature to prevent a subset of "living off the land" attacks.

We also don't want Electron consumers forking to achieve this goal, as building from source and maintaining a fork is a massive technical challenge and costs a lot of time and money.

Fuses are the solution to this problem. At a high level, they are "magic bits" in the Electron binary that can be flipped when packaging your Electron app to enable or disable certain features/restrictions.

Because they are flipped at package time before you code sign your app, the OS becomes responsible for ensuring those bits aren't flipped back via OS-level code signing validation (e.g. Gatekeeper on macOS or AppLocker on Windows).

## Current fuses

| Fuse | Default | @electron/fuses |
|------|---------|-----------------|
| `runAsNode` | Enabled | `FuseV1Options.RunAsNode` |
| `cookieEncryption` | Disabled | `FuseV1Options.EnableCookieEncryption` |
| `nodeOptions` | Enabled | `FuseV1Options.EnableNodeOptionsEnvironmentVariable` |
| `nodeCliInspect` | Enabled | `FuseV1Options.EnableNodeCliInspectArguments` |
| `embeddedAsarIntegrityValidation` | Disabled | `FuseV1Options.EnableEmbeddedAsarIntegrityValidation` |
| `onlyLoadAppFromAsar` | Disabled | `FuseV1Options.OnlyLoadAppFromAsar` |
| `loadBrowserProcessSpecificV8Snapshot` | Disabled | `FuseV1Options.LoadBrowserProcessSpecificV8Snapshot` |
| `grantFileProtocolExtraPrivileges` | Enabled | `FuseV1Options.GrantFileProtocolExtraPrivileges` |
| `wasmTrapHandlers` | Enabled | `FuseV1Options.WasmTrapHandlers` |

### `runAsNode`

The `runAsNode` fuse toggles whether the `ELECTRON_RUN_AS_NODE` environment variable is respected or not. With this fuse disabled, `child_process.fork` throws, as it depends on this environment variable to function. Instead, we recommend that you use Utility Processes, which work for many use cases where you need a standalone Node.js process (e.g. a SQLite server process).

### `cookieEncryption`

The `cookieEncryption` fuse toggles whether the cookie store on disk is encrypted using OS level cryptography keys. By default, the SQLite database that Chromium uses to store cookies stores the values in plaintext. If you wish to ensure your app's cookies are encrypted in the same way Chromium does, then you should enable this fuse. Please note it is a one-way transition—if you enable this fuse, existing unencrypted cookies will be encrypted-on-write, but subsequently disabling the fuse later will make your cookie store corrupt and useless. Most apps can safely enable this fuse.

> **Important:** On macOS, this fuse relies on the same OS-level access to the Keychain as `safeStorage`, so your app should be code signed for it to work correctly.

### `nodeOptions`

The `nodeOptions` fuse toggles whether the `NODE_OPTIONS` and `NODE_EXTRA_CA_CERTS` environment variables are respected. The `NODE_OPTIONS` environment variable can be used to pass all kinds of custom options to the Node.js runtime and isn't typically used by apps in production. Most apps can safely disable this fuse.

### `nodeCliInspect`

The `nodeCliInspect` fuse toggles whether the `--inspect`, `--inspect-brk`, etc. flags are respected or not. When disabled, it also ensures that `SIGUSR1` signal does not initialize the main process inspector. Most apps can safely disable this fuse.

### `embeddedAsarIntegrityValidation`

The `embeddedAsarIntegrityValidation` fuse toggles a feature on macOS and Windows that validates the content of the `app.asar` file when it is loaded. This feature is designed to have a minimal performance impact but may marginally slow down file reads from inside the `app.asar` archive. Most apps can safely enable this fuse.

For more information on how to use ASAR integrity validation, please read the Asar Integrity documentation.

### `onlyLoadAppFromAsar`

The `onlyLoadAppFromAsar` fuse changes the search system that Electron uses to locate your app code. By default, Electron will search for this code in the following order:

1. `app.asar`
1. `app`
1. `default_app.asar`

When this fuse is enabled, Electron will _only_ search for `app.asar`. When combined with the `embeddedAsarIntegrityValidation` fuse, this fuse ensures that it is impossible to load non-validated code.

### `loadBrowserProcessSpecificV8Snapshot`

V8 snapshots can be useful to improve app startup performance. V8 lets you take snapshots of initialized heaps and then load them back in to avoid the cost of initializing the heap.

The `loadBrowserProcessSpecificV8Snapshot` fuse changes which V8 snapshot file is used for the browser process. By default, Electron's processes will all use the same V8 snapshot file. When this fuse is enabled, the main process uses the file called `browser_v8_context_snapshot.bin` for its V8 snapshot. Other processes will use the V8 snapshot file that they normally do.

Using separate snapshots for renderer processes and the main process can improve security, especially to make sure that the renderer doesn't use a snapshot with `nodeIntegration` enabled. See electron/electron#35170 for details.

When the main process runs on a custom V8 snapshot -- this fuse, or a `v8_context_snapshot.bin` replaced with one generated by `electron-mksnapshot` -- Electron bootstraps the main process's Node.js environment from source instead of from its embedded Node.js startup snapshot, so that the objects in the custom snapshot are available to the main process. This costs part of the main-process startup time the embedded snapshot otherwise saves.

### `grantFileProtocolExtraPrivileges`

The `grantFileProtocolExtraPrivileges` fuse changes whether pages loaded from the `file://` protocol are given privileges beyond what they would receive in a traditional web browser. This behavior was core to Electron apps in original versions of Electron, but is no longer required as apps should be serving local files from custom protocols now instead (security checklist item 18).

If you aren't serving pages from `file://`, you should disable this fuse.

The extra privileges granted to the `file://` protocol by this fuse are incompletely documented below:

* `file://` protocol pages can use `fetch` to load other assets over `file://`
* `file://` protocol pages can use service workers
* `file://` protocol pages have universal access granted to child frames also running on `file://` protocols regardless of sandbox settings

### `wasmTrapHandlers`

The `wasmTrapHandlers` fuse controls whether V8 will use signal handlers to trap Out of Bounds memory access from WebAssembly. The feature works by surrounding the WebAssembly memory with large guard regions and then installing a signal handler that traps attempt to access memory in the guard region. The feature is only supported on the following 64-bit systems:

* Linux, macOS, Windows - x86_64
* Linux, macOS - aarch64

```text
| Guard Pages | WASM heap | Guard Pages |
|-----8GB-----|           |-----8GB-----|
```

When the fuse is disabled V8 will use explicit bound checks in the generated WebAssembly code to ensure memory safety. However, this method has some downsides

* The compiler generates extra nodes for each memory reference, leading to longer compile times due to the additional processing time needed for these nodes.
* In turn, these extra nodes lead to lots of extra code being generated, making WebAssembly modules bigger than they ideally should be.
* This extra code, particularly the compare and branch before every memory reference, incurs a significant runtime cost.

## How do I flip fuses?

### The easy way

`@electron/fuses` is a JavaScript utility designed to make flipping these fuses easy. Check out the README of that module for more details on usage and potential error cases.

You can validate the fuses that have been flipped or check the fuse status of an arbitrary Electron app using the `@electron/fuses` CLI (`npx @electron/fuses read --app /Applications/Foo.app`).

> **Note:** If you are using Electron Forge to distribute your application, you can flip fuses using `@electron-forge/plugin-fuses`, which comes pre-installed with all templates.

### The hard way

> **Important — Glossary:**
>
> * **Fuse Wire**: A sequence of bytes in the Electron binary used to control the fuses
> * **Sentinel**: A static known sequence of bytes you can use to locate the fuse wire
> * **Fuse Schema**: The format/allowed values for the fuse wire

Manually flipping fuses requires editing the Electron binary and modifying the fuse wire to be the sequence of bytes that represent the state of the fuses you want.

Somewhere in the Electron binary, there will be a sequence of bytes that look like this:

```text
| ...binary | sentinel_bytes | fuse_version | fuse_wire_length | fuse_wire | ...binary |
```

* `sentinel_bytes` is always this exact string: `dL7pKGdnNz796PbbjQWNKmHXBZaB9tsX`
* `fuse_version` is a single byte whose unsigned integer value represents the version of the fuse schema
* `fuse_wire_length` is a single byte whose unsigned integer value represents the number of fuses in the following fuse wire
* `fuse_wire` is a sequence of N bytes, each byte represents a single fuse and its state.
  * "0" (0x30) indicates the fuse is disabled
  * "1" (0x31) indicates the fuse is enabled
  * "r" (0x72) indicates the fuse has been removed and changing the byte to either 1 or 0 will have no effect.

To flip a fuse, you find its position in the fuse wire and change it to "0" or "1" depending on the state you'd like.

You can view the current schema in `build/fuses/fuses.json5` of the electron/electron repository.

## Notes

* Fuses are flipped at package time, before code signing; the OS code-signing validation then protects the flipped bits. For signing and notarization, see apple-distribution and windows-packaging-publish.

## Related

* [asar-integrity.md](./asar-integrity.md)
* [security-checklist-11-20.md](./security-checklist-11-20.md)
* [utility-process.md](../ipc-preload/utility-process.md)
