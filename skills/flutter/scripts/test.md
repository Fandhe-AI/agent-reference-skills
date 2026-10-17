---
source: https://docs.flutter.dev/testing/integration-tests
---

# Test

Commands for unit, widget, and integration tests with `flutter test`, `integration_test`, and `flutter drive`.

## Run all tests

Source: https://docs.flutter.dev/cookbook/testing/unit/introduction

```sh
flutter test
```

## Run one test file

Source: https://docs.flutter.dev/cookbook/testing/unit/introduction

```sh
flutter test test/counter_test.dart
```

## Run a test group by name

Source: https://docs.flutter.dev/cookbook/testing/unit/introduction

```sh
flutter test --plain-name "Test start, increment, decrement"
```

The name is the `group` description from that cookbook example.

## List test options

Source: https://docs.flutter.dev/testing/overview

```sh
flutter test --help
```

## Run tests against a flavor

Source: https://docs.flutter.dev/deployment/flavors-linux

```sh
flutter test --flavor <flavor_name>
```

The `--flavor` option also works with `flutter drive`.

## Add the integration_test dependency

Source: https://docs.flutter.dev/testing/integration-tests

```sh
flutter pub add "dev:integration_test:{sdk: flutter}"
```

Run from the root of the project.

## Run integration tests on desktop, Android, or iOS

Source: https://docs.flutter.dev/testing/integration-tests

```sh
flutter test integration_test/app_test.dart
```

Connect the Android or iOS device first. If offered a choice of platform, choose the desktop platform for desktop testing. Verify the test removed the app from the device afterward, or subsequent tests fail.

## Run integration tests on Linux in CI

Source: https://docs.flutter.dev/testing/integration-tests

Linux CI needs an X server. The docs' GitHub Actions step wraps the command with `xvfb-run` through an action:

```yaml
      - name: Run Integration Tests
        uses: username/xvfb-action@v1.1.2
        with:
          run: flutter test integration_test -d linux -r github
```

## Test in a web browser (ChromeDriver)

> **Warning**: `npx` downloads and runs a package from npm, and the install puts ChromeDriver into the directory you choose. Use a throwaway environment.

Source: https://docs.flutter.dev/testing/integration-tests

```sh
npx @puppeteer/browsers install chromedriver@stable
```

Add the ChromeDriver path to `$PATH`, then verify:

```sh
chromedriver --version
```

In the project directory create the driver directory, and a `test_driver/integration_test.dart` file:

```sh
mkdir test_driver
```

```dart
import 'package:integration_test/integration_test_driver.dart';

Future<void> main() => integrationDriver();
```

Launch ChromeDriver:

```sh
chromedriver --port=4444
```

Run the tests in Chrome:

```sh
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart \
  -d chrome
```

Headless:

```sh
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart \
  -d web-server
```

## Build APKs for Firebase Test Lab (Android)

Source: https://docs.flutter.dev/testing/integration-tests

A standard `--release` build does not include `package:integration_test`, so build a debug APK. Replace `<name>_test.dart` with the file created in the project setup.

```sh
# Go to the Android directory which contains the gradlew script
pushd android

# Build a debug APK for Flutter with gradlew
flutter build apk --debug

# Build an Android test APK
./gradlew app:assembleAndroidTest

# Build a debug APK by passing in an integration test
./gradlew app:assembleDebug -Ptarget=integration_test/<name>_test.dart
```

In the docs this block is a `console` fence using `//` comments and `$` prompts; shell comments are used here so it pastes cleanly.

## Run a performance test in profile mode

Source: https://docs.flutter.dev/cookbook/testing/integration/profiling

```sh
flutter drive \
  --driver=test_driver/perf_driver.dart \
  --target=integration_test/scrolling_test.dart \
  --profile
```

Add `--no-dds` when running on a mobile device or emulator, because the Dart Development Service is not accessible from the computer.

## Run a mocked-dependency test

Source: https://docs.flutter.dev/cookbook/testing/unit/mocking

```sh
flutter test test/fetch_album_test.dart
```

Generating the mocks requires the `mockito` and `build_runner` dev dependencies; see the pub dependencies file.
