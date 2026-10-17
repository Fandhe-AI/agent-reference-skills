---
source: https://v2.tauri.app/plugin/dialog/
---

# Dialog

Native system dialogs for opening and saving files along with message dialogs. Plugin `tauri-plugin-dialog` 2.8.3 / `@tauri-apps/plugin-dialog` (tag `dialog-v2.8.3`).

## Signature / Usage

JavaScript, Yes/No dialog:

```javascript
import { ask } from '@tauri-apps/plugin-dialog';
// when using `"withGlobalTauri": true`, you may use
// const { ask } = window.__TAURI__.dialog;

// Create a Yes/No dialog
const answer = await ask('This action cannot be reverted. Are you sure?', {
  title: 'Tauri',
  kind: 'warning',
});

console.log(answer);
// Prints boolean to the console
```

Ok/Cancel dialog:

```javascript
import { confirm } from '@tauri-apps/plugin-dialog';

// Creates a confirmation Ok/Cancel dialog
const confirmation = await confirm(
  'This action cannot be reverted. Are you sure?',
  { title: 'Tauri', kind: 'warning' }
);
```

Message dialog (an `Ok` button; `message()` returns `Promise<MessageDialogResult>`: `'Ok'` etc., or the custom button label; since 2.4.0):

```javascript
import { message } from '@tauri-apps/plugin-dialog';

// Shows message
await message('File not found', { title: 'Tauri', kind: 'error' });
```

File/directory selector (`multiple` controls multiple selection, `directory` controls directory selection):

```javascript
import { open } from '@tauri-apps/plugin-dialog';

// Open a dialog
const file = await open({
  multiple: false,
  directory: false,
});
console.log(file);
// Prints file path or URI
```

Save dialog:

```javascript
import { save } from '@tauri-apps/plugin-dialog';

// Prompt to save a 'My Filter' with extension .png or .jpeg
const path = await save({
  filters: [
    {
      name: 'My Filter',
      extensions: ['png', 'jpeg'],
    },
  ],
});
console.log(path);
// Prints the chosen path
```

Rust, ask/message dialog (blocking, or non blocking with `show`):

```rust
use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};

let answer = app.dialog()
        .message("Tauri is Awesome")
        .title("Tauri is Awesome")
        .buttons(MessageDialogButtons::OkCancelCustom("Absolutely", "Totally"))
        .blocking_show();
```

```rust
use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};

app.dialog()
    .message("Tauri is Awesome")
    .title("Tauri is Awesome")
   .buttons(MessageDialogButtons::OkCancelCustom("Absolutely", "Totally"))
    .show(|result| match result {
        true => { /* do something */ }
        false => { /* do something */ }
    });
```

Rust message dialog with kind:

```rust
use tauri_plugin_dialog::{DialogExt, MessageDialogKind};

let ans = app.dialog()
    .message("File not found")
    .kind(MessageDialogKind::Error)
    .title("Warning")
    .blocking_show();
```

Rust file selector:

```rust
use tauri_plugin_dialog::DialogExt;

let file_path = app.dialog().file().blocking_pick_file();
// return a file_path `Option`, or `None` if the user closes the dialog
```

```rust
use tauri_plugin_dialog::DialogExt;

app.dialog().file().pick_file(|file_path| {
    // return a file_path `Option`, or `None` if the user closes the dialog
    });
```

Rust save:

```rust
use tauri_plugin_dialog::DialogExt;

let file_path = app
    .dialog()
    .file()
    .add_filter("My Filter", &["png", "jpeg"])
    .blocking_save_file();
    // do something with the optional file path here
    // the file path is `None` if the user closed the dialog
```

## Setup

Automatic:

```sh
npm run tauri add dialog
cargo tauri add dialog
```

Manual:

1. `cargo add tauri-plugin-dialog` (in `src-tauri`)
2. Initialize in `src-tauri/src/lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

3. For JavaScript dialogs install the npm package:

```sh
npm install @tauri-apps/plugin-dialog
```

## Supported Platforms

Minimum Rust version 1.90.

| Platform | Level | Notes |
| --- | --- | --- |
| Windows | Full support | |
| Linux | Full support | |
| macOS | Full support | |
| Android | Partial support | Does not support folder picker |
| iOS | Partial support | Does not support folder picker |

Cargo features of `tauri-plugin-dialog` 2.8.3: `default = ["gtk3"]`, `gtk3`, `xdg-portal`.

## Permissions

Default permission set `dialog:default`: all dialog types are enabled. It includes `allow-message`, `allow-save`, `allow-open`.

| Identifier | Description |
| --- | --- |
| `dialog:allow-ask` | Enables the ask command without any pre-configured scope. (DEPRECATED: now an alias to `allow-message`, will be removed in v3) |
| `dialog:allow-confirm` | Enables the confirm command without any pre-configured scope. (DEPRECATED: now an alias to `allow-message`, will be removed in v3) |
| `dialog:allow-message` | Enables the message command without any pre-configured scope. |
| `dialog:allow-open` | Enables the open command without any pre-configured scope. |
| `dialog:allow-save` | Enables the save command without any pre-configured scope. |

Each `allow-*` has a matching `deny-*` (e.g. `dialog:deny-open`).

## Notes

- The official page says `message()` returns `false` when closed; in dialog-v2.8.3 it resolves to a `MessageDialogResult` string (`'Yes' | 'No' | 'Ok' | 'Cancel'` or a custom label), and only `ask()`/`confirm()` return booleans.
- Placeholder match arms in the official non-blocking dialog snippets are given empty blocks (and the `pick_file` call a trailing `;`) so the code compiles.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron's `dialog` module.
- The file dialog APIs return file system paths on Linux, Windows and macOS. On iOS, `file://<path>` URIs are returned. On Android, content URIs are returned. The filesystem plugin works with any path format out of the box.
- Source: `plugins-workspace@dialog-v2.8.3` `plugins/dialog/{Cargo.toml,permissions/autogenerated/reference.md}`.

## Related

- [dialog (JS API)](../plugin-js-api-app/dialog.md)
- [File System](../plugins-core/file-system.md)
