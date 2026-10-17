---
source: https://docs.flutter.dev/testing/testing-plugins
---

# Testing plugins

All of the usual types of Flutter tests apply to plugin packages as well, but because plugins contain native code they often also require other kinds of tests.

## Signature / Usage

```sh
./gradlew testDebugUnitTest
```

Run in the `example/android` directory for Android JUnit tests.

## Types of plugin tests

To see examples of each of these types of tests, create a new plugin from the plugin template and look in the indicated directories.

- **Dart unit tests and widget tests.** These test the Dart portion of your plugin just as you would test the Dart code of a non-plugin package. However, the plugin's native code won't be loaded, so any calls to platform channels need to be mocked in tests. See the `test` directory for an example.
- **Dart integration tests.** Since integration tests run in the context of a Flutter application (the example app), they can test both the Dart and native code, as well as the interaction between them. They are also useful for unit testing web implementation code that needs to run in a browser. These are often the most important tests for a plugin. However, Dart integration tests using `integration_test` can't interact with native UI, such as native dialogs or the contents of platform views. For native component interaction support, consider using `patrol`. See the `example/integration_test` directory for an example.
- **Native unit tests.** Native unit tests can test the native parts of a plugin in isolation. Each platform has its own native unit test system, and the tests are written in the same native languages as the code it is testing. They can be especially valuable if you need to mock out APIs wrapped by your plugin code, which isn't possible in a Dart integration test. The following are already configured in the plugin template:
  - **Android**: JUnit tests can be found in `android/src/test/`.
  - **iOS** and **macOS**: XCTest tests can be found in `example/ios/RunnerTests/` and `example/macos/RunnerTests/` respectively. These are in the example directory, not the top-level package directory, because they are run via the example app's project.
  - **Linux** and **Windows**: GoogleTest tests can be found in `linux/test/` and `windows/test/`, respectively.

Other types of tests, which aren't currently pre-configured in the template, are **native UI tests**. Running your application under a native UI testing framework, such as Espresso or XCUITest, enables tests that interact with both native and Flutter UI elements, so can be useful if your plugin can't be tested without native UI interactions.

## Running tests

### Dart unit tests

These can be run like any other Flutter unit tests, either from your preferred Flutter IDE, or using `flutter test`.

### Integration tests

The commands must be run in the `example` directory. For information on running this type of test, check out the integration test documentation.

### Native unit tests

For all platforms, you need to build the example application at least once before running the unit tests, to ensure that all of the platform-specific build files have been created.

**Android JUnit**

If you have the example opened as an Android project in Android Studio, you can run the unit tests using the Android Studio test UI. To run the tests from the command line, use the following command in the `example/android` directory:

```sh
./gradlew testDebugUnitTest
```

**iOS and macOS XCTest**

If you have the example app opened in Xcode, you can run the unit tests using the Xcode Test UI. To run the tests from the command line, use the following command in the `example/ios` (for iOS) or `example/macos` (for macOS) directory:

```sh
xcodebuild test -workspace Runner.xcworkspace -scheme Runner -configuration Debug
```

For iOS tests, you might need to first open `Runner.xcworkspace` in Xcode to configure code signing.

**Linux GoogleTest**

To run the tests from the command line, use the following command in the example directory, replacing "my_plugin" with your plugin project name:

```sh
build/linux/x64/debug/plugins/my_plugin/my_plugin_test
```

Replace "x64" with "arm64" when building on arm64. If you built the example app in release mode rather than debug, replace "debug" with "release".

**Windows GoogleTest**

If you have the example app opened in Visual Studio, you can run the unit tests using the Visual Studio test UI. To run the tests from the command line, use the following command in the example directory, replacing "my_plugin" with your plugin project name:

```sh
build/windows/x64/plugins/my_plugin/Debug/my_plugin_test.exe
```

Replace "x64" with "arm64" when building on arm64. If you built the example app in release mode rather than debug, replace "Debug" with "Release".

## What types of tests to add

The general advice for testing Flutter projects applies to plugins as well. Some extra considerations for plugin testing:

- Since only integration tests can test the communication between Dart and the native languages, try to have at least one integration test of each platform channel call.
- If some flows can't be tested using the `integration_test` package (for example if they require interacting with native UI or mocking device state), consider using the `patrol` package for native UI interactions, or writing "end to end" tests of the two halves using unit tests:
  - Native unit tests that set up the necessary mocks, then call into the method channel entry point with a synthesized call and validate the method response.
  - Dart unit tests that mock the platform channel, then call the plugin's public API and validate the results.

## Notes

- Corrected: the official page lists `build/linux/plugins/x64/debug/...` and `build/windows/plugins/...`; actual output paths are `build/linux/<arch>/<mode>/plugins/<plugin>/` and `build/windows/<arch>/plugins/<plugin>/<Config>/`.
- To learn how to avoid crashes from a plugin when testing your Flutter app, check out "Plugins in Flutter tests".
- Distance line: JUnit / XCTest / GoogleTest here only test the native half of a Flutter plugin. Android instrumented testing in general belongs to android-testing.

## Related

- [Plugins in Flutter tests](./plugins-in-tests.md)
- [Testing Flutter apps](./testing-overview.md)
