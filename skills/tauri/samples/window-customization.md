---
source: https://v2.tauri.app/learn/window-customization/
---

# Window Customization

Build a custom titlebar (decorations off, drag region, minimize / maximize / close buttons) and a macOS transparent titlebar with a custom background color.

`tauri.conf.json`

```json
{
  "app": {
    "windows": [
      {
        "decorations": false
      }
    ]
  }
}
```

`src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "main-capability",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:window:default",
    "core:window:allow-close",
    "core:window:allow-minimize",
    "core:window:allow-toggle-maximize",
    "core:window:allow-start-dragging"
  ]
}
```

HTML (top of `<body>`)

```html
<div class="titlebar">
  <div data-tauri-drag-region></div>
  <div class="controls">
    <button id="titlebar-minimize" title="minimize">
      <!-- https://api.iconify.design/mdi:window-minimize.svg -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M19 13H5v-2h14z" />
      </svg>
    </button>
    <button id="titlebar-maximize" title="maximize">
      <!-- https://api.iconify.design/mdi:window-maximize.svg -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
      </svg>
    </button>
    <button id="titlebar-close" title="close">
      <!-- https://api.iconify.design/mdi:close.svg -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
        />
      </svg>
    </button>
  </div>
</div>
```

CSS

```css
.titlebar {
  height: 30px;
  background: #329ea3;
  user-select: none;
  display: grid;
  grid-template-columns: auto max-content;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.titlebar > .controls {
  display: flex;
}
.titlebar button {
  appearance: none;
  padding: 0;
  margin: 0;
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  background-color: transparent;
}
.titlebar button:hover {
  background: #5bbec3;
}
```

JavaScript

```javascript
import { getCurrentWindow } from '@tauri-apps/api/window';

// when using `"withGlobalTauri": true`, you may use
// const { getCurrentWindow } = window.__TAURI__.window;

const appWindow = getCurrentWindow();

document
  .getElementById('titlebar-minimize')
  ?.addEventListener('click', () => appWindow.minimize());
document
  .getElementById('titlebar-maximize')
  ?.addEventListener('click', () => appWindow.toggleMaximize());
document
  .getElementById('titlebar-close')
  ?.addEventListener('click', () => appWindow.close());
```

macOS transparent titlebar with custom background color (`src-tauri/Cargo.toml`, then `src-tauri/src/lib.rs`; remove the main window from `app.windows` in `tauri.conf.json` first)

```toml
[target."cfg(target_os = \"macos\")".dependencies]
objc2-app-kit = { version = "0.3.2", features = ["NSColor", "NSWindow", "objc2-core-foundation"] }
```

```rust
use tauri::{TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

pub fn run() {
	tauri::Builder::default()
		.setup(|app| {
			let win_builder =
				WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
					.title("Transparent Titlebar Window")
					.inner_size(800.0, 600.0);

			// set transparent title bar only when building for macOS
			#[cfg(target_os = "macos")]
			let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

			let window = win_builder.build().unwrap();

			// set background color only when building for macOS
			#[cfg(target_os = "macos")]
			{
				use objc2_app_kit::{NSColor, NSWindow};

				let ns_window_ptr = window.ns_window().unwrap() as *mut NSWindow;
				let ns_window = unsafe { &*ns_window_ptr };
				let bg_color = NSColor::colorWithRed_green_blue_alpha(
					50.0 / 255.0,
					158.0 / 255.0,
					163.5 / 255.0,
					1.0,
				);
				ns_window.setBackgroundColor(Some(&bg_color));
			}

			Ok(())
		})
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
```

## Notes

- Tauri window API (`getCurrentWindow`, `WebviewWindowBuilder`). Not Electron's `BrowserWindow` / `frame: false`; see the electron skill for Electron.
- All plugin commands are blocked by default; the `core:window:*` permissions in the capability file are required for the buttons to work.
- `data-tauri-drag-region` only applies to the element it is set on, not its children, so buttons and inputs keep working.
- On macOS a custom titlebar loses system features such as moving or aligning the window; the transparent titlebar approach keeps native functions.
- The official snippet nests `windows` under a `tauri` key (Tauri 1 shape); the v2 config schema rejects it, so it is rewritten to `app.windows` here.
