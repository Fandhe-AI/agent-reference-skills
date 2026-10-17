---
source: https://www.electronjs.org/docs/latest/tutorial/installation
---

# Installation

Advanced installation instructions. Install prebuilt Electron binaries with npm, preferably as a development dependency of your app.

## Signature / Usage

```sh
npm install electron --save-dev
```

## Binary download step

The JavaScript API binds to a binary that is downloaded by default the first time you run Electron in development mode (`electron .`). To install the binary on demand, run the `install-electron` bin script included in the `electron` package:

```sh
npx install-electron --no
```

## Installing prereleases

```sh
npm install electron-nightly --save-dev   # latest changes from the main branch
npm install electron@alpha --save-dev     # changes slated for the next major version
npm install electron@beta --save-dev
```

See the Release Status dashboard at `https://releases.electronjs.org` for available releases.

## Running Electron ad-hoc

```sh
npx electron .
```

Runs the current working directory with Electron; dependencies of your app will not be installed.

## Customization

Change the downloaded architecture (e.g. `x64` on an `arm64` machine) with `ELECTRON_INSTALL_ARCH`; platform with `ELECTRON_INSTALL_PLATFORM`:

```sh
# Inside an npm script or with npx
ELECTRON_INSTALL_ARCH=x64 electron .
ELECTRON_INSTALL_PLATFORM=mas electron .
```

| Setting | Supported values |
|---------|------------------|
| Architecture | `x64` (Intel Mac and 64-bit Windows), `arm64` (Apple silicon, Windows on ARM, ARM64 Linux) |
| Platform | `darwin`, `mas` (Mac App Store), `win32`, `linux` |

All available platform/architecture combinations for a release are listed as artifacts on Electron's GitHub Releases.

## Proxies

To use an HTTP proxy, set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version (Node 10 and above: `global-agent`; before Node 10: `global-tunnel`).

## Custom mirrors and caches

During installation the `electron` module calls `@electron/get` to download prebuilt binaries from GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`).

```js
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

```shell
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

- By default `ELECTRON_CUSTOM_DIR` is `v$VERSION`. Use the `{{ version }}` placeholder to change the format (`version-{{ version }}` resolves to `version-5.0.0`).
- The configuration above downloads from URLs such as `https://npmmirror.com/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.
- If your mirror serves artifacts with different checksums to the official release, set `electron_use_remote_checksums=1` directly or in a `.npmrc` file to use the remote `SHASUMS256.txt`.

Cache locations (`@electron/get` caches downloaded binaries):

- Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
- macOS: `~/Library/Caches/electron/`
- Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`
- Older Electron versions may use `~/.electron`. Override with the `electron_config_cache` environment variable.

## Troubleshooting

- Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` indicate network problems; switch networks or retry. You can also download Electron directly from electron/electron/releases.
- `EACCESS` error: fix your npm permissions; if it persists the `unsafe-perm` flag may need to be set to true (`sudo npm install electron --unsafe-perm=true`).
- On slow networks use `npm install --verbose electron`.
- To force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.

## Related

- [Electron Versioning](./electron-versioning.md)
- [Electron Release Timelines](./electron-timelines.md)
- [Environment Variables](./environment-variables.md)
