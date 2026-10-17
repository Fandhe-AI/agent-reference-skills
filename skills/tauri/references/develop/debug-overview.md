---
source: https://v2.tauri.app/develop/debug/
---

# Debug

Where error details are printed and the tools Tauri provides for debugging: development-only code, the Rust console, the WebView console and Core process debugging.

## Signature / Usage

Development-only code in Rust:

```rust
fn main() {
  // Whether the current instance was started with `tauri dev` or not.
  #[cfg(dev)]
  {
    // `tauri dev` only code
  }
  if cfg!(dev) {
    // `tauri dev` only code
  } else {
    // `tauri build` only code
  }
  let is_dev: bool = tauri::is_dev();

  // Whether debug assertions are enabled or not. This is true for `tauri dev` and `tauri build --debug`.
  #[cfg(debug_assertions)]
  {
    // Debug only code
  }
  if cfg!(debug_assertions) {
    // Debug only code
  } else {
    // Production only code
  }
}
```

### Rust console

The first place to look for errors is the terminal where you ran e.g. `tauri dev`. Print from Rust:

```rust
println!("Message from Rust: {}", msg);
```

If `tauri dev` crashes, get a granular stack trace. Linux and macOS:

```shell
RUST_BACKTRACE=1 tauri dev
```

Windows (PowerShell):

```powershell
$env:RUST_BACKTRACE=1
tauri dev
```

The Rust compiler gives detailed information, such as:

```bash
error[E0425]: cannot find value `sun` in this scope
  --> src/main.rs:11:5
   |
11 |     sun += i.to_string().parse::<u64>().unwrap();
   |     ^^^ help: a local variable with a similar name exists: `sum`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0425`.
```

### WebView console

Right-click in the WebView and choose `Inspect Element`, or use `Ctrl + Shift + i` on Linux and Windows and `Command + Option + i` on macOS. The inspector is platform-specific: the webkit2gtk WebInspector on Linux, Safari's inspector on macOS and the Microsoft Edge DevTools on Windows.

#### Opening devtools programmatically

Control the inspector window with `WebviewWindow::open_devtools` and `WebviewWindow::close_devtools`:

```rust
tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_webview_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  });
```

#### Using the inspector in production

By default the inspector is only enabled in development and debug builds unless enabled with a Cargo feature.

Create a debug build with `tauri build --debug`:

```sh
npm run tauri build -- --debug
cargo tauri build --debug
```

The first build takes time, later builds are significantly faster. The final bundled app has the development console enabled and is placed in `src-tauri/target/debug/bundle`. You can also run the built app from the terminal (`src-tauri/target/(release|debug)/[app name]`) to see Rust compiler notes or `println` messages; double-clicking the executable closes the console on errors.

To enable devtools in production builds, enable the `devtools` Cargo feature in `src-tauri/Cargo.toml`:

```toml
[dependencies]
tauri = { version = "...", features = ["...", "devtools"] }
```

### Debugging the Core process

The Core process is powered by Rust, so GDB or LLDB can debug it. See the Debug in VS Code guide for the LLDB VS Code extension.

## Notes

- The devtools API is private on macOS. Using private APIs on macOS prevents the application from being accepted to the App Store.
- The source page has a TODO for a JavaScript version of the development-only code check.

## Related

- [Debug in VS Code](./debug-vscode.md)
- [Debug in JetBrains IDEs](./debug-rustrover.md)
- [Debug in Neovim](./debug-neovim.md)
- [CrabNebula DevTools](./crabnebula-devtools.md)
- [Linux graphics debugging](./linux-graphics.md)
