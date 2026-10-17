---
source: https://reactnative.dev/docs/0.87/keyboardavoidingview
---

# KeyboardAvoidingView

Automatically adjusts its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.

## Signature / Usage

```tsx
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default KeyboardAvoidingComponent;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| behavior | enum(`'height'`, `'position'`, `'padding'`) | | Specify how to react to the presence of the keyboard. |
| contentContainerStyle | View Style | | The style of the content container (View) when behavior is `'position'`. |
| enabled | boolean | `true` | Enabled or disabled KeyboardAvoidingView. |
| keyboardVerticalOffset | number | `0` | The distance between the top of the user screen and the react native view, may be non-zero in some use cases. |

## Notes

- Android and iOS both interact with the `behavior` prop differently. On both iOS and Android, setting `behavior` is recommended.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [TextInput](./textinput.md)
- [View Style Props](../props-types/view-style-props.md)
