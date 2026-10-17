---
source: https://docs.flutter.dev/platform-integration/ios/restore-state-ios
---

# Restore state on iOS

How to restore the state of your iOS app after it has been killed by the OS, using `RestorationManager` and related classes.

## Signature / Usage

The source page contains no code listing; it points to the extra Xcode setup documented on the `RestorationManager` API page:

```text
https://api.flutter.dev/flutter/services/RestorationManager-class.html#state-restoration-on-ios
```

## Notes

- The OS (both iOS and Android) often kills a backgrounded app to release memory or improve performance for the foreground app.
- An iOS app requires a bit of extra setup in Xcode (see the link above); the restoration classes otherwise work the same on iOS and Android.
- For more information, see State restoration on Android (the restoration steps: `restorationScopeId`, `restorationId`, `RestorableProperty` with `RestorationMixin`, and "restorable" Navigator methods).
- This is Flutter's restoration framework (Dart). Native iOS state restoration belongs to the apple-uikit skill.

## Related

- [android-restore-state](./android-restore-state.md)
