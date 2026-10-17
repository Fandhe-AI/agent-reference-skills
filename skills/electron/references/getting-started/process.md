---
source: https://www.electronjs.org/docs/latest/api/process
---

# process

Extensions to the process object. Process: Main, Renderer. Electron's `process` object is extended from the Node.js `process` object.

## Signature / Usage

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

## Events

- `Event: 'loaded'` - Emitted when Electron has loaded its internal initialization script and is beginning to load the web page or the main script.

## Properties

| Name | Type | Description |
|------|------|-------------|
| `process.defaultApp` _Readonly_ | boolean | `true` in the main process when the app is started by being passed as a parameter to the default Electron executable (e.g. `electron .`), even if `app.isPackaged` is `true`; otherwise `undefined`. |
| `process.isMainFrame` _Readonly_ | boolean | `true` when the current renderer context is the "main" renderer frame. For the current frame ID use `webFrame.routingId`. |
| `process.mas` _Readonly_ | boolean | `true` for Mac App Store builds, `undefined` otherwise. |
| `process.noAsar` | boolean | `true` disables ASAR support in Node's built-in modules. |
| `process.noDeprecation` | boolean | `true` silences deprecation warnings (instead of `--no-deprecation`). |
| `process.resourcesPath` _Readonly_ | string | Path to the resources directory. |
| `process.sandboxed` _Readonly_ | boolean | `true` when the renderer is sandboxed, `undefined` otherwise. |
| `process.contextIsolated` _Readonly_ | boolean | Whether the current renderer context has `contextIsolation` enabled; `undefined` in the main process. |
| `process.throwDeprecation` | boolean | `true` throws deprecations as exceptions (instead of `--throw-deprecation`). |
| `process.traceDeprecation` | boolean | `true` prints stack traces for deprecations (instead of `--trace-deprecation`). |
| `process.traceProcessWarnings` | boolean | `true` prints stack traces for process warnings including deprecations (instead of `--trace-warnings`). |
| `process.type` _Readonly_ | string | `browser` (main process), `renderer`, `service-worker`, `worker`, or `utility` (node process launched as a service). |
| `process.versions.chrome` _Readonly_ | string | Chrome's version string. |
| `process.versions.electron` _Readonly_ | string | Electron's version string. |
| `process.windowsStore` _Readonly_ | boolean | `true` if running as an MSIX package (including AppX for Windows Store), `undefined` otherwise. |
| `process.contextId` _Readonly_ | string (optional) | Globally unique ID of the current JavaScript context (each frame has its own; the isolated world has a separate one). Renderer only. |
| `process.parentPort` | Electron.ParentPort | Set if this is a `UtilityProcess` (`null` otherwise), allowing communication with the parent process. |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `process.crash()` | | Causes the main thread of the current process to crash. |
| `process.getCreationTime()` | `number \| null` | Milliseconds since epoch of the application creation time, or `null` if unavailable. |
| `process.getCPUUsage()` | `CPUUsage` | CPU usage of the current process. `percentCPUUsage` and `idleWakeupsPerSecond` are averages over the time since the previous call; each call starts a new measurement interval shared by every caller in the process. |
| `process.getHeapStatistics()` | Object | V8 heap statistics in Kilobytes: `totalHeapSize`, `totalHeapSizeExecutable`, `totalPhysicalSize`, `totalAvailableSize`, `usedHeapSize`, `heapSizeLimit`, `mallocedMemory`, `peakMallocedMemory`, `doesZapGarbage` (boolean). |
| `process.getBlinkMemoryInfo()` | Object | `allocated` and `total` in Kilobytes; useful for rendering / DOM memory issues. |
| `process.getProcessMemoryInfo()` | `Promise<ProcessMemoryInfo>` | Memory usage statistics (Kilobytes) of the current process; call after app ready. Chromium does not provide `residentSet` on macOS; `private` is more representative there. |
| `process.getSystemMemoryInfo()` | Object | System-wide statistics in Kilobytes: `total`, `free`, `available` (Linux; from `MemAvailable`), `fileBacked` (macOS), `purgeable` (macOS), `swapTotal` / `swapFree` (Windows, Linux). |
| `process.getSystemVersion()` | string | Host OS version. On macOS returns the actual OS version rather than the kernel version unlike `os.release()`. |
| `process.takeHeapSnapshot(filePath)` | boolean | Takes a V8 heap snapshot to `filePath`; returns whether it was created. |
| `process.hang()` | | Causes the main thread of the current process to hang. |
| `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_ | | Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower. |

## Notes

- In sandboxed renderers `process` contains only a subset: `crash()`, `hang()`, `getCreationTime()`, `getHeapStatistics()`, `getBlinkMemoryInfo()`, `getProcessMemoryInfo()`, `getSystemMemoryInfo()`, `getSystemVersion()`, `getCPUUsage()`, `uptime()`, `argv`, `execPath`, `env`, `pid`, `arch`, `platform`, `sandboxed`, `contextIsolated`, `type`, `version`, `versions`, `mas`, `windowsStore`, `contextId`.
- Distance: this is the Node.js-style `process` global extended by Electron, not a job-queue worker (bullmq) or the OS process model.

## Related

- [Process Model](./process-model.md)
- [Command Line Switches](./command-line-switches.md)
