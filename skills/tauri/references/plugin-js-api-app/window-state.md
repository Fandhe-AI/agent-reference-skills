---
source: https://v2.tauri.app/reference/javascript/window-state/
---

# @tauri-apps/plugin-window-state

Save and restore window positions and sizes.

## Signature / Usage

```typescript
import { saveWindowState, StateFlags } from '@tauri-apps/plugin-window-state';

await saveWindowState(StateFlags.ALL);
```

```typescript
function saveWindowState(flags?: StateFlags): Promise<void>                      // since 2.0.0
function restoreState(label: WindowLabel, flags?: StateFlags): Promise<void>     // since 2.0.0
function restoreStateCurrent(flags?: StateFlags): Promise<void>                  // since 2.0.0
function filename(): Promise<string>                                              // since 2.0.0
```

`WindowLabel` is imported from `@tauri-apps/api/window`.

## Options / Props

`StateFlags` enum (combine with bitwise OR `|`):

| Member | Value | Description |
| --- | --- | --- |
| SIZE | `1 << 0` | Save and restore the window size. |
| POSITION | `1 << 1` | Save and restore the window position. |
| MAXIMIZED | `1 << 2` | Save and restore whether the window is maximized. |
| VISIBLE | `1 << 3` | Save and restore whether the window is visible. |
| DECORATIONS | `1 << 4` | Save and restore whether the window has decorations. |
| FULLSCREEN | `1 << 5` | Save and restore whether the window is fullscreen. |
| ALL | all of the above | Save and restore every flag. |

## Notes

- `saveWindowState` saves the state of all open windows to disk. `restoreState` restores the state of the window with the given label; `restoreStateCurrent` restores the current window (`getCurrentWindow().label`).
- When `flags` is omitted, the flags passed to the plugin `Builder` are used (all flags if none were set).
- `filename` resolves to the name of the file used to store window state.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@window-state-v2.5.0` `plugins/window-state/guest-js/index.ts`.

```typescript
import { restoreStateCurrent, StateFlags } from '@tauri-apps/plugin-window-state';

await restoreStateCurrent(StateFlags.ALL);
```

## Related

- window-state plugin
