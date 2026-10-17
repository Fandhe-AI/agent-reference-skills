---
source: https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here
---

# New Architecture is here

Announcement (dated 2024-10-23) for React Native 0.76 with the New Architecture by default: new Native Module system, new Renderer, Event Loop, bridge removal, and full support for React 18 concurrent features.

## Signature / Usage

Synchronous native calls under the New Architecture:

```ts
// ✅ Sync response from Native Module
const value = nativeModule.getValue();

// ✅ value can be a reference to a native object
nativeModule.doSomething(value);
```

Reading layout synchronously:

```tsx
// ✅ sync layout effect during commit
useLayoutEffect(() => {
  // ✅ sync call to read layout
  const rect = ref.current?.getBoundingClientRect();
  setPosition(rect);
}, []);
```

Opt out of the New Architecture (0.76-0.81 only; no effect since 0.82) (Android `android/gradle.properties`; iOS reinstall pods):

```diff
-newArchEnabled=true
+newArchEnabled=false
```

```shell
RCT_NEW_ARCH_ENABLED=0 bundle exec pod install
```

## Options / Props

| Part | Summary |
| --- | --- |
| New Native Module System | Written in C++; synchronous access to and from the native runtime via JSI; type safety (Codegen); code sharing across platforms; lazy module loading by default; modules can be written in C++ |
| New Renderer | Immutable view-hierarchy tree; multiple in-progress trees across threads at different priorities; layout readable synchronously and across threads; C++ core shared across platforms; View Flattening on iOS too |
| Event Loop | Well-defined processing model aligned with the HTML Standard; interrupt rendering for urgent events; foundation for microtasks, `MutationObserver`, `IntersectionObserver` (not ready to use at the time of the post) |
| Removing the Bridge | Direct JS-native communication via JSI; faster startup; bridge remains for backward compatibility during gradual migration |
| Features | Transitions (`startTransition`), automatic batching, `useLayoutEffect` with synchronous layout, full Suspense support |

## Notes

- Upgrading to 0.76 enables the New Architecture and React 18 by default, with an automatic interoperability layer for old-architecture libraries. Known limitations: the interop layer does not support accessing custom Shadow Nodes or concurrent features. The interop layer is planned to be removed in a future release.
- To use concurrent features, apps must support Concurrent React (Rules of React) and migrate custom Native Modules and Native Components to the new APIs. Without migrating modules you do not get shared C++, synchronous calls, or Codegen type safety; without migrating components you cannot use concurrent features.
- The post states more than 850 libraries are compatible; check reactnative.directory.
- The `newArchEnabled=false` / `RCT_NEW_ARCH_ENABLED=0` opt-out shown above applied to 0.76-0.81 only; since 0.82 the New Architecture is the only runtime option (0.84 release post), so the opt-out has no effect on 0.87 / 0.88.
- Historical announcement: the legacy architecture and bridge have since been progressively removed (see the 0.84 page); the New Architecture is the only runtime from 0.82 per the 0.84 post.
- Distinct from the react skill for React 18 concurrent API details.

## Related

- [react-native-0.84.md](./react-native-0.84.md)
- [../architecture/overview.md](../architecture/overview.md)
- [../native-development/turbo-native-modules-introduction.md](../native-development/turbo-native-modules-introduction.md)
- [../native-development/fabric-native-components-introduction.md](../native-development/fabric-native-components-introduction.md)
