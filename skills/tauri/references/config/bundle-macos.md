---
source: https://v2.tauri.app/reference/config/#macconfig
---

# MacConfig / DmgConfig

Configuration for the macOS bundles (`bundle.macOS`) and Apple Disk Image (`.dmg`) bundles (`bundle.macOS.dmg`).

## Signature / Usage

```json
{
  "bundle": {
    "macOS": {
      "minimumSystemVersion": "10.13",
      "hardenedRuntime": true,
      "dmg": {
        "windowSize": { "width": 660, "height": 400 }
      }
    }
  }
}
```

## Options / Props

### MacConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `frameworks` | string[] \| null | — | macOS frameworks to bundle with the application. If a name is used, ".framework" must be omitted and it looks in standard install locations; you may also use a path to a specific framework. |
| `files` | object (string to string) | `{}` | The files to include in the application relative to the Contents directory. |
| `bundleVersion` | string \| null | — | The version of the build that identifies an iteration of the bundle. Translates to `CFBundleVersion`. |
| `bundleName` | string \| null | — | The name of the builder that built the bundle. Translates to `CFBundleName`. Defaults to the package's product name. |
| `minimumSystemVersion` | string \| null | `"10.13"` | Minimum macOS version the bundled application supports. Setting it to `null` removes the `LSMinimumSystemVersion` field on the bundle's `Info.plist` and the `MACOSX_DEPLOYMENT_TARGET` environment variable. Ignored in `tauri dev`. An empty string is invalid so the default is used. |
| `exceptionDomain` | string \| null | — | Allows your application to communicate with the outside world. Should be a lowercase domain name without port and protocol. |
| `signingIdentity` | string \| null | — | Identity to use for code signing. |
| `hardenedRuntime` | boolean | `true` | Whether the codesign should enable hardened runtime (for executables). |
| `providerShortName` | string \| null | — | Provider short name for notarization. |
| `entitlements` | string \| null | — | Path to the entitlements file. |
| `infoPlist` | string \| null | — | Path to an `Info.plist` file to merge with the default `Info.plist`. Tauri also looks for an `Info.plist` file in the same directory as the Tauri configuration file. |
| `dmg` | DmgConfig | see below | DMG-specific settings. |

### DmgConfig

`additionalProperties: false`. `Position` is `{ x, y }` and `Size` is `{ width, height }` (all required uint32).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `background` | string \| null | — | Image to use as the background in the dmg file. Accepted formats: `png` / `jpg` / `gif`. |
| `windowPosition` | Position \| null | — | Position of volume window on screen. |
| `windowSize` | Size | `{"width": 660, "height": 400}` | Size of volume window. |
| `appPosition` | Position | `{"x": 180, "y": 170}` | Position of app file on window. |
| `applicationFolderPosition` | Position | `{"x": 480, "y": 170}` | Position of application folder on window. |

## Notes

- Defaults of `bundle.macOS` as a whole: `{"dmg": {"appPosition": {"x": 180, "y": 170}, "applicationFolderPosition": {"x": 480, "y": 170}, "windowSize": {"height": 400, "width": 660}}, "files": {}, "hardenedRuntime": true, "minimumSystemVersion": "10.13"}`.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.MacConfig`, `DmgConfig`, `Position`, `Size`).

## Related

- [BundleConfig](./bundle-config.md)
- [Configuration (root Config)](./overview.md)
