# UI Automator

Cross-app UI testing framework (API 18+) for building tests that interact with both the app under test and other apps or the system UI (e.g. notifications, settings). The modern API (2.4+) exposes a Kotlin DSL scoped by `uiAutomator { }` built on `UiDevice`, `By`, `UiObject2`, and `until` conditions; the legacy API uses those classes directly via `UiDevice.getInstance(...)`.

## Signature / Usage

```kotlin
// Modern API (UI Automator 2.4+)
@Test
fun myTest() = uiAutomator {
    startApp("com.example.targetapp")
    onElement { textAsString() == "Hello, World!" }.click()
}
```

```kotlin
// Legacy API
val device = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())
val button = device.findObject(By.res("com.example.app:id/my_button"))
button.click()
```

## Notes

- `onElement { predicate }` finds the first matching element within a default 10s timeout; throws if not found.
- `onElementOrNull { predicate }` behaves like `onElement`, but returns `null` instead of throwing on timeout.
- `onElements { predicate }` waits for at least one match and returns all matching elements.
- `startApp(packageName: String)` launches an app by package name.
- `watchFor(condition) { action }` registers a handler for unexpected UI (e.g. permission dialogs).
- Gradle dependency: `androidx.test.uiautomator:uiautomator`.
- `waitForStable()` waits for the accessibility tree to stop changing; it does not guarantee the app is fully idle (background work may still run).
- Suited for cross-app functional UI tests, Macrobenchmark journeys, and Baseline Profile generation, where Espresso (single-app, same-process) is not applicable.
- Migration from legacy: `UiDevice.getInstance(...)` → `uiAutomator { }` scope, `findObject(By...)` → `onElement { }`, `waitForIdle()` → `activeWindow().waitForStable()`.

## Related

- [Screenshot testing](./screenshot-testing.md)
- [Espresso.onView](../espresso/onview.md)
