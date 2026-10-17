---
source: https://reactnative.dev/docs/0.87/debugging
---

# Debugging and Profiling

Commands for debugging and Hermes release runs. Other sources: https://reactnative.dev/docs/0.87/hermes, https://reactnative.dev/docs/0.87/debugging-release-builds.

The docs pages react-native-devtools, profiling and other-debugging-methods contain no runnable shell commands (they describe UI and shortcuts), so none are collected from them.

## Open the Dev Menu on Android

```sh
adb shell input keyevent 82
```

Alternative to the keyboard shortcut. The Dev Menu, LogBox and React Native DevTools are disabled in release builds.

## Run the Android app in release mode (Hermes)

```sh
npm run android -- --mode="release"
```

```sh
yarn android --mode release
```

Used in the Hermes page to verify the release build.

## Run the iOS app in release mode (Hermes)

```sh
npm run ios -- --mode="Release"
```

```sh
yarn ios --mode Release
```

macOS with Xcode only.

## Symbolicate a stack trace from a file

```sh
npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map < stacktrace.txt
```

Requires source maps (enabled by default on Android; see `build-release.md` for iOS).

## Symbolicate a stack trace from adb logcat

```sh
adb logcat -d | npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map
```

## Print metro-symbolicate usage

```sh
npx metro-symbolicate
```
