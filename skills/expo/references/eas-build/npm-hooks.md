---
source: https://docs.expo.dev/build-reference/npm-hooks/
---

# Build lifecycle hooks

Learn how to use the Expo Build lifecycle hooks with npm to customize your build process.

## Signature / Usage

Expo Build lifecycle npm hooks run scripts before or after the build process. Set them in **package.json** `scripts`.

```json
{
  "name": "my-app",
  "scripts": {
    "eas-build-pre-install": "echo 123",
    "eas-build-post-install": "echo 456",
    "eas-build-on-success": "echo 789",
    "eas-build-on-error": "echo 012",
    "eas-build-on-cancel": "echo 345",
    "start": "expo start",
    "test": "jest"
  }
}
```

Platform-specific behavior via the `EAS_BUILD_PLATFORM` environment variable:

```js
// pre-install.js (package.json: "eas-build-pre-install": "node pre-install.js")
if (process.env.EAS_BUILD_PLATFORM === 'android') {
  console.log('Run commands for Android builds here');
} else if (process.env.EAS_BUILD_PLATFORM === 'ios') {
  console.log('Run commands for iOS builds here');
}
```

Shell variant (**pre-install**, referenced as `"eas-build-pre-install": "./pre-install"`):

```bash
#!/bin/bash

if [[ "$EAS_BUILD_PLATFORM" == "android" ]]; then
  echo "Run commands for Android builds here"
elif [[ "$EAS_BUILD_PLATFORM" == "ios" ]]; then
  echo "Run commands for iOS builds here"
fi
```

Because the hook calls `./pre-install` directly, the **pre-install** file needs execute permission. Set the permission and commit the change, so that Git records it with the file:

```sh
chmod +x pre-install
git add pre-install
git commit -m "Make pre-install executable"
```

Without execute permission, the hook fails with a `Permission denied` error. Another option is to call the script with `bash`, as in `"eas-build-pre-install": "bash ./pre-install"`. Then the file does not need execute permission.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `eas-build-pre-install` | script | Executed before Expo Build runs `npm install`. |
| `eas-build-post-install` | script | Android: runs once after `npm install` and `npx expo prebuild` (if needed). iOS: runs once after `npm install`, `npx expo prebuild` (if needed), and `pod install`. |
| `eas-build-on-success` | script | Triggered at the end of the build if it was successful. |
| `eas-build-on-error` | script | Triggered at the end of the build if it failed. |
| `eas-build-on-complete` | script | Triggered at the end of the build. `EAS_BUILD_STATUS` is `finished` or `errored`. |
| `eas-build-on-cancel` | script | Triggered if the build is canceled. |

## Notes

- Six hooks are available.
- Lifecycle hooks are not executed by the build process in custom builds; they need to be manually extracted and called by the build steps.
- Example: a pre-install script that installs `git-lfs` on macOS workers (useful when required to install certain CocoaPods) checks `brew list git-lfs` and otherwise runs `HOMEBREW_NO_AUTO_UPDATE=1 brew install git-lfs` then `git lfs install`, guarded by `EAS_BUILD_PLATFORM == ios`.
- Source: https://docs.expo.dev/build-reference/npm-hooks/ (docs/pages/build-reference/npm-hooks.mdx at tag expo@58.0.25).

## Related

- [Custom build configuration schema](./custom-builds-schema.md)
- [Configure Expo Build with eas.json](./build-eas-json.md)
