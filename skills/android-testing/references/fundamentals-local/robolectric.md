# Robolectric

Robolectric runs Android tests inside a simulated Android environment on the JVM, avoiding the overhead and flakiness of an emulator, for host-side unit and UI-behavior tests.

## Signature / Usage

```gradle
android {
  testOptions {
    unitTests {
      isIncludeAndroidResources = true
    }
  }
}

dependencies {
  testImplementation("junit:junit:4.13.2")
  testImplementation("org.robolectric:robolectric:4.13")
}
```

```kotlin
@RunWith(AndroidJUnit4::class)
class AddContactActivityTest {
    @Test
    fun inputTextShouldBeRetainedAfterActivityRecreation() {
        val scenario = ActivityScenario.launchActivity<AddContactActivity>()
        onView(withId(R.id.contact_name_text)).perform(typeText("Test User"))
        scenario.recreate()
        onView(withId(R.id.contact_name_text)).check(matches(withText("Test User")))
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `testOptions.unitTests.isIncludeAndroidResources` | Gradle property | `false` | Must be `true` for Robolectric to access app resources. |

## Notes

- Third-party library (Robolectric), not part of the Android SDK. Supports Android API 21 (Lollipop) and above.
- Placed in the `test/` source set, so it runs as a fast local test rather than on a device/emulator. Applied via `@RunWith(AndroidJUnit4::class)` — see `../instrumented/` for the runner itself.
- Use as a last resort for legacy code or APIs that hard-depend on Android framework classes; prefer refactoring toward testable design first.
- Not recommended for pixel-accurate screenshot tests, `WebView`-dependent tests, or system UI features (edge-to-edge, picture-in-picture) — those need real device/emulator instrumented tests.

## Related

- [test-doubles](./test-doubles.md)
- [test-pyramid](./test-pyramid.md)
- [Instrumented tests](../instrumented/README.md)
