---
source: https://docs.expo.dev/versions/v58.0.0/sdk/keep-awake/
---

# KeepAwake

`expo-keep-awake` provides a React hook that prevents the screen from sleeping and functions to enable this behavior imperatively.

## Signature / Usage

```sh
npx expo install expo-keep-awake
```

```jsx
import { useKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Text, View } from 'react-native';

export default function KeepAwakeExample() {
  useKeepAwake();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This screen will never sleep!</Text>
    </View>
  );
}
```

## Options / Props

All platforms: Android, iOS, tvOS, Web (except where noted).

| Name | Signature | Description |
| --- | --- | --- |
| `KeepAwake.ExpoKeepAwakeTag` | `'ExpoKeepAwakeDefaultTag'` | Default tag when no tag is specified. |
| `useKeepAwake(tag, options)` | `tag?: string`, `options?: KeepAwakeOptions` → `void` | Keeps the screen awake while the owner component is mounted. If `tag` is omitted, an ID unique to the owner component is used. |
| `KeepAwake.activateKeepAwakeAsync(tag)` | `tag?: string` (default `ExpoKeepAwakeTag`) → `Promise<void>` | Prevents sleep until `deactivateKeepAwake` is called with the same tag. With multiple tags, deactivate each one to re-enable sleep. |
| `KeepAwake.activateKeepAwake(tag)` | `tag?: string` → `Promise<void>` | Deprecated: use `activateKeepAwakeAsync`. |
| `KeepAwake.deactivateKeepAwake(tag)` | `tag?: string` (default `ExpoKeepAwakeTag`) → `Promise<void>` | Releases the lock for the tag. |
| `KeepAwake.isAvailableAsync()` | `Promise<boolean>` | `true` on all platforms except unsupported web browsers. |
| `KeepAwake.addListener(tagOrListener, listener)` | `(string \| KeepAwakeListener, KeepAwakeListener?) => EventSubscription` | Web only. Observes changes to the keep awake timer (changes when navigating away from the active window/tab). No-op on native. |

### Types

| Name | Shape |
| --- | --- |
| `KeepAwakeOptions` | `listener?: KeepAwakeListener` (Web; invoked when state changes), `suppressDeactivateWarnings?: boolean` (on Android the call throws an unhandled promise rejection when the original Activity is dead or deactivated; `true` suppresses it) |
| `KeepAwakeEvent` | `{ state: KeepAwakeEventState }` |
| `KeepAwakeListener(event)` | Web. `(event: KeepAwakeEvent) => void` |
| `KeepAwakeEventState` enum | `RELEASE = "release"` |

## Notes

- Platforms: android, ios, tvos, web, expo-go.
- Web support is limited (Screen Wake Lock API).
- Source: `sdk-58` branch `packages/expo-keep-awake`; modificationDate September 15, 2026.

## Related

- [ScreenOrientation](./screen-orientation.md)
- [Expo](./expo.md)
