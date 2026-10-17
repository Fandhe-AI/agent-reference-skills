---
source: https://docs.expo.dev/develop/unit-testing/
---

# Unit and Snapshot Tests with jest-expo

Set up the `jest-expo` preset and write a unit test and a snapshot test with React Native Testing Library.

```sh
npx expo install jest-expo jest @types/jest --dev
npx expo install @testing-library/react-native --dev
```

```json tsconfig.json
{
  "compilerOptions": {
    "types": ["jest"]
  }
}
```

```json package.json
{
  "scripts": {
    "test": "jest --watchAll"
  },
  "jest": {
    "preset": "jest-expo"
  }
}
```

```tsx index.tsx
import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const CustomText = ({ children }: PropsWithChildren) => <Text>{children}</Text>;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CustomText>Welcome!</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

```tsx home-screen-test.tsx
import { render } from '@testing-library/react-native';

import HomeScreen, { CustomText } from '@/app/index';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', async () => {
    const { getByText } = await render(<HomeScreen />);

    getByText('Welcome!');
  });

  test('CustomText renders correctly', async () => {
    const tree = (await render(<CustomText>Some text</CustomText>)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
```

```sh
npm run test
```

## Notes

- On Windows, the page passes extra dependencies as `npx expo install jest-expo jest @types/jest "--" --dev`.
- `jest-expo` also treats files named `*-test.ts|tsx` as tests; put them in a `__tests__` directory or in per-area `__tests__` sub-directories.
- `@testing-library/react-native` replaces the deprecated `react-test-renderer`, which does not support React 19 and above.
- SDK 58 and later: `jest-expo` requires Jest 30, so update `jest` and `@types/jest` with it; Expo Router tests also need `@testing-library/react-native` 14 or later (see the Router testing migration guide).
- For UI testing the page recommends end-to-end tests (Maestro) over snapshot tests. `transformIgnorePatterns`, coverage options and extra Jest scripts are on the source page.
- Source: https://docs.expo.dev/develop/unit-testing/ (fetched 2026-10-17, modificationDate October 13, 2026).
