---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
---

# Packaging with Electron Forge

Import an existing app into Electron Forge and build a distributable with `make`.

```sh
npx create-electron-app@latest import
```

With Yarn:

```sh
yarn create electron-app import
```

```json
  //...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  //...
```

```sh
npm run make
```

macOS code signing and notarization in `forge.config.js`:

```js
module.exports = {
  packagerConfig: {
    osxSign: {},
    // ...
    osxNotarize: {
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID
    }
    // ...
  }
}
```

Windows signing via the Squirrel maker:

```js
module.exports = {
  // ...
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      }
    }
  ]
  // ...
}
```

## Notes

- This page follows the v45.3.2 tag text. v45 imports with `create-electron-app` (which also installs Forge's CLI into `devDependencies`); v44.8.0 used `npm install --save-dev @electron-forge/cli` followed by `npx electron-forge import`. Source: https://github.com/electron/electron/blob/v45.3.2/docs/tutorial/tutorial-5-packaging.md
- `make` runs `electron-forge package` first, then one maker per configured target; output goes to `out/` (distributables under `out/make`).
- Code signing is highly recommended and mandatory for the auto-update step in the final tutorial part. On macOS signing happens at the app packaging level; on Windows the installers are signed.
- Keep credentials in environment variables as in the snippets; never commit certificates or passwords.
- Distance: store submission and notarization details live in apple-distribution and windows-packaging-publish; this sample covers only the Electron Forge configuration.
