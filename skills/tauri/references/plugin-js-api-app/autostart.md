---
source: https://v2.tauri.app/reference/javascript/autostart/
---

# @tauri-apps/plugin-autostart

Automatically launch your application at startup.

## Signature / Usage

```typescript
import { isEnabled, enable, disable } from '@tauri-apps/plugin-autostart';
const enabled = await isEnabled();
await enable();
await disable();
```

```typescript
function isEnabled(): Promise<boolean>   // since 2.0.0
function enable(): Promise<void>         // since 2.0.0
function disable(): Promise<void>        // since 2.0.0
```

## Notes

- `isEnabled` resolves to `true` if the application launches at startup, `false` otherwise.
- Tauri plugin (Rust core + system WebView). Not Electron's API (`app.setLoginItemSettings`); see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@autostart-v2.7.0` `plugins/autostart/guest-js/index.ts`.

## Related

- autostart plugin
