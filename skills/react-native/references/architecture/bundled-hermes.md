---
source: https://reactnative.dev/architecture/bundled-hermes
---

# Bundled Hermes

This page gives an overview of how Hermes and React Native are built. It is a technical deep dive targeted at users building extensions on top of Hermes or React Native; general users of React Native should not need this information.

## Signature / Usage

Build Hermes engine from the React Native `main` branch (Android):

```bash
# Build a debug version of Hermes
./gradlew :ReactAndroid:hermes-engine:assembleDebug
# Build a release version of Hermes
./gradlew :ReactAndroid:hermes-engine:assembleRelease
```

### What is 'Bundled Hermes'

Starting with React Native 0.69.0, every version of React Native is built alongside a Hermes version. From 0.69 on, you always have a JS engine that has been built and tested alongside each React Native version.

Why: historically React Native and Hermes followed two distinct release processes with distinct versioning, which created confusion about compatibility. Both share the JSI code; if the two copies of JSI get out of sync, a build of Hermes is not compatible with a build of React Native (ABI incompatibility). The React Native release process was extended to download and build Hermes, ensuring only one copy of JSI is used.

### Impact on app developers

#### iOS

Prior to React Native 0.69, users downloaded a `hermes-engine` pod. On 0.69, users use a podspec defined in `sdks/hermes-engine/hermes-engine.podspec` in the `react-native` npm package, which relies on a pre-built tarball of Hermes uploaded to Maven and to the React Native GitHub Release.

#### Android

The default template's `android/app/build.gradle` changed as follows:

```diff
dependencies {
    // ...

    if (enableHermes) {
+       implementation("com.facebook.react:hermes-engine:+") {
+           exclude group:'com.facebook.fbjni'
+       }
-       def hermesPath = "../../node_modules/hermes-engine/android/";
-       debugImplementation files(hermesPath + "hermes-debug.aar")
-       releaseImplementation files(hermesPath + "hermes-release.aar")
    } else {
        implementation jscFlavor
    }
}
```

Android users on the New Architecture build Hermes from source (because of how the NDK is used), so the first build may be slower. Users building with the New Architecture on Windows need extra steps:

- Make sure the environment is configured properly, with Android SDK and node.
- Install cmake with Chocolatey.
- Install either Build Tools for Visual Studio 2022, or Visual Studio 22 Community Edition (picking only the C++ desktop development is sufficient).
- Make sure the Visual Studio Command Prompt is configured correctly (the C++ compiler environment variables are configured there).
- Run the app with `npx react-native run-android` inside a Visual Studio Command Prompt.

#### Using another engine

Users are free to enable/disable Hermes (with the `enableHermes` variable on Android, `hermes_enabled` on iOS). Starting with React Native 0.70, the default for `enableHermes` / `hermes_enabled` is `true`.

### Impact on contributors and extension developers

- Bundled Hermes downloads a tarball with the Hermes source code from the `facebook/hermes` repository inside the `react/react-native` repository (similar to Folly, Glog, etc.). Building React Native from `main` fetches a tarball of `main` of facebook/hermes.
- Building from a release branch (say `0.69-stable`) uses a tag on the Hermes repo; the tag name is stored in `sdks/.hermesversion` in the release branch (conceptually similar to a git submodule). The React Native version is specified in the tag name, e.g. `hermes-2022-05-20-RNv0.69.0-ee8941b8874132b8f83e4486b63ed5c19fc3f111`.
- **Android:** a build inside `/ReactAndroid/hermes-engine` builds and packages Hermes. The consumer side moved from `releaseImplementation` / `debugImplementation` to `implementation` because the `hermes-engine` artifact is variant aware. The line `exclude group:'com.facebook.fbjni'` is needed because React Native consumes `fbjni` non-prefab while Hermes-engine and other libraries use prefab.
- **iOS:** scripts in `/scripts/hermes` (download the tarball, unzip, configure the iOS build; invoked at `pod install` time when `hermes_enabled` is `true`) and `/sdks/hermes-engine` (build logic; the `utils` scripts build Hermes for all Mac platforms). Hermes is built in the `build_hermes_macos` CircleCI job; the artifact tarball is downloaded by the `hermes-engine` podspec for published releases.
- **Prebuilt Hermes:** if no prebuilt artifacts exist for the React Native version (e.g. `main`), `hermesc` is built for macOS during `pod install`, then Hermes is built in the Xcode pipeline using `build-hermes-xcode.sh`.
- **Building from source:** always done from `main`; with a stable version, force it with the `CI` env var: `CI=true pod install`.
- **Debug symbols:** prebuilt Hermes artifacts do not contain dSYMs by default; build from source to get `hermes.framework.dSYM`.

## Notes

- Hermes here is the Hermes JavaScript engine; it is unrelated to the hermes-agent skill (an AI agent product).
- The original page links to `/docs/next/build-speed` for build time optimization; in this skill see the build-speed page of debugging-performance.
- The original page describes the 0.69 / 0.70 era change; it is a conceptual deep dive and is not versioned against 0.87.

## Related

- Hermes
- Build Speed
- [Glossary](./glossary.md)
