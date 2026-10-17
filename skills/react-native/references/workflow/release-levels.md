---
source: https://reactnative.dev/docs/0.87/release-levels
---

# Release Levels

React Native provides the community with the ability to adopt individual new features as soon as their design and implementation are nearly complete, even before they are included in a stable release. This approach is known as **release levels**. You can configure the release level of React Native so that your React Native instance will initialize with Feature Flags set to either `EXPERIMENTAL`, `CANARY`, or `STABLE` modes.

## Signature / Usage

**Android** — `DefaultNewArchitectureEntryPoint` has a `releaseLevel` property (default: `STABLE`). The feature flag system uses this property to select the appropriate set of feature flags.

```kotlin
DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.CANARY
DefaultNewArchitectureEntryPoint.load()
```

**iOS** — `RCTReactNativeFactory` has an initializer that accepts a `releaseLevel` parameter.

**Objective-C** (`AppDelegate.mm`)

```objc
[[RCTReactNativeFactory alloc] initWithDelegate:delegate releaseLevel:Canary];
```

**Swift** (`AppDelegate.swift`)

```swift
let factory = RCTReactNativeFactory(delegate: delegate, releaseLevel: RCTReleaseLevel.Canary)
```

## Options / Props

| Level | When to use |
| --- | --- |
| `STABLE` | Use for all production apps and libraries that do not need early access to unreleased features. This is the default level for stable and nightly releases. |
| `CANARY` | Use if you are a framework author, advanced app developer, or need to test or adopt new features before they are released in stable. Not recommended for production or user-facing applications. |
| `EXPERIMENTAL` | Use only for testing and providing feedback for new features in the early stages of development. Not recommended for production or user-facing applications. |

## Notes

- This approach is similar to [Canary and Experimental releases in React](https://react.dev/blog/2023/05/03/react-canaries), but with a key difference: regardless of the release level, the same version of React JS and React Native code is used. React Native is also not using `@canary` or `@experimental` NPM tags, as release levels are available for both stable and nightly releases of React Native.
- Setting the release level to `EXPERIMENTAL` or `CANARY` will **not** result in consuming `react@nightly` or `react@canary` due to how react-native is consuming the React version.
- On Android, the build system generates different feature flag override classes for each release level, ensuring the correct features are enabled for each stage.
- On iOS, the system ensures that only one release level is active per app instance, and will crash if multiple factories are created with different release levels.
- 0.88: `RCTReactNativeFactory` also gains SceneDelegate entry points `startReactNativeWithModuleName:inWindow:connectionOptions:` and `startReactNativeWithModuleName:inWindow:initialProperties:connectionOptions:` (additive; the `AppDelegate` path remains supported; single scene only). The release blog does not describe release-level changes.
- Distinct from iOS native lifecycle details: UIKit and Swift topics belong to the apple-uikit and apple-swift skills.

## Related

- [upgrading.md](./upgrading.md)
