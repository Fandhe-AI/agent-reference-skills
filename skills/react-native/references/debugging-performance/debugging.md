---
source: https://reactnative.dev/docs/0.87/debugging
---

# Debugging Basics

Dev Menu, React Native DevTools entry points, LogBox and the in-app Performance Monitor.

## Signature / Usage

```js
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
  // Exact message
  'Warning: componentWillReceiveProps has been renamed',

  // Substring or regex match
  /GraphQL error: .*/,
]);
```

## Notes

- Debugging features, such as the Dev Menu, LogBox, and React Native DevTools are disabled in release (production) builds.
- Dev Menu: shake the device, or use iOS Simulator `Ctrl` + `Cmd` + `Z` (or Device > Shake); Android emulators `Cmd` + `M` (macOS) or `Ctrl` + `M` (Windows and Linux). Alternative (Android): `adb shell input keyevent 82`.
- Open React Native DevTools by selecting "Open DevTools" in the Dev Menu, or pressing `j` from the CLI.
- LogBox fatal errors (e.g. a JavaScript syntax error) are not dismissable; LogBox dismisses automatically once the error is fixed via Fast Refresh or a manual reload.
- Console errors show as notifications with a count; warnings show a banner without details, prompting you to open React Native DevTools. While DevTools is open, all errors except fatal errors are hidden from LogBox. The Console panel in DevTools is recommended as the source of truth.
- `LogBox.ignoreAllLogs()` disables LogBox notifications (useful for product demos). `LogBox.ignoreLogs()` disables them per log (exact message, substring or regex).
- LogBox treats certain errors from React as warnings; advanced users can customise the filter via `LogBoxData.setWarningFilter()`.
- Performance Monitor: select "Perf Monitor" in the Dev Menu (Android and iOS). It runs in-app and is a guide; use Android Studio and Xcode native tooling for accurate measurements.
- Distinct from react-dom / browser debugging and from native IDE debuggers (apple-uikit, android-architecture); this page covers the React Native in-app tooling.

## Related

- [React Native DevTools](./react-native-devtools.md)
- [Debugging Native Code](./debugging-native-code.md)
- [Performance Overview](./performance.md)
