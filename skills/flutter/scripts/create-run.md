---
source: https://docs.flutter.dev/reference/flutter-cli
---

# Create and Run

Commands for creating a Flutter project and running it on a device, Chrome, or as a Wasm build.

## Create, analyze, test, and run an app

Source: https://docs.flutter.dev/reference/flutter-cli

```sh
flutter create my_app
cd my_app
flutter analyze
flutter test
flutter run lib/main.dart
```

## Create an app with a minimal main.dart

Source: https://docs.flutter.dev/reference/create-new-app

```sh
flutter create --empty my_app
```

The only non-option argument is the directory and default project name, which should follow `lowercase_with_underscores`. The official page shows `flutter create --empty` and the project name in separate steps; they are combined here because `flutter create` requires the output directory argument. List all options with:

```sh
flutter create --help
```

## Create an app with Kotlin as the Android language

Source: https://docs.flutter.dev/deployment/flavors

```sh
flutter create --android-language kotlin flavors_example
```

## Add web support to an existing project

Source: https://docs.flutter.dev/platform-integration/web/building

```sh
flutter create . --platforms web
```

Creates a `web/` directory with the web assets used to bootstrap the app.

## Run on Chrome

Source: https://docs.flutter.dev/platform-integration/web/building

```sh
flutter run -d chrome
```

`edge` (Windows) and `web-server` are also valid device types.

## Run on Chrome with WebAssembly

Source: https://docs.flutter.dev/platform-integration/web/building

```sh
flutter run -d chrome --wasm
```

Multi-threaded Wasm rendering requires the server to return `Cross-Origin-Embedder-Policy: credentialless` (or `require-corp`) and `Cross-Origin-Opener-Policy: same-origin`; without them the app runs single-threaded. See the web references.

## Disable web hot reload

Source: https://docs.flutter.dev/platform-integration/web/building

```sh
flutter run -d chrome --no-web-experimental-hot-reload
```

## Run in release or profile mode

Source: https://docs.flutter.dev/testing/build-modes

```sh
flutter run --release
```

```sh
flutter run --profile
```

For a list of supported build targets use `flutter help build`.

## Run a desktop flavor

Source: https://docs.flutter.dev/deployment/flavors-linux

```sh
flutter run -d linux --flavor <flavor_name>
```

Windows (source: https://docs.flutter.dev/deployment/flavors-windows):

```sh
flutter run -d windows --flavor <flavor_name>
```

## Run an Android or iOS flavor

Source: https://docs.flutter.dev/deployment/flavors

```sh
flutter run --flavor staging
```

For iOS the flag value is the Xcode scheme name (source: https://docs.flutter.dev/deployment/flavors-ios):

```sh
flutter run --flavor <xcode_scheme_name>
```

With `default-flavor` set in `pubspec.yaml` under `flutter:`, the default flavor runs without the flag (source: https://docs.flutter.dev/tools/pubspec):

```sh
flutter run
flutter run --flavor staging
```

## Hot reload from the terminal

Source: https://docs.flutter.dev/tools/hot-reload

While `flutter run` is active, enter this key in the terminal window:

```text
r
```

Only apps in debug mode can be hot reloaded. The page documents no other terminal key.

## Other flutter commands

Source: https://docs.flutter.dev/reference/flutter-cli

```sh
flutter --help --verbose
flutter --version
flutter attach -d <DEVICE_ID>
flutter devices
flutter logs
flutter screenshot
flutter install -d <DEVICE_ID>
flutter precache <ARGUMENTS>
flutter config --build-dir=<DIRECTORY>
flutter gen-l10n --project-dir=<DIRECTORY>
flutter downgrade
```

The official command table lists `flutter gen-l10n <DIRECTORY>` and `flutter devices -d <DEVICE_ID>`; gen-l10n takes no positional directory (use `--project-dir`), and `-d` has no role when listing devices (corrected from the official docs).

To get details on any command, run `flutter help <command>`, for example `flutter help pub outdated`.

## Delete build output

> **Warning**: Deletes the `build/` and `.dart_tool/` directories.

Source: https://docs.flutter.dev/reference/flutter-cli

```sh
flutter clean
```
