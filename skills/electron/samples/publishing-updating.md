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
    "publish": "electron-forge publish"
  },
  //...
```

```sh
npm run publish
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
- This page follows the v44.8.0 tag text. The `44-x-y` branch has unreleased wording changes to the Forge import steps in the packaging/publishing tutorials.
- update.electronjs.org requires: macOS or Windows, a public GitHub repository, builds published to GitHub releases, and (macOS only) code-signed builds.
- The publisher reads the token from the `GITHUB_TOKEN` environment variable by default (a PAT with `public_repo` scope); keep it secret and never commit it.
- `publish` builds only for the host OS and architecture unless `--arch` is passed; use CI for cross-platform releases.
- `update-electron-app` finds the feed from the `repository` field of `package.json`. For private repositories or other hosts, run your own update server and configure `autoUpdater` yourself.
- Distance: store-based distribution and signing identities belong to apple-distribution and windows-packaging-publish.
