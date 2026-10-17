---
source: https://docs.expo.dev/versions/v58.0.0/sdk/battery/
---

# Battery

`expo-battery` provides battery information for the physical device (battery level, charging state, and more) and corresponding event listeners.

## Signature / Usage

```sh
npx expo install expo-battery
```

```jsx
import { useBatteryLevel } from 'expo-battery';
import { Text, View } from 'react-native';

export default function App() {
  const batteryLevel = useBatteryLevel();

  return (
    <View>
      <Text>Current Battery Level: {batteryLevel}</Text>
    </View>
  );
}
```

```js
import * as Battery from 'expo-battery';
```

## Options / Props

Hooks (Android, iOS, Web):

| Name | Returns | Description |
| --- | --- | --- |
| `useBatteryLevel()` | `number` | Battery level, as in `getBatteryLevelAsync`. |
| `useBatteryState()` | `BatteryState` | Battery state, as in `getBatteryStateAsync`. |
| `useLowPowerMode()` | `boolean` | Whether the device is in low power / power saver mode, as in `isLowPowerModeEnabledAsync`. |
| `usePowerState()` | `PowerState` | Power state, as in `getPowerStateAsync`. |

Methods (Android, iOS, Web):

| Name | Returns | Description |
| --- | --- | --- |
| `getBatteryLevelAsync()` | `Promise<number>` | Level between `0` and `1` inclusive; `-1` if the device does not provide it. On web relies on the Battery Status API: real value in Chromium-based browsers, `-1` in unsupported browsers (see Notes). |
| `getBatteryStateAsync()` | `Promise<BatteryState>` | Current battery state. On web relies on the Battery Status API: real state in Chromium-based browsers, `BatteryState.UNKNOWN` in unsupported browsers. |
| `getPowerStateAsync()` | `Promise<PowerState>` | Battery level, state and Power Saver (Android) / Low Power (iOS) mode. Re-throws any error raised while retrieving the power-state information. |
| `isAvailableAsync()` | `Promise<boolean>` | `true` on Android and physical iOS devices, `false` on iOS simulators. On web depends on browser support of the Battery Status API. |
| `isBatteryOptimizationEnabledAsync()` | `Promise<boolean>` | Whether battery optimization is enabled for the app (Android 6.0 or later; Android only). Background tasks might be affected in doze mode. |
| `isLowPowerModeEnabledAsync()` | `Promise<boolean>` | Power Saver (Android) / Low Power (iOS) status. Always `false` where reporting is unsupported (web, older Android). |

Event subscriptions (each takes a `listener` and returns an `EventSubscription` with `remove()`):

| Name | Listener event | Description |
| --- | --- | --- |
| `addBatteryLevelListener(listener)` | `BatteryLevelEvent` | Android: fires only on significant changes (below `android.intent.action.BATTERY_LOW` or above `android.intent.action.BATTERY_OKAY` from low). iOS: fires when level drops one percent or more, at most once per minute. Web: never fires. |
| `addBatteryStateListener(listener)` | `BatteryStateEvent` | Battery state changes. Web: never fires. |
| `addLowPowerModeListener(listener)` | `PowerModeEvent` | Fires whenever the power mode is toggled. Web: never fires. |

Types:

| Name | Properties |
| --- | --- |
| `BatteryLevelEvent` | `batteryLevel: number` (`0`-`1`, or `-1` if unknown) |
| `BatteryStateEvent` | `batteryState: BatteryState` |
| `PowerModeEvent` | `lowPowerMode: boolean` |
| `PowerState` | `batteryLevel: number`, `batteryState: BatteryState`, `lowPowerMode: boolean` |

`BatteryState` enum:

| Value | Number | Description |
| --- | --- | --- |
| `UNKNOWN` | 0 | State unknown or inaccessible. |
| `UNPLUGGED` | 1 | Discharging (typically not connected to power). On Android corresponds to `BATTERY_STATUS_DISCHARGING`. |
| `CHARGING` | 2 | Battery is charging. |
| `FULL` | 3 | Battery level is full. |
| `NOT_CHARGING` | 4 | Android only. Not charging while power is connected (AC/USB/wireless), e.g. charge limited to 80% or optimized charging pauses. Differs from `UNPLUGGED`. Never returned on iOS and web. |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS (device only), Web, Included in Expo Go.
- On web, `expo-battery` relies on the Battery Status API, implemented only in Chromium-based browsers (Chrome, Edge, Opera). On unsupported browsers `getBatteryLevelAsync()` resolves to `-1` and `getBatteryStateAsync()` resolves to `BatteryState.UNKNOWN`.
- The source method descriptions say web always returns 1 / UNKNOWN, contradicting its Battery Status API note; this page follows the note.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-battery

## Related

- [Device](./device.md)
