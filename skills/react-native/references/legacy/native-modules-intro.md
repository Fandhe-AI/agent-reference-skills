---
source: https://reactnative.dev/docs/0.87/legacy/native-modules-intro
---

# Native Modules Intro

The NativeModule system exposes instances of Java/Objective-C/C++ (native) classes to JavaScript (JS) as JS objects, allowing arbitrary native code to be executed from within JS. This is the Legacy Architecture guide series; it starts with a Calendar native module example.

## Signature / Usage

There are different ways to write a native module for a React Native application (verbatim list from the page):

```text
1. Creating a local library that can be imported in your React Native application. Read [Creating local libraries](local-library-setup) guide to learn more.
2. Directly within your React Native application's iOS/Android projects
3. As an NPM package that can be installed as a dependency by your/other React Native applications.
```

The guide walks through implementing a native module directly within a React Native app first (a `CalendarModule` that creates calendar events), for [Android](./native-modules-android.md) and [iOS](./native-modules-ios.md). The result can be distributed as an NPM package (see [native-modules-setup.md](./native-modules-setup.md)).

## Notes

- Deprecation notice (verbatim): "Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable. The New Architecture uses Turbo Native Module and Fabric Native Components to achieve similar results."
- Use Turbo Native Modules (New Architecture) for new work; see `native-development/turbo-native-modules-introduction.md`.
- Android/iOS native module guides in this skill concern the native layer from JavaScript's side; for platform-native APIs themselves see android-architecture / android-build-gradle (Android) and apple-uikit / apple-swift (iOS).

## Related

- [native-modules-android.md](./native-modules-android.md)
- [native-modules-ios.md](./native-modules-ios.md)
- [native-modules-setup.md](./native-modules-setup.md)
- [local-library-setup.md](./local-library-setup.md)
- [Turbo Native Modules](../native-development/turbo-native-modules-introduction.md)
