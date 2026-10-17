---
source: https://reactnative.dev/docs/0.87/hermes
---

# Using Hermes

[Hermes](https://hermesengine.dev) is an open-source JavaScript engine optimized for React Native. For many apps, using Hermes will result in improved start-up time, decreased memory usage, and smaller app size when compared to JavaScriptCore. Hermes is used by default by React Native and no additional configuration is required to enable it.

## Signature / Usage

A `HermesInternal` global variable will be available in JavaScript that can be used to verify that Hermes is in use:

```jsx
const isHermes = () => !!global.HermesInternal;
```

To see the benefits of Hermes, try making a release build/deployment of your app to compare. From the root of your project:

**Android — npm**

```shell
npm run android -- --mode="release"
```

**Android — Yarn**

```shell
yarn android --mode release
```

**iOS — npm**

```shell
npm run ios -- --mode="Release"
```

**iOS — Yarn**

```shell
yarn ios --mode Release
```

This will compile JavaScript to Hermes Bytecode during build time which will improve your app's startup speed on device.

### Bundled Hermes

React Native comes with a **bundled version** of Hermes. We are building a version of Hermes for you whenever we release a new version of React Native. This will make sure you're consuming a version of Hermes which is fully compatible with the version of React Native you're using. This change is fully transparent to users of React Native. You can still disable Hermes using the command described on this page. Technical details: https://reactnative.dev/architecture/bundled-hermes.

### Confirming Hermes is in use

If you've recently created a new app from scratch, you should see if Hermes is enabled in the welcome view.

### Switching back to JavaScriptCore

React Native also supports using JavaScriptCore as the JavaScript engine. Follow the instructions [from the community repository](https://github.com/react-native-community/javascriptcore) to opt-out of Hermes.

## Notes

- If you are using a non-standard way of loading the JS bundle, it is possible that the `HermesInternal` variable is available but you aren't using the highly optimised pre-compiled bytecode. Confirm that you are using the `.hbc` file and also benchmark the before/after.
- Since 0.84: Hermes V1 is the default JavaScript engine on both iOS and Android (initial experimental opt-in in 0.82). No migration required for apps already using Hermes. Opt-out: first force the legacy `hermes-compiler` package to 0.15.0 in `package.json` (npm `"overrides"`, Yarn `"resolutions"`, pnpm `"pnpm": { "overrides": ... }`, e.g. `{ "hermes-compiler": "0.15.0" }`); then with CocoaPods pass `RCT_HERMES_V1_ENABLED=0` and `RCT_USE_PREBUILT_RNCORE=0`; on Android add `hermesV1Enabled=false` in `android/gradle.properties` and build React Native from source (0.84 release blog).
- 0.88: Hermes moves to 260318099.0.4, and apps no longer commit a machine-specific Hermes compiler path (0.88 release blog).
- This page is about the Hermes JavaScript engine for React Native; it is unrelated to the hermes-agent skill (an AI agent).

## Related

- [javascript-environment.md](./javascript-environment.md)
- [metro.md](./metro.md)
