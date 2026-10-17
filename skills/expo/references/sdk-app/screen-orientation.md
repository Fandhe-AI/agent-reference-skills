---
source: https://docs.expo.dev/versions/v58.0.0/sdk/screen-orientation/
---

# ScreenOrientation

`expo-screen-orientation` lets you get, lock, and observe the screen orientation (the orientation in which graphics are painted, not the physical device orientation).

## Signature / Usage

```sh
npx expo install expo-screen-orientation
```

```ts
import * as ScreenOrientation from 'expo-screen-orientation';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}
```

Config plugin:

```json
{
  "expo": {
    "ios": {
      "requireFullScreen": true
    },
    "plugins": [
      [
        "expo-screen-orientation",
        {
          "initialOrientation": "DEFAULT"
        }
      ]
    ]
  }
}
```

Per-screen orientation with Expo Router (powered by `react-native-screens`; recommended for stack navigators):

```tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ orientation: 'portrait' }} />
      <Stack.Screen name="landscape" options={{ orientation: 'landscape' }} />
    </Stack>
  );
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| `initialOrientation` | `undefined` | Only for: iOS. Initial screen orientation. Values: `DEFAULT`, `ALL`, `PORTRAIT`, `PORTRAIT_UP`, `PORTRAIT_DOWN`, `LANDSCAPE`, `LANDSCAPE_LEFT`, `LANDSCAPE_RIGHT`. |

### Methods (Android, iOS, Web)

| Name | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `ScreenOrientation.getOrientationAsync()` | — | `Promise<Orientation>` | Current screen orientation. |
| `ScreenOrientation.getOrientationLockAsync()` | — | `Promise<OrientationLock>` | Current orientation lock type. |
| `ScreenOrientation.getPlatformOrientationLockAsync()` | — | `Promise<PlatformOrientationInfo>` | Platform specific lock type. |
| `ScreenOrientation.lockAsync(orientationLock)` | `orientationLock: OrientationLock` | `Promise<void>` | Locks the screen orientation. |
| `ScreenOrientation.lockPlatformAsync(options)` | `options: PlatformOrientationInfo` | `Promise<void>` | Applies a platform specific lock; rejects on invalid option or value. |
| `ScreenOrientation.supportsOrientationLockAsync(orientationLock)` | `orientationLock: OrientationLock` | `Promise<boolean>` | Whether the lock policy is supported on the device. |
| `ScreenOrientation.unlockAsync()` | — | `Promise<void>` | Sets back to the `OrientationLock.DEFAULT` policy. |
| `ScreenOrientation.addOrientationChangeListener(listener)` | `listener: OrientationChangeListener` | `EventSubscription` | Invoked when orientation changes between portrait and landscape (not between `portrait up` and `portrait down`, but yes from `portrait up` to `landscape left`). |
| `ScreenOrientation.removeOrientationChangeListener(subscription)` | `subscription: EventSubscription` | `void` | Deprecated: will be removed; keep track of your own subscriptions. |
| `ScreenOrientation.removeOrientationChangeListeners()` | — | `void` | Removes all orientation change listeners. |

Register with `addOrientationChangeListener`, and unsubscribe with `subscription.remove()` rather than the deprecated `removeOrientationChangeListener`:

```ts
const subscription = ScreenOrientation.addOrientationChangeListener(listener);
// later
subscription.remove();
```

### Types

| Name | Properties |
| --- | --- |
| `OrientationChangeEvent` | `orientationInfo: ScreenOrientationInfo`, `orientationLock: OrientationLock` |
| `OrientationChangeListener(event)` | `(event: OrientationChangeEvent) => void` |
| `PlatformOrientationInfo` | `screenOrientationArrayIOS?: Orientation[]` (iOS), `screenOrientationConstantAndroid?: number` (Android native `screenOrientation` constant, for example `-1` for unspecified), `screenOrientationLockWeb?: WebOrientationLock` (Web) |
| `ScreenOrientationInfo` | `orientation: Orientation`, `horizontalSizeClass?: SizeClassIOS` (iOS), `verticalSizeClass?: SizeClassIOS` (iOS) |
| `Subscription` | method `remove(): void` |

### Enums

| Enum | Values |
| --- | --- |
| `Orientation` | `UNKNOWN = 0` (for example device flat on a table), `PORTRAIT_UP = 1`, `PORTRAIT_DOWN = 2`, `LANDSCAPE_LEFT = 3`, `LANDSCAPE_RIGHT = 4` |
| `OrientationLock` | `DEFAULT = 0` (iOS: all except `PORTRAIT_DOWN`; Android: system decides), `ALL = 1`, `PORTRAIT = 2`, `PORTRAIT_UP = 3`, `PORTRAIT_DOWN = 4`, `LANDSCAPE = 5`, `LANDSCAPE_LEFT = 6`, `LANDSCAPE_RIGHT = 7`, `OTHER = 8` (not valid for `lockAsync`), `UNKNOWN = 9` (not valid for `lockAsync`) |
| `SizeClassIOS` | `UNKNOWN = 0`, `COMPACT = 1`, `REGULAR = 2` |
| `WebOrientation` | `LANDSCAPE_PRIMARY = "landscape-primary"`, `LANDSCAPE_SECONDARY = "landscape-secondary"`, `PORTRAIT_PRIMARY = "portrait-primary"`, `PORTRAIT_SECONDARY = "portrait-secondary"` |
| `WebOrientationLock` | `ANY = "any"`, `LANDSCAPE = "landscape"`, `LANDSCAPE_PRIMARY = "landscape-primary"`, `LANDSCAPE_SECONDARY = "landscape-secondary"`, `NATURAL = "natural"`, `PORTRAIT = "portrait"`, `PORTRAIT_PRIMARY = "portrait-primary"`, `PORTRAIT_SECONDARY = "portrait-secondary"`, `UNKNOWN = "unknown"` |

## Notes

- Platforms: android, ios, web, expo-go. Web has limited support (`deviceorientation`).
- Screen orientation changes override system settings and user preferences on Android and iOS. On Android the user's preferred orientation can be taken into account; on iOS user and system settings are not accessible.
- `OrientationLock.ALL` and `OrientationLock.PORTRAIT` are invalid on devices that do not support `OrientationLock.PORTRAIT_DOWN`.
- iPad split view (iOS 9+): to lock orientation, set `ios.requireFullScreen` to `true` in the app config. On iOS 27 and later, `requireFullScreen` no longer opts the app out of being resized, so it cannot reliably lock orientation.
- iOS 27 and later: iPhone apps can be resized (for example iPhone Mirroring on macOS, or on iPad). While resizable, the system treats a supported orientation as a preference: `lockAsync` may have no effect, and `getOrientationAsync` may not describe the window shape (iPhone Mirroring always reports portrait). Design screens to adapt. Debug builds log a warning when the system refuses an orientation lock.
- Existing React Native app: open `ios` in Xcode (`xed ios`; run `npx expo prebuild -p ios` if absent) and tick `Requires Full Screen` under Project Target > General > Deployment Info.
- The official docs place "Use subscription.remove() instead" under addOrientationChangeListener, but what it replaces is unsubscribing (removeOrientationChangeListener); keep using addOrientationChangeListener to register.
- For physical device orientation, see Device Motion (sdk-device-data).
- Source: `sdk-58` branch `packages/expo-screen-orientation`; modificationDate September 15, 2026.

## Related

- [KeepAwake](./keep-awake.md)
- [StatusBar](./status-bar.md)
