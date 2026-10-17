---
source: https://reactnative.dev/docs/0.87/inputaccessoryview
---

# InputAccessoryView

A component which enables customization of the keyboard input accessory view on iOS. The input accessory view is displayed above the keyboard whenever a `TextInput` has focus. It can be used to create custom toolbars.

## Signature / Usage

Wrap your custom toolbar with `InputAccessoryView` and set a `nativeID`; pass that `nativeID` as the `inputAccessoryViewID` of the `TextInput`.

```tsx
import {useState} from 'react';
import {
  Button,
  InputAccessoryView,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const inputAccessoryViewID = 'uniqueID';
const initialText = '';

const App = () => {
  const [text, setText] = useState(initialText);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardDismissMode="interactive">
          <TextInput
            style={styles.textInput}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
            placeholder={'Please type here…'}
          />
        </ScrollView>
      </SafeAreaView>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={() => setText(initialText)} title="Clear text" />
      </InputAccessoryView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default App;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| backgroundColor | color | Background color. |
| nativeID | string | An ID which is used to associate this `InputAccessoryView` to specified TextInput(s). |
| style | View Style | Style of the view. |

## Notes

- iOS only. This component can also be used to create sticky text inputs (anchored to the top of the keyboard): wrap a `TextInput` with `InputAccessoryView` and don't set a `nativeID`.
- Known issues: react-native#18997 (doesn't support multiline `TextInput`); react-native#20157 (can't use with a bottom tab bar).
- 0.88: `InputAccessoryView` (iOS only) is deprecated as part of keeping core lean; `react-native-keyboard-controller`'s `KeyboardStickyView` is a cross-platform replacement. Nothing changes in 0.88 beyond a JSDoc tag and a one-time warning on import ([0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88)).
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [TextInput](./textinput.md)
- [View Style Props](../props-types/view-style-props.md)
