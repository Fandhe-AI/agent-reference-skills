---
source: https://docs.expo.dev/debugging/tools/
---

# Debugging and profiling tools

Tools to inspect an Expo project at runtime. React Native consists of JavaScript and native code; JS errors may not show in native debugging tools.

## Signature / Usage

```sh
# Open the Developer menu: press M in the terminal running the dev server
# Open React Native DevTools: press J in the terminal (Hermes apps)
# Android: simulate the menu button
adb shell input keyevent 82

# SDK 58+: launch with the developer menu closed, tools button hidden, onboarding skipped
EXPO_NO_DEV_MENU=1 npx expo start
```

## Options / Props

Developer menu options:

| Option | Description |
| --- | --- |
| Copy link | Copy the dev server address of your app. |
| Reload | Reload the app (usually unnecessary, Fast Refresh is on by default). |
| Go Home | Leave the app and return to the dev client's or Expo Go's Home screen. |
| Toggle performance monitor | Overlay with RAM usage, JavaScript heap, view counts (screen / component), and FPS for UI and JS threads. |
| Toggle element inspector | Overlay with Inspect, Perf, Network, Touchables. |
| Open DevTools (formerly Open JS debugger) | Open React Native DevTools (Console, Sources, Network [Expo only], Memory, Components, Profiler for Hermes apps). |
| Fast Refresh | Toggle automatic refreshing of the JS bundle on file changes. |

Ways to open the Developer menu: Android device (no USB) shake vertically; Android Emulator or USB device Cmd + M or Ctrl + M; iOS device (no USB) shake or touch three fingers to the screen; iOS Simulator or USB device Ctrl + Cmd + Z or Cmd + D.

## Notes

- Starting from React Native 0.76, React Native DevTools replaced Chrome DevTools. Works on any app using Hermes via dev clients or Expo Go.
- DevTools tabs: Sources (breakpoints or `debugger` statement; Pause on exceptions, Pause on caught exceptions for errors caught by e.g. Expo Router), Console (interactive, runs in breakpoint scope), Network (Expo only; needs `expo-dev-client` or Expo Go), Memory (heap snapshot), Components, Profiler (profiles are not yet symbolicated with sourcemaps and can only be used in debug builds). Use Android Studio or Xcode to profile the native runtime.
- Rozenite: a React Native DevTools plugin framework (plug-and-play panels).
- VS Code debugger integration (Expo Tools extension, command "Expo: Debug ...") is in alpha; React Native DevTools is the most stable option. Radon IDE is a paid VS Code extension (30-day free trial).
- React Native Debugger requires deprecated Remote JS debugging (deprecated since React Native 0.73) and is incompatible with Hermes. For Expo SDK 50+ use React Native DevTools or Expo dev tools plugin equivalents (Redux DevTools); it can still be used with Expo SDK 49 and earlier (`brew install react-native-debugger`, port `8081`).
- Network inspection alternatives (proxies): Charles Proxy, Proxyman, mitmproxy, Fiddler.
- Production apps: use a crash and bug reporting service.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 29, 2026).

## Related

- [View logs](./logging.md)
- [Development and production modes](./development-mode.md)
- [Use a development build](./use-development-builds.md)
- [Release statuses](./release-statuses.md)
