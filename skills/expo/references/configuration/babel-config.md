---
source: https://docs.expo.dev/versions/v58.0.0/config/babel/
---

# babel.config.js

Babel transforms modern JavaScript (ES6+) into a version compatible with the JavaScript engine on mobile devices. Projects from `npx create-expo-app` configure Babel automatically with `babel-preset-expo`; a **babel.config.js** is only needed to customize it.

## Signature / Usage

```sh
npx expo customize babel.config.js
```

Default configuration:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

After changing the file, restart Metro and clear its cache:

```sh
npx expo start --clear
```

## Notes

- `babel-preset-expo` extends the React Native preset (`@react-native/babel-preset`) and adds support for decorators, tree-shaking web libraries, and loading font icons.
- Source modificationDate: September 15, 2026 (SDK 58, `/versions/v58.0.0/`).

## Related

- [metro.config.js](./metro-config.md)
- [Metro bundler](./customizing-metro.md)
- [React Compiler](./react-compiler.md)
