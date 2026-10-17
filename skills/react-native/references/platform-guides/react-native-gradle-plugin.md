---
source: https://reactnative.dev/docs/0.87/react-native-gradle-plugin
---

# React Native Gradle Plugin

Describes how to configure the React Native Gradle Plugin (often referred to as RNGP) when building your React Native application for Android.

## Signature / Usage

The plugin is distributed as a separate NPM package which is installed automatically with `react-native`, and is already configured for new projects created using `npx react-native init`. By default it works out of the box with sensible defaults. To configure it, modify the `react` block inside your `android/app/build.gradle`:

```groovy
apply plugin: "com.facebook.react"

/**
 * This is the configuration block to customize your React Native Android app.
 * By default you don't need to apply any configuration, just uncomment the lines you need.
 */
react {
  // Custom configuration goes here.
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | file | `../..` | Root folder of your React Native project, i.e. where `package.json` lives. e.g. `root = file("../../")` |
| `reactNativeDir` | file | `../../node_modules/react-native` | Folder where the `react-native` package lives. Adjust for monorepos or other package managers. |
| `codegenDir` | file | `../../node_modules/react-native-codegen` | Folder where the `react-native-codegen` package lives. e.g. `codegenDir = file("../../node_modules/@react-native/codegen")` |
| `cliFile` | file | `../../node_modules/react-native/cli.js` | Entrypoint file for the React Native CLI; the plugin invokes the CLI for bundling and creating your app. |
| `debuggableVariants` | list | `debug` only | Variants that are debuggable. They do not ship a bundle, so Metro is needed to run them. e.g. `debuggableVariants = ["liteDebug", "prodDebug"]` |
| `nodeExecutableAndArgs` | list | `[node]` | Node command and arguments invoked for all the scripts. e.g. `nodeExecutableAndArgs = ["node"]` |
| `bundleCommand` | string | `bundle` | Name of the `bundle` command invoked when creating the bundle. Useful for RAM Bundles, e.g. `bundleCommand = "ram-bundle"` |
| `bundleConfig` | file | empty (no config file) | Path to a configuration file passed to `bundle --config <file>`. e.g. `bundleConfig = file("../../rn-cli.config.js")` |
| `bundleAssetName` | string | `index.android.bundle` | Name of the bundle file generated. e.g. `bundleAssetName = "MyApplication.android.bundle"` |
| `entryFile` | file | `index.android.js` or `index.js` (searched) | Entry file used for bundle generation. e.g. `entryFile = file("../../js/MyApplication.android.js")` |
| `extraPackagerArgs` | list | empty | Extra flags passed to the `bundle` command. e.g. `extraPackagerArgs = []` |
| `hermesCommand` | path | bundled `hermesc` | Path to the `hermesc` command (the Hermes Compiler). The plugin uses the correct compiler for your system by default, so you generally won't need to customize this. |
| `hermesFlags` | list | `["-O", "-output-source-map"]` | Flags passed to `hermesc`. e.g. `hermesFlags = ["-O", "-output-source-map"]` |
| `enableBundleCompression` | boolean | disabled | Whether the bundle asset is compressed when packaged into a `.apk`. |

## Notes

- `debuggableVariants`: if you have other variants (like `staging`, `lite`, etc.) adjust it accordingly. The plugin skips JS bundling for all `debuggableVariants`, so e.g. a `fullStaging` listed there cannot be published to a store because it will be missing the bundle.
- `enableBundleCompression`: disabling compression for the `.bundle` allows it to be directly memory-mapped to RAM, improving startup time at the cost of a larger app size on disk. The `.apk` download size is mostly unaffected because `.apk` files are compressed before downloading. Do not turn it on unless you are really concerned about disk space.
- Corrected: the official `bundleConfig` example writes `file(../rn-cli.config.js)` without quotes, which is not valid Groovy; the path is quoted here.
- Corrected: the official page writes paths as file("../..."), but file() in android/app/build.gradle resolves against android/app, so the app root is ../../ (as in the React Native template).
- `bundleConfig` / `extraPackagerArgs`: see the React Native community CLI documentation for the `bundle` command flags (linked from the official page).
- Build variants: by default new apps have two build types (`debug`, `release`) and no custom flavors. The combination of all build types and flavors generates build variants; e.g. `debug`/`staging`/`release` with `full`/`lite` gives 6 variants (`fullDebug`, `fullStaging`, `fullRelease`, ...). With custom variants beyond `debug` and `release`, specify which are debuggable:

  ```diff
  apply plugin: "com.facebook.react"

  react {
  + debuggableVariants = ["fullStaging", "fullDebug"]
  }
  ```

- Under the hood the plugin:
  - Adds a `createBundle<Variant>JsAndAssets` task for every non debuggable variant, which invokes the `bundle`, `hermesc` and `compose-source-map` commands.
  - Sets up the proper version of the `com.facebook.react:react-android` and `com.facebook.react:hermes-android` dependency, reading the React Native version from the `package.json` of `react-native`.
  - Sets up the proper Maven repositories (Maven Central, Google Maven Repo, JSC local Maven repo, etc.).
  - Sets up the NDK to let you build apps that use the New Architecture.
  - Sets up the `buildConfigFields` so you can know at runtime if Hermes or the New Architecture are enabled.
  - Sets up the Metro DevServer Port as an Android resource so the app knows on which port to connect.
  - Invokes the React Native Codegen if a library or app uses the Codegen for the New Architecture. It is also used inside 3rd party libraries for this purpose.
- For integrating React Native into an existing project, see the Integration with Existing Apps guide's "Configuring Gradle" section.
- This plugin is React Native specific. For general Android Gradle build configuration (build types, product flavors, AGP), see the android-build-gradle skill.

## Related

- [Publishing to Google Play Store](./signed-apk-android.md)
- [Integration with Existing Apps](../getting-started/integration-with-existing-apps.md)
- [Using Codegen](../native-development/using-codegen.md)
