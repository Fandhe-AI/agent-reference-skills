---
source: https://v2.tauri.app/reference/config/#appconfig
---

# AppConfig

The App configuration object (`app` in `tauri.conf.json`). Covers windows, security, tray icon, global API injection and app directory overrides.

## Signature / Usage

```json
{
  "app": {
    "windows": [
      { "label": "main", "width": 800, "height": 600 },
      { "label": "secondary", "width": 800, "height": 600 }
    ]
  }
}
```

## Options / Props

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `windows` | [WindowConfig](./window-config.md)[] | `[]` | The app windows configuration. If not specified, the window's label (its identifier) defaults to "main"; get it with `app.get_webview_window` in Rust or `WebviewWindow.getByLabel` in JavaScript. When working with multiple windows, each window needs a unique label. |
| `security` | [SecurityConfig](./security-config.md) | see overview | Security configuration. |
| `trayIcon` | [TrayIconConfig](./tray-icon-config.md) \| null | — | Configuration for app tray icon. |
| `macOSPrivateApi` | boolean | `false` | MacOS private API configuration. Enables the transparent background API and sets the `fullScreenEnabled` preference to `true`. No-op in Tauri 2.12.1+ because the APIs are always enabled now. |
| `withGlobalTauri` | boolean | `false` | Whether we should inject the Tauri API on `window.__TAURI__` or not. |
| `enableGTKAppId` | boolean | `false` | Whether the application `identifier` is used as the GTK application ID on systems that use GTK. Lets the desktop environment associate the app's windows with its `.desktop` entry of the same name (correct icon and name on Wayland / GNOME, window grouping). Defaults to `false` because registering an application ID makes GTK register the application on the session bus under that ID, which prevents running more than one instance at the same time. |
| `appDirectoriesOverride` | `AppDirectoriesOverride` \| null | — | Overrides the directories returned by the `app_*_dir` path APIs (`app_config_dir`, `app_data_dir`, `app_local_data_dir`, `app_cache_dir`, `app_log_dir`) and the matching `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG` base directory variables. |

### AppDirectoriesOverride

Either a single path or an object (`AppDirectoryOverrides`).

| Form | Description |
| --- | --- |
| `string` | A single directory that holds all app directories. The config, data and local data directories resolve to this path, the cache directory resolves to `<path>/caches` and the log directory to `<path>/logs`. |
| `object` | Overrides for individual app directories; unlisted ones keep their default location. |

`AppDirectoryOverrides` properties (all `string \| null`, `additionalProperties: false`):

| Name | Description |
| --- | --- |
| `config` | Overrides the app config directory (`app_config_dir`, `$APPCONFIG`). |
| `data` | Overrides the app data directory (`app_data_dir`, `$APPDATA`). |
| `localData` | Overrides the app local data directory (`app_local_data_dir`, `$APPLOCALDATA`). On Windows and Linux this is also the default data directory of the webviews. |
| `cache` | Overrides the app cache directory (`app_cache_dir`, `$APPCACHE`). |
| `log` | Overrides the app log directory (`app_log_dir`, `$APPLOG`). |

## Notes

- Set `create` to `false` on a window config to skip creating it at startup and build it via the Rust API: `tauri::WebviewWindowBuilder::from_config(app.handle(), &app.config().app.windows[0])?.build()?;` (inside `tauri::Builder::default().setup(|app| { ... })`).
- `appDirectoriesOverride` path resolution: a path starting with a base directory variable (`$AUDIO`, `$CACHE`, `$CONFIG`, `$DATA`, `$LOCALDATA`, `$DESKTOP`, `$DOCUMENT`, `$DOWNLOAD`, `$HOME`, `$PICTURE`, `$PUBLIC`, `$TEMP`, `$VIDEO`) is resolved relative to that directory (`..` components are kept); an absolute path is used as is; any other path is resolved relative to the directory containing the executable, which must be writable. A window's `dataDirectory` config is not affected.
- `appDirectoriesOverride` security: scopes and permissions that use `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG` follow the override. A root that is not dedicated to the app (such as `"./"` or `"$DOCUMENT"`) extends those scopes to everything it contains; always point the override to a subfolder owned by the app, such as `"./app-data"` or `"$DOCUMENT/my-app"`.
- `appDirectoriesOverride` platform notes: relative paths only work where the executable's directory is writable. Linux: only AppImages (resolved relative to the AppImage file); `.deb` / `.rpm` install to `/usr/bin`. macOS: resolved next to the `.app` bundle; does not work for installed apps in `/Applications` or quarantined (App Translocation) bundles. Windows: works for per-user NSIS installers, not per-machine installers in `Program Files`. Android / iOS: relative paths unsupported (`$DESKTOP` is not available on Android). To apply a relative path to a portable build only, use the CLI `--config` flag, e.g. `tauri build --config '{ "app": { "appDirectoriesOverride": "./app-data" } }'`.
- `enableGTKAppId` platform: Linux / FreeBSD / DragonFly / NetBSD / OpenBSD require a valid GTK application ID as identifier; unsupported on Windows / macOS / Android / iOS.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.AppConfig`, `AppDirectoriesOverride`, `AppDirectoryOverrides`).

## Related

- [Configuration (root Config)](./overview.md)
- [WindowConfig](./window-config.md)
- [SecurityConfig](./security-config.md)
- [TrayIconConfig](./tray-icon-config.md)
