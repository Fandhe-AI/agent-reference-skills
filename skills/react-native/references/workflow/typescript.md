---
source: https://reactnative.dev/docs/0.87/typescript
---

# Using TypeScript

TypeScript is a language which extends JavaScript by adding type definitions. New React Native projects target TypeScript by default, but also support JavaScript and Flow.

## Signature / Usage

Add TypeScript to an existing project:

1. Add TypeScript, types, and ESLint plugins to your project.

**npm**

```shell
npm install -D typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

**Yarn**

```shell
yarn add --dev typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

2. Add a TypeScript config file. Create a `tsconfig.json` in the root of your project:

```json
{
  "extends": "@react-native/typescript-config"
}
```

3. Rename a JavaScript file to be `*.tsx`.
4. Run `tsc` to type-check your new TypeScript files (`npx tsc` / `yarn tsc`).

## Getting Started with TypeScript

New projects created by the React Native CLI or popular templates like [Ignite](https://github.com/infinitered/ignite) will use TypeScript by default. TypeScript may also be used with Expo, which maintains TypeScript templates, or will prompt you to automatically install and configure TypeScript when a `.ts` or `.tsx` file is added to your project.

```shell
npx create-expo-app --template
```

## Using JavaScript Instead of TypeScript

React Native defaults new applications to TypeScript, but JavaScript may still be used. Files with a `.jsx` extension are treated as JavaScript instead of TypeScript, and will not be typechecked. JavaScript modules may still be imported by TypeScript modules, along with the reverse.

## How TypeScript and React Native works

Out of the box, TypeScript sources are transformed by Babel during bundling. We recommend that you use the TypeScript compiler only for type checking. This is the default behavior of `tsc` for newly created applications. If you have existing TypeScript code being ported to React Native, there are [one or two caveats](https://babeljs.io/docs/en/next/babel-plugin-transform-typescript) to using Babel instead of TypeScript.

## What does React Native + TypeScript look like

You can provide an interface for a React Component's Props and State via `React.Component<Props, State>` which will provide type-checking and editor auto-completing when working with that component in JSX.

```tsx
import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

function Hello({name, baseEnthusiasmLevel = 0}: Props) {
  const [enthusiasmLevel, setEnthusiasmLevel] = useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () =>
    setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
    );

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Hello;
```

## Using Custom Path Aliases with TypeScript

To use custom path aliases with TypeScript, you need to set the path aliases to work from both Babel and TypeScript.

1. Edit your `tsconfig.json` to have your [custom path mappings](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping). Set anything in the root of `src` to be available with no preceding path reference, and allow any test file to be accessed by using `tests/File.tsx`:

```diff
{
-  "extends": "@react-native/typescript-config"
+  "extends": "@react-native/typescript-config",
+  "compilerOptions": {
+    "baseUrl": ".",
+    "paths": {
+      "*": ["src/*"],
+      "tests": ["tests/*"],
+      "@components/*": ["src/components/*"],
+    },
+  }
}
```

2. Add [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver) as a development package (`npm install --save-dev babel-plugin-module-resolver` / `yarn add --dev babel-plugin-module-resolver`).
3. Configure your `babel.config.js` (note that the syntax for your `babel.config.js` is different from your `tsconfig.json`):

```diff
{
   presets: ['module:metro-react-native-babel-preset'],
+  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           tests: ['./tests/'],
+           "@components": "./src/components",
+         }
+       }
+    ]
+  ]
}
```

## Where to Find Useful Advice

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React's documentation on TypeScript](https://react.dev/learn/typescript)
- [React + TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets)

## Notes

- The install command adds the latest version of every dependency. The versions may need to be changed to match the existing packages used by your project. You can use a tool like [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to see the versions shipped by React Native.
- You should leave the `./index.js` entrypoint file as it is otherwise you may run into an issue when it comes to bundling a production build.
- Since 0.87: the Strict TypeScript API is enabled by default; see the Strict TypeScript API page for ref typing (`*Instance`), opt-out via `customConditions`, and removed types.
- The babel.config.js snippet keeps the official page's legacy preset name `metro-react-native-babel-preset`; current React Native templates use `presets: ['module:@react-native/babel-preset']` (see the JavaScript Environment page), so keep your existing presets line and add only the plugins entry.
- This page covers TypeScript setup for React Native; the TypeScript language itself is out of scope here.

## Related

- [strict-typescript-api.md](./strict-typescript-api.md)
- [javascript-environment.md](./javascript-environment.md)
