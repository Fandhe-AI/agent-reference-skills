---
source: https://v2.tauri.app/reference/acl/core-permissions/
---

# Core Permissions

All permissions that can be used with the core of the Tauri framework (plugin permissions are documented with each plugin).

## Signature / Usage

```json
{
  "identifier": "main-capability",
  "windows": ["main"],
  "permissions": ["core:default", "core:window:allow-set-title"]
}
```

## Options / Props

`core:default` automatically adds:

| Permission |
| --- |
| `core:app:default` |
| `core:event:default` |
| `core:image:default` |
| `core:menu:default` |
| `core:path:default` |
| `core:resources:default` |
| `core:tray:default` |
| `core:webview:default` |
| `core:window:default` |

Each permission table below lists the `core:<module>:allow-<suffix>` identifiers; every `allow-*` has a matching `core:<module>:deny-*` ("Denies the `<command>` command without any pre-configured scope"). Description of every allow entry: "Enables the `<command>` command without any pre-configured scope", where `<command>` is the suffix with `-` replaced by `_`. The `Default:` line of each section lists the entries included in `core:<module>:default`.

### core:app

Default: `allow-version`, `allow-name`, `allow-tauri-version`, `allow-identifier`, `allow-bundle-type`, `allow-register-listener`, `allow-remove-listener`, `allow-supports-multiple-windows`.

```text
app-hide, app-show, bundle-type, default-window-icon, exit, fetch-data-store-identifiers,
identifier, name, register-listener, remove-data-store, remove-listener, set-app-theme,
set-dock-visibility, supports-multiple-windows, tauri-version, version
```

### core:event

Default: `allow-listen`, `allow-unlisten`, `allow-emit`, `allow-emit-to`.

```text
emit, emit-to, listen, unlisten
```

### core:image

Default: `allow-new`, `allow-from-bytes`, `allow-from-path`, `allow-rgba`, `allow-size`.

```text
from-bytes, from-path, new, rgba, size
```

### core:menu

Default: `allow-new`, `allow-append`, `allow-prepend`, `allow-insert`, `allow-remove`, `allow-remove-at`, `allow-items`, `allow-get`, `allow-popup`, `allow-create-default`, `allow-set-as-app-menu`, `allow-set-as-window-menu`, `allow-text`, `allow-set-text`, `allow-is-enabled`, `allow-set-enabled`, `allow-set-accelerator`, `allow-set-as-windows-menu-for-nsapp`, `allow-set-as-help-menu-for-nsapp`, `allow-is-checked`, `allow-set-checked`, `allow-set-icon`.

```text
append, create-default, get, insert, is-checked, is-enabled, items, new, popup, prepend,
remove, remove-at, set-accelerator, set-as-app-menu, set-as-help-menu-for-nsapp,
set-as-window-menu, set-as-windows-menu-for-nsapp, set-checked, set-enabled, set-icon,
set-text, text
```

### core:path

Default: `allow-resolve-directory`, `allow-resolve`, `allow-normalize`, `allow-join`, `allow-dirname`, `allow-extname`, `allow-basename`, `allow-is-absolute`.

```text
basename, dirname, extname, is-absolute, join, normalize, resolve, resolve-directory
```

### core:resources

Default: `allow-close`.

```text
close
```

### core:tray

Default: `allow-new`, `allow-get-by-id`, `allow-remove-by-id`, `allow-set-icon`, `allow-set-menu`, `allow-set-tooltip`, `allow-set-title`, `allow-set-visible`, `allow-set-temp-dir-path`, `allow-set-icon-as-template`, `allow-set-icon-with-as-template`, `allow-set-show-menu-on-left-click`.

```text
get-by-id, new, remove-by-id, set-icon, set-icon-as-template, set-icon-with-as-template,
set-menu, set-show-menu-on-left-click, set-temp-dir-path, set-title, set-tooltip, set-visible
```

### core:webview

Default: `allow-get-all-webviews`, `allow-webview-position`, `allow-webview-size`, `allow-internal-toggle-devtools`.

```text
clear-all-browsing-data, create-webview, create-webview-window, get-all-webviews,
internal-toggle-devtools, print, reparent, set-webview-auto-resize,
set-webview-background-color, set-webview-focus, set-webview-position, set-webview-size,
set-webview-zoom, webview-close, webview-hide, webview-position, webview-show, webview-size
```

### core:window

Default: `allow-get-all-windows`, `allow-scale-factor`, `allow-inner-position`, `allow-outer-position`, `allow-inner-size`, `allow-outer-size`, `allow-is-fullscreen`, `allow-is-minimized`, `allow-is-maximized`, `allow-is-focused`, `allow-is-decorated`, `allow-is-resizable`, `allow-is-maximizable`, `allow-is-minimizable`, `allow-is-closable`, `allow-is-visible`, `allow-is-enabled`, `allow-title`, `allow-current-monitor`, `allow-primary-monitor`, `allow-monitor-from-point`, `allow-available-monitors`, `allow-cursor-position`, `allow-theme`, `allow-is-always-on-top`, `allow-activity-name`, `allow-scene-identifier`, `allow-internal-toggle-maximize`.

```text
activity-name, available-monitors, center, close, create, current-monitor, cursor-position,
destroy, get-all-windows, hide, inner-position, inner-size, internal-toggle-maximize,
is-always-on-top, is-closable, is-decorated, is-enabled, is-focused, is-fullscreen,
is-maximizable, is-maximized, is-minimizable, is-minimized, is-resizable, is-visible,
maximize, minimize, monitor-from-point, outer-position, outer-size, primary-monitor,
request-user-attention, scale-factor, scene-identifier, set-always-on-bottom,
set-always-on-top, set-background-color, set-badge-count, set-badge-label, set-closable,
set-content-protected, set-cursor-grab, set-cursor-icon, set-cursor-position,
set-cursor-visible, set-decorations, set-effects, set-enabled, set-focus, set-focusable,
set-fullscreen, set-fullscreen-on-monitor, set-icon, set-ignore-cursor-events,
set-max-size, set-maximizable, set-min-size, set-minimizable, set-overlay-icon,
set-position, set-progress-bar, set-resizable, set-shadow, set-simple-fullscreen,
set-size, set-size-constraints, set-skip-taskbar, set-theme, set-title,
set-title-bar-style, set-visible-on-all-workspaces, show, start-dragging,
start-resize-dragging, theme, title, toggle-maximize, unmaximize, unminimize
```

## Notes

- Core permissions control the Tauri core's JS API (`@tauri-apps/api` app / event / image / menu / path / resources / tray / webview / window namespaces). This is Tauri (Rust core + system WebView), not Electron's API; see the electron skill for Electron.
- Permissions for the optional plugins (fs, dialog, http, ...) are documented with each plugin.
- Source: `v2.tauri.app/reference/acl/core-permissions/` (rendered 2026-10-17; generated from `crates/tauri/permissions/<module>/autogenerated/reference.md`)

## Related

- [Capabilities](./capabilities.md)
- [Permissions](./permissions.md)
- [Capability (ACL reference)](./acl-capability-schema.md)
