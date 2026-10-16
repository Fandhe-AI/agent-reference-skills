---
source: https://v2.tauri.app/reference/config/#windowsconfig
---

# WindowsConfig / WixConfig / NsisConfig

Windows bundler configuration (`bundle.windows`): signing, WebView2 install mode, and the MSI (WiX) and NSIS installer options. Also covers `WebviewInstallMode`, `WixLanguage`, `WixLanguageConfig`, `NSISInstallerMode`, `NsisCompression`, `CustomSignCommandConfig`.

## Signature / Usage

```json
{
  "bundle": {
    "windows": {
      "webviewInstallMode": { "type": "downloadBootstrapper", "silent": true },
      "nsis": { "installMode": "currentUser" }
    }
  }
}
```

## Options / Props

### WindowsConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `digestAlgorithm` | string \| null | — | Specifies the file digest algorithm to use for creating file signatures. Required for code signing. SHA-256 is recommended. |
| `certificateThumbprint` | string \| null | — | Specifies the SHA1 hash of the signing certificate. |
| `timestampUrl` | string \| null | — | Server to use during timestamping. |
| `tsp` | boolean | `false` | Whether to use Time-Stamp Protocol (TSP, a.k.a. RFC 3161) for the timestamp server. Your code signing provider may use a TSP timestamp server (e.g. SSL.com does); if so, set to true. |
| `webviewInstallMode` | WebviewInstallMode | `{"type": "downloadBootstrapper", "silent": true}` | The installation mode for the WebView2 runtime. |
| `allowDowngrades` | boolean | `true` | Whether an older version can be installed when a newer one is already installed. With `false` and `1.2.1` installed, the MSI installer won't install `1.2.0` or `1.1.5`; the NSIS installer won't install them over `1.2.1` in silent, passive or update mode (the interactive installer only lets the user install them after uninstalling `1.2.1` first). |
| `minimumWebview2Version` | string \| null | — | Try to ensure that the WebView2 version is equal to or newer than this version; if the user's WebView2 is older, the installer will try to trigger a WebView2 update. |
| `wix` | WixConfig \| null | — | Configuration for the MSI generated with WiX. |
| `nsis` | NsisConfig \| null | — | Configuration for the installer generated with NSIS. |
| `signCommand` | CustomSignCommandConfig \| null | — | Specify a custom command to sign the binaries. The command needs a `%1` in args, a placeholder for the binary path. By default `signtool.exe` is used (Windows only); to cross-compile and sign on another platform use another tool such as `osslsigncode`. |
| `bundleVCRuntime` | boolean | `false` | Whether to bundle the Visual C++ runtime DLLs alongside the application. Useful when the app includes sidecars or DLLs that do not statically link the VC++ runtime, or when `build > windows > staticVCRuntime` is `false`. |

### WebviewInstallMode (discriminated by `type`)

| `type` | Fields | Description |
| --- | --- | --- |
| `skip` | — | Do not install the WebView2 as part of the Windows Installer. |
| `downloadBootstrapper` | `silent` (boolean, default `true`) | Download the bootstrapper and run it. Requires an internet connection. Smaller installer size, but not recommended on Windows 7. |
| `embedBootstrapper` | `silent` (boolean, default `true`) | Embed the bootstrapper and run it. Requires an internet connection. Increases installer size by around 1.8MB, but offers better support on Windows 7. |
| `offlineInstaller` | `silent` (boolean, default `true`) | Embed the offline installer and run it. Does not require an internet connection. Increases installer size by around 127MB. |
| `fixedRuntime` | `path` (string, required) | Embed a fixed WebView2 version and use it at runtime. Increases installer size by around 180MB. `path` is the folder the `.cab` file was extracted to. |

### CustomSignCommandConfig

| Form | Description |
| --- | --- |
| `string` | Script notation; `%1` is replaced with the binary path. Tauri splits the string with `' '`, using the first element as command name and the rest as arguments. Use the object form if you need whitespace. |
| `{ cmd: string, args: string[] }` | Both required; `%1` in `args` is replaced with the binary path. |

### WixConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `version` | string \| null | — | MSI installer version `major.minor.patch.build` (build optional). Derived from the root `version` if unset. Major and minor max 255; third and fourth fields max 65,535. |
| `upgradeCode` | string (uuid) \| null | — | A GUID upgrade code for the MSI installer. **Must stay the same across all of your updates**, otherwise Windows treats an update as a different app and users get duplicate versions. By default generated as a Uuid v5 from `<productName>.exe.app.x64` in the DNS namespace. Run `tauri inspect wix-upgrade-code` to print it; recommended to set it in the config file. |
| `language` | WixLanguage | `"en-US"` | The installer languages to build. |
| `template` | string \| null | — | A custom `.wxs` template to use. |
| `fragmentPaths` | string[] | `[]` | A list of paths to `.wxs` files with WiX fragments to use. |
| `componentGroupRefs` | string[] | `[]` | The ComponentGroup element ids to reference from the fragments. |
| `componentRefs` | string[] | `[]` | The Component element ids to reference from the fragments. |
| `featureGroupRefs` | string[] | `[]` | The FeatureGroup element ids to reference from the fragments. |
| `featureRefs` | string[] | `[]` | The Feature element ids to reference from the fragments. |
| `mergeRefs` | string[] | `[]` | The Merge element ids to reference from the fragments. |
| `enableElevatedUpdateTask` | boolean | `false` | Create an elevated update task within Windows Task Scheduler. |
| `bannerPath` | string \| null | — | Bitmap for the installation UI banner (top of all but the first page). Required dimensions 493px × 58px. |
| `dialogImagePath` | string \| null | — | Bitmap for the welcome and completion dialogs. Required dimensions 493px × 312px. |
| `fipsCompliant` | boolean | `false` | Enables FIPS compliant algorithms. Can also be enabled via the `TAURI_BUNDLER_WIX_FIPS_COMPLIANT` env var. |

`WixLanguage` is one of: a single language string; a list of language strings; or a map of language to `WixLanguageConfig` (`{ localePath?: string \| null }`, the path to a locale `.wxl` file).

### NsisConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `template` | string \| null | — | A custom `.nsi` template to use. |
| `headerImage` | string \| null | — | Bitmap for the header of installer pages. Recommended 150px x 57px. |
| `sidebarImage` | string \| null | — | Bitmap for the Welcome and Finish pages. Recommended 164px x 314px. |
| `installerIcon` | string \| null | — | Icon file used as the installer icon. |
| `uninstallerIcon` | string \| null | — | Icon file used as the uninstaller icon. |
| `uninstallerHeaderImage` | string \| null | — | Bitmap for the header of uninstaller pages. Defaults to `headerImage`; if this is set but `headerImage` is not, a default NSIS image is applied to `headerImage`. Recommended 150px x 57px. |
| `installMode` | NSISInstallerMode | `"currentUser"` | Whether the installation will be for all users or just the current user. |
| `languages` | string[] \| null | — | Installer languages; defaults to `["English"]`. By default the OS language is used; if it is not in the list, the first language is used. |
| `customLanguageFiles` | object (string to string) \| null | — | Key is the language, value is the path to a custom `.nsh` file holding the translated text for tauri's custom messages. The key must be a valid NSIS language and must be added to `languages`. |
| `displayLanguageSelector` | boolean | `false` | Whether to display a language selector dialog before the installer and uninstaller windows are rendered. |
| `compression` | NsisCompression | `"lzma"` | The compression algorithm used to compress files in the installer. |
| `startMenuFolder` | string \| null | — | Folder name for the start menu shortcut, e.g. `AwesomePublisher` places the shortcut at `%AppData%\Microsoft\Windows\Start Menu\Programs\AwesomePublisher\<your-app>.lnk`. If unset, it is placed directly in `Programs`. |
| `installerHooks` | string \| null | — | Path to a `.nsh` file with NSIS macros hooked into the main `installer.nsi`. |
| `minimumWebview2Version` | string \| null | — | **Deprecated**: use `bundle > windows > minimumWebview2Version` instead. |

`NSISInstallerMode`: `currentUser` (default; installs in a directory not requiring Administrator access, metadata under `HKCU`), `perMachine` (installs in `Program Files`, requires Administrator access, metadata under `HKLM`), `both` (lets the user choose at install time; requires Administrator access even for current-user installs; metadata under `HKLM` or `HKCU`).

`NsisCompression`: `zlib` (deflate, quick and simple), `bzip2` (better ratio than ZLIB but slower and more memory), `lzma` (default; very good ratios), `none` (disable compression).

## Notes

- `installerHooks` supported hooks: `NSIS_HOOK_PREINSTALL` (before copying files, setting registry key values and creating shortcuts), `NSIS_HOOK_POSTINSTALL` (after all that finished), `NSIS_HOOK_PREUNINSTALL` (before removing any files, registry keys and shortcuts), `NSIS_HOOK_POSTUNINSTALL` (after removal). Example from the schema docs:

```nsh
!macro NSIS_HOOK_PREINSTALL
  MessageBox MB_OK "PreInstall"
!macroend
```

- `WebviewInstallMode`: for the updater bundle `downloadBootstrapper` is used. See https://v2.tauri.app/distribute/windows-installer/#webview2-installation-options.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.WindowsConfig`, `WixConfig`, `NsisConfig` and referenced types).

## Related

- [BundleConfig](./bundle-config.md)
- [BuildConfig](./build-config.md)
