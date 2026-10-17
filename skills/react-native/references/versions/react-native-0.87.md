---
source: https://reactnative.dev/blog/2026/08/11/react-native-0.87
---

# React Native 0.87

Release blog (dated 2026-08-11): Strict TypeScript API by default, Metro 0.87, experimental Swift Package Manager support, AGP 9 support. Raises minimum toolchain: Node.js 22, Android Gradle Plugin 9, Kotlin 2.0+.

## Signature / Usage

Opt out of the Strict TypeScript API (temporary bridge, available through 0.88; legacy types are intended to be removed in the following release):

```diff
  {
    "extends": "@react-native/typescript-config",
    "compilerOptions": {
      ...
+     "customConditions": ["react-native", "react-native-legacy-deep-imports"]
    }
  }
```

Experimental SwiftPM:

```sh
cd ios
# deintegrate will remove CocoaPods from your project
npx react-native spm --deintegrate
```

AGP 9 opt-outs in `android/gradle.properties`:

```text
# Opt out of built-in kotlin and new DSL behavior that ships with AGP 9.
# Starting from AGP 10.x these opt outs will be removed.
android.builtInKotlin=false
android.newDsl=false
```

Header import fix for bare-form angle includes:

```diff
- #import <RCTAppDelegate.h>
+ #import <React/RCTAppDelegate.h>
```

## Options / Props

Breaking changes:

| Area | Change |
| --- | --- |
| Toolchain | Node.js >= 22.13.0; Android minimum Kotlin 2.0+ (bundled 2.2.0); `minCompileSdk` 34; `compileSdk`/`buildTools` bumped to 37 |
| TypeScript | Strict TypeScript API is default; deep imports into `Libraries/` inaccessible unless opting back via `"react-native-legacy-deep-imports"`; deep imports to `src/private/` removed; deprecated `*Properties` aliases (e.g. `ViewProperties`) inaccessible, use `*Props`; refs have dedicated types (e.g. `ViewInstance`, `TextInputInstance`) |
| Metro | YAML config files and `.es6` JavaScript config files no longer supported |
| Removed APIs | `InteractionManager` (use `requestIdleCallback`); `Modal` `animated` prop; `StatusBar` `backgroundColor` / `translucent` / `networkActivityIndicatorVisible` props and setter methods; boolean `keyboardShouldPersistTaps` on `ScrollView`; `useTurboModules` feature flag; `NativeDialogManagerAndroid` export; undocumented `Touchable` root export; `NativeMethods` / `NativeMethodsMixin` types (use `HostInstance`) |
| Changed | `useColorScheme()` returns `ColorSchemeName \| null` and no longer returns `'unspecified'` |
| Packages | `@react-native/core-cli-utils` no longer published; `react-native/rn-get-polyfills` removed (use `@react-native/js-polyfills`); `@react-native/jest-preset` must be consumed as a package; connecting to standalone `react-devtools` via WebSocket removed (use React Native DevTools) |

Deprecations:

| API | Replacement |
| --- | --- |
| `react-native/Libraries/Core/InitializeCore` | `react-native/setup-env` |
| `@react-native/assets-registry` | `AssetRegistry` from `react-native` and `@react-native/asset-utils` |
| `ImageBackground` | A `View` with an absolutely positioned `Image` |
| `NativeMethods` interface | `HostInstance` |
| `Appearance.setColorScheme('unspecified')` | `'auto'` |
| Android: `DrawerLayoutAndroid` | `react-native-drawer-layout` |
| Android: `UIBlock` / `UIManagerModule.addUIBlock` / `prependUIBlock` | `UIManagerListener` or View Commands |
| Android: new-arch-flag constructors on `DefaultReactActivityDelegate` | — |
| iOS: `TimingModule`; `RCTTurboModuleEnabled()` / `RCTEnableTurboModule()` | — |

## Notes

- Metro is updated from 0.84 to 0.87: source map generation 2x faster, half the memory, stable TypeScript and ESM config files (e.g. `metro.config.mts`), new resolver features including package self-resolve.
- `--deintegrate` removes CocoaPods; the command injects Swift package references into the existing `.xcodeproj` (signing, capabilities, build phases untouched) and `npx react-native spm deinit` reverses the change exactly.
- SwiftPM is opt-in and additive; CocoaPods remains the default. Known limitations: a community library must ship a `Package.swift` (otherwise `npx react-native spm scaffold`); run `npx react-native spm` once after a fresh clone and in CI; commands, flags and layout may change; not for production yet. New headers-only XCFrameworks: `ReactNativeHeaders.xcframework`, `ReactNativeDependenciesHeaders.xcframework`.
- AGP 9 is the first React Native release supporting it; the recommendation is to opt out of built-in Kotlin and the new DSL.
- Strict TypeScript API originated as an opt-in preview in 0.80 (see the stable JavaScript API post).
- 0.87 is the latest stable at the time of the post and 0.84.x moves to unsupported. Expo: available in `expo@canary` at the time of the post.
- 0.88: no user-facing breaking changes; the Strict API opt-out remains available through 0.88.
- Distinct from the typescript, android-build-gradle, and kotlin skills for language/Gradle details, and from apple-swift for Swift Package Manager itself.

## Related

- [react-native-0.88.md](./react-native-0.88.md)
- [react-native-0.86.md](./react-native-0.86.md)
- [stable-javascript-api.md](./stable-javascript-api.md)
- ../workflow/strict-typescript-api.md
- ../workflow/metro.md
