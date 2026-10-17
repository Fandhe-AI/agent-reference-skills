---
source: https://reactnative.dev/docs/0.87/debugging-native-code
---

# Debugging Native Code

Reading native logs and attaching Android Studio / Xcode debuggers to a React Native app.

## Signature / Usage

```shell
# For Android:
npx react-native log-android
# Or, for iOS:
npx react-native log-ios
```

Also available: Debug > Open System Log… in the iOS Simulator, or `adb logcat "*:S" ReactNative:V ReactNativeJS:V` while an Android app is running.

Custom native logs in a Native Module:

```java
import android.util.Log;

private void log(String message) {
    Log.d("YourModuleName", message);
}
```

```shell
adb logcat "*:S" ReactNative:V ReactNativeJS:V YourModuleName:D
```

```objectivec
NSLog(@"YourModuleName: %@", message);
```

```swift
print("YourModuleName: \(message)")
```

## Notes

- Projects with native code only. If you are using the managed Expo workflow, see the Expo prebuild guide.
- iOS custom logs appear in the Xcode console when running the app.
- Native IDE: launch the app from Android Studio or Xcode to use native debugging (breakpoints etc.), or run it with the React Native CLI and attach the debugger.
- Android Studio: Run > "Attach to Process..." and select the running React Native app.
- Xcode: Debug > "Attach to process" and select the application in the "Likely Targets" list.
- Native-side tooling (Kotlin / Swift) belongs to android-architecture / apple-uikit / apple-swift; this page covers only how to attach them to a React Native app.

## Related

- [React Native DevTools](./react-native-devtools.md)
- [Debugging Basics](./debugging.md)
