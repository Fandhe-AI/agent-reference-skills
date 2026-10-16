# Automate UI tests

UI tests launch an app (or part of it), simulate user interactions, and check that the app reacted appropriately. They are integration tests that range from verifying a small component to a large navigation test traversing a whole user flow, and are useful for regression checks and compatibility verification across API levels and physical devices.

## Signature / Usage

Instrumented UI test code lives in a separate Android test folder; the Android Gradle Plugin builds a test app from it and loads it onto the same device as the target app.

```text
src/androidTest/java
```

## Notes

- Instrumented UI tests run via Android Studio from `src/androidTest/java`; UI testing frameworks simulate user interactions on the target app. Robolectric can alternatively run UI tests on the JVM.
- Architecture should let tests replace parts of the app with test doubles (for example an in-memory data repository providing fake, deterministic data). Dependency injection is the recommended approach, manually or with a DI framework such as Hilt.
- Why automate: apps target many devices, API levels and form factors, so compatibility testing should vary API level (example: 21, 25, 30), locale (English, Arabic, Chinese) and orientation (portrait, landscape), and also cover tablets, foldables and other devices.
- Two types of UI tests: behavior tests analyze the UI hierarchy to assert on properties of UI elements; screenshot tests capture a UI and compare it with previously-approved images.
- Source: https://developer.android.com/training/testing/ui-tests
## Related

- [Screenshot testing](./screenshot-testing.md)
- [Set up project](./set-up-project.md)
- [AndroidJUnit4 test runner](./androidjunit4-test-runner.md)
