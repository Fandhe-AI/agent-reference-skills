---
source: https://reactnative.dev/docs/0.87/refreshcontrol
---

# RefreshControl

Used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at `scrollY: 0`, swiping down triggers an `onRefresh` event.

## Signature / Usage

```tsx
import {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Required | Description |
| --- | --- | --- | --- | --- | --- |
| refreshing | boolean | | | Yes | Whether the view should be indicating an active refresh. |
| colors | array of color | | Android | No | The colors (at least one) that will be used to draw the refresh indicator. |
| enabled | boolean | `true` | Android | No | Whether the pull to refresh functionality is enabled. |
| onRefresh | function | | | No | Called when the view starts refreshing. |
| progressBackgroundColor | color | | Android | No | The background color of the refresh indicator. |
| progressViewOffset | number | `0` | | No | Progress view top offset. |
| size | enum(`'default'`, `'large'`) | `'default'` | Android | No | Size of the refresh indicator. |
| tintColor | color | | iOS | No | The color of the refresh indicator. |
| title | string | | iOS | No | The title displayed under the refresh indicator. |
| titleColor | color | | iOS | No | The color of the refresh indicator title. |

## Notes

- `refreshing` is a controlled prop, this is why it needs to be set to `true` in the `onRefresh` function otherwise the refresh indicator will stop immediately.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [ScrollView](./scrollview.md)
- [FlatList](./flatlist.md)
