---
source: https://docs.flutter.dev/platform-integration/android/restore-state-android
---

# Restore state on Android

How to restore the state of your Android app after it has been killed by the OS, using `RestorationManager` and related classes in the services library.

## Signature / Usage

Enable state restoration with these tasks (the source describes them without a code listing):

1. Define a `restorationScopeId` for classes like `CupertinoApp`, `MaterialApp`, or `WidgetsApp`.
2. Define a `restorationId` for widgets that support it, such as `TextField` and `ScrollView`.
3. For custom widgets, hold the state to restore in a `RestorableProperty` defined in a `State` class that uses `RestorationMixin`, and register those properties with the mixin in a `restoreState` method.
4. Migrate Navigator APIs to the "restorable" variants.

Navigator API migration named in the source (no code listing in the source page):

```text
push       -> restorablePush
pushNamed  -> restorablePushNamed
(and so on)
```

## Options / Props

| Name | Description |
| --- | --- |
| `restorationScopeId` | On `MaterialApp` / `CupertinoApp` / `WidgetsApp`; creates a new `restorationScope` (a new `RestorationBucket`) into which all children store their state, and automatically enables state restoration by injecting a `RootRestorationScope`. |
| `restorationId` | The widget (and its children) store data in the surrounding bucket. |
| `RestorableProperty` | Holds the state to restore for custom widgets; the Flutter API provides subclasses for different data types. |
| `RestorationMixin` | Mixin for `State`; properties are registered in `restoreState`. |
| `restorablePush` and "restorable" variants | Restore the navigation stack. |

## Notes

- The OS (both iOS and Android) might kill a backgrounded app to release memory. Without saved state, the app starts from scratch when the user returns.
- With `RestorationManager`, the framework provides state data to the engine as the state changes, so the app is ready when the OS signals it is about to kill the app.
- Instance state (short-term or ephemeral, such as unsubmitted form field values or the selected tab): on Android this is limited to 1 MB; exceeding it crashes with a `TransactionTooLargeException` in native code.
- To restore state above the app class, inject a `RootRestorationScope` manually.
- To return to a route the user was viewing (for example the shopping cart), implement restoration for navigation too.
- Testing: set up your device so it does not save state once an app is backgrounded (see "Testing state restoration" on the `RestorationManager` API page). Re-enable storing state on your device when finished.
- For `go_router`, see the State restoration topic on pub.dev.
- This is Flutter's restoration framework (Dart). Android native instance-state APIs belong to the android-* skills; Flutter `Navigator` is distinct from Jetpack Navigation, react-router, and tanstack-router.

## Related

- [ios-restore-state](./ios-restore-state.md)
- [android-predictive-back](./android-predictive-back.md)
