# Test different screen and window sizes

Automated tests verify that the behavior and look of an app stay consistent across screen sizes, window sizes, and form factors, so regressions are caught early instead of through manual testing on a single device.

## Signature / Usage

Simulate a configuration change in any UI test (Espresso or Compose) by recreating the activity, or in Compose use `StateRestorationTester` to avoid the restart:

```kotlin
@Test
fun compactDevice_selectedEmailEmailRetained_afterConfigChange() {
    val stateRestorationTester = StateRestorationTester(composeTestRule)

    // Set content through the StateRestorationTester object.
    stateRestorationTester.setContent {
        MyApp()
    }

    // Simulate a config change.
    stateRestorationTester.emulateSavedInstanceStateRestore()
}
```

## Notes

- Two aspects to test: how visual attributes of components and layouts differ across window sizes (compact, medium, expanded width and height), and how state is preserved across configuration changes.
- Adaptive layouts need automated tests to prevent regressions (e.g. fixing a margin on a phone can break a tablet layout). Use UI tests or screenshot tests.
- Tablets are rotated and resized much more often than phones, and foldables add fold/unfold and postures (folded, open flat, landscape, half opened / tabletop) that can trigger configuration changes.
- First test that the app does not crash on any combination of rotating, resizing, or folding. Configuration changes recreate the activity by default, so crashes often come from assuming the activity persists.
- Two main ways to test configuration changes: `StateRestorationTester` in Compose, or `Activity.recreate()` in any UI test.
- Different devices are generally not needed for state-restoration tests since all activity-recreating configuration changes have similar repercussions. Some changes do trigger device-specific restoration, e.g. folding a foldable showing a list-detail UI typically switches to the detail page; the test should cover the UI and navigation state restoration.
- Resizing the screen during a test on any device usually triggers the restoration mechanisms you need, but it does not work for logic that detects specific foldable postures, because posture changes do not trigger a configuration change. Use a device or emulator that supports the feature (e.g. Espresso Device).
- Test types: UI behavior tests (Espresso for views, Compose testing APIs; instrumented on device/emulator or local on Robolectric on the JVM), screenshot tests (compare against an approved screenshot; run on the JVM or on devices), and unit tests for logic that depends on device type or window size (less common).
- Source: https://developer.android.com/training/testing/different-screens

## Related

- [libraries-and-tools](./libraries-and-tools.md)
- [window-testing](./window-testing.md)
