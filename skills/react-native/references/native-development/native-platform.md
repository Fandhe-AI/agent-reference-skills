---
source: https://reactnative.dev/docs/0.87/native-platform
---

# Native Platform

React Native exposes a set of APIs to connect native code (Objective-C, Swift, Java, Kotlin or C++) to JavaScript application code. This guide introduces Native Modules and Native Components.

## Signature / Usage

```text
1. Native Modules
   - Android & iOS
   - Cross-Platform with C++
   - Advanced: Custom C++ Types
2. Fabric Native Components
   - Android & iOS
```

## Notes

- Native Modules: "native libraries that have no User Interface (UI) for the user. Examples would be persistent storage, notifications, network events. These are accessible to your user as JavaScript functions and objects."
- Native Component: "native platform views, widgets and controllers that are available to your application's JavaScript code through React Components."
- Legacy Native Modules and Legacy Native Components are the deprecated native module and component API. Many legacy libraries still work with the New Architecture thanks to interop layers. The page suggests: using alternative libraries, upgrading to newer library versions that have first-class support for the New Architecture, or porting the libraries to Turbo Native Modules or Fabric Native Components.

## Related

- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Cross-Platform Native Modules (C++)](./pure-cxx-modules.md)
- [Advanced: Custom C++ Types](./custom-cxx-types.md)
- [Fabric Native Components Introduction](./fabric-native-components-introduction.md)
- [Legacy Native Modules](../legacy/native-modules-intro.md)
- [Legacy Native Components (Android)](../legacy/native-components-android.md)
