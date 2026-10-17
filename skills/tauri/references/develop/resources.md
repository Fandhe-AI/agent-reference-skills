---
source: https://v2.tauri.app/develop/resources/
---

# Embedding Additional Files

Files that are not part of the frontend (`frontendDist`) or are too big to inline into the binary are called `resources`. Bundle them with `bundle.resources` and resolve their paths with `PathResolver` (Rust) or `resolveResource` (JavaScript).

## Signature / Usage

Add the `resources` property to the `bundle` object in `tauri.conf.json`. List form:

```json
{
  "bundle": {
    "resources": [
      "./path/to/some-file.txt",
      "/absolute/path/to/textfile.txt",
      "../relative/path/to/jsonfile.json",
      "some-folder/",
      "resources/**/*.md"
    ]
  }
}
```

Behavior of each entry in list form:

```json5
{
  "bundle": {
    "resources": [
      // Will be placed to `$RESOURCE/path/to/some-file.txt`
      "./path/to/some-file.txt",

      // The root in an absolute path will be replaced by `_root_`,
      // so `textfile.txt` will be placed to `$RESOURCE/_root_/absolute/path/to/textfile.txt`
      "/absolute/path/to/textfile.txt",

      // `..` in a relative path will be replaced by `_up_`,
      // so `jsonfile.json` will be placed to `$RESOURCE/_up_/relative/path/to/textfile.txt`,
      "../relative/path/to/jsonfile.json",

      // If the path is a directory, the entire directory will be copied to the `$RESOURCE` directory,
      // preserving the original structures, for example:
      //   - `some-folder/file.txt`                   -> `$RESOURCE/some-folder/file.txt`
      //   - `some-folder/another-folder/config.json` -> `$RESOURCE/some-folder/another-folder/config.json`
      // This is the same as `some-folder/**/*`
      "some-folder/",

      // You can also include multiple files at once through glob patterns.
      // All the `.md` files inside `resources` will be placed to `$RESOURCE/resources/`,
      // preserving their original directory structures, for example:
      //   - `resources/index.md`      -> `$RESOURCE/resources/index.md`
      //   - `resources/docs/setup.md` -> `$RESOURCE/resources/docs/setup.md`
      "resources/**/*.md"
    ]
  }
}
```

The bundled files are in `$RESOURCE/` with the original directory structure preserved (`./path/to/some-file.txt` -> `$RESOURCE/path/to/some-file.txt`). To control where files are copied, use a map instead:

```json
{
  "bundle": {
    "resources": {
      "/absolute/path/to/textfile.txt": "resources/textfile.txt",
      "relative/path/to/jsonfile.json": "resources/jsonfile.json",
      "resources/": "",
      "docs/**/*md": "website-docs/"
    }
  }
}
```

```json5
{
  "bundle": {
    "resources": {
      // `textfile.txt` will be placed to `$RESOURCE/resources/textfile.txt`
      "/absolute/path/to/textfile.txt": "resources/textfile.txt",

      // `jsonfile.json` will be placed to `$RESOURCE/resources/jsonfile.json`
      "relative/path/to/jsonfile.json": "resources/jsonfile.json",

      // Copy the entire directory to `$RESOURCE`, preserving the original structures,
      // the target is "" which means it will be placed directly in the resource directory `$RESOURCE`, for example:
      //   - `resources/file.txt`                -> `$RESOURCE/file.txt`
      //   - `resources/some-folder/config.json` -> `$RESOURCE/some-folder/config.json`
      "resources/": "",

      // When using glob patterns, the behavior is different from the list one,
      // all the matching files will be placed to the target directory without preserving the original file structures
      // for example:
      //   - `docs/index.md`         -> `$RESOURCE/website-docs/index.md`
      //   - `docs/plugins/setup.md` -> `$RESOURCE/website-docs/setup.md`
      "docs/**/*md": "website-docs/"
    }
  }
}
```

`$RESOURCE` resolves per platform as documented for `PathResolver::resource_dir`.

### Source path syntax

"Target resource directory" is the value after the colon in the map notation, or a reconstruction of the original file paths in the list notation.

- `"dir/file.txt"`: copies the `file.txt` file into the target resource directory.
- `"dir/"`: copies all files and directories recursively into the target resource directory (preserves file system structure).
- `"dir/*"`: copies all files in `dir` non-recursively (sub-directories ignored).
- `"dir/**`: throws an error because `**` only matches directories and no files can be found.
- `"dir/**/*"`: copies all files in `dir` recursively (including sub-directories).
- `"dir/**/**`: throws an error because `**` only matches directories and no files can be found.

## Resolve resource file paths

Use the APIs instead of calculating the path manually.

Rust: get a `PathResolver` from `App` / `AppHandle`, then call `PathResolver::resolve`:

```rust
tauri::Builder::default()
  .setup(|app| {
    let resource_path = app.path().resolve("lang/de.json", BaseDirectory::Resource)?;
    Ok(())
  })
```

In a command:

```rust
#[tauri::command]
fn hello(handle: tauri::AppHandle) {
  let resource_path = handle.path().resolve("lang/de.json", BaseDirectory::Resource)?;
}
```

JavaScript: use `resolveResource`:

```javascript
import { resolveResource } from '@tauri-apps/api/path';
const resourcePath = await resolveResource('lang/de.json');
```

### Path syntax

The path can be a normal relative path like `folder/json_file.json` (resolves to `$RESOURCE/folder/json_file.json`) or one like `../relative/folder/toml_file.toml` (resolves to `$RESOURCE/_up_/relative/folder/toml_file.toml`). These APIs use the same rules as `tauri.conf.json > bundle > resources`:

```json
{
  "bundle": {
    "resources": ["folder/json_file.json", "../relative/folder/toml_file.toml"]
  }
}
```

```rust
let json_path = app.path().resolve("folder/json_file.json", BaseDirectory::Resource)?;
let toml_path = app.path().resolve("../relative/folder/toml_file.toml", BaseDirectory::Resource)?;
```

### Android

Resources are stored in the APK as assets, so the returned values are not normal file system paths. The special URI prefix `asset://localhost/` is used, which works with the `fs` plugin through `FsExt::fs`:

```rust
let resource_path = app.path().resolve("lang/de.json", BaseDirectory::Resource).unwrap();
let json = app.fs().read_to_string(&resource_path);
```

To have resources on a real file system, copy the contents out manually through the `fs` plugin.

## Reading resource files

Example: bundle i18n JSON files.

```
.
├── src-tauri/
│   ├── tauri.conf.json
│   ├── lang/
│   │   ├── de.json
│   │   └── en.json
│   └── ...
└── ...
```

`tauri.conf.json`

```json
{
  "bundle": {
    "resources": ["lang/*"]
  }
}
```

`lang/de.json`

```json
{
  "hello": "Guten Tag!",
  "bye": "Auf Wiedersehen!"
}
```

Rust:

```rust
tauri::Builder::default()
  .setup(|app| {
    // The path specified must follow the same syntax as defined in
    // `tauri.conf.json > bundle > resources`
    let resource_path = app.path().resolve("lang/de.json", BaseDirectory::Resource)?;

    let json = std::fs::read_to_string(&resource_path).unwrap();
    // Or when dealing with Android, use the file system plugin instead
    // let json = app.fs().read_to_string(&resource_path);

    let lang_de: serde_json::Value = serde_json::from_str(json).unwrap();

    // This will print 'Guten Tag!' to the terminal
    println!("{}", lang_de.get("hello").unwrap());

    Ok(())
  })
```

```rust
#[tauri::command]
fn hello(handle: tauri::AppHandle) -> String {
    let resource_path = handle.path().resolve("lang/de.json", BaseDirectory::Resource)?;

    let json = std::fs::read_to_string(&resource_path).unwrap();
    // Or when dealing with Android, use the file system plugin instead
    // let json = handle.fs().read_to_string(&resource_path);

    let lang_de: serde_json::Value = serde_json::from_str(json).unwrap();

    lang_de.get("hello").unwrap()
}
```

JavaScript: call a command through `await invoke('hello')` or use the `fs` plugin. With the `fs` plugin, besides the basic setup, enable the plugin APIs and the `$RESOURCE` folder permission in the capability:

`src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:allow-read-text-file",
    "fs:allow-resource-read-recursive"
  ]
}
```

`fs:allow-resource-read-recursive` allows full recursive read access to the complete `$RESOURCE` folder, files and subdirectories (see the fs plugin scopes for other options and finer control).

```javascript
import { resolveResource } from '@tauri-apps/api/path';
import { readTextFile } from '@tauri-apps/plugin-fs';

const resourcePath = await resolveResource('lang/de.json');
const langDe = JSON.parse(await readTextFile(resourcePath));
console.log(langDe.hello); // This will print 'Guten Tag!' to the devtools console
```

## Permissions

`../` is replaced with `_up_` in relative paths and the root with `_root_` in absolute paths when using a list, so those files end up in sub folders inside the resource directory. To allow them in the permission system, use `$RESOURCE/**/*` for recursive access.

Bundled file:

```json
{
  "bundle": {
    "resources": ["../relative/path/to/jsonfile.json"]
  }
}
```

With the `fs` plugin:

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:allow-stat",
    "fs:allow-read-text-file",
    "fs:allow-resource-read-recursive",
    {
      "identifier": "fs:scope",
      "allow": ["$RESOURCE/**/*"],
      "deny": ["$RESOURCE/secret.txt"]
    }
  ]
}
```

With the `opener` plugin:

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    {
      "identifier": "opener:allow-open-path",
      "allow": [
        {
          "path": "$RESOURCE/**/*"
        }
      ]
    }
  ]
}
```

## Related

- [Sidecar](./sidecar.md)
- [Configuration Files](./configuration-files.md)
- Capabilities
- File System plugin
