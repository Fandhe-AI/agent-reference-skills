---
source: https://docs.expo.dev/modules/overview/
---

# Expo Modules API: Overview

The Expo Modules API lets you write Swift and Kotlin to add native modules and views to an app. It is designed to use modern language features, stay consistent across platforms, need minimal boilerplate, and have performance comparable to React Native's Turbo Modules API.

## Signature / Usage

Minimal native module definition (Kotlin and Swift) from the official integration guide:

```kotlin
package my.module.package

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyModule : Module() {
  override fun definition() = ModuleDefinition {
    // Definition components go here
  }
}
```

```swift
import ExpoModulesCore

public class MyModule: Module {
  public func definition() -> ModuleDefinition {
    // Definition components go here
  }
}
```

## Notes

- Expo Modules all support the New Architecture and are automatically backwards compatible with existing React Native apps using the old architecture.
- Turbo Modules vs Expo Modules API (paraphrasing the React Native team recommendation): if you intend to use C++ in your native module, use Turbo Modules; if you want a better developer experience and are willing to depend on the `expo` package in your module, use the Expo Modules API.
- App size impact: negligible, may increase size by a few hundred kilobytes.
- Performance: similar to Turbo Modules. Both leverage JSI rather than the legacy JSON message queue ("bridge").
- Platforms: Android, iOS and web are supported; macOS and tvOS have experimental support (see additional-platform-support.md).
- Most apps do not need to write native code; use the Expo Modules API when no existing library does what you need (for example wrapping a mandated third-party SDK).
- The native code here is Swift and Kotlin written with the Expo Modules API; it is distinct from the apple-swift skill (Swift language and Apple frameworks) and from the android-architecture skill (Android app architecture).
- Source modificationDate: September 25, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Get started](./get-started.md)
- [Module API Reference](./module-api.md)
- [Design considerations](./design.md)
- [expo-module.config.json](./module-config.md)
- [Integrate in an existing library](./existing-library.md)
- [Additional platform support](./additional-platform-support.md)
