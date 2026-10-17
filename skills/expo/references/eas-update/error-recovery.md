---
source: https://docs.expo.dev/eas-update/error-recovery/
---

# Error recovery

Built-in error recovery in `expo-updates` as an extra safeguard against accidentally publishing broken updates.

## Signature / Usage

If you published a broken update, publish a new update with a fix as soon as possible (though not before you are 100% confident in the fix). The first thing to try is rolling back to an older update known to work, using `republish` from the EAS dashboard or EAS CLI:

```sh
eas update:republish --group [update-group-id]
```

If no older update is safe to roll back to (for example, the broken update modified persistent state such as AsyncStorage or the file system in a non-backwards-compatible way), fix forward.

### Error recovery flow

The flow is lightweight, not a full safety net; users may still see a crash. Its purpose is to prevent updates from "bricking" the app (a crash on launch before the app can check for updates) so the app has the opportunity to download a new update.

#### Catching an error

`expo-updates` catches a fatal JS error early enough in the lifecycle that it may prevent further downloads. If more than 10 seconds have elapsed between the app's first render and the fatal error, the error is not caught and no recovery code runs; check for updates very shortly after launching. What happens next depends on whether React Native has fired the native "content appeared" event (`ReactMarkerConstants.CONTENT_APPEARED` on Android or `RCTContentDidAppearNotification` on iOS) for this update, on this launch or a previous one. If the error occurs before the first view has rendered, no state-modifying code is assumed to have run, so rolling back is safe; afterwards `expo-updates` only fixes forward.

#### If content has appeared

- A 5 second timer starts, and (unless `EXUpdatesCheckOnLaunch`/`expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH` is `NEVER`) the app checks for and downloads a new update.
- When there is no new update, the download finishes, or the timer runs out (whichever is first), the app throws the original error and crashes. A downloaded update launches the next time the user opens the app.

#### If content has not appeared

On the first launch of the current update on this device:

- The update is marked "failed" locally and is not launched again on this device.
- A 5 second timer starts and the app checks for a new update (same `NEVER` exception).
- If a new update finishes downloading before the timer runs out, the app immediately reloads and launches it.
- If that update also throws a fatal error, or there is no new update, or the timer runs out, the app reloads by rolling back to the most recently successfully launched older update.
- If that also fails or there is none, the app throws the original error and crashes.

### Error stacktraces

When recovery fails, the original exception is rethrown. On Android the original stacktrace is preserved:

```text
--------- beginning of crash
AndroidRuntime: FATAL EXCEPTION: expo-updates-error-recovery
AndroidRuntime: Process: com.myapp.MyApp, PID: 12498
AndroidRuntime: com.facebook.react.common.JavascriptException
```

On iOS the trace shows `-[EXUpdatesAppController throwException:]` and `-[EXUpdatesErrorRecovery _crash]`, yet generally indicates an error that originated in JavaScript. Apple's crash reporting omits the exception message, so reproduce locally with the Xcode debugger or macOS Console app attached.

## Notes

- Disclaimer from the source: the documented behavior is subject to change and should not be relied upon. Test thoroughly in production-like environments before publishing updates.
- Source modificationDate: May 23, 2026 (fetched 2026-10-17).

## Related

- [Debugging](./debug.md)
- [Rollbacks](./rollbacks.md)
- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
