---
source: https://docs.expo.dev/versions/v58.0.0/sdk/haptics/
---

# Haptics

`expo-haptics` provides haptic (touch) feedback: Android via the Vibrator system service, iOS 10+ via the Taptic Engine, and web via the Web Vibration API.

## Signature / Usage

```sh
npx expo install expo-haptics
```

```jsx
import * as Haptics from 'expo-haptics';

Haptics.selectionAsync();
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
```

## Options / Props

All methods return `Promise<void>` (fulfilled once native haptics functionality is triggered).

| Name | Platforms | Parameter | Description |
| --- | --- | --- | --- |
| `Haptics.impactAsync(style)` | Android, iOS, Web | `style?: ImpactFeedbackStyle` (default `Medium`) | Collision indicator; Android simulated with `Vibrator`, iOS mapped to `UIImpactFeedbackStyle`. |
| `Haptics.notificationAsync(type)` | Android, iOS, Web | `type?: NotificationFeedbackType` (default `Success`) | Notification feedback; Android simulated with `Vibrator`, iOS mapped to `UINotificationFeedbackType`. |
| `Haptics.performAndroidHapticsAsync(type)` | Android | `type: AndroidHaptics` | Uses the device haptics engine. |
| `Haptics.selectionAsync()` | Android, iOS, Web | - | Signals that a selection change was registered. |

### Enums

| Name | Values |
| --- | --- |
| `ImpactFeedbackStyle` | `Heavy = "heavy"`, `Light = "light"`, `Medium = "medium"`, `Rigid = "rigid"`, `Soft = "soft"` |
| `NotificationFeedbackType` | `Error = "error"`, `Success = "success"`, `Warning = "warning"` |
| `AndroidHaptics` (Android) | `Clock_Tick = "clock-tick"`, `Confirm = "confirm"`, `Context_Click = "context-click"`, `Drag_Start = "drag-start"`, `Gesture_End = "gesture-end"`, `Gesture_Start = "gesture-start"`, `Keyboard_Press = "keyboard-press"`, `Keyboard_Release = "keyboard-release"`, `Keyboard_Tap = "keyboard-tap"`, `Long_Press = "long-press"`, `No_Haptics = "no-haptics"`, `Reject = "reject"`, `Segment_Frequent_Tick = "segment-frequent-tick"`, `Segment_Tick = "segment-tick"`, `Text_Handle_Move = "text-handle-move"`, `Toggle_Off = "toggle-off"`, `Toggle_On = "toggle-on"`, `Virtual_Key = "virtual-key"`, `Virtual_Key_Release = "virtual-key-release"` |

## Notes

- Platforms: android, ios, web (not listed for tvOS).
- Android: the `VIBRATE` permission is added automatically. The `Vibrator` API is not recommended for haptics feedback; use `performAndroidHapticsAsync`, which is similar to iOS haptic feedback and does not require `VIBRATE` permission.
- iOS: the Taptic Engine does nothing when Low Power Mode is enabled (detectable with `expo-battery`), the user disabled it in settings, the iOS Camera is active, or iOS dictation is active.
- Web: requires browser support for the Web Vibration API, vibration hardware, and user permission; some browsers ignore vibration in certain contexts (e.g. background tabs).
- The official page recommends the Pulsar haptics SDK (docs.swmansion.com/pulsar) for more advanced control (custom patterns, gesture-based haptics, worklets).
- Source: `sdk-58` branch `packages/expo-haptics`; modificationDate September 15, 2026.

## Related

- [KeepAwake](./keep-awake.md)
- [Expo](./expo.md)
