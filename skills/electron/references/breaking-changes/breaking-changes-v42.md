---
source: https://www.electronjs.org/docs/latest/breaking-changes#breaking-api-changes-420
---

# Breaking API Changes (42.0)

All breaking changes listed for Electron 42.0, verbatim from the official document.

## Breaking API Changes (42.0)

### Behavior Changed: macOS notifications now use `UNNotification` API

Electron has migrated from the deprecated `NSUserNotification` API to the
[`UNNotification`](https://developer.apple.com/documentation/usernotifications)
API on macOS. The new API requires that an application be code-signed in order
for notifications to be displayed. If an application is not code-signed,
notifications will emit a `failed` event on the `Notification` object.

### Behavior Changed: Offscreen rendering will use `1.0` as default device scale factor.

Previously, OSR used the primary display's device scale factor for rendering, which made the output frame size vary across users.
Developers had to manually calculate the correct size using `screen.getPrimaryDisplay().scaleFactor`. We now provide an optional property
`webPreferences.offscreen.deviceScaleFactor` to specify a custom value when creating an OSR window. At first, if the property is not set, it defaults
to the primary display's scale factor (preserving the old behavior). Starting from Electron 42, the default will change to a constant value of `1.0`
for more consistent output sizes.

### Behavior Changed: `electron` no longer downloads itself via `postinstall` script

Previously, the `electron` npm package would download the Electron binary from the repository's
GitHub Releases in the package's `postinstall` script.

With recent supply chain security attacks against the npm ecosystem with `postinstall` scripts as a
common attack vector, Electron will now download itself dynamically the first time that its main
`bin` script is run (e.g. via `npx electron`). With this change, you can now use Electron with the
npm `--ignore-scripts` flag. See [RFC #22](https://github.com/electron/rfcs/pull/22) for more context.

```sh
# won't install binary to `node_modules/electron`
npm install electron --save-dev --ignore-scripts

# will download the binary on demand before starting electron process
npx electron .

# subsequent runs will used the binary downloaded from the first run
npx electron .
```

If you need to download the Electron binary on-demand, you can now call the `install-electron` script,
which contains the exact same code from the former `postinstall` script.

```sh
npm install electron --save-dev --ignore-scripts
npx install-electron --no
```

If you need to test changes across platforms or architectures, you should now use the
`ELECTRON_INSTALL_ARCH` and `ELECTRON_INSTALL_PLATFORM` environment variables.

```sh
# before: pass npm config flag on install command
npm install --platform=mas electron --save-dev
# after: add env var when you first run the Electron command
npm install electron --save-dev
ELECTRON_INSTALL_PLATFORM=mas npx electron . --no
```

This also means the `ELECTRON_SKIP_BINARY_DOWNLOAD` environment variable is no
longer supported, as its primary purpose was to prevent the `postinstall` script from running.

### Removed: `quotas` object from `Session.clearStorageData(options)`

When calling `Session.clearStorageData(options)`, the `options.quotas` object is no longer supported because it has been
[removed](https://chromium-review.googlesource.com/c/chromium/src/+/7596126)
from upstream Chromium.

### Deprecated: Passing only an array `hslShift` to `nativeImage.createFromNamedImage()`

Passing only an array `hslShift` to `nativeImage.createFromNamedImage()` is deprecated. You should now pass an options object with an `hslShift` property instead:

```js
// Deprecated
nativeImage.createFromNamedImage(imageName, [0, 1, -1])
// Replace with
nativeImage.createFromNamedImage(imageName, {
  hslShift: [0, 1, -1]
})
```

## Notes

- Affected API areas: `Notification` (macOS, `failed` event, requires code signing); `webPreferences.offscreen.deviceScaleFactor`; `electron` npm package install behavior and environment variables (`ELECTRON_INSTALL_ARCH`, `ELECTRON_INSTALL_PLATFORM`; `ELECTRON_SKIP_BINARY_DOWNLOAD` no longer supported); `Session.clearStorageData`; `nativeImage.createFromNamedImage`.
- The `Notification` entry concerns Electron's cross-platform notification API. Platform notification frameworks are covered by apple-app-services (UserNotifications), android-platform-core and windows-app-sdk (App Notifications).
- The macOS notification requirement to be code-signed relates to apple-distribution (signing and notarization workflows).

## Related

- [Breaking API Changes (43.0)](./breaking-changes-v43.md)
- [Breaking API Changes (41.0, 40.0)](./breaking-changes-v41-v40.md)
