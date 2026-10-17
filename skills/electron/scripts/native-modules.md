---
source: https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules
---

# Native Modules

Rebuilding native Node modules for Electron. Sources: using-native-node-modules and windows-arm (`https://www.electronjs.org/docs/latest/tutorial/windows-arm`).

## Rebuild with @electron/rebuild

```sh
npm install --save-dev @electron/rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

A rebuild is needed because Electron's ABI differs from Node.js. Electron Forge uses it automatically in development mode and when creating distributables.

## Install directly with npm environment variables

```sh
# Electron's version.
export npm_config_target=1.2.3
# The architecture of your machine
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://electronjs.org/headers
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

Replace `1.2.3` with the Electron version you use.

## Manual build with node-gyp

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

## Build for a custom Electron build

```sh
npm rebuild --nodedir=/path/to/src/out/Default/gen/node_headers
```

For custom builds that do not match a public release.

## Install for arm64 on Windows on ARM

```bat
set npm_config_arch=arm64
npm install
```

Empty `node_modules` first (Command Prompt). With native modules there are extra steps; see the official windows-arm page.
