---
source: https://v2.tauri.app/reference/javascript/api/namespacepath/
---

# path

Utilities for working with file and directory paths. Also accessible with `window.__TAURI__.path` when `app.withGlobalTauri` is `true`. Allowlisting only the APIs you use is recommended for bundle size and security.

## Signature / Usage

```typescript
import { appDataDir, join } from '@tauri-apps/api/path';
const appDataDirPath = await appDataDir();
const path = await join(appDataDirPath, 'users', 'tauri', 'avatar.png');
```

## Options / Props

### Directory functions

All are `(): Promise<string>`, call `plugin:path|resolve_directory` with the matching `BaseDirectory`.

| Function | BaseDirectory | Resolves to |
| --- | --- | --- |
| appConfigDir (1.2.0) | AppConfig = 13 | `${configDir}/${bundleIdentifier}` (`identifier` in `tauri.conf.json`, unless overridden by `app > appDirectoriesOverride`) |
| appDataDir (1.2.0) | AppData = 14 | `${dataDir}/${bundleIdentifier}` (same override) |
| appLocalDataDir (1.2.0) | AppLocalData = 15 | `${localDataDir}/${bundleIdentifier}` (same override) |
| appCacheDir (1.2.0) | AppCache = 16 | `${cacheDir}/${bundleIdentifier}` (override: a single root override resolves to `${root}/caches`) |
| appLogDir (1.2.0) | AppLog = 17 | Linux / Windows: `${localDataDir}/${bundleIdentifier}/logs`; macOS: `${homeDir}/Library/Logs/{bundleIdentifier}` (override: single root resolves to `${root}/logs`) |
| audioDir | Audio = 1 | Linux `XDG_MUSIC_DIR`; macOS `$HOME/Music`; Windows `{FOLDERID_Music}` |
| cacheDir | Cache = 2 | Linux `$XDG_CACHE_HOME` or `$HOME/.cache`; macOS `$HOME/Library/Caches`; Windows `{FOLDERID_LocalAppData}` |
| configDir | Config = 3 | Linux `$XDG_CONFIG_HOME` or `$HOME/.config`; macOS `$HOME/Library/Application Support`; Windows `{FOLDERID_RoamingAppData}` |
| dataDir | Data = 4 | Linux `$XDG_DATA_HOME` or `$HOME/.local/share`; macOS `$HOME/Library/Application Support`; Windows `{FOLDERID_RoamingAppData}` |
| localDataDir | LocalData = 5 | Linux `$XDG_DATA_HOME` or `$HOME/.local/share`; macOS `$HOME/Library/Application Support`; Windows `{FOLDERID_LocalAppData}` |
| documentDir | Document = 6 | Linux `XDG_DOCUMENTS_DIR`; macOS `$HOME/Documents`; Windows `{FOLDERID_Documents}` |
| downloadDir | Download = 7 | Linux `XDG_DOWNLOAD_DIR`; macOS `$HOME/Downloads`; Windows `{FOLDERID_Downloads}` |
| pictureDir | Picture = 8 | Linux `XDG_PICTURES_DIR`; macOS `$HOME/Pictures`; Windows `{FOLDERID_Pictures}` |
| publicDir | Public = 9 | Linux `XDG_PUBLICSHARE_DIR`; macOS `$HOME/Public`; Windows `{FOLDERID_Public}` |
| videoDir | Video = 10 | Linux `XDG_VIDEOS_DIR`; macOS `$HOME/Movies`; Windows `{FOLDERID_Videos}`; Android app-specific Movies directory (`getExternalFilesDir(DIRECTORY_MOVIES)`, typically `.../files/Movies`); iOS inside the app sandbox |
| resourceDir | Resource = 11 | See Notes |
| tempDir (2.0.0) | Temp = 12 | A temporary directory |
| desktopDir | Desktop = 18 | Linux `XDG_DESKTOP_DIR`; macOS `$HOME/Desktop`; Windows `{FOLDERID_Desktop}`; Android unsupported (call rejects) |
| executableDir | Executable = 19 | Linux `$XDG_BIN_HOME/../bin` or `$XDG_DATA_HOME/../bin` or `$HOME/.local/bin`; macOS / Windows not supported; Android unsupported |
| fontDir | Font = 20 | Linux `$XDG_DATA_HOME/fonts` or `$HOME/.local/share/fonts`; macOS `$HOME/Library/Fonts`; Windows not supported; Android unsupported |
| homeDir | Home = 21 | Linux / macOS `$HOME`; Windows `{FOLDERID_Profile}` |
| runtimeDir | Runtime = 22 | Linux `$XDG_RUNTIME_DIR`; macOS / Windows not supported; Android unsupported |
| templateDir | Template = 23 | Linux `XDG_TEMPLATES_DIR`; macOS not supported; Windows `{FOLDERID_Templates}`; Android unsupported |

`BaseDirectory` is an `enum` (since 2.0.0) with members `Audio`, `Cache`, `Config`, `Data`, `LocalData`, `Document`, `Download`, `Picture`, `Public`, `Video`, `Resource`, `Temp`, `AppConfig`, `AppData`, `AppLocalData`, `AppCache`, `AppLog`, `Desktop`, `Executable`, `Font`, `Home`, `Runtime`, `Template` (values as above).

### Path functions

| Function | Signature | Description |
| --- | --- | --- |
| resolveResource | `resolveResource(resourcePath: string): Promise<string>` | Full path to a resource; must follow the syntax of `tauri.conf.json > bundle > resources`, keeping subfolders and parent components (`../`) |
| sep | `sep(): string` | `\` on Windows, `/` on POSIX (2.0.0) |
| delimiter | `delimiter(): string` | `;` on Windows, `:` on POSIX (2.0.0) |
| resolve | `resolve(...paths: string[]): Promise<string>` | Resolve segments into an absolute path |
| normalize | `normalize(path: string): Promise<string>` | Resolve `..` and `.` segments and symbolic links |
| join | `join(...paths: string[]): Promise<string>` | Join with the platform separator, then normalize |
| dirname | `dirname(path: string): Promise<string>` | Parent directory; trailing separators ignored |
| extname | `extname(path: string): Promise<string>` | Extension of the path |
| basename | `basename(path: string, ext?: string): Promise<string>` | Last portion; optional `ext` removed |
| isAbsolute | `isAbsolute(path: string): Promise<boolean>` | Whether the path is absolute |

```typescript
import { basename, dirname, extname } from '@tauri-apps/api/path';
await dirname('/path/to/somedir/');   // '/path/to'
await extname('/path/to/file.html');  // 'html'
await basename('path/to/app.conf');   // 'app.conf'
```

## Notes

- All commands used by this module are part of the default-enabled `core:path:default` permission set.
- Android: user directories are sandboxed per app; `desktopDir`, `executableDir`, `fontDir`, `runtimeDir`, `templateDir` (and matching `BaseDirectory` variants) do not exist; the rest resolve inside the app's own storage.
- iOS: every directory resolves inside the app sandbox; paths change between installs, so resolve at runtime instead of persisting absolute paths.
- `resourceDir` is not a contract. Windows: directory containing the main executable. Linux: in an AppImage `${APPDIR}/usr/lib/${exe_name}`, otherwise `/usr/lib/${exe_name}`, and from `src-tauri/target/(debug|release)/` it is `${exe_dir}/../lib/${exe_name}`. macOS: `${exe_dir}/../Resources` (inside .app). iOS: `${exe_dir}/assets`. Android: resources are APK assets, so a special URI prefix `asset://localhost/` is returned, usable with the file system plugin.
- Breaking change on Android in `tauri` 2.12.0: `videoDir()` and the `$VIDEO` path variable used to resolve to external cache storage (`.../cache`) and now resolve to the app-specific Movies directory (`.../files/Movies`); files written to the old location are not found at the new one.
- Tauri (Rust core + system WebView). Not Electron's API (`app.getPath`); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/path.ts`.

## Related

- [core](./core.md) (`convertFileSrc`)
- [app](./app.md)
