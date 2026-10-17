---
source: https://v2.tauri.app/reference/javascript/process/
---

# @tauri-apps/plugin-process

Perform operations on the current process.

## Signature / Usage

```ts
import { exit } from '@tauri-apps/plugin-process';
await exit(1);
```

```ts
import { relaunch } from '@tauri-apps/plugin-process';
await relaunch();
```

```ts
function exit(code?: number): Promise<void>   // default code = 0, @since 2.0.0
function relaunch(): Promise<void>            // @since 2.0.0
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| exit(code) | `number` (default `0`) | Exits immediately with the given `exitCode`. |
| relaunch() | — | Exits the current instance of the app then relaunches it. |

## Notes

- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@process-v2.4.0` `plugins/process/guest-js/index.ts`

## Related

- [Process plugin](../plugins-core/process.md)
