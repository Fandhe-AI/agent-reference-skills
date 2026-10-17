---
source: https://reactnative.dev/docs/0.87/the-new-architecture/create-module-library
---

# Create a Library for Your Module

Extract a module into a separate library with `create-react-native-library` and distribute it using NPM.

## Signature / Usage

Use the `create-react-native-library` tool to create a new library with all the boilerplate (configuration files and files required by the various platforms):

```sh
npx create-react-native-library@latest "<Name of Your Library>"
```

Steps: create the new library; move the code from the App to the Library; update the code to reflect the new structure; publish it.

### 1. Create a Library

1. Run the command above.
2. Add a name for your module. It must be a valid npm name, so it should be all lowercase. You can use `-` to separate words.
3. Add a description for the package.
4. Continue filling the form until you reach the question "What type of library do you want to develop?"
5. For the sake of the guide, select the Turbo module option. You can create libraries for both New Architecture and Legacy Architecture.
6. Choose whether you want a library that accesses the platform (Kotlin & Objective-C) or a shared C++ library (C++ for Android and iOS).
7. Finally, select the `Test App` as last option. This creates the library with a separate app already configured within the library folder.

The generated folders: `android` (Android code), `cpp` (C++ code), `ios` (iOS code), `src` (JS code). The `package.json` is already configured to run Codegen:

```json
  "codegenConfig": {
    "name": "RN<your module name>Spec",
    "type": "all",
    "jsSrcsDir": "src",
    "outputDir": {
      "ios": "ios/generated",
      "android": "android/generated"
    },
    "android": {
      "javaPackageName": "com.<name-of-the-module>"
    }
  },
```

### 2. Copy the Code over from Your App

The guide assumes a local Turbo Native Module in your app (platform specific Turbo Native Modules, or cross-platform Turbo Native Modules), but it also works for Components and legacy architecture modules and components; adapt the files you copy and update.

1. **[Not required for legacy architecture modules and components]** Move the code in the `specs` folder of your app into the `src` folder created by `create-react-native-library`.
2. Update the `index.ts` file to export the Turbo Native Module spec:

```ts
import NativeSampleModule from './NativeSampleModule';

export default NativeSampleModule;
```

3. Copy the native module over:
   - Replace the code in `android/src/main/java/com/<name-of-the-module>` with the code you wrote in the app for your native module, if any.
   - Replace the code in the `ios` folder with the code you wrote in your app for your native module, if any.
   - Replace the code in the `cpp` folder with the code you wrote in your app for your native module, if any.
4. **[Not required for legacy architecture modules and components]** Update all the references from the previous spec name to the new spec name, the one defined in the `codegenConfig` field of the library's `package.json`. For example, if the app `package.json` has `AppSpecs` as `codegenConfig.name` and the library calls it `RNNativeSampleModuleSpec`, replace every occurrence of `AppSpecs` with `RNNativeSampleModuleSpec`.

### Testing your Library

The generated `example` folder has the same structure as an app created from `react-native-community/template`.

1. Navigate to the `example` folder.
2. Run `yarn install` to install all the dependencies.
3. For iOS only, you need to install CocoaPods: `(cd ios && bundle exec pod install)` (subshell, so later steps still run from `example/`).
4. Build and run Android with `yarn android` from the `example` folder.
5. Build and run iOS with `yarn ios` from the `example` folder.

### Use your library as a Local Module

When the library sits as a sibling of your apps:

```shell
Development
├── App
└── Library
```

1. Add your library to your app by navigating into the `App` folder and running `yarn add ../Library`.
2. For iOS only, navigate in the `App/ios` folder and run `bundle exec pod install`.
3. Update the `App.tsx` code to import the code in your library:

```tsx
import NativeSampleModule from '../Library/src/index';
```

Metro runs from the `App` folder and has no access to the `Library` JS files, so update `metro.config.js`:

```diff
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
+ const path = require('path');

- const config = {}
+ const config = {
+  // Make Metro able to resolve required external dependencies
+  watchFolders: [
+    path.resolve(__dirname, '../Library'),
+  ],
+  resolver: {
+    extraNodeModules: {
+      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
+    },
+  },
+};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

`watchFolders` tells Metro to watch additional paths (here `../Library`, which contains `src/index`). The `resolver` property feeds the library the React Native code used by the app; without it, the library's imports from React Native will fail. Then build and run as usual (`yarn android` / `yarn ios`).

### Publish the Library on NPM

The setup to publish is already in place thanks to `create-react-native-library`.

1. Install the dependencies in your module `yarn install`.
2. Build the library running `yarn prepare`.
3. Release it with `yarn release`.

Verify with `npm view <package.name>` (the `name` set in `package.json`), then install it in an app:

```bash
yarn add "<package.name>"
```

## Notes

- Deviation: the official step runs `cd ios && pod install`; changed to a subshell with bundle exec so later steps still run from example/ and match the Bundler recommendation below.
- Placeholder quoted here; the official page shows it unquoted.
- For iOS only, whenever you install a new module with some native code, you have to reinstall CocoaPods, by running `bundle exec pod install` (recommended) or `pod install` if you are not using Ruby's Bundler (not recommended).
- Libraries are collected in the reactnative.directory website.
- Cross-skill: Xcode / CocoaPods and Android Gradle project details belong to apple-uikit / android-build-gradle; this page covers only the library extraction flow.

## Related

- [Cross-Platform Native Modules (C++)](./pure-cxx-modules.md)
- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Using Codegen](./using-codegen.md)
