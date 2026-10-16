---
source: https://v2.tauri.app/reference/config/#trayiconconfig
---

# TrayIconConfig

Configuration for the application tray icon (`app.trayIcon`).

## Signature / Usage

```json
{
  "app": {
    "trayIcon": {
      "iconPath": "icons/tray.png",
      "iconAsTemplate": true,
      "showMenuOnLeftClick": true,
      "tooltip": "My app"
    }
  }
}
```

## Options / Props

Required: `iconPath`. `additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | string \| null | — | Set an id for this tray icon so you can reference it later, defaults to `main`. |
| `iconPath` | string (required) | — | Path to the default icon to use for the tray icon. Note: this stores the image in raw pixels to the final binary, so keep the icon size (width and height) small or else it's going to bloat your final executable. |
| `iconAsTemplate` | boolean | `false` | A Boolean value that determines whether the image represents a template image on macOS. |
| `menuOnLeftClick` | boolean | `true` | **Deprecated. No longer works since v2.2, use `showMenuOnLeftClick` instead.** Whether the menu should appear when the tray icon receives a left click. Linux: unsupported. |
| `showMenuOnLeftClick` | boolean | `true` | A Boolean value that determines whether the menu should appear when the tray icon receives a left click. Linux: unsupported. |
| `title` | string \| null | — | Title for MacOS tray. |
| `tooltip` | string \| null | — | Tray icon tooltip on Windows and macOS. |

## Notes

- `menuOnLeftClick`: deprecated and non-functional since Tauri v2.2; use `showMenuOnLeftClick`.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.TrayIconConfig`).

## Related

- [AppConfig](./app-config.md)
