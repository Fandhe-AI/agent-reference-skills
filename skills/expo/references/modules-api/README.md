# modules-api

| Name | Description | Path |
|------|-------------|------|
| Additional platform support | How to add macOS and tvOS support to an Expo module. | [additional-platform-support.md](./additional-platform-support.md) |
| Android lifecycle listeners | A mechanism that lets a library hook into Android `Activity` and `Application` functions through the Expo Modules API, instead of asking users to copy code into **MainActivity** / **MainApplication**. | [android-lifecycle-listeners.md](./android-lifecycle-listeners.md) |
| iOS AppDelegate subscribers | A mechanism that lets a library subscribe to calls to `AppDelegate` functions (inbound links, notifications, etc.) without copying code into the app's `AppDelegate`. | [appdelegate-subscribers.md](./appdelegate-subscribers.md) |
| Autolinking | Expo Autolinking automates linking native dependencies (Expo modules and React Native modules): installing the package from npm and re-running `pod install` is usually enough. | [autolinking.md](./autolinking.md) |
| create-expo-module | Command-line tool to create a new Expo module or add platform support to an existing one. | [create-expo-module.md](./create-expo-module.md) |
| Design considerations | Overview of the design goals behind the Expo Modules API. | [design.md](./design.md) |
| Integrate in an existing library | Integrate the Expo Modules API into an existing React Native library, for example to rewrite incrementally or to use Android lifecycle listeners and iOS AppDelegate subscribers for automatic setup. | [existing-library.md](./existing-library.md) |
| Get started | Two recommended flows: add a local module to an existing Expo app, or create a standalone module with a generated example project. | [get-started.md](./get-started.md) |
| Inline modules reference | Inline modules let you write native module code (Kotlin and Swift) directly in your Expo project directory, without creating a separate Expo module package. | [inline-modules-reference.md](./inline-modules-reference.md) |
| Mocking native calls in Expo modules | Bundle default Jest mocks with an Expo module so that unit tests (Jest with the `jest-expo` preset) run without native code. | [mocking.md](./mocking.md) |
| Module API Reference | The Expo Modules API is an abstraction layer on top of JSI and other low-level primitives that React Native is built upon. | [module-api.md](./module-api.md) |
| expo-module.config.json | Configuration file for Expo modules. | [module-config.md](./module-config.md) |
| Overview | The Expo Modules API lets you write Swift and Kotlin to add native modules and views to an app. | [overview.md](./overview.md) |
| Using shared objects | Shared objects expose long-lived native instances from Android and iOS to JavaScript/TypeScript without handing over their lifecycle. | [shared-objects.md](./shared-objects.md) |
| Wrap third-party native libraries | Tutorial: wrap two similar native chart libraries (MPAndroidChart on Android, Charts / DGCharts on iOS) in one Expo module that exposes a radial (pie) chart view. | [third-party-library.md](./third-party-library.md) |
| Type generation reference | Reference for the `expo-type-information` package: parses Swift Expo modules (via `sourcekitten`) and generates TypeScript interfaces and mocks. | [type-generation-reference.md](./type-generation-reference.md) |
</content>
