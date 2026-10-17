---
source: https://docs.flutter.dev/reference/flutter-cli
---

# Build and Release

Commands for building release artifacts per platform, flavors, obfuscation, size analysis, and Android signing key creation. `flutter build` defaults to a release build.

## List build options for a target

Source: https://docs.flutter.dev/deployment/obfuscate

```sh
flutter build <build-target> -h
```

For a list of supported targets use `flutter help build` (source: https://docs.flutter.dev/testing/build-modes). The obfuscate page lists targets including `ipa`, `linux`, `macos`, `macos-framework`, and `windows`.

## Create an Android upload keystore

> **Warning**: Creates a signing key. Keep the keystore file private and do not check it into public source control. Use a throwaway environment for experiments.

Source: https://docs.flutter.dev/deployment/android

macOS or Linux:

```sh
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA \
        -storetype JKS -keysize 2048 -validity 10000 -alias upload
```

Windows (PowerShell):

```powershell
keytool -genkey -v -keystore $env:USERPROFILE\upload-keystore.jks `
        -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 `
        -alias upload
```

If `keytool` is not in the path, run `flutter doctor -v`, find the path after "Java binary at:", and replace `java` at the end with `keytool`.

## Build an Android app bundle

Source: https://docs.flutter.dev/deployment/android

```sh
cd [project]
flutter build appbundle
```

Output: `[project]/build/app/outputs/bundle/release/app.aab`.

## Build Android APKs per ABI

Source: https://docs.flutter.dev/deployment/android

```sh
cd [project]
flutter build apk --split-per-abi
```

Produces `app-armeabi-v7a-release.apk`, `app-arm64-v8a-release.apk`, and `app-x86_64-release.apk` under `[project]/build/app/outputs/flutter-apk/`.

## Build a flavor

Source: https://docs.flutter.dev/deployment/flavors

```sh
flutter (run | build <subcommand>) --flavor <flavor_name>
```

For Android, `<subcommand>` is `apk` or `appbundle`:

```sh
flutter build apk --flavor staging
```

Desktop (sources: https://docs.flutter.dev/deployment/flavors-linux and https://docs.flutter.dev/deployment/flavors-windows):

```sh
flutter build linux --flavor <flavor_name>
```

```sh
flutter build windows --flavor <flavor_name>
```

Output goes to `build/linux/<arch>/<flavor_name>/release/bundle/` and `build/windows/<arch>/<flavor_name>/runner/Release/`. The docs describe `--build-name` and `--build-number` overrides for `flutter build ipa` and `flutter build windows` in prose only.

## Build an iOS archive and IPA

Source: https://docs.flutter.dev/deployment/ios

```sh
flutter build ipa
```

Produces `build/ios/archive/*.xcarchive` and `build/ios/ipa/*.ipa`. Add `--obfuscate` and `--split-debug-info` to obfuscate. For a non-App-Store export method, add `--export-method ad-hoc`, `--export-method development`, or `--export-method enterprise`.

Re-export with saved options without launching Xcode:

```sh
flutter build ipa --export-options-plist=path/to/ExportOptions.plist
```

## Upload an IPA from the command line

Source: https://docs.flutter.dev/deployment/ios

```sh
xcrun altool --upload-app --type ios -f build/ios/ipa/*.ipa --apiKey your_api_key --apiIssuer your_issuer_id
```

Run `man altool` for details about authenticating with an App Store Connect API key.

## Build for macOS and open Xcode

Source: https://docs.flutter.dev/platform-integration/macos/building

```sh
flutter build macos
open macos/Runner.xcworkspace
```

Continue in Xcode for notarization or App Store distribution.

## Build for Linux and inspect library dependencies

Source: https://docs.flutter.dev/platform-integration/linux/building

```sh
flutter create linux_desktop_test
cd linux_desktop_test
flutter build linux --release
ldd build/linux/x64/release/bundle/linux_desktop_test
```

To run the bundle on a target system, the docs say this might only require:

```sh
sudo apt-get install libgtk-3-0 libblkid1 liblzma5
```

## Build for the web

Source: https://docs.flutter.dev/deployment/web

```sh
flutter build web
```

Output goes to `build/web`. With WebAssembly:

```sh
flutter build web --wasm
```

With source maps for crash-reporting symbolication:

```sh
flutter build web --source-maps
```

> **Warning**: Source maps expose un-minified symbol names and local paths if deployed publicly. Exclude `*.map` files from public hosting, for example `"ignore": ["**/*.map"]` in `firebase.json`.

Validate a release build locally by serving `build/web` (the docs name `python -m http.server 8000` or the `dhttpd` package).

## Deploy the web build to Firebase Hosting

Source: https://docs.flutter.dev/deployment/web

```sh
npm install -g firebase-tools
firebase experiments:enable webframeworks
firebase init hosting
```

Answer `yes` to using a web framework, choose `Flutter Web`, then deploy:

```sh
firebase deploy
```

`firebase deploy` runs `flutter build web --release` automatically.

## Obfuscate a build

Source: https://docs.flutter.dev/deployment/obfuscate

```sh
flutter build <build-target> \
   --obfuscate \
   --split-debug-info=/<symbols-directory>
```

Back up the generated SYMBOLS file (a PDB file on Windows x64). `--split-debug-info` alone can dramatically reduce code size (source: https://docs.flutter.dev/perf/app-size).

## Read an obfuscated stack trace

Source: https://docs.flutter.dev/deployment/obfuscate

```sh
flutter symbolize \
   -i <stack-trace-file> \
   -d <obfuscated-symbols-file>
```

Example symbols file path from the docs: `out/android/app.android-arm64.symbols`. `flutter symbolize` does not support PDB files (Windows x64).

## Save an obfuscation map

Source: https://docs.flutter.dev/deployment/obfuscate

```sh
flutter build <build-target> \
   --obfuscate \
   --split-debug-info=/<symbols-directory> \
   --extra-gen-snapshot-options=--save-obfuscation-map=/<obfuscation-map-file>
```

## Analyze app size

Source: https://docs.flutter.dev/perf/app-size

```sh
flutter build apk --analyze-size
flutter build appbundle --analyze-size
flutter build ios --analyze-size
flutter build linux --analyze-size
flutter build macos --analyze-size
flutter build windows --analyze-size
```

Prints a size summary and leaves a `*-code-size-analysis_*.json` file for DevTools. On iOS this creates a `.app` rather than an IPA.

## Measure install size for the stores

Source: https://docs.flutter.dev/perf/app-size

```sh
flutter build appbundle
```

Upload the `.aab` to the Play Console and read Android vitals, App size. For iOS:

```sh
flutter build ipa --export-method development
open build/ios/archive/*.xcarchive
```

## Build a debug APK

Source: https://docs.flutter.dev/testing/integration-tests

```sh
flutter build apk --debug
```
