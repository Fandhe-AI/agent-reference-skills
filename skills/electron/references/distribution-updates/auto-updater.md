---
source: https://www.electronjs.org/docs/latest/api/auto-updater
---

# autoUpdater

Enable apps to automatically update themselves. Process: Main. `autoUpdater` is an EventEmitter.

## Signature / Usage

```js
const { app, autoUpdater } = require('electron')

const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

## Methods

| Method | Description |
|--------|-------------|
| `autoUpdater.setFeedURL(options)` | Sets the `url` and initializes the auto updater. |
| `autoUpdater.getFeedURL()` | Returns `string` - The current update feed URL. |
| `autoUpdater.checkForUpdates()` | Asks the server whether there is an update. Must call `setFeedURL` first. |
| `autoUpdater.quitAndInstall()` | Restarts the app and installs the update after it has been downloaded. Only call after `update-downloaded` has been emitted. |

`setFeedURL` history: `headers` added as second parameter (PR 5879); changed to a single `options` argument containing `url`, `headers`, and `serverType` (PR 11925).

## Options / Props

`setFeedURL(options)`:

| Name | Type | Description |
|------|------|-------------|
| url | string | The update server URL. For Windows MSIX, either a direct link to an MSIX file (e.g. `https://example.com/update.msix`) or a JSON endpoint that returns update information (see the Squirrel.Mac README). |
| headers | Record\<string, string\> (optional) | macOS - HTTP request headers. |
| serverType | string (optional) | macOS - Can be `json` or `default`, see the Squirrel.Mac README. |
| allowAnyVersion | boolean (optional) | Windows - If `true`, allows downgrades to older versions for MSIX packages. Defaults to `false`. |

## Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `error` | `error` Error | Emitted when there is an error while updating. |
| `checking-for-update` | — | Emitted when checking for an available update has started. |
| `update-available` | — | Emitted when there is an available update. The update is downloaded automatically. |
| `update-not-available` | — | Emitted when there is no available update. |
| `update-downloaded` | `event` Event, `releaseNotes` string, `releaseName` string, `releaseDate` Date, `updateURL` string | Emitted when an update has been downloaded. With Squirrel.Windows only `releaseName` is available. |
| `before-quit-for-update` | — | Emitted after a user calls `quitAndInstall()`. The `before-quit` event is not emitted before all windows are closed, so listen to this event to perform actions before windows close as well as `before-quit`. |

## Notes

- Platform support: only macOS and Windows. There is no built-in auto-updater on Linux; use the distribution's package manager.
- macOS: built on Squirrel.Mac; no special setup. App Transport Security (ATS) applies to all update requests; apps that need to disable ATS can add `NSAllowsArbitraryLoads` to the app's plist. The application must be signed for automatic updates (Squirrel.Mac requirement).
- macOS download behavior: the update ZIP is streamed to disk. When the server answers with an `ETag` or `Last-Modified` header and honours `Range` requests, an interrupted download continues on the next update check, including after a relaunch; otherwise it starts over. An update entry may declare `sha256` (hex digest) and `size` (bytes) alongside `url`; a mismatching download is discarded before unpacking and `error` is emitted.
- macOS delta updates: an update entry may carry `delta`, an object with `from_version`, `url`, `sha256` and `size`. When `from_version` equals the running app's `CFBundleVersion`, the patch is downloaded instead of the ZIP, applied to a copy of the running app, and verified with the same code signing verification as an unpacked ZIP; on any failure the ZIP is downloaded in the same check. Patches are made with Sparkle's `BinaryDelta create`; see Squirrel.Mac's README for constraints.
- Windows chooses the updater automatically: MSIX packages (created with `electron-windows-msix`, detected via `process.windowsStore`) use the MSIX updater (direct MSIX file links and JSON update feeds); apps installed via traditional installers (`electron-winstaller` or Electron Forge's Squirrel.Windows maker) use Squirrel.Windows.
- Squirrel.Windows launches with `--squirrel-firstrun` immediately after installation and holds a file lock, so `autoUpdater` requests fail for the first few seconds. Skip update checks when `process.argv` contains `--squirrel-firstrun`, or set a 10-second timeout on update checks. Squirrel.Windows apps also receive custom launch events that your app must handle.
- The Squirrel.Windows installer creates a shortcut with an Application User Model ID in the format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE` (e.g. `com.squirrel.slack.Slack`); use the same ID with `app.setAppUserModelId`, otherwise Windows cannot pin your app properly in the task bar.
- `checkForUpdates()` downloads an available update automatically; calling it twice downloads the update two times.
- It is not strictly necessary to handle `update-downloaded` or call `quitAndInstall()`: a successfully downloaded update is applied the next time the application starts. `quitAndInstall()` closes all windows first, then calls `app.quit()`.
- The module is disabled in the Mac App Store build (see [mac-app-store-submission-guide.md](./mac-app-store-submission-guide.md)).
- Distance line: `autoUpdater` is Electron's Squirrel-based API. Native app-store updates and MSIX update flows outside Electron are covered by apple-distribution and windows-packaging-publish.

## Related

- [Updating Applications](./updates.md)
- [Code Signing](./code-signing.md)
