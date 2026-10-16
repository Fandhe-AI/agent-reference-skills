# Libraries and tools to test different screen sizes

Android tools and APIs for testing multiple screen and window sizes: DeviceConfigurationOverride, Robolectric, Gradle-managed devices, Firebase Test Lab, test-runner annotation filtering, Espresso Device, and StateRestorationTester.

## Signature / Usage

```kotlin
DeviceConfigurationOverride(
    DeviceConfigurationOverride.ForcedSize(DpSize(1280.dp, 800.dp))
) {
    MyScreen() // Will be rendered in the space for 1280dp by 800dp without clipping.
}
```

Espresso Device (instrumented tests):

```kotlin
@RunWith(AndroidJUnit4::class)
class OnDeviceTest {

    @get:Rule(order=1) val activityScenarioRule = activityScenarioRule<MainActivity>()

    @get:Rule(order=2) val screenOrientationRule: ScreenOrientationRule =
        ScreenOrientationRule(ScreenOrientation.PORTRAIT)

    @Test
    fun tabletopMode_playerIsDisplayed() {
        // Set the device to tabletop mode.
        onDevice().setTabletopMode()
        onView(withId(R.id.player)).check(matches(isDisplayed()))
    }
}
```

Resize the display at runtime, restoring it after each test:

```kotlin
@RunWith(AndroidJUnit4::class)
class ResizeDisplayTest {

    @get:Rule(order = 1) val activityScenarioRule = activityScenarioRule<MainActivity>()

    // Test rule for restoring device to its starting display size when a test case finishes.
    @get:Rule(order = 2) val displaySizeRule: DisplaySizeRule = DisplaySizeRule()

    @Test
    fun resizeWindow_compact() {
        onDevice().setDisplaySize(
            widthSizeClass = WidthSizeClass.COMPACT,
            heightSizeClass = HeightSizeClass.COMPACT
        )
        // Verify visual attributes or state restoration.
    }
}
```

Robolectric screen size qualifiers (from Now in Android):

```kotlin
@RunWith(RobolectricTestRunner::class)
// Configure Robolectric to use a very large screen size that can fit all of the test sizes.
// This allows enough room to render the content under test without clipping or scaling.
@Config(qualifiers = "w1000dp-h1000dp-480dpi")
class NiaAppScreenSizesScreenshotTests { ... }
```

```kotlin
val (width, height, dpi) = ...

// Set qualifiers from specs.
RuntimeEnvironment.setQualifiers("w${width}dp-h${height}dp-${dpi}dpi")
```

Gradle-managed devices with different screen sizes (Groovy DSL, `build.gradle`):

```groovy
android {
    testOptions {
        managedDevices {
            devices {
                // Run with ./gradlew nexusOneApi30DebugAndroidTest.
                nexusOneApi30(com.android.build.api.dsl.ManagedVirtualDevice) {
                    device = "Nexus One"
                    apiLevel = 30
                    // Use the AOSP ATD image for better emulator performance
                    systemImageSource = "aosp-atd"
                }
                // Run with ./gradlew  foldApi34DebugAndroidTest.
                foldApi34(com.android.build.api.dsl.ManagedVirtualDevice) {
                    device = "Pixel Fold"
                    apiLevel = 34
                    systemImageSource = "aosp-atd"
                }
            }
        }
    }
}
```

Filter tests with custom annotations and the runner argument:

```kotlin
annotation class TestExpandedWidth
annotation class TestCompactWidth

class MyTestClass {

    @Test
    @TestExpandedWidth
    fun myExample_worksOnTablet() {
        ...
    }

    @Test
    @TestCompactWidth
    fun myExample_worksOnPortraitPhone() {
        ...
    }
}
```

```sh
$ ./gradlew pixelTabletApi30DebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.annotation='com.sample.TestExpandedWidth'
```

Without GMD (emulator or device already connected):

```sh
$ ./gradlew connectedAndroidTest -Pandroid.testInstrumentationRunnerArguments.annotation='com.sample.TestExpandedWidth'
```

Espresso Device filter annotations:

```kotlin
@Test
@RequiresDeviceMode(TABLETOP)
@RequiresDeviceMode(BOOK)
fun tabletopMode_playerIdDisplayed() {
    // Set the device to tabletop mode.
    onDevice().setTabletopMode()
    onView(withId(R.id.player)).check(matches(isDisplayed()))
}

@Test
@RequiresDisplay(EXPANDED, COMPACT)
fun myScreen_expandedWidthCompactHeight() {
    ...
}
```

## Notes

- `DeviceConfigurationOverride`: `ForcedSize` fits any layout in the available space, so any UI test can run on any screen size (e.g. a small phone runs tablet/foldable UI tests). It can also set font scale, themes, and other properties.
- Robolectric runs Compose or view-based UI tests on the JVM locally, with no device or emulator, and can be configured with specific screen sizes. `RuntimeEnvironment.setQualifiers()` updates system and application resources but does not trigger any action on active activities or other components.
- Gradle-managed devices (GMD) define emulator and real-device specs for instrumented tests; combine with CI so the right tests run on specific screen sizes.
- Firebase Test Lab (or a similar device farm) runs tests on real devices such as foldables or tablets; it is a paid service with a free tier and also supports emulators.
- Test filtering: optimal strategies do not verify the same thing twice, so run all or most UI tests on a phone form factor and only a subset on other screen sizes. Pass the annotation to `AndroidJUnitRunner` via `android.testInstrumentationRunnerArguments.annotation`. Espresso Device can also filter tests by device properties.
- Espresso Device works with any instrumented test (Espresso, Compose, UI Automator) to set screen size or toggle foldable states/postures. It is still in alpha and requires Android Gradle Plugin 8.3 or higher, Android Emulator 33.1.10 or higher, and an AVD running API level 24 or higher.
- The AndroidX Test release table (checked 2026-10) lists `androidx.test.espresso:espresso-device` 1.1.0 as the latest stable release; the guide's "alpha" wording predates it.
- Espresso Device annotations: if the requirements are not met the test is skipped. `RequiresDeviceMode` can be repeated and runs only if all listed `DeviceMode` values are supported. `RequiresDisplay` specifies width and height via size classes following the official window size classes.
- `setDisplaySize()` resizes the screen at runtime; use with `DisplaySizeRule` to undo changes before the next test. It does not change density, so a dimension that does not fit the target device fails with `UnsupportedDeviceOperationException`; filter such tests with `RequiresDisplay(widthSizeClass = WidthSizeClassEnum.EXPANDED, heightSizeClass = HeightSizeClassEnum.EXPANDED)`.
- `StateRestorationTester` tests state restoration of composables without recreating activities, which is faster and more reliable.
- The official GMD example is Groovy DSL (`build.gradle`); in Kotlin DSL use `create<ManagedVirtualDevice>("name") { ... }` inside `devices`.
- Source: https://developer.android.com/training/testing/different-screens/tools

## Related

- [overview](./overview.md)
- [window-testing](./window-testing.md)
