---
source: https://docs.flutter.dev/testing/integration-tests
---

# Check app functionality with an integration test

How to set up and run integration tests with the Flutter `integration_test` package, using the built-in Counter App.

## Signature / Usage

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:counter_app/main.dart';
import 'package:integration_test/integration_test.dart';
import 'package:material_ui/material_ui.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('end-to-end test', () {
    testWidgets('tap on the floating action button, verify counter', (
      tester,
    ) async {
      // Load app widget.
      await tester.pumpWidget(const MyApp());

      // Verify the counter starts at 0.
      expect(find.text('0'), findsOneWidget);

      // Finds the floating action button to tap on.
      final fab = find.byKey(const ValueKey('increment'));

      // Emulate a tap on the floating action button.
      await tester.tap(fab);

      // Trigger a frame.
      await tester.pumpAndSettle();

      // Verify the counter increments by 1.
      expect(find.text('1'), findsOneWidget);
    });
  });
}
```

The `integration_test` package lets you:

- Use the `flutter drive` command to run tests on a physical device or emulator.
- Run on Firebase Test Lab, to automate testing on a variety of devices.
- Use `flutter_test` APIs to write tests in a style similar to widget tests.

The example goes through three steps:

1. Initialize `IntegrationTestWidgetsFlutterBinding`. This singleton service executes tests on a physical device.
2. Interact and test widgets using the `WidgetTester` class.
3. Test the important scenarios.

## Setup

Create the app and add a `Key` to the `floatingActionButton()` widget so the test can find it:

```console
$ flutter create counter_app
```

```dart
 floatingActionButton: FloatingActionButton(
   key: const ValueKey('increment'),
   onPressed: _incrementCounter,
   tooltip: 'Increment',
   child: const Icon(Icons.add),
 ),
```

Add `integration_test` and `flutter_test` as `dev_dependencies` using `sdk: flutter`:

```console
$ flutter pub add "dev:integration_test:{sdk: flutter}"
```

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^6.0.0
  integration_test:
    sdk: flutter
```

Integration tests reside in a separate directory inside your Flutter project:

```plaintext
counter_app/
  lib/
    main.dart
  integration_test/
    app_test.dart
```

## Run integration tests

- To test a desktop platform, use the command line or a CI system.
- To test a mobile platform, use the command line or Firebase Test Lab.
- To test in a web browser, use the command line.

### Test on a desktop platform

To test on a macOS, Windows, or Linux platform, run the following command from the root of the project. If offered a choice of platform to test, choose the desktop platform (type `1`).

```console
$ flutter test integration_test/app_test.dart
```

Example output by platform:

Windows:

```ps
PS C:\path\to\counter_app> flutter test .\integration_test\app_test.dart
Resolving dependencies...
Downloading packages...
  flutter_lints 3.0.2 (4.0.0 available)
  leak_tracker 10.0.4 (10.0.5 available)
  leak_tracker_flutter_testing 3.0.3 (3.0.5 available)
  lints 3.0.0 (4.0.0 available)
  material_color_utilities 0.8.0 (0.11.1 available)
  meta 1.12.0 (1.15.0 available)
  test_api 0.7.0 (0.7.1 available)
  vm_service 14.2.1 (14.2.2 available)
Got dependencies!
8 packages have newer versions incompatible with dependency constraints.
Try `flutter pub outdated` for more information.

Connected devices:

Windows (desktop) • windows • windows-x64    • Microsoft Windows [Version 10.0.22631.3593]
Chrome (web)      • chrome  • web-javascript • Google Chrome 124.0.6367.207
Edge (web)        • edge    • web-javascript • Microsoft Edge 124.0.2478.97

[1]: Windows (windows)
[2]: Chrome (chrome)
[3]: Edge (edge)

Please choose one (or "q" to quit): 1

00:00 +0: loading C:/path/to/counter_app/integration_test/app_test.dart               B
00:29 +0: loading C:/path/to/counter_app/counter_app/integration_test/app_test.dart   29.1s
√ Built build\windows\x64\runner\Debug\counter_app.exe
00:31 +1: All tests passed!
```

macOS:

```console
$ flutter test integration_test
Resolving dependencies...
Downloading packages...
  flutter_lints 3.0.2 (4.0.0 available)
> leak_tracker 10.0.4 (was 10.0.0) (10.0.5 available)
> leak_tracker_flutter_testing 3.0.3 (was 2.0.1) (3.0.5 available)
> leak_tracker_testing 3.0.1 (was 2.0.1)
  lints 3.0.0 (4.0.0 available)
  material_color_utilities 0.8.0 (0.11.1 available)
> meta 1.12.0 (was 1.11.0) (1.15.0 available)
> test_api 0.7.0 (was 0.6.1) (0.7.1 available)
> vm_service 14.2.1 (was 13.0.0) (14.2.2 available)
Changed 6 dependencies!
8 packages have newer versions incompatible with dependency constraints.
Try `flutter pub outdated` for more information.

Connected devices:

macOS (desktop)                 • macos                 • darwin-arm64   • macOS 14.4.1 23E224 darwin-arm64
Mac Designed for iPad (desktop) • mac-designed-for-ipad • darwin         • macOS 14.4.1 23E224 darwin-arm64
Chrome (web)                    • chrome                • web-javascript • Google Chrome 124.0.6367.208

No wireless devices were found.

[1]: macOS (macos)
[2]: Mac Designed for iPad (mac-designed-for-ipad)
[3]: Chrome (chrome)
Please choose one (or "q" to quit): 1

00:01 +0: loading /path/to/counter_app/integration_test/app_test.dart        R
00:02 +0: loading /path/to/counter_app/integration_test/app_test.dart    846ms
00:03 +0: loading /path/to/counter_app/integration_test/app_test.dart        B

Building macOS application...
✓ Built build/macos/Build/Products/Debug/counter_app.app
00:32 +1: All tests passed!
```

Linux:

```console
$ flutter test integration_test/app_test.dart

Connected devices:

Linux (desktop) • linux  • linux-x64      • Ubuntu 22.04.4 LTS 6.5.0-35-generic
Chrome (web)    • chrome • web-javascript • Google Chrome 104.0.5112.101

[1]: Linux (linux)
[2]: Chrome (chrome)

Please choose one (or "q" to quit): 1

00:00 +0: /path/to/counter_app/integration_test/app_test.dart     B
00:16 +0: /path/to/counter_app/integration_test/app_test.dart

✓ Built build/linux/x64/debug/bundle/counter_app
```

To test a Linux app on a CI system, the CI system must invoke an X server first. Set the integration test to work with the `xvfb-run` tool, for example in GitHub Actions:

```yaml
      - name: Run Integration Tests
        run: xvfb-run flutter test integration_test -d linux -r github
```

If you don't configure your integration in this way, Flutter returns an error:

```console
Building Linux application...
Error waiting for a debug connection: The log reader stopped unexpectedly, or never started.
```

### Test on an Android device

Connect the Android device and run the following command from the root of the project:

```console
$ flutter test integration_test/app_test.dart
00:04 +0: loading /path/to/counter_app/integration_test/app_test.dart
00:15 +0: loading /path/to/counter_app/integration_test/app_test.dart
00:18 +0: loading /path/to/counter_app/integration_test/app_test.dart   2,387ms
Installing build/app/outputs/flutter-apk/app.apk...  612ms
00:21 +1: All tests passed!
```

Verify that the test removed the Counter App when it finished. If not, subsequent tests fail. If needed, press on the app and choose **Remove App** from the context menu.

### Test on an iOS device

Connect the iOS device and run the same command:

```console
$ flutter test integration_test/app_test.dart
00:04 +0: loading /path/to/counter_app/integration_test/app_test.dart
00:15 +0: loading /path/to/counter_app/integration_test/app_test.dart
00:18 +0: loading /path/to/counter_app/integration_test/app_test.dart   2,387ms
Xcode build done.                                           13.5s
00:21 +1: All tests passed!
```

Verify that the test removed the Counter App when it finished (same as Android).

### Test in a web browser

1. Install ChromeDriver into the directory of your choice (the command uses the `@puppeteer/browsers` Node library):

   ```console
   $ npx @puppeteer/browsers install chromedriver@stable
   ```

2. Add the path to ChromeDriver to your `$PATH` environment variable.
3. Verify the install:

   ```console
   $ chromedriver --version
   ChromeDriver 124.0.6367.60 (8771130bd84f76d855ae42fbe02752b03e352f17-refs/branch-heads/6367@{#798})
   ```

4. In your project directory, create `test_driver/integration_test.dart`:

   ```dart
   import 'package:integration_test/integration_test_driver.dart';

   Future<void> main() => integrationDriver();
   ```

5. Launch `chromedriver`:

   ```console
   $ chromedriver --port=4444
   ```

6. From the root of the project, run:

   ```console
   $ flutter drive \
     --driver=test_driver/integration_test.dart \
     --target=integration_test/app_test.dart \
     -d chrome
   ```

To run this as a headless test, run `flutter drive` with the `-d web-server` option:

```console
$ flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart \
  -d web-server
```

### Test in Firebase Test Lab (Android)

Follow the instructions in the "Android Device Testing" section of the `integration_test` README. In the Firebase Console, create a project if necessary and navigate to **Quality > Test Lab**.

Create the APKs:

```console
// Go to the Android directory which contains the gradlew script
$ pushd android

// Build a debug APK for Flutter with gradlew
// Note that a standard --release build will not include package:integration_test
$ flutter build apk --debug

// Build an Android test APK
$ ./gradlew app:assembleAndroidTest

// Build a debug APK by passing in an integration test
$ ./gradlew app:assembleDebug -Ptarget=integration_test/<name>_test.dart
```

- `<name>_test.dart`: the integration test file you created.

If needed, pass parameters into the integration test as a comma-separated list. Encode all parameters as `base64`:

```console
$ ./gradlew project:task -Pdart-defines="{base64 (key=value)}[, ...]"
```

Return to your previous directory:

```console
$ popd
```

To start a Robo test: drag the debug APK from `<flutter_project_directory>/build/app/outputs/apk/debug` into the **Android Robo Test** target; click **Run a test**; select the **Instrumentation** test type; add the App APK (`<flutter_project_directory>/build/app/outputs/apk/debug/<file>.apk`) to the **App APK or AAB** box; add the Test APK (`<flutter_project_directory>/build/app/outputs/apk/androidTest/debug/<file>.apk`) to the **Test APK** box. If a failure occurs, click the red icon to view the output.

### Test in Firebase Test Lab (iOS)

Follow the iOS Device Testing instructions in the `integration_test` README. Create or open a Firebase project and navigate to **Quality > Test Lab**. Upload Xcode tests from a ZIP file through the Firebase Console, or from the command line, by following the Firebase Test Lab iOS instructions.

## Notes

- Changed from the official page, which uses a placeholder action username/xvfb-action@v1.1.2; replaced with a direct xvfb-run call.
- Corrected: the official page imports `package:how_to/main.dart` (left over from its code-excerpt source); the package name matches the app created with `flutter create counter_app`.
- The sample app and test import `package:material_ui/material_ui.dart` as written in the official page. Per the Flutter 3.47 notes, `material_ui` / `cupertino_ui` are standalone packages you can opt in to; the in-framework `package:flutter/material.dart` is not yet deprecated in 3.47.7.
- A standard `--release` build will not include `package:integration_test`, so use `--debug` when building the APK for Firebase Test Lab.
- The `ChromeDriver` version shown in the sample output is from the page's example; use the stable install command shown.
- Distance line: this is Flutter's Dart `integration_test` / `flutter drive` flow. It is distinct from playwright (browser E2E), vitest (JS/TS unit tests), and android-testing (Android instrumented tests).

## Related

- [Testing Flutter apps](./testing-overview.md)
- [Testing plugins](./testing-plugins.md)
