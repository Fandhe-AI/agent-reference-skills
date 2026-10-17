---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-publish-apps.html
---

# Publish your application

Preparing Kotlin Multiplatform applications for release to Google Play, the Apple App Store, and (for web apps) GitHub Pages, highlighting the parts specific to KMP.

## Signature / Usage

Generate web artifacts by running the `wasmJsBrowserDistribution` Gradle task (from the command line, or via an IDE Gradle run configuration whose Tasks and arguments field is `wasmJsBrowserDistribution`):

```shell
./gradlew :sharedUI:wasmJsBrowserDistribution
```

Replace `sharedUI` with the name of your shared UI module.

Output directory: `sharedUI/build/dist/wasmJs/productionExecutable`.

## Notes

- Android: KMP has no obvious effect on building the Android app. The Android library from the shared module and the app are typical Android Gradle modules, so publishing follows the usual Android developer documentation.
- iOS: the app is built from a typical Xcode project, so publishing follows the iOS developer documentation. KMP-specific work is compiling the shared Kotlin module into a framework and linking it to the Xcode project; the Kotlin Multiplatform IDE plugin normally does this automatically. Without the plugin: the shared library compiles to a native framework, connect the framework compiled for the specific platform to the iOS app project, specify the framework path in the Xcode project settings, and launch and test the app after building.
- Two ways to connect the shared module to iOS: the Kotlin CocoaPods Gradle plugin, or manually configuring the Multiplatform project to create an iOS framework and the Xcode project to obtain its latest version.
- With Spring 2024 App Store policy changes, missing or incomplete privacy manifests may lead to warnings or rejection.
- Bundle ID: change `BUNDLE_ID` in `iosApp/Configuration/Config.xcconfig`. App name: change `APP_NAME` in the same file; if the project is already open in Android Studio, close it, edit the file in a text editor, then reopen. For other settings open `iosApp/iosApp.xcworkspace` in Xcode.
- Crash symbolication: release versions of iOS frameworks produced from the shared module come with an accompanying `.dSYM` file by default.
- Automating TestFlight publishing is done with a TeamCity Cloud pipeline (see the iOS CI/CD page).
- Web: copy the contents of `productionExecutable` into the repository for the site and follow GitHub's instructions for creating a GitHub Pages site; changes can take up to 10 minutes to publish. Browser debugging works out of the box.
- This page is the KMP-specific overview; Xcode / App Store submission details are in the `apple-distribution` and `apple-swift` skills, and Android release steps are in `android-build-gradle`.

## Related

- iOS CI/CD with TeamCity
- CocoaPods overview
- Privacy manifest
- [Build final native binaries](./native-binaries.md)
