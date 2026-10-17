---
source: https://docs.expo.dev/modules/design/
---

# Expo Modules API: Design considerations

Overview of the design goals behind the Expo Modules API.

## Signature / Usage

Autolinking-based lifecycle hook registration is the composable mechanism the design describes; for example an iOS AppDelegate subscriber is registered in config rather than by editing `AppDelegate`:

```json
{
  "apple": {
    "appDelegateSubscribers": ["AppLifecycleDelegate"]
  }
}
```

## Notes

- Modern language features: the API is built around Swift and Kotlin, because many issues in 50+ maintained Expo SDK modules were caused by unhandled null values or incorrect types. One common API and documentation for both platforms.
- Passing data between runtimes: the API knows the argument types a native function expects, pre-validates and converts them. Dictionaries can be represented as native structs called Records; arguments can be converted automatically to platform types (for example `{ x: number, y: number }` or `[number, number]` to CoreGraphics `CGPoint`).
- Built-in conversion covers primitives (`Bool`/`Int`/`UInt`/`Float32`/`Double`/`Pair`/`String`), complex types (`URL`, `CGPoint`, `UIColor`, `Data`, `java.net.URL`, `android.graphics.Color`, `kotlin.ByteArray`), records, and enums.
- Shared Objects keep the source of truth of native state in one place (for example `expo-sqlite` database instances are backed by Shared Objects).
- Lifecycle: Android lifecycle listeners and iOS AppDelegate subscribers let modules hook into app lifecycle without editing `MainActivity` / `AppDelegate`, composable with Continuous Native Generation.
- New Architecture: the API is renderer-agnostic, so a module does not need to know whether the app runs on the new architecture, and avoids requiring C++ in the library.
- Distinct from apple-swift and android-architecture (platform language / architecture references).
- Source modificationDate: May 23, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Module API Reference](./module-api.md)
- [Shared objects](./shared-objects.md)
- [Android lifecycle listeners](./android-lifecycle-listeners.md)
- [iOS AppDelegate subscribers](./appdelegate-subscribers.md)
- [Overview](./overview.md)
