---
source: https://reactnative.dev/blog/2026/10/19/react-native-0.88
---

# React Native 0.88

Release blog (dated 2026-10-19): Web-based event dispatching by default, variable fonts, SceneDelegate support on iOS, no user-facing breaking changes. Bumps React to 19.3.0 and moves to Metro 0.87. Third release with no user-facing breaking changes, after 0.83 and 0.86.

## Signature / Usage

Create a new project:

```sh
npx @react-native-community/cli@latest init MyProject --version latest
```

Upgrading existing projects: use the React Native Upgrade Helper and the Upgrading docs (see ../workflow/upgrading.md).

Variable fonts (`Text` and `TextInput`, Android and iOS; object keys are four-character axis tags with finite numeric values):

```tsx
<Text style={{fontVariationSettings: {wght: 700, slnt: -10}}}>Object form</Text>
<Text style={{fontVariationSettings: "'wght' 700, 'slnt' -10"}}>String form</Text>
```

Imperative event API (Canary channel only in 0.88):

```tsx
const ref = useRef(null);

useEffect(() => {
  const onClick = event => {
    // ...
  };
  const node = ref.current;
  node?.addEventListener('click', onClick);
  return () => node?.removeEventListener('click', onClick);
}, []);
```

ArrayBuffer for Java TurboModules (Codegen maps to `com.facebook.react.bridge.ArrayBuffer`):

```diff
 export interface Spec extends TurboModule {
-  process(data: string): string; // for example, Base64
+  process(data: ArrayBuffer): ArrayBuffer;
 }
```

## Options / Props

Highlights:

| Feature | Summary |
| --- | --- |
| Web-based event dispatching | Events dispatched through the W3C `EventTarget` API by default, replacing the plugin-based system; capture path down to the target and bubble back up. Legacy path still present behind an internal flag, expected to be removed in a follow-up |
| `fontVariationSettings` | Supported on `<Text>` and `<TextInput>`, CSS string form and object form |
| SceneDelegate on iOS | `RCTReactNativeFactory` gains `startReactNativeWithModuleName:inWindow:connectionOptions:` and `startReactNativeWithModuleName:inWindow:initialProperties:connectionOptions:`; single scene only |
| ArrayBuffer for Java TurboModules | Take and return JS `ArrayBuffer` directly |
| Swift Package Manager | Still experimental and opt-in; CocoaPods remains fully supported |

Deprecations (due for removal in a future release):

| API | Replacement / note |
| --- | --- |
| `'react-native/Libraries/Core/InitializeCore'` | Use `'react-native/setup-env'` |
| `experimental_backgroundSize` / `experimental_backgroundPosition` / `experimental_backgroundRepeat` | Unprefixed names; prefixed names still work as aliases |
| `InputAccessoryView` (iOS only) | Deprecated as part of keeping core lean; `react-native-keyboard-controller` `KeyboardStickyView` is a cross-platform replacement. In 0.88 only a JSDoc tag and a one-time warning on import |
| `ReactFragment.fabricEnabled` | New Architecture is unconditionally enabled on this path; drop the argument and the matching builder call |
| `ReactImageManager` `String?` overloads | `setDefaultSource` / `setLoadingIndicatorSource` now take a `Dynamic`; `String?` versions still work but break under props 2.0 |

Other changes (selected):

| Area | Change |
| --- | --- |
| Styles | `backgroundSize`, `backgroundPosition`, `backgroundRepeat` lose the `experimental_` prefix and are stable |
| TypeScript | Generated props and style types extendable via module augmentation; added declarations for `requestIdleCallback`/`cancelIdleCallback`, `LogBox.isInstalled()`/`clearAllLogs()`, `FlatList` `strictMode`, `VirtualizedList` `ListItemComponent` |
| Dependencies | React 19.3.0; Metro 0.87 with minimum 0.87.1; Hermes 260318099.0.4 |
| iOS | `RCTUseAssetCatalog` in `Info.plist` serves images from an asset catalog (off by default); `React-cxxstableapi` dependency added to third-party New Architecture pods; Codegen no longer crawls `node_modules` or follows symlinks |
| iOS RTL | Text aligns right by default in RTL when `textAlign` is not set, matching Android |
| Android | Default `User-Agent` now includes app name and version, matching iOS; `androidx.collection` 1.4.4; Network event reporting exposed as an unstable API |
| Image | `getSize()` / `getSizeWithHeaders()` accept `data:` URIs |
| DevTools | `Page.captureScreenshot` available by default; WebSocket inspection in Network panel on the CANARY channel |

Swift Package Manager rollout plan: 0.87 introduced experimental support; 0.88 hardened the scripts; 0.89 targets SwiftPM as the default with an opt-out to CocoaPods. Libraries can declare SwiftPM settings in `package.json` `swiftpmConfig`; the SwiftPM block in `react-native.config.js` is deprecated.

## Notes

- Breaking Changes: React Native 0.88 has **no user-facing breaking changes**; upgrading from 0.87 should need no app code changes.
- Starting with the iOS 27 SDK, Apple requires the UIScene lifecycle; UIKit apps built with Xcode 27 fail to launch without it. 0.88 adds support as an additive change keeping the `AppDelegate` path. Keep `UIApplicationSupportsMultipleScenes` set to `false`; only the first URL context or user activity from the connection options is forwarded at launch. Migration: move the entry point from `AppDelegate` to a `SceneDelegate`, forward URL and user-activity callbacks to `RCTLinkingManager`, add a `UIApplicationSceneManifest` key to `Info.plist`. With the UIScene lifecycle the app window is resizable; `Dimensions.get()` and `useWindowDimensions()` update with current values.
- Web-based event dispatching: event props keep the same names, receive the same synthetic event objects and run in the same order; direct events such as `onLayout` still fire only on the target. Code reaching into React Native's event internals is what to test. On Canary, if an element has both a declarative prop and an imperative listener for the same event, the prop runs first.
- ArrayBuffer for synchronous methods: inputs can borrow JavaScript memory and are valid only until the method returns; copy with `ArrayBuffer.arrayBufferWithCopiedBytes(data)` to retain. Accessing `ArrayBuffer.bytes` or `.size` after a borrowed buffer is revoked throws `IllegalStateException`.
- 0.88 is the latest stable and 0.85.x moves to unsupported (per the post). Expo projects get 0.88 as part of Expo SDK 58.
- Deviation from the release blog: the listener example captures `ref.current` in a local variable so cleanup removes the listener from the same node (the blog reads `ref.current` inside cleanup).
- 0.88 docs are not cut yet at the pinned snapshot; the reference pages follow 0.87 docs and add `0.88:` lines from this post.
- Distinct from Apple platform skills (apple-uikit, apple-swift) for native UIScene details.

## Related

- [react-native-0.87.md](./react-native-0.87.md)
- ../workflow/upgrading.md
- ../workflow/metro.md
- [../components/inputaccessoryview.md](../components/inputaccessoryview.md)
- [../props-types/text-style-props.md](../props-types/text-style-props.md)
