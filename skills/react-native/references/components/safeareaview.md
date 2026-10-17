---
source: https://reactnative.dev/docs/0.87/safeareaview
---

# SafeAreaView

Renders content within the safe area boundaries of a device. Deprecated.

## Signature / Usage

Wrap your top level view with a `SafeAreaView` with a `flex: 1` style applied to it. You may also want to use a background color that matches your application's design.

```tsx
import {StyleSheet, Text, SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Page content</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default App;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

## Notes

- Deprecated: "Use react-native-safe-area-context instead."
- Currently only applicable to iOS devices with iOS version 11 or later.
- `SafeAreaView` renders nested content and automatically applies padding to reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views. The paddings also reflect the physical limitation of the screen, such as rounded corners or camera notches (i.e. the sensor housing area on iPhone 13).
- As padding is used to implement the behavior of the component, padding rules in styles applied to a `SafeAreaView` will be ignored and can cause different results depending on the platform (see react-native#22211).
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [StatusBar](./statusbar.md)
