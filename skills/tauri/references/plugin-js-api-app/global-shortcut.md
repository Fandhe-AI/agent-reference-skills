---
source: https://v2.tauri.app/reference/javascript/global-shortcut/
---

# @tauri-apps/plugin-global-shortcut

Register global shortcuts.

## Signature / Usage

```typescript
import { register, unregister } from '@tauri-apps/plugin-global-shortcut';

// register a single hotkey
await register('CommandOrControl+Shift+C', (event) => {
  if (event.state === "Pressed") {
      console.log('Shortcut triggered');
  }
});
await unregister('CommandOrControl+Shift+C');

// or register multiple hotkeys at once
await register(['CommandOrControl+Shift+C', 'Alt+A'], (event) => {
  console.log(`Shortcut ${event.shortcut} triggered`);
});
```

```typescript
function register(shortcuts: string | string[], handler: ShortcutHandler): Promise<void>  // since 2.0.0
function unregister(shortcuts: string | string[]): Promise<void>                           // since 2.0.0
function unregisterAll(): Promise<void>                                                    // since 2.0.0
function isRegistered(shortcut: string): Promise<boolean>                                  // since 2.0.0

type ShortcutHandler = (event: ShortcutEvent) => void

interface ShortcutEvent {
  shortcut: string               // e.g. CommandOrControl+Shift+C
  id: number                     // derived from the shortcut's modifiers and key
  state: 'Released' | 'Pressed'
}
```

## Notes

- The two `register` calls are alternatives (as in the source); registering the same shortcut twice rejects.
- Shortcut definitions are modifiers and key separated by `+`, e.g. `CmdOrControl+Q`.
- If a shortcut is already taken by another application, the handler is not triggered; make the shortcut as unique as possible while considering user experience.
- `isRegistered` returns `false` for a shortcut registered by another application.
- Tauri plugin (Rust core + system WebView). Not Electron's `globalShortcut` module; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@global-shortcut-v2.4.1` `plugins/global-shortcut/guest-js/index.ts`.

## Related

- [global-shortcut plugin](../plugins-app/global-shortcut.md)
