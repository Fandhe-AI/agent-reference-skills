# What to test in Android

What to test depends on the type of app, the development team, the amount of legacy code, and the architecture used. This page outlines what a beginner might consider when planning what to test.

## Signature / Usage

Organization of test directories in an Android Studio project:

```text
app/src/
  test/          # local tests on the JVM (unit tests)
  androidTest/   # tests on real or virtual devices (integration, end-to-end)
```

- `androidTest` holds tests that run on real or virtual devices: integration tests, end-to-end tests, and other tests where the JVM alone cannot validate the app's functionality.
- `test` holds tests that run on the local machine, such as unit tests on a local JVM.

## Notes

- Essential unit tests:
  - ViewModels or presenters.
  - The data layer, especially repositories. Most of the data layer should be platform-independent so test doubles can replace database modules and remote data sources.
  - Other platform-independent layers such as the Domain layer (use cases, interactors).
  - Utility classes such as string manipulation and math.
- Edge cases to cover (uncommon scenarios human testers and larger tests are unlikely to catch):
  - Math operations using negative numbers, zero, and boundary conditions (off-by-one).
  - All the possible network connection errors.
  - Corrupted data, such as malformed JSON.
  - Simulating full storage when saving to a file.
  - Objects recreated in the middle of a process (such as an activity when the device is rotated).
- Unit tests to avoid (low value):
  - Tests that verify the correct operation of the framework or a library, not your code.
  - Framework entry points such as activities, fragments, or services should not contain business logic, so unit testing them is not a priority. Unit tests for activities cover mostly framework code and need a more involved setup; instrumented tests such as UI tests can cover these classes.
- UI test types:
  - Screen UI tests check critical user interactions in a single screen (clicking buttons, typing in forms, checking visible states). One test class per screen is a good starting point.
  - User flow (navigation) tests cover the most common paths by simulating a user moving through a navigation flow. They are simple tests, useful for catching run-time crashes in initialization.
- Test coverage is a metric some tools can calculate, indicating how much of your code is visited by tests. It can detect untested portions of the codebase but should not be the only metric for claiming a good testing strategy.
- Other tests: screenshot tests, performance tests, and monkey tests. Tests can also be categorized by purpose, such as regressions, accessibility, and compatibility.
- Source: https://developer.android.com/training/testing/fundamentals/what-to-test

## Related

- [test-doubles](./test-doubles.md)
- [test-pyramid](./test-pyramid.md)
- [testable-design](./testable-design.md)
