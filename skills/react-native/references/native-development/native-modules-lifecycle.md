---
source: https://reactnative.dev/docs/0.87/the-new-architecture/native-modules-lifecycle
---

# Native Modules Lifecycle

Native Modules are singletons created lazily on first access. For stateful modules, initialize and invalidate them properly: `initialize()` / `invalidate()` on Android, `RCTInitializing` / `RCTInvalidating` on iOS.

## Signature / Usage

iOS: conform to `RCTInitializing` and implement `initialize`.

```diff
+ #import <React/RCTInitializing.h>

//...

- @interface NativeModule : NSObject <NativeModuleSpec>
+ @interface NativeModule : NSObject <NativeModuleSpec, RCTInitializing>
//...
@end
```

```diff
// ...

@implementation NativeModule

+- (void)initialize {
+ // add the initialization code here
+}

@end
```

iOS: conform to `RCTInvalidating` and implement `invalidate`.

```diff
+ #import <React/RCTInvalidating.h>

//...

- @interface NativeModule : NSObject <NativeModuleSpec>
+ @interface NativeModule : NSObject <NativeModuleSpec, RCTInvalidating>

//...

@end
```

```diff

// ...

@implementation NativeModule

+- (void)invalidate {
+ // add the cleanup code here
+}

@end
```

## Notes

- The Native Module infrastructure lazily creates a Native Module the first time it is accessed and keeps it around whenever the app requires it. This is a performance optimization that avoids creating Native Modules eagerly at app start and ensures faster startup times.
- In a pure React Native app, Native Modules are created once and never destroyed. In more complex apps (e.g. a brownfield app mixing native views with React Native surfaces) a React Native instance may be destroyed when the user navigates away and recreated when they navigate back. Stateless Native Modules cause no issues; stateful ones may need to be properly invalidated so state is reset and resources released.
- Android: all Native Modules already implement the `TurboModule` interface that defines two methods, `initialize()` and `invalidate()`. `initialize()` is called when the Native Module is created, the best place for initialization code that needs access to the `ReactApplicationContext` (core examples: `BlobModule`, `NetworkingModule`). `invalidate()` is called when the Native Module is destroyed, the best place for cleanup: resetting state and releasing resources such as memory and files (core examples: `DeviceInfoModule`, `NetworkModule`).
- iOS: Native Modules conform to the `RCTTurboModule` protocol, which does not expose `initialize` and `invalidate`. Instead two additional protocols define them: `RCTInitializing` and `RCTInvalidating`. Core examples for `initialize`: `RCTBlobManager`, `RCTTiming`. Core examples for `invalidate`: `RCTAppearance`, `RCTDeviceInfo`.
- The guide assumes familiarity with writing Native Modules and native code.

## Related

- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Advanced Topics (Modules)](./advanced-topics-modules.md)
- [Emitting Events in Native Modules](./native-modules-custom-events.md)
