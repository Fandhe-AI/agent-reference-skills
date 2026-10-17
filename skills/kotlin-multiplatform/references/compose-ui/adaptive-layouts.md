---
source: https://kotlinlang.org/docs/multiplatform/compose-adaptive-layouts.html
---

# Adaptive layouts

Adapt the UI to different display sizes, orientations and input modes. Window size classes are predefined breakpoints that categorize the available display area for width and height into compact, medium and expanded.

## Signature / Usage

Add the `material3.adaptive` dependency to the common source set in `build.gradle.kts`:

```kotlin
commonMain.dependencies {
    implementation("org.jetbrains.compose.material3.adaptive:adaptive:1.3.0")
}
```

Use `WindowSizeClass`, for example to show the top app bar depending on window height:

```kotlin
import androidx.window.core.layout.WindowSizeClass
import androidx.compose.material3.adaptive.currentWindowAdaptiveInfoV2
...

@Composable
fun MyApp(
    windowSizeClass: WindowSizeClass = currentWindowAdaptiveInfoV2().windowSizeClass
) {
    // Determines whether the top app bar should be displayed
    val showTopAppBar = windowSizeClass.isHeightAtLeastBreakpoint(WindowSizeClass.HEIGHT_DP_MEDIUM_LOWER_BOUND)

    // Uses bar visibility to define UI
    MyScreen(
        showTopAppBar = showTopAppBar,
        /* ... */
    )
}
```

## Notes

- Design guidelines from the page: prefer canonical layout patterns (list-detail, feed, supporting pane); reuse shared styles and keep navigation patterns consistent while following platform guidelines; break complex layouts into reusable composables; adjust for screen density and orientation.
- Test layout behavior across all window sizes, especially at the breakpoint thresholds.
- The version `1.3.0` is the `org.jetbrains.compose.material3.adaptive` value in the docs' version list (`v.list` at the pinned docs commit).
- android-only-components.md lists the Jetpack `material3-adaptive` and `material3-window-size-class` libraries as not available in `commonMain`; this page uses the `org.jetbrains.compose.material3.adaptive` artifact.
- Distance line: the common Jetpack adaptive API is documented by android-compose-components / android-compose-ui; this page covers the `org.jetbrains.compose` artifact coordinates.

## Related

- [Layout basics](./layout-basics.md)
- [Android-only components](./android-only-components.md)
