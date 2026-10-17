---
source: https://reactnative.dev/docs/0.87/legacy/native-modules-setup
---

# Native Modules NPM Package Setup

Native modules are usually distributed as npm packages that include native code per platform in addition to JavaScript. The page bootstraps the project structure with the community tool create-react-native-library.

## Signature / Usage

```shell
npx create-react-native-library@latest react-native-awesome-module
```

Where `react-native-awesome-module` is the name for the new module. Then navigate into the folder and bootstrap the example project:

```shell
yarn
```

Start the example app:

```shell
# Android app
yarn example android
# iOS app
yarn example ios
```

Then continue with the Android Native Modules or iOS Native Modules guides to add code.

## Notes

- Legacy Architecture: "Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable." (page notice)
- create-react-native-library is a community tool (callstack.github.io/react-native-builder-bob/create), not part of React Native core.

## Related

- [native-modules-intro.md](./native-modules-intro.md)
- [native-modules-android.md](./native-modules-android.md)
- [native-modules-ios.md](./native-modules-ios.md)
- [local-library-setup.md](./local-library-setup.md)
- Create a Module Library
