---
source: https://v2.tauri.app/reference/javascript/haptics/
---

# @tauri-apps/plugin-haptics

Trigger haptic feedback on Android and iOS.

## Signature / Usage

```typescript
import { vibrate, impactFeedback } from '@tauri-apps/plugin-haptics'
await vibrate(300)
await impactFeedback('medium')
```

```typescript
function vibrate(duration: number): Promise<Result<null, Error>>                          // since 2.0.0
function impactFeedback(style: ImpactFeedbackStyle): Promise<Result<null, Error>>         // since 2.0.0
function notificationFeedback(type: NotificationFeedbackType): Promise<Result<null, Error>>  // since 2.0.0
function selectionFeedback(): Promise<Result<null, Error>>                                // since 2.0.0

type ImpactFeedbackStyle = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid'
type NotificationFeedbackType = 'success' | 'warning' | 'error'
type Error = never
type Result<T, E> = { status: 'ok'; data: T } | { status: 'error'; error: E }
```

## Options / Props

| Function | Parameter | Description |
| --- | --- | --- |
| vibrate | `duration` | Duration of the vibration, in milliseconds. |
| impactFeedback | `style` | Style of the impact. Defaults to `Medium` (per the generated type doc). |
| notificationFeedback | `type` | Outcome to convey. Defaults to `Success` (per the generated type doc). |

## Notes

- All functions have no effect on desktop platforms.
- `impactFeedback`: on iOS maps to a `UIImpactFeedbackGenerator` of the given style. On Android, which has no equivalent system API, each style plays a distinct vibration waveform of increasing intensity.
- `notificationFeedback`: on iOS maps to a `UINotificationFeedbackGenerator` of the given type. On Android each type plays a distinct vibration waveform.
- `selectionFeedback`: indicates that a selection changed, e.g. the value of a picker control.
- The `Result` / `Error` / `ImpactFeedbackStyle` / `NotificationFeedbackType` types come from the tauri-specta generated `guest-js/bindings.ts`.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@haptics-v2.4.2` `plugins/haptics/guest-js/index.ts` and `bindings.ts`.

## Related

- haptics plugin
