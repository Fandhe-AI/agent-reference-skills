---
source: https://reactnative.dev/docs/0.87/intro-react-native-components
---

# Core Components and Native Components

Combine the main Core Components (`View`, `Text`, `Image`, `ScrollView`, `TextInput`) in one screen.

```tsx
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;
```

## Notes

- Core Components are backed by platform views at runtime: `View` = `ViewGroup` / `UIView`, `Text` = `TextView` / `UITextView`, `Image` = `ImageView` / `UIImageView`, `ScrollView` = `ScrollView` / `UIScrollView`, `TextInput` = `EditText` / `UITextField`.
- Remote images need explicit `width` and `height` in `style`.
