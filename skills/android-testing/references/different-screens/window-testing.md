# Window Testing library

The `androidx.window:window-testing` artifact provides utilities for tests that rely on or verify window-management features such as activity embedding and foldable features (`FoldingFeature()`, `TestWindowLayoutInfo()`, `WindowLayoutInfoPublisherRule`).

## Signature / Usage

```kotlin
import androidx.window.layout.FoldingFeature.Orientation.Companion.VERTICAL
import androidx.window.layout.FoldingFeature.State.Companion.HALF_OPENED
import androidx.window.testing.layout.FoldingFeature
import androidx.window.testing.layout.TestWindowLayoutInfo
import androidx.window.testing.layout.WindowLayoutInfoPublisherRule

@RunWith(AndroidJUnit4::class)
class MediaControlsFoldingFeatureTest {

    @get:Rule(order=1)
    val composeTestRule = createAndroidComposeRule<ComponentActivity>()

    @get:Rule(order=2)
    val windowLayoutInfoPublisherRule = WindowLayoutInfoPublisherRule()

    @Test
    fun foldedWithHinge_foldableUiDisplayed() {
        composeTestRule.setContent {
            MediaPlayerScreen()
        }

        val hinge = FoldingFeature(
            activity = composeTestRule.activity,
            state = HALF_OPENED,
            orientation = VERTICAL,
            size = 2
        )

        val expected = TestWindowLayoutInfo(listOf(hinge))
        windowLayoutInfoPublisherRule.overrideWindowLayoutInfo(expected)

        composeTestRule.waitForIdle()

        // Verify that the folding feature is detected and media controls shown.
        composeTestRule.onNodeWithTag("MEDIA_CONTROLS").assertExists()
    }
}
```

Compose preview with a custom `FoldingFeature`:

```kotlin
@Preview(showBackground = true, widthDp = 480, heightDp = 480)
@Composable private fun FoldablePreview() =
    MyApplicationTheme {
        ExampleScreen(
            displayFeatures = listOf(FoldingFeature(Rect(0, 240, 480, 240)))
        )
 }
```

Views variant:

```kotlin
import androidx.window.layout.FoldingFeature.Orientation
import androidx.window.layout.FoldingFeature.State
import androidx.window.testing.layout.FoldingFeature
import androidx.window.testing.layout.TestWindowLayoutInfo
import androidx.window.testing.layout.WindowLayoutInfoPublisherRule

@RunWith(AndroidJUnit4::class)
class MediaControlsFoldingFeatureTest {

    @get:Rule(order=1)
    val activityRule = ActivityScenarioRule(MediaPlayerActivity::class.java)

    @get:Rule(order=2)
    val windowLayoutInfoPublisherRule = WindowLayoutInfoPublisherRule()

    @Test
    fun foldedWithHinge_foldableUiDisplayed() {
        activityRule.scenario.onActivity { activity ->
            val feature = FoldingFeature(
                activity = activity,
                state = State.HALF_OPENED,
                orientation = Orientation.VERTICAL)
            val expected = TestWindowLayoutInfo(listOf(feature))
            windowLayoutInfoPublisherRule.overrideWindowLayoutInfo(expected)
        }

        // Verify that the folding feature is detected and media controls shown.
        onView(withId(R.id.media_controls)).check(matches(isDisplayed()))
    }
}
```

## Notes

- Available through Google's Maven Repository as `androidx.window:window-testing`.
- `FoldingFeature()` (package `androidx.window.testing.layout`) generates a custom `FoldingFeature`, usable in Compose previews. In Java, use `createFoldingFeature()` from `DisplayFeatureTesting`.
- `TestWindowLayoutInfo()` emulates display features in UI tests; the example simulates a `HALF_OPENED` vertical hinge in the screen's center and checks that the expected layout is shown.
- The Views test must run on a display large enough to lay out the elements on screen as expected.
- Posture changes do not trigger configuration changes, so posture-dependent logic is tested with these utilities or Espresso Device rather than by resizing.
- Scope: this page covers only the test utilities in `window-testing`. The production-side `FoldingFeature` / `WindowInfoTracker` APIs and adaptive-layout design are covered by the android-compose-ui skill (adaptive-layout category).
- More samples: the WindowManager project in github.com/android/platform-samples (`samples/user-interface/windowmanager`).
- Source: https://developer.android.com/training/testing/different-screens/tools#window-testing-library

## Related

- [overview](./overview.md)
- [libraries-and-tools](./libraries-and-tools.md)
