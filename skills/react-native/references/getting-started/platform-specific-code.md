---
source: https://reactnative.dev/docs/0.87/platform-specific-code
---

# Platform-Specific Code

Two ways to organize code by platform: the `Platform` module and platform-specific file extensions.

## Signature / Usage

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 200 : 100,
  },
});
```

`Platform.OS` will be `ios` when running on iOS and `android` when running on Android.

`Platform.select` takes an object where keys can be one of `'ios' | 'android' | 'native' | 'default'` and returns the most fitting value for the current platform. On a phone, `ios` and `android` keys take preference; if those are not specified, `native` is used and then `default`.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

This results in a container having `flex: 1` on all platforms, a red background color on iOS, a green background color on Android, and a blue background color on other platforms.

Since it accepts `any` value, it can return platform-specific components:

```tsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```

### Detecting the Android version (Android)

```tsx
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

`Version` is set to the Android API version not the Android OS version. Mapping: https://en.wikipedia.org/wiki/Android_version_history#Overview

### Detecting the iOS version (iOS)

On iOS, `Version` is a result of `-[UIDevice systemVersion]`, a string with the current version of the operating system (e.g. "10.3"). To detect the major version number:

```tsx
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

### Platform-specific extensions

React Native detects a `.ios.` or `.android.` extension and loads the relevant platform file when required from other components. Given:

```shell
BigButton.ios.js
BigButton.android.js
```

import it as:

```tsx
import BigButton from './BigButton';
```

### Native-specific extensions (sharing code with NodeJS and Web)

Use the `.native.js` extension when a module is shared between NodeJS/Web and React Native but has no Android/iOS differences:

```shell
Container.js # picked up by webpack, Rollup or any other Web bundler
Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
```

```tsx
import Container from './Container';
```

## Notes

- Corrected (differs from the official docs): the official snippet passes `height` as a top-level key of `StyleSheet.create`; it is wrapped in a named style (`container`) because each key must map to a style object.
- Use the `Platform` module when only small parts of a component are platform-specific; use separate files when the platform-specific code is more complex.
- Certain components may have properties that work on one platform only. All of these props are annotated with `@platform` and have a small badge next to them on the website.
- Pro tip: configure your Web bundler to ignore `.native.js` extensions in order to avoid having unused code in your production bundle, thus reducing the final bundle size.

## Related

- [Out-of-Tree Platforms](./out-of-tree-platforms.md)
