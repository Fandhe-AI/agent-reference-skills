---
source: https://docs.flutter.dev/testing/overview
---

# Testing Flutter apps

Automated tests help ensure that your app performs correctly before you publish it. Flutter tests fall into three categories: unit, widget, and integration.

## Signature / Usage

```console
flutter test --help
```

| Tradeoff             | Unit   | Widget | Integration |
|----------------------|--------|--------|-------------|
| **Confidence**       | Low    | Higher | Highest     |
| **Maintenance cost** | Low    | Higher | Highest     |
| **Dependencies**     | Few    | More   | Most        |
| **Execution speed**  | Quick  | Quick  | Slow        |

## Test types

- A _unit test_ tests a single function, method, or class. External dependencies of the unit under test are generally mocked out. Unit tests generally don't read from or write to disk, render to screen, or receive user actions from outside the process running the test.
- A _widget test_ (in other UI frameworks referred to as _component test_) tests a single widget. The goal is to verify that the widget's UI looks and interacts as expected. A widget test is more comprehensive than a unit test, but its environment is replaced with an implementation much simpler than a full-blown UI system.
- An _integration test_ tests a complete app or a large part of an app. It verifies that all the widgets and services being tested work together as expected, and can verify app performance. It generally runs on a real device or an OS emulator, such as iOS Simulator or Android Emulator, and the app under test is typically isolated from the test driver code.

Generally speaking, a well-tested app has many unit and widget tests, tracked by code coverage, plus enough integration tests to cover all the important use cases.

## Recipes

- Unit: Introduction to unit testing (`/cookbook/testing/unit/introduction`); Mock dependencies using Mockito (`/cookbook/testing/unit/mocking`)
- Widget: Introduction to widget testing; Find widgets using finders; Handling scrolling in widget tests; Tap, drag, and enter text in widget tests; Test different orientations (all under `/cookbook/testing/widget/`)
- Integration: Integration testing concepts (`/cookbook/testing/integration/introduction`); Write and run a Flutter integration test (`/testing/integration-tests`); Write and run a Patrol integration test (`https://patrol.leancode.co/documentation/write-your-first-test`); Measure performance with an integration test (`/cookbook/testing/integration/profiling`)

## Continuous integration services

For information on running tests on various continuous integration services, the official page links to:

- Continuous delivery using fastlane with Flutter (`/deployment/cd#fastlane`)
- Test Flutter apps on Appcircle
- Test Flutter apps on Travis
- Test Flutter apps on Cirrus
- Codemagic CI/CD for Flutter
- Codemagic CI/CD for Patrol
- Flutter CI/CD with Bitrise

## Notes

- If you're writing unit tests for code that uses plugins and you want to avoid crashes, check out "Plugins in Flutter tests". If you want to test your Flutter plugin, check out "Testing plugins".
- The Flutter SDK includes the `integration_test` package. However, this package can't interact with native platform UI, such as permission dialogs, notifications, or platform views. For apps that need native interactions, you can use the `patrol` package, an open-source framework that extends Flutter's testing capabilities with native platform support.
- Distance line: this page covers Flutter's Dart test stack (`flutter_test` / `integration_test`, run with `flutter test`). It is distinct from browser E2E in playwright, the JS/TS test runner in vitest, and Android instrumented testing in android-testing.

## Related

- [Check app functionality with an integration test](./integration-tests.md)
- [Plugins in Flutter tests](./plugins-in-tests.md)
- [Testing plugins](./testing-plugins.md)
