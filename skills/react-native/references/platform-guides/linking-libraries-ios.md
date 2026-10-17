---
source: https://reactnative.dev/docs/0.87/linking-libraries-ios
---

# Linking Libraries

Not every app uses all native capabilities, so many features are exposed as independent static libraries. This page covers linking libraries that contain native code on iOS.

## Signature / Usage

Automatic linking: install a library with native dependencies.

```shell
npm install "<library-with-native-dependencies>" --save
```

Install the CocoaPods dependencies:

```shell
cd ios && bundle exec pod install
```

After installing pods, the next build links the native code thanks to the autolinking mechanism of the React Native community CLI.

### Manual linking

**Step 1.** If the library has native code, there must be an `.xcodeproj` file inside its folder. Drag this file to your project on Xcode (usually under the `Libraries` group on Xcode).

**Step 2.** Click on your main project file (the one that represents the `.xcodeproj`), select `Build Phases` and drag the static library from the `Products` folder inside the Library you are importing to `Link Binary With Libraries`.

**Step 3.** Not every library needs this step. If you use the library only in JavaScript, you are good to go. If you need to call it from native, the library's headers must be known: in your project's file select `Build Settings`, search for `Header Search Paths` and include the path to your library.

## Notes

- Added the CocoaPods install step (bundle exec pod install in ios/); the official page omits it although iOS autolinking runs through the Podfile.
- Placeholder quoted here; the official page shows it unquoted.
- All the libraries shipped with React Native live in the `Libraries` folder in the root of the repository. Some are pure JavaScript and you only need to `require` them. Others rely on native code; in that case you have to add those files to your app, otherwise the app throws an error as soon as you try to use the library.
- The `--save` or `--save-dev` flag is very important for automatic linking: React Native links your libs based on `dependencies` and `devDependencies` in your `package.json` file.
- The documentation used to recommend `recursive` for Header Search Paths, but this is no longer recommended, as it can cause subtle build failures, especially with CocoaPods.
- The official page includes screenshots (AddToLibraries, AddToBuildPhases, AddToSearchPaths) that are not reproduced here.
- Xcode project settings belong to the iOS toolchain; see the apple-uikit and apple-distribution skills for native iOS app and Xcode topics. This page covers the React Native specific linking flow.

## Related

- [Running On Simulator](./running-on-simulator-ios.md)
- [Integration with Existing Apps](../getting-started/integration-with-existing-apps.md)
