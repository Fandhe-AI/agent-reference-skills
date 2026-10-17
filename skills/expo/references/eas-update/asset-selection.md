---
source: https://docs.expo.dev/eas-update/asset-selection/
---

# Asset selection and exclusion

Specify that only certain assets should be included in updates, reducing the assets uploaded to and downloaded from the updates server.

## Signature / Usage

The asset selection feature works with the EAS Update server or any custom server that complies with the `expo-updates` protocol. It launched to general availability in SDK 52.

In SDK 52 and later, include `updates.assetPatternsToBeBundled` in your app config with one or more file-matching patterns:

```json
"expo": {
    "updates": {
      "assetPatternsToBeBundled": [
        "app/images/**/*.png"
      ]
    }
  }
```

In SDK versions below 52, use `extra.updates.assetPatternsToBeBundled` instead:

```json
"expo": {
    "extra": {
      "updates": {
        "assetPatternsToBeBundled": [
          "app/images/**/*.png"
        ]
      }
    }
  }
```

After adding this configuration all **.png** files in all subdirectories of **app/images** are included in updates. These assets must also be required in your JavaScript code. If `assetPatternsToBeBundled` is not included, all assets resolved by the bundler are included in updates (SDK 49 and earlier behavior).

## Verifying that an update includes all required app assets

Assets that do not match any pattern still resolve in Metro but are not uploaded to the updates server, so they must be built into the native build. If you build locally or have the correct build for publishing updates (same runtime version), check with:

```sh
npx expo-updates assets:verify <dir>
```

| Option | Description |
| --- | --- |
| `<dir>` | Directory of the Expo project. Default: Current working directory. |
| `-a, --asset-map-path <path>` | Path to the **assetmap.json** in an export produced by `npx expo export --dump-assetmap`. |
| `-e, --exported-manifest-path <path>` | Path to the **metadata.json** in an export produced by `npx expo export --dump-assetmap`. |
| `-b, --build-manifest-path <path>` | Path to the **app.manifest** file created by `expo-updates` in an Expo application build (either **android** or **ios**). |
| `-p, --platform <platform>` | Options: ["android", "ios"] |
| `-h, --help` | Usage info. |

## Notes

- The page describes the feature as an experimental asset selection feature that reached general availability in SDK 52.
- Asset selection controls which assets are eligible for over-the-air updates. It does not change which assets are bundled into the native binary, so it does not reduce app startup time.
- `assets:verify` is part of the `expo-updates` CLI (which also supports code signing), not Expo CLI or EAS CLI. Only available for `expo-updates` >= 0.24.10.
- Source modificationDate: September 25, 2026 (fetched 2026-10-17).

## Related

- [Runtime versions and updates](./runtime-versions.md)
- [End-to-end code signing with EAS Update](./code-signing.md)
- [Updates](./updates.md)
