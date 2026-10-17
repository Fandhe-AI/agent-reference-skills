---
source: https://www.electronjs.org/docs/latest/tutorial/crash-reporting
---

# Crash Reporting guide

How native crashes (segfault in Chromium, fatal V8 error, out-of-memory renderer, native module bug) are captured by `crashReporter` as Crashpad minidumps, annotated, received, and symbolicated.

## Signature / Usage

Call `crashReporter.start()` in the main process as early as possible, ideally before `app.whenReady()`; renderers and child processes started earlier are not monitored.

```js
const { app, crashReporter } = require('electron')

crashReporter.start({
  submitURL: 'https://crashes.example.com/submit',
  uploadToServer: true,
  globalExtra: {
    releaseChannel: 'beta'
  }
})

app.whenReady().then(() => {
  // create windows...
})
```

Test with `process.crash()` from the process to crash.

## How it works

- `start()` launches a separate crash handler process. Children created afterwards (renderers, GPU, utility, Node.js child processes) are monitored automatically.
- On a crash the handler writes a minidump; if uploads are enabled it sends it to `submitURL` with the annotations set at crash time.
- Reports are stored under `app.getPath('crashDumps')`; call `app.setPath('crashDumps', path)` before `start()` to relocate. The file layout is an implementation detail.
- Calling `start()` a second time does nothing; the crash reporter cannot be stopped once started.

## Annotations

| Kind | Set where | Scope |
| --- | --- | --- |
| `globalExtra` | `crashReporter.start()` only | Sent with crashes from every process; cannot be changed later |
| `extra` / `addExtraParameter()` | per process | Sent only with crashes of the process that set it |

| Process | How to set values |
| --- | --- |
| Main | `extra` in `crashReporter.start()`, or `crashReporter.addExtraParameter()` |
| Renderer | `crashReporter.addExtraParameter()` in the preload script |
| Node.js child process (`child_process.fork()`) | `process.crashReporter.addExtraParameter()` |
| Utility process (`utilityProcess.fork()`) | No API. Only `globalExtra` values are sent. |

```js
// preload.js
const { contextBridge, crashReporter } = require('electron')

const allowedKeys = new Set(['feature', 'route'])

contextBridge.exposeInMainWorld('crashContext', {
  set: (key, value) => {
    if (allowedKeys.has(key)) {
      crashReporter.addExtraParameter(key, String(value))
    }
  }
})
```

## Reacting to crashes at runtime

Listen in the main process to `render-process-gone` (on `app` or a single `webContents`) for renderers, and `child-process-gone` on `app` for other child processes (GPU, utility). Both provide a `reason` (such as `crashed`, `oom`, `killed`, `clean-exit`) and an `exitCode`.

```js
app.on('child-process-gone', (event, details) => {
  console.error(`${details.type} process gone: ${details.reason} (exit code ${details.exitCode})`)
})
```

## Receiving reports

- Reports arrive as a gzip-compressed (unless `compress: false`) `multipart/form-data` `POST` to `submitURL`. Fields: `upload_file_minidump`, `process_type`, `prod` (always `Electron`), `ver`, `_productName`, `_version` (from `app.getVersion()`), `guid`, `platform`, plus `globalExtra` values and the crashed process's own parameters.
- Respond with status `200`; the response body is stored as the report ID returned by `crashReporter.getUploadedReports()`.
- Crashpad uses the Breakpad upload protocol, so any server accepting Breakpad or Crashpad minidumps works.
- With `uploadToServer: false`, reports are still written to disk but not sent; after `crashReporter.setUploadToServer(true)` only later crashes are uploaded. Electron has no API for reading minidump files from disk.

## Symbolication

- Each GitHub release ships symbol archives: Breakpad symbols (all platforms), dSYMs (macOS), PDBs (Windows), debug info (Linux). Electron also runs a symbol server at `https://symbols.electronjs.org`.

```sh
npx electron-minidump /path/to/crash.dmp
```

- `electron-minidump` runs on macOS and Linux and can symbolicate dumps from any platform. For your own native modules generate Breakpad symbols with `dump_syms` and keep them for every release.
- macOS `.ips` system crash reports from stripped Electron binaries show misleading function names; use `@electron/symbolicate-mac`:

```sh
npx @electron/symbolicate-mac /path/to/crash.txt
```

- Hosted services listed with Electron support: Sentry, BugSplat, Backtrace (part of Sauce Labs), Bugsnag. The Electron project does not endorse or support any of them.

## Notes

- Mac App Store builds: the crash reporter is disabled. All `crashReporter` methods can be called but do nothing; `getUploadedReports()` returns an empty array.
- In sandboxed renderers `crashReporter` provides only `addExtraParameter()`, `removeExtraParameter()` and `getParameters()`. With context isolation enabled, call it from the preload script or expose a narrow function via `contextBridge`.
- Annotation limits: keys at most 39 bytes (longer ignored, with a process warning); values strings of at most 20320 bytes (longer truncated). If a key is in both `globalExtra` and process parameters, `globalExtra` wins. `getParameters()` does not include `globalExtra`.
- `compress: false` is deprecated and logs a warning.
- Distance: this is native-crash minidump reporting for Electron; it is not the Sentry SDK (or similar) itself.

## Related

- [crashReporter](./crash-reporter.md)
- [Process metric structures](./metrics-structures.md)
