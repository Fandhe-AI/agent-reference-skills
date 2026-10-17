---
source: https://docs.expo.dev/develop/development-builds/use-development-builds/
---

# Use a development build

Start the dev server, connect from the launcher screen, rebuild, and debug with a development build installed on a device or emulator/simulator.

## Signature / Usage

```sh
npx expo start
```

To open the project inside your development client: press A or I to open on an Android Emulator or iOS Simulator; on a physical device scan the QR code with the system camera or a QR reader.

## Notes

- Launcher screen: shown when launching the development build from the device Home screen. If a bundler is detected on the local network, or you are signed in to an Expo account in both Expo CLI and the development build, you can connect directly; otherwise scan the QR code. Tabs shown include Home (local development server) and Updates (published EAS Updates).
- Rebuild the development client when adding a library with native code (for example `expo-secure-store`), because native code is not included automatically when installing the dependency.
- Debug: open the menu with Cmd + D or Ctrl + D in Expo CLI, or shake the device; access debugging functions or switch to a different version of your app.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: July 17, 2026).

## Related

- [Introduction to development builds](./development-builds.md)
- [Debugging and profiling tools](./debugging-tools.md)
