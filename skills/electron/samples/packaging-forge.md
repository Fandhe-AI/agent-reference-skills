---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
---

# Packaging with Electron Forge

Import an existing app into Electron Forge and build a distributable with `make`.

```sh
npm install --save-dev @electron-forge/cli
npx electron-forge import
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

- This page follows the v44.8.0 tag text. The `44-x-y` branch has unreleased wording changes to the Forge import steps of this tutorial.
- `make` runs `electron-forge package` first, then one maker per configured target; output goes to `out/` (distributables under `out/make`).
- Code signing is highly recommended and mandatory for the auto-update step in the final tutorial part. On macOS signing happens at the app packaging level; on Windows the installers are signed.
- Keep credentials in environment variables as in the snippets; never commit certificates or passwords.
- Distance: store submission and notarization details live in apple-distribution and windows-packaging-publish; this sample covers only the Electron Forge configuration.
