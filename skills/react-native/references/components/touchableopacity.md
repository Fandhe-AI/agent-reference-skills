---
source: https://reactnative.dev/docs/0.87/touchableopacity
---

# TouchableOpacity

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

## Signature / Usage

```tsx
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
```

## Options / Props

Inherits [TouchableWithoutFeedback Props](./touchablewithoutfeedback.md#options--props).

| Name | Type | Platform | Description |
| --- | --- | --- | --- |
| style | View.style | | Style of the view. |
| activeOpacity | number | | Opacity of the wrapped view when touch is active. Defaults to `0.2`. |
| hasTVPreferredFocus | bool | iOS | (Apple TV only) TV preferred focus (see documentation for the View component). |
| nextFocusDown | number | Android | TV next focus down (see documentation for the View component). |
| nextFocusForward | number | Android | TV next focus forward. |
| nextFocusLeft | number | Android | TV next focus left. |
| nextFocusRight | number | Android | TV next focus right. |
| nextFocusUp | number | Android | TV next focus up. |
| ref | ref setter | | A ref setter that will be assigned an element node when mounted. |

## Notes

- For a more extensive and future-proof way to handle touch-based input, use the Pressable API.
- Opacity is controlled by wrapping the children in an `Animated.View`, which is added to the view hierarchy. This can affect layout.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Pressable](./pressable.md)
- [TouchableWithoutFeedback](./touchablewithoutfeedback.md)
- [TouchableHighlight](./touchablehighlight.md)
