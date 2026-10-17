---
source: https://docs.flutter.dev/perf/app-size
---

# Measuring your app's size

How to measure app size for iOS and Android, break down a release build with `--analyze-size`, and reduce size.

## Signature / Usage

```console
flutter build apk --analyze-size --target-platform=android-arm64
```

The size analysis tool is invoked by passing the `--analyze-size` flag when building:

- `flutter build apk --analyze-size --target-platform=android-arm64`
- `flutter build appbundle --analyze-size --target-platform=android-arm64`
- `flutter build ios --analyze-size`
- `flutter build linux --analyze-size`
- `flutter build macos --analyze-size`
- `flutter build windows --analyze-size`

This build is different from a standard release build in two ways:

1. The tool compiles Dart in a way that records code size usage of Dart packages.
2. The tool displays a high level summary of the size breakdown in the terminal, and leaves a `*-code-size-analysis_*.json` file for more detailed analysis in DevTools.

In addition to analyzing a single build, two builds can also be diffed by loading two `*-code-size-analysis_*.json` files into DevTools.

## Debug builds are not representative

By default, launching your app with `flutter run`, or clicking **Play** in your IDE, generates a _debug_ build. The app size of a debug build is large due to the debugging overhead that allows for hot reload and source-level debugging. A default release build (`flutter build apk` / `flutter build ios`) is also not representative of your end-users' download size: the stores generally reprocess and split your upload package to target the specific downloader and hardware (filtering assets by DPI and native libraries by CPU architecture).

## Estimating total size

### Android

Follow the Google Play Console's instructions for checking app download and install sizes. Produce an upload package:

```console
flutter build appbundle
```

Log into your Google Play Console and upload the .aab file by drag and drop. View the application's download and install size in the **Android vitals** -> **App size** tab. The download size is calculated based on an XXXHDPI (~640dpi) device on an arm64-v8a architecture. The top tab has a toggle for download size and install size.

### iOS

Create an Xcode App Size Report, first configuring the app version and build as described in the iOS create build archive instructions. Then:

1. Run `flutter build ipa --export-method development`.
2. Run `open build/ios/archive/*.xcarchive` to open the archive in Xcode.
3. Click **Distribute App**.
4. Select a method of distribution. **Development** is the simplest if you don't intend to distribute the application.
5. In **App Thinning**, select 'all compatible device variants'.
6. Select **Strip Swift symbols**.

Sign and export the IPA. The exported directory contains `App Thinning Size Report.txt` with details about your projected application size on different devices and versions of iOS. The report for the default demo app in Flutter 1.17 shows:

```plaintext
Variant: Runner-7433FC8E-1DF4-4299-A7E8-E00768671BEB.ipa
Supported variant descriptors: [device: iPhone12,1, os-version: 13.0] and [device: iPhone11,8, os-version: 13.0]
App + On Demand Resources size: 5.4 MB compressed, 13.7 MB uncompressed
App size: 5.4 MB compressed, 13.7 MB uncompressed
On Demand Resources size: Zero KB compressed, Zero KB uncompressed
```

To measure an iOS app exactly, upload a release IPA to Apple's App Store Connect and obtain the size report from there. IPAs are commonly larger than APKs as explained in the Flutter FAQ ("How big is the Flutter engine?").

## Deeper analysis in DevTools

The `*-code-size-analysis_*.json` file can be analyzed in DevTools, where a tree or a treemap view can break down the contents of the application to the individual file level and up to function level for the Dart AOT artifact. Run `dart devtools`, select `Open app size tool`, and upload the JSON file.

## Reducing app size

When building a release version of your app, consider using the `--split-debug-info` tag, which can dramatically reduce code size (see "Obfuscating Dart code"). Some other things you can do:

- Remove unused resources
- Minimize resource imported from libraries
- Compress PNG and JPEG files

Another way to reduce app size is by using platform-specific code. The Dart compiler removes code that is unreachable on the target platform. For example, if you have code that is specific to Windows, you can wrap it in a check using the `Platform` class from `dart:io`, like `if (Platform.isWindows)`. When you build the app for Android, the compiler sees that this check is always false and removes the Windows-specific code from the release build.

## Notes

- Starting in Flutter version 1.22 and DevTools version 0.9.1, a size analysis tool is included to help developers understand the breakdown of the release build of their application.
- An upload package is not representative of your end users' download size. Redundant native library architectures and asset densities seen in the breakdown tool can be filtered by the Play Store and App Store.
- On iOS, `--analyze-size` creates a .app rather than an IPA. Use it to evaluate the relative size of the .app's content; for a closer download-size estimate use the Xcode App Size Report above.
- Clarified: the perf/app-size page lists the Android commands without --target-platform, but the tool rejects --analyze-size for multi-ABI builds; specify a single ABI (android-arm, android-arm64, or android-x64), as the DevTools App Size page shows (--target-platform=android-arm64).
- Distance line: this page covers Flutter's `flutter build` size measurement only. Play Console / Gradle details belong to android-build-gradle, and Xcode distribution / App Store Connect belongs to apple-distribution.

## Related

- [Performance metrics](./performance-metrics.md)
- [Performance](./performance.md)
