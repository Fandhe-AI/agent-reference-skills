---
source: https://reactnative.dev/docs/0.87/handling-text-input
---

# Handling Text Input

Track `TextInput` text in state with `onChangeText` and render a value derived from it.

```tsx
import {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TextInput
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        style={{
          height: 40,
          padding: 5,
          marginHorizontal: 8,
          borderWidth: 1,
        }}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </View>
  );
};

export default PizzaTranslator;
```

## Notes

- `onChangeText` fires on every text change; `onSubmitEditing` fires when the text is submitted.
- The text is stored in state because it changes over time.
