---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
---

# Electron Forge

Packaging, publishing, and auto-update with Electron Forge. Sources: tutorial-packaging and tutorial-publishing-updating (`https://www.electronjs.org/docs/latest/tutorial/tutorial-publishing-updating`), taken from the original text at tag v45.3.2 (v44.8.0 used `@electron-forge/cli` + `electron-forge import` and a `publish` script; v45 uses `create-electron-app import` and a `release` script).

## Install the Forge CLI and import the project

```sh
npx create-electron-app@latest import
```

With Yarn: `yarn create electron-app import`. The conversion script also installs Forge's CLI in `devDependencies`. After import, `start` / `package` / `make` scripts and `forge.config.js` are added.

## Create distributables

```sh
npm run make
```

Runs `electron-forge package`, then produces distributables for each configured maker in `out/make`.

## Add the GitHub Publisher

```sh
npm install --save-dev @electron-forge/publisher-github
```

Configure it under `publishers` in `forge.config.js`. The auth token is read from the `GITHUB_TOKEN` environment variable by default. Keep the token secret and never write it directly into commands or files.

## Publish to GitHub Releases

> **Warning**: This actually uploads the artifacts of the configured makers to a GitHub release. The official config example uses `draft: true` (draft release). Try it on a disposable repository before a real one.

```sh
npm run release
```

Add `"release": "electron-forge release"` to `package.json` first. By default only the host OS and architecture are published.

## Install the auto-update module

```sh
npm install update-electron-app
```

Call `const { updateElectronApp } = require('update-electron-app'); updateElectronApp()` in the main process (current versions expose the named export; the official tutorial still shows the legacy default-export call). Requirements for update.electronjs.org: macOS or Windows, a public GitHub repository, and publishing to GitHub Releases (code signing is required on macOS).
