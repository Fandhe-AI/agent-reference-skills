---
source: https://reactnative.dev/docs/0.87/optimizing-javascript-loading
---

# Optimizing JavaScript loading

Techniques to reduce JavaScript parse / load cost: Hermes, lazy-loading, inline `require`, and RAM bundles.

## Signature / Usage

```tsx title="Optimized.tsx"
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// Usually we would write a static import:
// import VeryExpensive from './VeryExpensive';

let VeryExpensive = null;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    if (VeryExpensive == null) {
      VeryExpensive = require('./VeryExpensive').default;
    }

    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

Disable automatic inline `require` in `metro.config.js`:

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: false,
        },
      };
    },
  },
};
```

Exclude only certain modules:

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: {
            blockList: {
              // require() calls in `DoNotInlineHere.js` will not be inlined.
              [require.resolve('./src/DoNotInlineHere.js')]: true,

              // require() calls anywhere else will be inlined, unless they
              // match any entry nonInlinedRequires (see below).
            },
          },
          nonInlinedRequires: [
            // require('react') calls will not be inlined anywhere
            'react',
          ],
        },
      };
    },
  },
};
```

### RAM bundles (non-Hermes)

**Android** (`android/app/build.gradle`, before `apply from: "../../node_modules/react-native/react.gradle"`):

```
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

Single indexed file:

```
project.ext.react = [
  bundleCommand: "ram-bundle",
  extraPackagerArgs: ["--indexed-ram-bundle"]
]
```

**iOS** (Xcode build phase "Bundle React Native code and images", RAM bundles are always indexed):

```
export BUNDLE_COMMAND="ram-bundle"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

## Notes

- Recommended: use Hermes, the default engine for new apps; release builds are compiled to bytecode ahead of time and loaded on-demand.
- Recommended: lazy-load large components with React's `lazy` (typically screen-level components).
- Avoid module side effects (e.g. assigning `global.logger` at module top level) in lazy-loaded modules; they change app behavior when code is deferred.
- Advanced: with the React Native CLI, `require` calls (not `import`s) are automatically inlined, including in `node_modules`. Some frameworks disable this; in Expo projects `require` calls are not inlined by default, enable it with `inlineRequires: true` in the Metro config `getTransformOptions`.
- Inlining changes module evaluation order and can cause some modules to never be evaluated; exclude modules with side effects via `inlineRequires.blockList` / `nonInlinedRequires`, or disable it entirely.
- RAM bundles are not supported when using Hermes (bytecode is not compatible with the RAM bundle format and performs the same or better).
- Metro is the React Native bundler (distinct from vite).

## Related

- [Performance Overview](./performance.md)
