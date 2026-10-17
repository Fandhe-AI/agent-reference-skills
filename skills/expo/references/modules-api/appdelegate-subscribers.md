---
source: https://docs.expo.dev/modules/appdelegate-subscribers/
---

# iOS AppDelegate subscribers

A mechanism that lets a library subscribe to calls to `AppDelegate` functions (inbound links, notifications, etc.) without copying code into the app's `AppDelegate`. The app `AppDelegate` must inherit from `ExpoAppDelegate`, which is a requirement for using Expo Modules. `ExpoAppDelegate` implements most functions of the `UIApplicationDelegate` protocol and forwards calls to all subscribers.

## Signature / Usage

```swift
import ExpoModulesCore

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
  public func applicationDidBecomeActive(_ application: UIApplication) {
    // The app has become active.
  }

  public func applicationWillResignActive(_ application: UIApplication) {
    // The app is about to become inactive.
  }

  public func applicationDidEnterBackground(_ application: UIApplication) {
    // The app is now in the background.
  }

  public func applicationWillEnterForeground(_ application: UIApplication) {
    // The app is about to enter the foreground.
  }

  public func applicationWillTerminate(_ application: UIApplication) {
    // The app is about to terminate.
  }

  public func applicationDidReceiveMemoryWarning(_ application: UIApplication) {
    // The app has received a memory warning.
  }
}
```

```json
{
  "apple": {
    "appDelegateSubscribers": ["AppLifecycleDelegate"]
  }
}
```

## Notes

- Create a new public Swift class extending `ExpoAppDelegateSubscriber` from `ExpoModulesCore` and add its name to `apple.appDelegateSubscribers` in expo-module.config.json. Run `pod install`; the subscriber is generated in **ExpoModulesProvider.swift** within the application project.
- Subscribe by adding delegate functions to the subscriber class. The full list is the set of functions overridden in `ExpoAppDelegate.swift` (packages/expo/ios/AppDelegates in the expo repo). Functions that may cause side effects when provided are not supported yet (for example `application(_:viewControllerWithRestorationIdentifierPath:coder:)`).
- Objective-C classes are not supported.
- `application(_:didFinishLaunchingWithOptions:) -> Bool`: if at least one subscriber returns `true`, `ExpoAppDelegate` returns `true`.
- `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`: `ExpoAppDelegate` passes a new completion block to each subscriber, waits for all, then calls the original block. If any subscriber returned `failed`, the result is `failed`; else if any returned `newData`, `newData`; otherwise `noData`.
- Distinct from the apple-swift and apple-uikit skills (`UIApplicationDelegate` itself is an Apple API).
- Source modificationDate: July 21, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [expo-module.config.json](./module-config.md)
- [Android lifecycle listeners](./android-lifecycle-listeners.md)
- [Design considerations](./design.md)
