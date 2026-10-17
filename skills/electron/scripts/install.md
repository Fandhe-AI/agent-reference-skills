---
source: https://www.electronjs.org/docs/latest/tutorial/installation
---

# Install

Installing Electron, prereleases, mirrors, cache, and proxy settings. Sources: tutorial/installation and api/environment-variables (`https://www.electronjs.org/docs/latest/api/environment-variables`).

## Install as a development dependency

```sh
npm install electron --save-dev
```

Put Electron in `devDependencies` (the packaging step bundles the binary).

## Download the binary on demand

```sh
npx install-electron --no
```

The `install-electron` bin script ships with the `electron` package. By default the binary is downloaded on the first development-mode run (`electron .`).

## Install a prerelease

```sh
npm install electron-nightly --save-dev
npm install electron@alpha --save-dev
npm install electron@beta --save-dev
```

`electron-nightly` tracks the latest changes on `main`; alpha / beta carry changes for the next major. This skill targets v44.8.0, so prereleases may have a different API.

## Run once with npx

```sh
npx electron .
```

Runs the current directory directly. The app's dependencies are not installed.

## Specify architecture / platform (at runtime)

```sh
# Inside an npm script or with npx
ELECTRON_INSTALL_ARCH=x64 electron .
ELECTRON_INSTALL_PLATFORM=mas electron .
```

Supported architectures are `x64` / `arm64`; platforms are `darwin` / `mas` / `win32` / `linux`.

## Specify architecture / platform (at install time)

```sh
ELECTRON_INSTALL_PLATFORM=darwin npm install
ELECTRON_INSTALL_ARCH=arm64 npm install
```

Usage documented in api/environment-variables. `ELECTRON_INSTALL_ARCH` does not work under Rosetta.

## Specify a mirror

```sh
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm install
```

Example of the China CDN mirror. `ELECTRON_CUSTOM_DIR` changes the path format (`{{ version }}` placeholder). The variable must be exported (or prefixed to the command) so that `npm install` and its install script receive it.

```sh
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
export ELECTRON_CUSTOM_DIR="{{ version }}"
npm install
```

Example of the China non-CDN mirror. If the mirror's checksums differ from the official ones, set `electron_use_remote_checksums=1` directly or in `.npmrc` (per the official docs).

## Override the local cache location

The official docs only state that the `electron_config_cache` environment variable overrides the cache location and give no command example (so no code block here). Default locations: Linux `$XDG_CACHE_HOME` or `~/.cache/electron/`, macOS `~/Library/Caches/electron/`, Windows `$LOCALAPPDATA/electron/Cache`.

## HTTP proxy

Set `ELECTRON_GET_USE_PROXY` to any value, plus additional environment variables depending on the host Node version (global-agent for Node 10 and later, global-tunnel before that). The official docs show no concrete command and point to an external README, so no code block here (the additional variables need confirmation).

## Install with progress output

```sh
npm install --verbose electron
```

For slow connections. To re-download assets and the SHASUM file, set the `force_no_cache` environment variable to `true` (per the official docs; no command example).

## Work around EACCESS permissions

> **Warning**: Running npm with `sudo` and `--unsafe-perm=true` runs install scripts as root. Use it only in disposable environments (containers, test VMs), and first try fixing npm permissions (official linked page).

```sh
sudo npm install electron --unsafe-perm=true
```

The procedure the official docs give only when `EACCESS` errors persist.
