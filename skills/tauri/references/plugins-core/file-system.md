---
source: https://v2.tauri.app/plugin/file-system/
---

# File System

Access the file system from the frontend (`@tauri-apps/plugin-fs`) with path-traversal protection and scope-based permissions.

## Supported Platforms

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | full | Apps installed via MSI or NSIS in `perMachine` and `both` mode require admin permissions for write access in `$RESOURCES` folder |
| Linux | full | No write access to `$RESOURCES` folder |
| macOS | full | No write access to `$RESOURCES` folder |
| Android | partial | Access is restricted to Application folder by default |
| iOS | partial | Access is restricted to Application folder by default |

## Setup

```sh
npm run tauri add fs
# or: cargo tauri add fs
```

Manual. From `src-tauri`:

```sh
cargo add tauri-plugin-fs
```

From the project root, install the JavaScript guest bindings:

```sh
npm install @tauri-apps/plugin-fs
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

### Android

When using the audio, cache, documents, downloads, picture, public or video directories your app must have access to the external storage. Add to the `manifest` tag in `gen/android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS

Create a `PrivacyInfo.xcprivacy` file in `src-tauri/gen/apple` with the required `NSPrivacyAccessedAPICategoryFileTimestamp` key and the `C617.1` recommended reason:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>C617.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## Signature / Usage

JavaScript:

```javascript
import { exists, BaseDirectory } from '@tauri-apps/plugin-fs';
// when using `"withGlobalTauri": true`, you may use
// const { exists, BaseDirectory } = window.__TAURI__.fs;

// Check if the `$APPDATA/avatar.png` file exists
await exists('avatar.png', { baseDir: BaseDirectory.AppData });
```

Rust (only scope management; use `std::fs` / `tokio::fs` for file operations):

```rust
use tauri_plugin_fs::FsExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
      .plugin(tauri_plugin_fs::init())
      .setup(|app| {
          // allowed the given directory
          let scope = app.fs_scope();
          scope.allow_directory("/path/to/directory", false);
          dbg!(scope.allowed());

          Ok(())
       })
       .run(tauri::generate_context!())
       .expect("error while running tauri application");
}
```

## Paths

Two ways to manipulate paths: the base directory (every API takes an options argument with `baseDir`) and the path API.

```js
import { readFile, BaseDirectory } from '@tauri-apps/plugin-fs';
const contents = await readFile('avatars/tauri.png', {
  baseDir: BaseDirectory.Home,
});
```

```js
import { readFile } from '@tauri-apps/plugin-fs';
import * as path from '@tauri-apps/api/path';
const home = await path.homeDir();
const contents = await readFile(await path.join(home, 'avatars/tauri.png'));
```

## Files

Create (always call `file.close()` when done):

```js
import { create, BaseDirectory } from '@tauri-apps/plugin-fs';
const file = await create('foo/bar.txt', { baseDir: BaseDirectory.AppData });
await file.write(new TextEncoder().encode('Hello world'));
await file.close();
```

Write text and binary files with separate APIs:

```js
import { writeTextFile, writeFile, BaseDirectory } from '@tauri-apps/plugin-fs';
const contents = JSON.stringify({ notifications: true });
await writeTextFile('config.json', contents, {
  baseDir: BaseDirectory.AppConfig,
});
await writeFile('config', new Uint8Array(), {
  baseDir: BaseDirectory.AppConfig,
});
```

Open (read-only is the default mode):

```js
import { open, BaseDirectory } from '@tauri-apps/plugin-fs';
const file = await open('foo/bar.txt', {
  read: true,
  baseDir: BaseDirectory.AppData,
});

const stat = await file.stat();
const buf = new Uint8Array(stat.size);
await file.read(buf);
const textContents = new TextDecoder().decode(buf);
await file.close();
```

`open` option modes (each shown in the official page with `baseDir: BaseDirectory.AppData`):

- `write: true` write-only; by default the file is truncated on any `file.write()` call.
- `append: true` same effect as `{ write: true, append: true }`.
- `truncate: true` truncates an existing file to length 0; requires `write: true`; combine with `append` to rewrite a file using multiple `file.write()` calls.
- `create: true` creates the file if missing, opens it if it exists; `write` or `append` must also be `true`.
- `createNew: true` like `create` but fails if the file already exists; `write` must also be `true`.

Read:

```js
import { readTextFile, readFile, BaseDirectory } from '@tauri-apps/plugin-fs';
const configToml = await readTextFile('config.toml', {
  baseDir: BaseDirectory.AppConfig,
});
const icon = await readFile('icon.png', {
  baseDir: BaseDirectory.Resources,
});
```

Large files can be streamed line by line:

```typescript
import { readTextFileLines, BaseDirectory } from '@tauri-apps/plugin-fs';
const lines = await readTextFileLines('app.logs', {
  baseDir: BaseDirectory.AppLog,
});
for await (const line of lines) {
  console.log(line);
}
```

Remove, copy, exists, metadata, rename, truncate:

Each snippet below is independent (as on the official page):

```js
import { remove, BaseDirectory } from '@tauri-apps/plugin-fs';
await remove('user.db', { baseDir: BaseDirectory.AppLocalData });
```

```js
import { copyFile, BaseDirectory } from '@tauri-apps/plugin-fs';
await copyFile('user.db', 'user.db.bk', {
  fromPathBaseDir: BaseDirectory.AppLocalData,
  toPathBaseDir: BaseDirectory.Temp,
});
```

```js
import { exists, stat, BaseDirectory } from '@tauri-apps/plugin-fs';
const tokenExists = await exists('token', {
  baseDir: BaseDirectory.AppLocalData,
});

const metadata = await stat('app.db', {
  baseDir: BaseDirectory.AppLocalData,
});
```

```js
import { rename, BaseDirectory } from '@tauri-apps/plugin-fs';
await rename('user.db.bk', 'user.db', {
  oldPathBaseDir: BaseDirectory.AppLocalData,
  newPathBaseDir: BaseDirectory.Temp,
});
```

```typescript
import { truncate, readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

const filePath = 'file.txt';
await writeTextFile(filePath, 'Hello World', {
  baseDir: BaseDirectory.AppLocalData,
});
await truncate(filePath, 7, {
  baseDir: BaseDirectory.AppLocalData,
});
const data = await readTextFile(filePath, {
  baseDir: BaseDirectory.AppLocalData,
});
console.log(data); // "Hello W"
```

## Directories

```js
import { mkdir, remove, BaseDirectory } from '@tauri-apps/plugin-fs';
await mkdir('images', { baseDir: BaseDirectory.AppLocalData });

// readDir lists the direct entries of a directory (recurse manually into entries where isDirectory is true)
// const entries = await readDir('users', { baseDir: BaseDirectory.AppLocalData });

// non-empty directories require `recursive: true`
await remove('images', {
  baseDir: BaseDirectory.AppLocalData,
  recursive: true,
});
```

`exists()` and `stat` / `lstat` work the same for directories.

## Watching changes

`watch` is debounced; `watchImmediate` notifies listeners immediately. Directory watching is not recursive by default (set `recursive: true`).

```js
import { watch, watchImmediate, BaseDirectory } from '@tauri-apps/plugin-fs';
await watch(
  'app.log',
  (event) => {
    console.log('app.log event', event);
  },
  {
    baseDir: BaseDirectory.AppLog,
    delayMs: 500,
  }
);

await watchImmediate(
  'logs',
  (event) => {
    console.log('logs directory event', event);
  },
  {
    baseDir: BaseDirectory.AppLog,
    recursive: true,
  }
);
```

The watch functions require the `watch` feature flag:

```toml
# src-tauri/Cargo.toml
[dependencies]
tauri-plugin-fs = { version = "2.0.0", features = ["watch"] }
```

## Permissions

By default all potentially dangerous plugin commands and scopes are blocked. Enable them in your capabilities configuration.

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "fs:default",
    {
      "identifier": "fs:allow-exists",
      "allow": [{ "path": "$APPDATA/*" }]
    }
  ]
}
```

Default permission set `fs:default` enables read access to the application specific directories (AppConfig, AppData, AppLocalData, AppCache, AppLog) and all files and sub directories created in it, plus `mkdir`. It includes `create-app-specific-dirs`, `read-app-specific-dirs-recursive` and `deny-default`. It denies the webview data folder: on Windows `$APPLOCALDATA/EBWebView`, on Linux the webview data paths inside `$APPLOCALDATA`.

Permission identifiers (from `permissions/autogenerated/reference.md` @ `fs-v2.7.1`; every `allow-*` command permission has a matching `deny-*`):

| Group | Identifiers |
| --- | --- |
| Per-directory sets | For each of `app`, `appcache`, `appconfig`, `appdata`, `applocaldata`, `applog`, `audio`, `cache`, `config`, `data`, `desktop`, `document`, `download`, `exe`, `font`, `home`, `localdata`, `log`, `picture`, `public`, `resource`, `runtime`, `temp`, `template`, `video`: `fs:allow-<dir>-read-recursive`, `-write-recursive`, `-read`, `-write`, `-meta-recursive`, `-meta`, and `fs:scope-<dir>-recursive`, `fs:scope-<dir>`, `fs:scope-<dir>-index` |
| Commands | `fs:allow-copy-file`, `create`, `exists`, `fstat`, `ftruncate`, `lstat`, `mkdir`, `open`, `read`, `read-dir`, `read-file`, `read-text-file`, `read-text-file-lines`, `read-text-file-lines-next`, `remove`, `rename`, `seek`, `size`, `start-accessing-security-scoped-resource`, `stat`, `stop-accessing-security-scoped-resource`, `truncate`, `unwatch`, `watch`, `write`, `write-file`, `write-text-file` (each `fs:allow-*` / `fs:deny-*`) |
| Sets | `fs:create-app-specific-dirs`, `fs:deny-default`, `fs:deny-webview-data-linux`, `fs:deny-webview-data-windows`, `fs:read-all`, `fs:read-app-specific-dirs-recursive`, `fs:read-dirs`, `fs:read-files`, `fs:read-meta`, `fs:scope`, `fs:write-all`, `fs:write-files` |

### Scopes

Scope entries are `{ path: string }`. `deny` takes precedence over `allow`. Entries can use `$<path>` variables:

| Variable | Path | Variable | Path |
| --- | --- | --- | --- |
| $APPCONFIG | appConfigDir | $FONT | fontDir |
| $APPDATA | appDataDir | $HOME | homeDir |
| $APPLOCALDATA | appLocalDataDir | $PICTURE | pictureDir |
| $APPCACHE | appCacheDir | $PUBLIC | publicDir |
| $APPLOG | appLogDir | $RUNTIME | runtimeDir |
| $AUDIO | audioDir | $TEMPLATE | templateDir |
| $CACHE | cacheDir | $VIDEO | videoDir |
| $CONFIG | configDir | $RESOURCE | resourceDir |
| $DATA | dataDir | $TEMP | tempDir |
| $LOCALDATA | localDataDir | $DESKTOP | desktopDir |
| $DOCUMENT | documentDir | $DOWNLOAD | downloadDir |
| $EXE | executableDir | | |

Global scope for any `fs` command, using the `fs:scope` permission:

```json
{
  "permissions": [
    {
      "identifier": "fs:scope",
      "allow": [{ "path": "$APPDATA" }, { "path": "$APPDATA/**/*" }]
    }
  ]
}
```

Per-command scope with the object form `{ "identifier": string, "allow"?: [], "deny"?: [] }`:

```json
{
  "permissions": [
    {
      "identifier": "fs:allow-rename",
      "allow": [{ "path": "$HOME/**/*" }]
    },
    {
      "identifier": "fs:allow-rename",
      "deny": [{ "path": "$HOME/.config/**/*" }]
    }
  ]
}
```

Dotfiles / dotfolders on Unix (for example `.ssh`) need the full path or a glob after the dotfolder component. To treat any component as a valid path literal:

```json
"plugins": {
  "fs": {
    "requireLiteralLeadingDot": false
  }
}
```

## Notes

- Tauri plugin (Rust core + system WebView). In Rust, use `std::fs` / `tokio::fs` for file manipulation; the plugin's Rust API only manages scope. Rust-language file APIs themselves are covered by the rust skill; this is not Node.js `fs` or Electron.
- Security: the module prevents path traversal; parent directory accessors (`/usr/path/to/../file`, `../path/to/file`) are not allowed. Paths must be relative to a base directory or created with the path API.
- Permissions alone do not grant a scope: enabling `fs:allow-exists` by itself does not allow access to any path. Without an `allow` scope, calls fail at runtime with a `forbidden path` error.
- `stat` follows symlinks (error if the target is not allowed by the scope); `lstat` does not follow symlinks.
- `requireLiteralLeadingDot` also exists for `app.security.assetProtocol.scope` when using the object form.
- The official page passes `fromPathBaseDir`/`toPathBaseDir` to `rename()`; `RenameOptions` in fs-v2.7.1 only accepts `oldPathBaseDir`/`newPathBaseDir`, so the example uses those (`copyFile` does take `fromPathBaseDir`/`toPathBaseDir`).
- The official page says `readDir` lists entries recursively; in fs-v2.7.1 it returns only the direct entries (`ReadDirOptions` has only `baseDir`), and recursion is done manually as in its JSDoc example.
- The official Paths snippet omits the `BaseDirectory` import; it is added here. The remove/copy/exists/stat/rename operations are shown as separate snippets, as on the official page.
- Source: `tauri-apps/plugins-workspace@fs-v2.7.1` `plugins/fs/Cargo.toml`, `plugins/fs/permissions/autogenerated/reference.md`; docs `plugin/file-system.mdx` @ `32f68c5`.

## Related

- [overview.md](./overview.md)
- [persisted-scope.md](./persisted-scope.md)
- [../plugin-js-api-core/fs.md](../plugin-js-api-core/fs.md)
