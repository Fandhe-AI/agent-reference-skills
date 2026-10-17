---
source: https://www.electronjs.org/docs/latest/api/crash-reporter
---

# crashReporter

Submit crash reports to a remote server. Process: Main, Renderer.

## Signature / Usage

```js
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

## Methods

| Method | Returns | Description |
| --- | --- | --- |
| `crashReporter.start(options)` | | Must be called before other `crashReporter` APIs; main process only. Collects crashes from all subsequently created processes; cannot be disabled once started. Call as early as possible, preferably before `app.on('ready')`; a renderer created earlier is not monitored. |
| `crashReporter.getLastCrashReport()` | `CrashReport \| null` | Date and ID of the report with the most recent upload time from `getUploadedReports()`; `null` if no reports. May return a not-yet-uploaded report (check `id` is non-empty). Main only. |
| `crashReporter.getUploadedReports()` | `CrashReport[]` | Reports stored on disk. Reports not uploaded (e.g. `uploadToServer` false, failed, rate limited) are included with `id` as an empty string and a meaningless `date`. Main only. |
| `crashReporter.getUploadToServer()` | `boolean` | Whether reports should be submitted; set through `start` or `setUploadToServer`. Main only. |
| `crashReporter.setUploadToServer(uploadToServer)` | | `uploadToServer` boolean. No effect if called before `start`. Main only. |
| `crashReporter.addExtraParameter(key, value)` | | `key` string (at most 39 bytes), `value` string (at most 20320 bytes). Process-specific; same key replaces the value; read at crash time. `utilityProcess` has no API for this. |
| `crashReporter.removeExtraParameter(key)` | | Future crashes will not include this parameter. |
| `crashReporter.getParameters()` | `Record<string, string>` | Current `extra` parameters in the calling process (`extra` option and `addExtraParameter`); `globalExtra` not included. |

## Options / Props

`crashReporter.start(options)` `options` Object:

| Name | Type | Description |
| --- | --- | --- |
| `submitURL` | string (optional) | URL that crash reports are sent to as POST. Required unless `uploadToServer` is `false`. |
| `productName` | string (optional) | Defaults to `app.name`. |
| `companyName` | string (optional) _Deprecated_ | Deprecated alias for `{ globalExtra: { _companyName: ... } }`. |
| `uploadToServer` | boolean (optional) | Whether reports are sent. If false, reports are collected and stored but not uploaded. Default `true`. |
| `ignoreSystemCrashHandler` | boolean (optional) _macOS_ _Linux_ | If true, main-process crashes are not forwarded to the system crash handler. No effect on Windows. Default `false`. |
| `rateLimit` | boolean (optional) | If true, limit uploads to 1/hour; reports over the limit stay on disk. Default `false`. |
| `compress` | boolean (optional) | If true, reports are gzip-compressed (`Content-Encoding: gzip`). `false` while `uploadToServer` is `true` is deprecated and logs a warning. Default `true`. |
| `extra` | Record\<string, string\> (optional) | String annotations sent with crashes generated in the main process only. |
| `globalExtra` | Record\<string, string\> (optional) | String annotations sent with crashes from any process; cannot be changed after start. Takes precedence over process-specific keys. By default `productName`, the app version and the Electron version are included. Not returned by `getParameters()`. |

`CrashReport` object: `date` Date, `id` string.

## In Node child processes

`require('electron')` is unavailable in Node child processes (run with `ELECTRON_RUN_AS_NODE`, e.g. `child_process.fork()`), so these are on `process`: `process.crashReporter.getParameters()`, `process.crashReporter.addExtraParameter(key, value)`, `process.crashReporter.removeExtraParameter(key)`. If started in the main process, Node child processes are monitored automatically; the reporter cannot be started from a Node child process.

## Crash Report Payload

Sent to `submitURL` as `multipart/form-data` `POST` (gzip unless `compress` is `false`): `ver`, `platform`, `process_type` ('renderer', or 'browser' for main), `guid`, `_version` (version in `package.json`), `_productName`, `prod` (Electron), `_companyName` (only if deprecated `companyName` set), `upload_file_minidump` (minidump file), all first-level `globalExtra` properties, and the crashed process's extra parameters. Crashpad/Chromium may add other, unsupported fields. The response body is stored as the report ID.

## Notes

- `start`, `getLastCrashReport`, `getUploadedReports`, `getUploadToServer`, `setUploadToServer` (and `getCrashesDirectory`) were deprecated for renderer calls in Electron 10 and removed from the renderer in Electron 12 (electron/electron#23265). In v44 they are main-process only. Only `addExtraParameter`, `removeExtraParameter` and `getParameters` are usable from a renderer (from the preload script when context isolation is enabled).
- Disabled in Mac App Store builds: methods do nothing, `getUploadedReports()` returns an empty array and `getUploadToServer()` returns `false`.
- With context isolation enabled, call `addExtraParameter` / `removeExtraParameter` / `getParameters` from the preload script and expose via `contextBridge`.
- Keys over 39 bytes are ignored with a warning; values over 20320 bytes are truncated.
- Structure source: `docs/api/structures/crash-report.md` (`CrashReport`).

## Related

- [Crash Reporting guide](./crash-reporting.md)
- [process](../getting-started/process.md)
