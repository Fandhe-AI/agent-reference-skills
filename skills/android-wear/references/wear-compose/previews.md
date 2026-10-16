# Preview your UI in Compose for Wear OS (@WearPreview* / WearDevices)

Android Studio Compose Previews let you inspect Wear OS composables across watch display sizes, round bezels, and font scales in the IDE without a physical watch or emulator. Because Wear displays are circular and system overlays such as `TimeText` and `ScrollIndicator` curve along the edge, Wear-specific preview configuration helps catch layout issues early.

## Signature / Usage

Dependencies (`build.gradle.kts`):

```kotlin
dependencies {
    // Provides @WearPreview* multipreview annotations
    // (such as @WearPreviewDevices and @WearPreviewFontScales)
    implementation("androidx.wear.compose:compose-ui-tooling:1.8.0-alpha01")

    // Provides WearDevices constants
    // (such as WearDevices.SMALL_ROUND and WearDevices.LARGE_ROUND)
    implementation("androidx.wear:wear-tooling-preview:1.0.0")

    // Standard Compose preview support and interactive/animation inspection
    implementation("androidx.compose.ui:ui-tooling-preview")
    debugImplementation("androidx.compose.ui:ui-tooling")
}
```

Full screen (wrap in `AppScaffold`; the screen composable contains its own `ScreenScaffold`):

```kotlin
@WearPreviewDevices
@Composable
fun WorkoutScreenPreview() {
    MaterialTheme {
        // AppScaffold provides the top-level TimeText overlay
        AppScaffold {
            // WorkoutScreen contains its own ScreenScaffold and content
            WorkoutScreen(
                heartRate = 142,
                elapsedTime = "12:45"
            )
        }
    }
}
```

Isolated component (no `device`, dark background):

```kotlin
@Preview(
    showBackground = true,
    backgroundColor = 0xFF000000
)
@Composable
fun HeartRateCardPreview() {
    MaterialTheme {
        HeartRateCard(bpm = 142, zone = "Aerobic")
    }
}
```

Custom hardware spec and custom multipreview:

```kotlin
@Preview(
    name = "XL Round Watch (240dp)",
    device = "spec:width=240dp,height=240dp,dpi=320,isRound=true",
    showBackground = true,
    backgroundColor = 0xFF000000
)
@Composable
fun WorkoutScreenXlPreview() { /* ... */ }

@Preview(
    name = "1. Standard Large Round",
    group = "Layout extremes",
    device = WearDevices.LARGE_ROUND,
    backgroundColor = 0xFF000000,
    showBackground = true
)
@Preview(
    name = "2. Extreme Small Round (Largest Font + German)",
    group = "Layout extremes",
    device = WearDevices.SMALL_ROUND,
    fontScale = 1.24f,
    locale = "de-rDE",
    backgroundColor = 0xFF000000,
    showBackground = true
)
annotation class WearPreviewExtremes
```

Previewing a scrolled `TransformingLazyColumn` (hoist state, then set `initialAnchorItemIndex`):

```kotlin
@Composable
fun InboxScreen(
    messages: List<Message>,
    columnState: TransformingLazyColumnState = rememberTransformingLazyColumnState(),
) { /* ScreenScaffold(scrollState = columnState, ...) { TransformingLazyColumn(state = columnState, ...) } */ }

@WearPreviewLargeRound
@Composable
fun InboxScreenScrolledMiddlePreview() {
    MaterialTheme {
        AppScaffold {
            // Centers item index 3 in the viewport, showing top/bottom item morphing
            InboxScreen(
                messages = sampleMessages,
                columnState = rememberTransformingLazyColumnState(initialAnchorItemIndex = 3)
            )
        }
    }
}
```

Guard the scroll indicator during scroll capture:

```kotlin
ScreenScaffold(
    scrollState = columnState,
    scrollIndicator = {
        if (!LocalScrollCaptureInProgress.current) {
            ScrollIndicator(state = columnState)
        }
    }
) { contentPadding ->
    // TransformingLazyColumn content...
}
```

## Options / Props

Built-in multipreview annotations (package `androidx.wear.compose.ui.tooling.preview`; they set `backgroundColor = 0xFF000000`, `showBackground = true` and circular device dimensions):

| Name | What it renders | When to use |
|------|-----------------|-------------|
| `@WearPreviewSmallRound` | 1 preview on `WearDevices.SMALL_ROUND` (192x192dp) | Quick iteration on the most constrained circular display. |
| `@WearPreviewLargeRound` | 1 preview on `WearDevices.LARGE_ROUND` (227x227dp) | Inspecting layout density and extra spacing on larger watches. |
| `@WearPreviewDevices` | 2 previews: `SMALL_ROUND` and `LARGE_ROUND` | Standard multidevice check for every screen composable. |
| `@WearPreviewFontScales` | 6 previews on `SMALL_ROUND`: Small (0.94f), Normal (1.0f), Medium (1.06f), Large (1.12f), Larger (1.18f), Largest (1.24f) | Checking text wrapping, ellipsizing, button height expansion. |

`WearDevices` (`androidx.wear.tooling.preview.devices.WearDevices`):

| Name | Value |
|------|-------|
| `WearDevices.SMALL_ROUND` | `"id:wearos_small_round"` (192x192dp) |
| `WearDevices.LARGE_ROUND` | `"id:wearos_large_round"` (227x227dp) |

`rememberTransformingLazyColumnState` initial scroll parameters:

| Name | Type | Description |
|------|------|-------------|
| `initialAnchorItemIndex` | `Int` | Non-negative index (e.g. `3`) centers that item in the watch viewport; default pins index 0 to the top. |
| `initialAnchorItemScrollOffset` | `Int` | Optional pixel offset relative to the centered anchor item. |

## Notes

- `@WearPreviewDevices` and `@WearPreviewFontScales` can be stacked on one function (the guide calls this a comprehensive test matrix); the preview sets are added together (2 device previews + 6 font-scale previews on `SMALL_ROUND`), not combined as a device x font-scale cross product. For specific combinations (e.g. `LARGE_ROUND` at 1.24f), define a custom multipreview annotation with explicit `@Preview(device = ..., fontScale = ...)` entries.
- For full screens always use a Wear device annotation with `AppScaffold` + `ScreenScaffold` so `TimeText` (top curved edge), `ScrollIndicator` (right bezel), `EdgeButton` (clipped at bottom curve), and circular clipping render accurately.
- For isolated components omit `device` and use `@Preview` with a dark background so Wear Material 3 colors and contrast appear accurately.
- For extra-large round displays (44mm-45mm watches, Ultra models at 240x240dp) pass a custom `spec:` string to `device`.
- `EdgeButton` only appears when the list is scrolled to the bottom; in a `TransformingLazyColumn`, items morph height and rounded corners (`SurfaceTransformation`) near the curved edges, so preview scrolled states with `initialAnchorItemIndex` (e.g. `sampleMessages.lastIndex` for the bottom).
- `ScreenScaffold` does not automatically hide its `scrollIndicator` during scroll capture (long screenshots / multi-frame screenshot tests, where `LocalScrollCaptureInProgress.current` is `true`); guard it with `!LocalScrollCaptureInProgress.current` or the scrollbar repeats on every stitched tile.
- The guide shows `compose-ui-tooling:1.8.0-alpha01` (alpha); the current stable Wear Compose release is 1.7.1 (see migrate-to-material3.md). Keep compose-ui-tooling aligned with the other androidx.wear.compose artifacts.
- Source: https://developer.android.com/training/wearables/compose/previews

## Related

- [Scaffold (AppScaffold / ScreenScaffold)](./scaffold.md)
- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
- [Edge button](./edge-button.md)
- [Time text](./time-text.md)
- [Screen sizes](./screen-sizes.md)
