---
source: https://reactnative.dev/docs/0.87/activityindicator
---

# ActivityIndicator

Displays a circular loading indicator.

## Signature / Usage

```tsx
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| animating | bool | `true` | | Whether to show the indicator (`true`) or hide it (`false`). |
| color | color | `null` (system accent default color) on Android; `'#999999'` on iOS | | The foreground color of the spinner. |
| hidesWhenStopped | bool | `true` | iOS | Whether the indicator should hide when not animating. |
| ref | ref setter | | | A ref setter that will be assigned an element node when mounted. |
| size | enum(`'small'`, `'large'`); number on Android | `'small'` | | Size of the indicator. A numeric size is Android only. |

## Notes

- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [Components and APIs](./components-and-apis.md)
