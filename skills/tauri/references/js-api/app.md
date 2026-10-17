---
source: https://v2.tauri.app/reference/javascript/api/namespaceapp/
---

# app

Application metadata and lifecycle APIs: version and identifier, theme and dock visibility, data stores and exiting the app. Also accessible with `window.__TAURI__.app` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { getVersion } from '@tauri-apps/api/app';
const appVersion = await getVersion();
```

## Functions

| Function | Signature | Since | Permission (beyond `core:app:default`) |
| --- | --- | --- | --- |
| getName | `getName(): Promise<string>` | 1.0.0 | default |
| getVersion | `getVersion(): Promise<string>` | 1.0.0 | default |
| getTauriVersion | `getTauriVersion(): Promise<string>` | 1.0.0 | default |
| getIdentifier | `getIdentifier(): Promise<string>` (identifier from `tauri.conf.json`) | 2.4.0 | default |
| getBundleType | `getBundleType(): Promise<BundleType>` | 2.5.0 | default |
| supportsMultipleWindows | `supportsMultipleWindows(): Promise<boolean>` | 2.11.0 | default |
| onBackButtonPress | `onBackButtonPress(handler: (payload: OnBackButtonPressPayload) => void): Promise<PluginListener>` | 2.9.0 | default (`allow-register-listener` / `allow-remove-listener`) |
| show | `show(): Promise<void>` (macOS) | 1.2.0 | `core:app:allow-app-show` |
| hide | `hide(): Promise<void>` (macOS) | 1.2.0 | `core:app:allow-app-hide` |
| fetchDataStoreIdentifiers | `fetchDataStoreIdentifiers(): Promise<DataStoreIdentifier[]>` (macOS / iOS) | 2.4.0 | `core:app:allow-fetch-data-store-identifiers` |
| removeDataStore | `removeDataStore(uuid: DataStoreIdentifier): Promise<void>` | 2.4.0 | `core:app:allow-remove-data-store` |
| defaultWindowIcon | `defaultWindowIcon(): Promise<Image \| null>` | 2.0.0 | `core:app:allow-default-window-icon` |
| setTheme | `setTheme(theme?: Theme \| null): Promise<void>` (`null` / `undefined` follows system theme) | 2.0.0 | `core:app:allow-set-app-theme` |
| setDockVisibility | `setDockVisibility(visible: boolean): Promise<void>` (macOS) | 2.5.0 | `core:app:allow-set-dock-visibility` |
| exit | `exit(code = 0): Promise<void>` | 2.12.0 | `core:app:allow-exit` |

## Types

```typescript
type DataStoreIdentifier = [number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number] // 16 numbers, since 2.4.0

enum BundleType {
  Nsis = 'nsis',        // Windows NSIS
  Msi = 'msi',          // Windows MSI
  Deb = 'deb',          // Linux Debian package
  Rpm = 'rpm',          // Linux RPM
  AppImage = 'appimage',// Linux AppImage
  App = 'app'           // macOS app bundle
}

type OnBackButtonPressPayload = {
  canGoBack: boolean // Whether the webview canGoBack property is true
}
```

## Examples

```typescript
import { onBackButtonPress, exit } from '@tauri-apps/api/app';

const listener = await onBackButtonPress(({ canGoBack }) => {
  if (canGoBack) {
    window.history.back();
  } else {
    void exit(0);
  }
});

// stop handling the back button
await listener.unregister();
```

## Notes

- Only the read-only commands are enabled by `core:app:default` (`allow-version`, `allow-name`, `allow-tauri-version`, `allow-identifier`, `allow-bundle-type`, `allow-supports-multiple-windows`, `allow-register-listener`, `allow-remove-listener`). Every other function needs its permission added to a capability.
- `setTheme`: iOS / Android unsupported.
- `onBackButtonPress`: Android only; registering a handler takes over the default behavior (no automatic navigate back / close). On Windows / Linux / macOS / iOS the handler is never called.
- `supportsMultipleWindows`: always `true` on Windows / Linux / macOS; Android `true` on API level 32 (Android 12L) and above; iOS reflects `UIApplication.supportsMultipleScenes` (`true` on iPadOS, `false` on iPhone).
- `exit`: same as `exit` of `@tauri-apps/plugin-process` without needing the plugin. On Android the activity is finished and `code` is ignored.
- `removeDataStore`: any webview using the data store should be closed first.
- Tauri (Rust core + system WebView). Not Electron's API (`app` of Electron); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/app.ts`.

## Related

- [core](./core.md)
- [window-types](./window-types.md) (`Theme`)
- [image](./image.md)
