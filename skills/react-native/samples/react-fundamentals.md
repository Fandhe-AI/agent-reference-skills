---
source: https://reactnative.dev/docs/0.87/intro-react
---

# React Fundamentals

Components, JSX, props, and `useState` using Core Components, as the cat cafe example.

```tsx
import {useState} from 'react';
import {Button, Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

## Notes

- Use props to configure a component at render time and state for data that changes over time.
- `<>...</>` is a fragment; it groups siblings without an extra `View`.
- To pass an object as a prop, use double braces: `style={{width: 200, height: 200}}`.
- This sample covers React usage inside React Native only; React Hooks and API details belong to the react skill (if installed).
