---
source: https://reactnative.dev/blog/2026/06/11/react-native-0.86
---

# React Native 0.86

Release blog (dated 2026-06-11): Android 15+ edge-to-edge fixes and React Native DevTools improvements, no user-facing breaking changes. Second release with no user-facing breaking changes after 0.83.

## Signature / Usage

Create a new project:

```sh
npx @react-native-community/cli@latest init MyProject --version latest
```

## Options / Props

Highlights:

| Feature | Summary |
| --- | --- |
| A New Home for React Native | The React Native repository, React, Metro, Yoga and the React Native Website moved from the `facebook` GitHub organization to the `react` organization (transition to the React Foundation); GitHub redirects existing URLs, issues and PRs |
| Edge-to-Edge on Android | Fixes for Android 15+ edge-to-edge mode, including when enforced by the OS but not enabled via the `edgeToEdgeEnabled` Gradle property |
| DevTools | Light/dark mode emulation via `Emulation.setEmulatedMedia` (Command Palette: `cmd`/`ctrl` + `shift` + `P`); temporary switch that resets when DevTools disconnects |

Edge-to-edge fixes:

| API | Fix |
| --- | --- |
| `measureInWindow` | Returns correct coordinates when edge-to-edge is enabled |
| `KeyboardAvoidingView` | Works correctly on Android 15+ with `edgeToEdgeEnabled` |
| `Dimensions` | Window values accurate on Android versions prior to 15 when edge-to-edge is enabled |
| `StatusBar` | Supports updating style and visibility while a Modal is open |
| Navigation bar | Contrast respects the theme's `enforceNavigationBarContrast` attribute |

Deprecations:

| API | Note |
| --- | --- |
| `ViewUtil.getUIManagerType` | Part of legacy architecture removal; inline `UIManagerType.Fabric` or remove the checks |
| `AppRegistry.setComponentProviderInstrumentationHook` second argument | Deprecated and warns if used |

Other changes (selected):

| Area | Change |
| --- | --- |
| `ExceptionsManager.reportErrorsAsExceptions` | Only the explicit boolean `false` opts out now; other falsy values no longer do anything |
| `PerformanceObserver` | `observe({type: 'event'})` defaults `durationThreshold` to 104ms per W3C Event Timing |
| `Modal` | `style` prop forwarded to the inner container View |
| Touch | Views with non-invertible transforms (e.g. `scaleX: 0`) no longer receive touches |
| `AccessibilityInfo` | `isDarkerSystemColorsEnabled`, `isHighTextContrastEnabled`, `prefersCrossFadeTransitions` resolve to `false` on unsupported platforms instead of never resolving |
| Metro | `^0.84.2` |
| Android | `HeadlessJsTaskSupportModule` registered in `CoreReactPackage`; `BackHandler` `hardwareBackPress` passes an event object with `timeStamp`; Pressable `android_ripple` accepts `PlatformColor`; `Image.getSize` / `getSizeWithHeaders` return true source dimensions |
| JSI | `IRuntime` interface, `TypedArray` / `Uint8Array`, `ArrayBuffer.detached`, `Array.push`, `String.length`, `isInteger`, error creation APIs |

## Notes

- Breaking Changes: React Native 0.86 has **no user-facing breaking changes**; upgrading from 0.85 should need no app code changes.
- 0.86 is the latest stable at the time of the post and 0.83.x moves to unsupported. Expo: available in `expo@canary` at the time of the post.
- Upgrading existing projects: use the React Native Upgrade Helper and the Upgrading docs; `init` only creates a new project.
- 0.88: no user-facing breaking changes either; see the 0.88 page.
- Distinct from the android-platform-core skill for Android native edge-to-edge APIs.

## Related

- [react-native-0.85.md](./react-native-0.85.md)
- [react-native-0.87.md](./react-native-0.87.md)
- [../components/statusbar.md](../components/statusbar.md)
- [../debugging-performance/react-native-devtools.md](../debugging-performance/react-native-devtools.md)
