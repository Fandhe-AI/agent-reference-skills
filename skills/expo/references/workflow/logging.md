---
source: https://docs.expo.dev/workflow/logging/
---

# View logs

Console logs, native logs (Android Studio, Xcode), and system logs when using Expo CLI.

## Signature / Usage

```sh
# System logs: Android (adb logcat) and iOS
npx react-native log-android
npx react-native log-ios
```

## Notes

- `console.log`, `console.warn`, `console.error` work as in a browser. With `npx expo start` and a connected device, console logs appear in the terminal; they are sent over web sockets so fidelity is lower than connecting dev tools directly to the engine. For high-fidelity logs (e.g. `console.table`) use a development build with Hermes and connect the inspector.
- With `npx expo start --no-dev`, console logs do not appear in the terminal (the forwarding runtime code only runs in development mode). `console.log` still writes to the native log: use `adb logcat` on Android or the Console app on iOS.
- Native runtime logs: compile the native app locally and use Android Studio / Xcode.
- System logs (everything on the device, other apps and the OS) are usually not necessary; yarn uses `yarn dlx react-native ...`, pnpm `pnpm dlx`, bun `bunx`.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: August 11, 2026).

## Related

- [Development and production modes](./development-mode.md)
- [Debugging and profiling tools](./debugging-tools.md)
