---
source: https://reactnative.dev/docs/0.87/the-new-architecture/direct-manipulation-new-architecture
---

# Direct Manipulation

`setNativeProps` is the React Native equivalent to setting properties directly on a DOM node, for changes made to a component without using state/props to re-render the entire subtree.

## Signature / Usage

`setNativeProps` to edit a `TextInput` value:

```tsx
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TextInputInstance = React.ComponentRef<typeof TextInput>;

const App = () => {
  const inputRef = useRef<TextInputInstance>(null);
  const editText = useCallback(() => {
    inputRef.current?.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

The official page also gives a JavaScript variant (same code with `useRef(null)` and `inputRef.current.setNativeProps({text: 'Edited Text'})`).

## Notes

- Use `setNativeProps` when frequent re-rendering creates a performance bottleneck. Direct manipulation will not be a tool that you reach for frequently; you will typically only be using it for creating continuous animations to avoid the overhead of rendering the component hierarchy and reconciling many views.
- `setNativeProps` is imperative and stores state in the native layer (DOM, UIView, etc.) and not within your React components, which makes your code more difficult to reason about. Before you use it, try to solve your problem with `setState` and `shouldComponentUpdate`.
- Another very common use case is editing the value of the `TextInput`. The `controlled` prop of `TextInput` can sometimes drop characters when the `bufferDelay` is low and the user types very quickly. Some developers prefer to skip this prop entirely and instead use `setNativeProps` to directly manipulate the `TextInput` value when necessary.
- You can use the `clear` method to clear the `TextInput` which clears the current input text using the same approach.
- Avoiding conflicts with the render function: if you update a property that is also managed by the render function, you might end up with unpredictable and confusing bugs because anytime the component re-renders and that property changes, whatever value was previously set from `setNativeProps` will be completely ignored and overridden.

## Related

- [Measuring the Layout](./layout-measurements.md)
- [Advanced Topics on Native Modules Development (components)](./advanced-topics-components.md)
