---
source: https://reactnative.dev/docs/0.87/tutorial
---

# Learn the Basics

Minimal React Native app: Hello World with `View` and `Text`, then reusable components with props.

```tsx
import {Text, View} from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default HelloWorldApp;
```

Props with `StyleSheet.create` (TypeScript variant):

```tsx
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

type GreetingProps = {
  name: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

## Notes

- `View` is the container (like a `div`), `Text` renders text; both are imported from `react-native`.
- `flex: 1` fills the parent, `justifyContent` / `alignItems` center children on the main / cross axis.
- Pass an array to `style` to combine a `StyleSheet` entry with inline overrides.
- The original Snack code is unchanged; see the source page for the state counter (hooks and class) examples.
