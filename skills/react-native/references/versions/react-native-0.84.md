---
source: https://reactnative.dev/blog/2026/02/11/react-native-0.84
---

# React Native 0.84

Release blog (dated 2026-02-11): Hermes V1 is the default JavaScript engine on iOS and Android, precompiled iOS binaries by default, continued Legacy Architecture removal, Node.js 22 minimum.

## Signature / Usage

Opt out of Hermes V1 (package manager override, npm shown; yarn uses `resolutions`, pnpm uses `pnpm.overrides`):

```json
"overrides": { "hermes-compiler": "0.15.0" }
```

iOS: when installing CocoaPods dependencies, pass `RCT_HERMES_V1_ENABLED=0` and `RCT_USE_PREBUILT_RNCORE=0`. Android: add `hermesV1Enabled=false` in `android/gradle.properties` and build React Native from source.

Re-enable Legacy Architecture code on iOS (build from source):

```bash
RCT_USE_PREBUILT_RNCORE=0 RCT_REMOVE_LEGACY_ARCH=0 bundle exec pod install
```

## Options / Props

| Change | Detail |
| --- | --- |
| Hermes V1 default | Following the experimental opt-in in 0.82; apps already on Hermes (default since 0.70) get Hermes V1 automatically |
| Precompiled iOS binaries | Enabled by default; `.xcframework` binaries downloaded during `pod install`; disable with `RCT_USE_PREBUILT_RNCORE=0` |
| Legacy Architecture (iOS) | `RCT_REMOVE_LEGACY_ARCH` (introduced experimental in 0.83) is now default behaviour; Interop Layer remains |
| Node.js | Requires v22.11 or later |
| React | 19.2.3 synced |
| ESLint | Supports ESLint v9 Flat Config |
| Platform | HEIC and HEIF image formats; `PlatformColor` in animated interpolations; `onKeyDown`/`onKeyUp` on Android |
| Accessibility | `Text` with `onPress` / `onLongPress` automatically gets `accessibilityRole="link"` |
| URL | Added standard `URL` properties (`hash`, `host`, `pathname`, etc.) and `URLSearchParams` methods |

Removed Android classes include `com.facebook.react.LazyReactPackage`, `com.facebook.react.bridge.CxxModuleWrapper`, `com.facebook.react.bridge.CallbackImpl`, `com.facebook.react.devsupport.BridgeDevSupportManager`, `com.facebook.react.uimanager.layoutanimation.LayoutAnimationController` (full list in the source post).

Other breaking changes: iOS `ImageResponseObserverCoordinator` observers wrapped in reference-counted pointers (may affect libraries such as `react-native-svg`); C++ `JSBigString` implements `jsi::Buffer` directly (`BigStringBuffer` deprecated); the legacy Perf and Network tabs removed from the in-app Element Inspector (now in React Native DevTools).

Deprecations:

| API | Replacement |
| --- | --- |
| `XHRInterceptor`, `WebSocketInterceptor` | Chrome DevTools Protocol `Network` domain |
| `TurboModuleProviderFunctionType` | — |

## Notes

- 0.84 was the latest stable at the time of the post and 0.81.x moves to unsupported. Expo SDK 56 ships with the next stable release (0.85).
- The post notes an experimental `upgrade-react-native` AI skill for Community CLI Projects (external, from react-native-community); not part of this repository's skills.
- Hermes here is the Hermes JS engine; unrelated to the hermes-agent skill.
- 0.88: no 0.88-specific change to Hermes V1 default is described in the 0.88 post beyond a Hermes version bump.

## Related

- [react-native-0.85.md](./react-native-0.85.md)
- [new-architecture-is-here.md](./new-architecture-is-here.md)
- [../workflow/hermes.md](../workflow/hermes.md)
- [../architecture/bundled-hermes.md](../architecture/bundled-hermes.md)
