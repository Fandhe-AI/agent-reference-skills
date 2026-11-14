---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-publishing-updating
---

# Publishing to GitHub Releases and Auto-Updating

Publish with Forge's GitHub Publisher and self-update through update.electronjs.org using `update-electron-app`.

```sh
npm install --save-dev @electron-forge/publisher-github
```

```js
// forge.config.js
module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'github-user-name',
          name: 'github-repo-name'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}
```

```json
  //...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "release": "electron-forge release"
  },
  //...
```

```sh
npm run release
```

```sh
npm install update-electron-app
```

```js
// main.js
const { updateElectronApp } = require('update-electron-app')

updateElectronApp()
```

## Notes

- Unlike the official tutorial, which calls the legacy default export `require('update-electron-app')()`, this sample uses the named export `updateElectronApp` exposed by current versions of update-electron-app.
- This page follows the v45.3.2 tag text. v45 renamed the Forge command used in the tutorial from `electron-forge publish` / `npm run publish` (v44.8.0) to `electron-forge release` / `npm run release`. Source: https://github.com/electron/electron/blob/v45.3.2/docs/tutorial/tutorial-6-publishing-updating.md
- update.electronjs.org requires: macOS or Windows, a public GitHub repository, builds published to GitHub releases, and (macOS only) code-signed builds.
- The publisher reads the token from the `GITHUB_TOKEN` environment variable by default (a PAT with `public_repo` scope); keep it secret and never commit it.
- `release` builds only for the host OS and architecture unless `--arch` is passed; use CI for cross-platform releases.
- `update-electron-app` finds the feed from the `repository` field of `package.json`. For private repositories or other hosts, run your own update server and configure `autoUpdater` yourself.
- Distance: store-based distribution and signing identities belong to apple-distribution and windows-packaging-publish.
