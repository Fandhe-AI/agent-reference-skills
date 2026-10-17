---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-plugin-releases.html
---

# Kotlin Multiplatform IDE plugin releases

The Kotlin Multiplatform IDE plugin (plugins.jetbrains.com/plugin/14936-kotlin-multiplatform) helps develop cross-platform applications for Android, iOS, desktop and web.

## Signature / Usage

```text
Settings | Plugins
Settings | Languages & Frameworks | Kotlin -> Enable K2 mode
```

## Notes

- IntelliJ IDEA supports the plugin on macOS starting with 2025.1.1.1, and on Windows and Linux starting with 2025.2.2. Android Studio supports it on macOS starting with Narwhal 2025.1.1, and on Windows and Linux starting with Otter 2025.2.1.
- The plugin is updated for each IntelliJ IDEA and Android Studio release and its major version is aligned with the corresponding IDE version. Your IDE suggests updating as soon as a release is available; check or update manually in **Settings | Plugins**.
- The source lists only releases published before the tooling was stabilized. The source has no code blocks; the snippet lists IDE settings paths quoted from the page.
- Gradle plugin information is in the Gradle DSL reference and the compatibility guide.

Release history (from the source table):

| Release | Date | Highlights | Compatible Kotlin |
|---------|------|------------|-------------------|
| 0.9 | 19 May, 2025 | Rebuilt from the ground up: integrated **New Project** wizard, preflight environment checks (Java, Android, Xcode, Gradle), automatically generated run configurations with device selector, Swift/Kotlin cross-language navigation and debugging, Compose Multiplatform resources / autocompletion / UI previews for common code (the previous Compose Multiplatform plugin can be uninstalled), Compose Hot Reload with a desktop JVM target. Known issue: in Android Studio the Compose debugger doesn't work with Kotlin 2.1.20 and 2.1.21 (to be fixed in 2.2.0-RC2) | Any Kotlin version, most functionality relies on 2.1.21; requires K2 mode (**Enable K2 mode** in **Settings** \| **Languages & Frameworks** \| **Kotlin**) |
| 0.8.4 | 06 December, 2024 | Support for Kotlin K2 mode | Any |
| 0.8.3 | 23 July, 2024 | Xcode compatibility fixes | Any |
| 0.8.2 | 16 May, 2024 | Android Studio Jellyfish and Koala support; `sourceCompatibility` / `targetCompatibility` declared in the shared module | Any |
| 0.8.1 | 9 November, 2023 | Kotlin 1.9.20, Jetpack Compose 1.5.4, Gradle build and configuration caches enabled by default, iOS framework static by default, Xcode 15 device fix | Any |
| 0.8.0 | 5 October, 2023 | Gradle version catalog migration, `android` renamed to `androidTarget`, `-destination` argument instead of `-sdk` / `-arch`, JVM target config, Xcode 15.0 support, new module wizard moved to experimental | Any |
| 0.6.0 | 24 May, 2023 | Android Studio Hedgehog Canary support, `targetHierarchy.default()` applied, source set name suffixes on platform-specific files | Any |
| 0.5.3 | 12 April, 2023 | Kotlin and Compose version updates, Xcode scheme parsing fix, `iosApp` scheme selected by default | Any |
| 0.5.2 | 30 January, 2023 | Kotlin/Native debugger fixes, Android Studio Giraffe Canary build, provisioning flags for iOS builds | Any |
| 0.5.1 | 30 November, 2022 | Fixed excess "app" directory on new project generation | Kotlin 1.7.0—* |
| 0.5.0 | 22 November, 2022 | Default iOS framework distribution is **Regular framework**; generated Android project updates | Kotlin 1.7.0—* |
| 0.3.4 | 12 September, 2022 | Android app on Jetpack Compose, outdated HMPP flags removed, min Android SDK 21 | Kotlin 1.7.0—1.7.* |
| 0.3.3 | 9 June, 2022 | Dependency on Kotlin IDE plugin 1.7.0 | Kotlin 1.7.0—1.7.* |
| 0.3.2 | 4 April, 2022 | iOS debug performance fix in Android Studio 2021.2 and 2021.3 | Kotlin 1.5.0—1.6.* |
| 0.3.1 | 15 February, 2022 | M1 iOS simulator in wizards, XcProject indexing performance, `kotlin("test")` in build scripts | Kotlin 1.5.0—1.6.* |
| 0.3.0 | 16 November, 2021 | New Kotlin Multiplatform Library wizard, XCFramework support, hierarchical project structure for new projects, wizards on non-Mac machines | Kotlin 1.6.0 |
| 0.2.7 | August 2, 2021 | Xcode configuration for AppleRunConfiguration, Apple M1 simulators | Kotlin 1.5.10 |
| 0.2.6 | June 10, 2021 | Android Studio Bumblebee Canary 1, Kotlin 1.5.20 framework-packing task | Kotlin 1.5.10 |
| 0.2.5 | May 25, 2021 | Android Studio Arctic Fox 2020.3.1 Beta 1+ compatibility | Kotlin 1.5.10 |
| 0.2.4 | May 5, 2021 | Kotlin 1.5.0 compatibility, CocoaPods in the module | Kotlin 1.5.0 |
| 0.2.3 | April 5, 2021 | Project wizard naming, CocoaPods in wizard | Kotlin 1.4.30 |
| 0.2.2 | March 3, 2021 | Open Xcode files in Xcode, Xcode project location in run configuration | Kotlin 1.4.30 |
| 0.2.1 | February 15, 2021 | For Android Studio 4.2; infrastructure improvements | Kotlin 1.4.30 |
| 0.2.0 | November 23, 2020 | iPad devices, custom Xcode scheme names, custom build steps, Kotlin Android Extensions support removed | Kotlin 1.4.20 |
| 0.1.3 | October 2, 2020 | iOS 14 and Xcode 12 | Kotlin 1.4.10, 1.4.20 |
| 0.1.2 | September 29, 2020 | Kotlin 1.4.20-M1 compatibility, error reporting to JetBrains by default | Kotlin 1.4.10, 1.4.20 |
| 0.1.1 | September 10, 2020 | Android Studio Canary 8+ compatibility | Kotlin 1.4.10, 1.4.20 |
| 0.1.0 | August 31, 2020 | First version of the Kotlin Multiplatform Mobile plugin | Kotlin 1.4.0, 1.4.10 |

## Related

- [Compatibility guide for Kotlin Multiplatform — Version compatibility](./version-compatibility.md)
- [Compose Hot Reload](../tooling/compose-hot-reload.md)
- [Build and run a Kotlin Multiplatform application](../tooling/build-and-run.md)
