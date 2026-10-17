---
source: https://www.electronjs.org/docs/latest/tutorial/updates
---

# Updating Applications

The easiest and officially supported way to provide automatic updates is the built-in Squirrel framework and Electron's `autoUpdater` module.

## Signature / Usage

Using update.electronjs.org via `update-electron-app` (macOS or Windows; public GitHub repo; builds published to GitHub Releases; builds code-signed on macOS only):

```sh
npm install update-electron-app
```

```js
require('update-electron-app')()
```

By default it checks for updates at app startup, then every ten minutes. When an update is found it downloads in the background; when the download completes a dialog lets the user restart the app.

## Using cloud object storage (serverless)

`autoUpdater` can point at a static storage URL holding release metadata, published alongside the release (format differs for macOS and Windows). With Electron Forge, publish metadata from the ZIP Maker (macOS) with `macUpdateManifestBaseUrl` and the Squirrel.Windows Maker with `remoteReleases`.

Reading metadata with `update-electron-app`:

```js
const { updateElectronApp, UpdateSourceType } = require('update-electron-app')

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.StaticStorage,
    baseUrl: `https://my-bucket.s3.amazonaws.com/my-app-updates/${process.platform}/${process.arch}`
  }
})
```

Manual publishing: Squirrel.Mac reads a `releases.json`:

```json
{
  "currentRelease": "1.2.3",
  "releases": [
    {
      "version": "1.2.1",
      "updateTo": {
        "version": "1.2.1",
        "pub_date": "2023-09-18T12:29:53+01:00",
        "notes": "These are some release notes innit",
        "name": "1.2.1",
        "url": "https://mycompany.example.com/myapp/releases/myrelease"
      }
    },
    {
      "version": "1.2.3",
      "updateTo": {
        "version": "1.2.3",
        "pub_date": "2024-09-18T12:29:53+01:00",
        "notes": "These are some more release notes innit",
        "name": "1.2.3",
        "url": "https://mycompany.example.com/myapp/releases/myrelease3"
      }
    }
  ]
}
```

Squirrel.Windows reads the `RELEASES` file generated during the build (it names the `.nupkg` delta package):

```plaintext
B0892F3C7AC91D72A6271FF36905FEF8FE993520 electron-fiddle-0.36.3-full.nupkg 103298365
```

Files live in the same directory as the release, under a platform- and architecture-aware folder structure (`darwin/x64`, `darwin/arm64`, `win32/x64`, each with its archives and `RELEASES.json` / `RELEASES`).

## Using other update services

For private apps or releases not on GitHub Releases, run your own update server. Options: Hazel (deployable free on Vercel, pulls from GitHub Releases), Nuts (GitHub Releases, caches on disk, supports private repositories), electron-release-server (dashboard, releases need not originate on GitHub), Nucleus (Atlassian; multiple apps and channels; static file store).

Receive updates in the main process (only run in the packaged app, not development; check with `app.isPackaged`):

```js
const { app, autoUpdater, dialog } = require('electron')

const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Notify users:

```js
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## Update server specification

Roll your own Squirrel-compatible server for percentage-based rollouts, release channels, or authentication. Squirrel.Windows and Squirrel.Mac need different response formats; one server can serve both by endpoint per `process.platform`.

- Windows: the server returns the `RELEASES` artifact of the latest build at the `/RELEASES` subpath of the feed URL (e.g. `https://your-deployment-url.com/update/win32/1.2.3/RELEASES`). Squirrel.Windows compares versions, so return a response even when no update is available.

```plaintext
B0892F3C7AC91D72A6271FF36905FEF8FE993520 https://your-static.storage/your-app-1.2.3-full.nupkg 103298365
```

- macOS: when an update is available, return a JSON response at the feed URL with a mandatory `url` property (ZIP archive of the update); other properties are optional. When no update is available, return `204 No Content`.

```json
{
    "url": "https://your-static.storage/your-app-1.2.3-darwin.zip",
    "name": "1.2.3",
    "notes": "These are some release notes innit",
    "pub_date": "2024-09-18T12:29:53+01:00"
}
```

## Notes

- Handling updates manually: the `url` field supports the `file://` protocol, so you can load an update from a local directory (useful when the update server is behind authentication).
- macOS builds must be code-signed for updates; see [code-signing.md](./code-signing.md).
- Distance line: Electron's Squirrel-based update flow only. App store updates and general MSIX / Sparkle distribution are covered by apple-distribution and windows-packaging-publish.

## Related

- [autoUpdater](./auto-updater.md)
- [Code Signing](./code-signing.md)
- [Application Packaging](./application-distribution.md)
