---
source: https://v2.tauri.app/reference/config/#linuxconfig
---

# LinuxConfig / DebConfig / RpmConfig / AppImageConfig

Configuration for Linux bundles (`bundle.linux`): AppImage, Debian (`.deb`) and RPM (`.rpm`). Also covers `RpmCompression`.

## Signature / Usage

```json
{
  "bundle": {
    "linux": {
      "appimage": { "bundleMediaFramework": false, "files": {} },
      "deb": { "files": {} },
      "rpm": { "epoch": 0, "files": {}, "release": "1" }
    }
  }
}
```

## Options / Props

### LinuxConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `appimage` | AppImageConfig | `{"bundleMediaFramework": false, "files": {}}` | Configuration for the AppImage bundle. |
| `deb` | DebConfig | `{"files": {}}` | Configuration for the Debian bundle. |
| `rpm` | RpmConfig | `{"epoch": 0, "files": {}, "release": "1"}` | Configuration for the RPM bundle. |

### AppImageConfig

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `bundleMediaFramework` | boolean | `false` | Include additional gstreamer dependencies needed for audio and video playback. Increases the bundle size by ~15-35MB depending on your build system. |
| `files` | object (string to string) | `{}` | The files to include in the AppImage binary. |

### DebConfig

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `depends` | string[] \| null | — | The list of deb dependencies your application relies on. |
| `recommends` | string[] \| null | — | The list of deb dependencies your application recommends. |
| `provides` | string[] \| null | — | The list of dependencies the package provides. |
| `conflicts` | string[] \| null | — | The list of package conflicts. |
| `replaces` | string[] \| null | — | The list of package replaces. |
| `files` | object (string to string) | `{}` | The files to include on the package. |
| `section` | string \| null | — | The section in the Debian control file. |
| `priority` | string \| null | — | Priority of the Debian package; default `optional`. Recognized: `required`, `important`, `standard`, `optional`, `extra`. |
| `changelog` | string \| null | — | Path of the uncompressed changelog file, stored at `/usr/share/doc/package-name/changelog.gz`. |
| `desktopTemplate` | string \| null | — | Path to a custom desktop file Handlebars template. Available variables: `categories`, `comment` (optional), `exec`, `icon` and `name`. |
| `preInstallScript` | string \| null | — | Script executed before the package is unpacked. |
| `postInstallScript` | string \| null | — | Script executed after the package is unpacked. |
| `preRemoveScript` | string \| null | — | Script executed before the package is removed. |
| `postRemoveScript` | string \| null | — | Script executed after the package is removed. |

### RpmConfig

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `depends` | string[] \| null | — | The list of RPM dependencies your application relies on. |
| `recommends` | string[] \| null | — | The list of RPM dependencies your application recommends. |
| `provides` | string[] \| null | — | The list of RPM dependencies your application provides. |
| `conflicts` | string[] \| null | — | RPM dependencies your application conflicts with; they must not be present for the package to be installed. |
| `obsoletes` | string[] \| null | — | RPM dependencies your application supersedes; if this package is installed, packages listed as "obsoletes" are automatically removed. |
| `release` | string | `"1"` | The RPM release tag. |
| `epoch` | integer (uint32) | `0` | The RPM epoch. |
| `files` | object (string to string) | `{}` | The files to include on the package. |
| `desktopTemplate` | string \| null | — | Path to a custom desktop file Handlebars template (`categories`, `comment` (optional), `exec`, `icon`, `name`). |
| `preInstallScript` | string \| null | — | Script executed before the package is unpacked. |
| `postInstallScript` | string \| null | — | Script executed after the package is unpacked. |
| `preRemoveScript` | string \| null | — | Script executed before the package is removed. |
| `postRemoveScript` | string \| null | — | Script executed after the package is removed. |
| `compression` | RpmCompression \| null | — | Compression algorithm and level. Defaults to `Gzip` with level 6. |

### RpmCompression (discriminated by `type`)

| `type` | `level` | Description |
| --- | --- | --- |
| `gzip` | uint32 (required) | Gzip compression |
| `zstd` | int32 (required) | Zstd compression |
| `xz` | uint32 (required) | Xz compression |
| `bzip2` | uint32 (required) | Bzip2 compression |
| `none` | — | Disable compression |

## Notes

- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.LinuxConfig`, `AppImageConfig`, `DebConfig`, `RpmConfig`, `RpmCompression`).

## Related

- [BundleConfig](./bundle-config.md)
- [Configuration (root Config)](./overview.md)
