# Espresso Device API

`androidx.test.espresso:espresso-device` API for controlling the screen configuration of a virtual device during an instrumented test — rotation, display (window) size class, and foldable posture (flat/closed/tabletop/book) — and skipping tests on devices that don't support the requested configuration. Executes synchronously like the rest of Espresso, so no manual waiting or `IdlingResource` is needed after a configuration change.

## Signature / Usage

```kotlin
import androidx.test.espresso.device.EspressoDevice.onDevice
import androidx.test.espresso.device.action.ScreenOrientation
import androidx.test.espresso.device.action.setScreenOrientation
import androidx.test.espresso.device.action.setClosedMode
import androidx.test.espresso.device.action.setFlatMode
import androidx.test.espresso.device.controller.DeviceMode.FLAT
import androidx.test.espresso.device.filter.RequiresDeviceMode
import androidx.test.espresso.device.rules.ScreenOrientationRule
import org.junit.Rule
import org.junit.Test

class MyConfigurationTest {

    @get:Rule
    val screenOrientationRule = ScreenOrientationRule(ScreenOrientation.PORTRAIT)

    @Test
    fun rotatesToLandscape() {
        onDevice().perform(setScreenOrientation(ScreenOrientation.LANDSCAPE))
        // ... assert the UI adapted to landscape
    }

    @Test
    @RequiresDeviceMode(mode = FLAT)
    fun unfoldsToFlat() {
        onDevice().perform(setClosedMode())
        // ... assert the folded-state UI

        onDevice().perform(setFlatMode())
        // ... assert the unfolded-state UI
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onDevice()` | `() -> DeviceInteraction` | Entry point (`EspressoDevice.onDevice`); must not be called on the main thread. |
| `DeviceInteraction.perform(action: DeviceAction)` | `(DeviceAction) -> DeviceInteraction` | Executes a `DeviceAction` and blocks until it completes. |
| `setScreenOrientation(orientation: ScreenOrientation)` | `() -> DeviceAction` | `ScreenOrientation.PORTRAIT` or `ScreenOrientation.LANDSCAPE`. |
| `setFlatMode()` / `setClosedMode()` / `setTabletopMode()` / `setBookMode()` | `() -> DeviceAction` | Sets a foldable emulator to the matching `DeviceMode` posture; foldable emulators only, throws `DeviceControllerOperationException` on a non-foldable emulator and `UnsupportedDeviceOperationException` on a real device. |
| `setDisplaySize(widthSizeClass: WidthSizeClass, heightSizeClass: HeightSizeClass)` | `() -> DeviceAction` | Resizes the emulator's window to the given `WidthSizeClass`/`HeightSizeClass` bucket (`COMPACT`, `MEDIUM`, `EXPANDED`). |
| `DeviceMode` | enum | `FLAT`, `TABLETOP`, `BOOK`, `CLOSED` — the postures a foldable device can report. |
| `@RequiresDeviceMode(mode: DeviceMode)` | annotation | Skips (does not fail) the test/class on a device that doesn't support the given `DeviceMode`; repeatable. |
| `@RequiresDisplay(widthSizeClass, heightSizeClass)` | annotation | Skips the test/class on a device whose display doesn't match the given `WidthSizeClassEnum`/`HeightSizeClassEnum`. |
| `ScreenOrientationRule(defaultOrientation: ScreenOrientation? = null)` | `TestRule` | Restores the given (or the test's starting) orientation when the test finishes. |
| `DisplaySizeRule` | `TestRule` | Resets the emulator's display size (`wm size reset`) when the test finishes; requires API 24+. |

## Notes

- Artifact: `androidx.test.espresso:espresso-device`, added as `androidTestImplementation`. Requires Android Gradle plugin 8.3+ and Android Emulator 33.1.10+ on an API 24+ AVD.
- Requires `enableEmulatorControl` set in `gradle.properties` (`android.experimental.androidTest.enableEmulatorControl=true`) or the module `testOptions.emulatorControl.enable = true`, plus `INTERNET` / `ACCESS_NETWORK_STATE` permissions in the `androidTest` manifest.
- Foldable posture actions (`setFlatMode`/`setClosedMode`/`setTabletopMode`/`setBookMode`) and `setDisplaySize` are currently supported on Android Emulators only, not physical devices.
- Works with both View-system Espresso and Compose test rules, and with UI Automator, since it only drives the emulator/device state, not a specific UI toolkit.

## Related

- [Espresso.onView](./onview.md)
- [IdlingResource](./idling-resource.md)
