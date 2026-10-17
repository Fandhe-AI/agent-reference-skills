---
source: https://v2.tauri.app/learn/security/capabilities-for-windows-and-platforms/
---

# Capabilities for Different Windows and Platforms

Create several windows and give each window (and each platform) only the Tauri capabilities (ACL) it needs.

`tauri.conf.json` (two windows)

```json
{
  "productName": "multiwindow",
  "app": {
    "windows": [
      {
        "label": "first",
        "title": "First",
        "width": 800,
        "height": 600
      },
      {
        "label": "second",
        "title": "Second",
        "width": 800,
        "height": 600
      }
    ]
  }
}
```

Or create the windows in Rust

```rust
tauri::Builder::default()
    .setup(|app| {
        let webview_url = tauri::WebviewUrl::App("index.html".into());
        // First window
        tauri::WebviewWindowBuilder::new(app, "first", webview_url.clone())
            .title("First")
            .build()?;
        // Second window
        tauri::WebviewWindowBuilder::new(app, "second", webview_url)
            .title("Second")
            .build()?;
        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

`src-tauri/capabilities/filesystem.json` (only the `first` window may read `$HOME`)

```json
{
  "identifier": "fs-read-home",
  "description": "Allow access file access to home directory",
  "local": true,
  "windows": ["first"],
  "permissions": [
    "fs:allow-home-read"
  ]
}
```

`src-tauri/capabilities/dialog.json` (both windows may ask Yes/No questions)

```json
{
  "identifier": "dialog",
  "description": "Allow to open a dialog",
  "local": true,
  "windows": ["first", "second"],
  "permissions": ["dialog:allow-ask"]
}
```

`filesystem.json` restricted to Linux and Windows with `platforms`

```json
{
  "identifier": "fs-read-home",
  "description": "Allow access file access to home directory",
  "local": true,
  "windows": ["first"],
  "permissions": [
    "fs:allow-home-read"
  ],
  "platforms": ["linux", "windows"]
}
```

## Notes

- Tauri capabilities / permissions (ACL), not Claude Code or MCP permissions.
- JSON files in `src-tauri/capabilities/` are all taken into account; separating them per category of action is recommended.
- `platforms` accepts `linux`, `windows`, `macos`, `android`, and `ios`.
- Trailing commas, the truncated tauri.conf.json excerpt and the undefined context variable from the official snippets are fixed here; the `greet` handler registration is also omitted because `greet` is not defined.
