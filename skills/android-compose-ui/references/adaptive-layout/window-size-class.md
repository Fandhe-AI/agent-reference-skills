# WindowSizeClass

Represents breakpoints for a viewport's width and height, used to design layouts around different window size buckets (compact, medium, expanded, large, extra-large).

## Signature / Usage

```kotlin
public class WindowSizeClass(
    public val minWidthDp: Int,
    public val minHeightDp: Int,
)

public fun isWidthAtLeastBreakpoint(widthDpBreakpoint: Int): Boolean
public fun isHeightAtLeastBreakpoint(heightDpBreakpoint: Int): Boolean
public fun isAtLeastBreakpoint(widthDpBreakpoint: Int, heightDpBreakpoint: Int): Boolean
```

```kotlin
val windowSizeClass = currentWindowAdaptiveInfo().windowSizeClass
val showTopAppBar = windowSizeClass.isHeightAtLeastBreakpoint(
    WindowSizeClass.HEIGHT_DP_MEDIUM_LOWER_BOUND
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `minWidthDp` | `Int` | — | Minimum width in dp for this size class bucket. |
| `minHeightDp` | `Int` | — | Minimum height in dp for this size class bucket. |

## Notes

- Width breakpoints: compact `< 600dp`, medium `600–840dp`, expanded `840–1200dp`, large `1200–1600dp`, extra-large `>= 1600dp`.
- Height breakpoints: compact `< 480dp`, medium `480–900dp`, expanded `>= 900dp`.
- Two window size classes exist at any time — one for width, one for height — and they change independently as the window resizes.
- `WindowSizeClass.compute(dpWidth, dpHeight)` is deprecated; use `currentWindowAdaptiveInfo()` (Compose) or `computeWindowSizeClass` instead.
- Width is typically more important than height for layout decisions, since vertical scrolling is commonplace.
- A separate, superseded legacy API exists in the `androidx.compose.material3:material3-window-size-class` artifact (`androidx.compose.material3.windowsizeclass` package): `WindowWidthSizeClass` / `WindowHeightSizeClass` value classes plus an Activity-based `calculateWindowSizeClass()` function. It predates `androidx.window.core.layout.WindowSizeClass` / `currentWindowAdaptiveInfo()` and should not be used in new code targeting the adaptive-layout APIs on this page.
- Package: `androidx.window.core.layout`.

## Related

- [WindowAdaptiveInfo](./window-adaptive-info.md)
- [PaneScaffoldDirective](./pane-scaffold-directive.md)
