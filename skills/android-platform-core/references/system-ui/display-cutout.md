# Display cutout

Handles the area on devices that extends into the display surface (notch/pinhole camera) so an edge-to-edge UI leaves space for front-facing sensors without hardcoding bar heights. Supported on Android 9 (API 28)+.

## Signature / Usage

```kotlin
Canvas(modifier = Modifier
    .fillMaxSize()
    .windowInsetsPadding(WindowInsets.displayCutout)) {
    drawRect(Color.Red, style = Stroke(2.dp.toPx()))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WindowInsets.displayCutout` | `WindowInsets` | — | Padding around the cutout area. |
| `WindowInsets.safeContent` / `safeDrawing` | `WindowInsets` | — | Also account for the cutout as part of a broader safe area. |
| `layoutInDisplayCutoutMode` (window attribute) | enum | `LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT` | `DEFAULT` renders into the cutout only when it's inside a system bar; `ALWAYS` always extends into the cutout; `SHORT_EDGES` extends in both portrait and landscape. |

```kotlin
LocalView.current.rootWindowInsets.displayCutout
```

## Notes

- On API 34 and lower, apps don't draw into the cutout region by default unless drawing into a system bar containing it. On Android 15 (API 35)+, apps automatically draw into the cutout region.
- Apps targeting API 35+ in non-floating windows treat cutout layout modes as `LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS`.
- Do not hardcode status bar height, and avoid placing critical interactive elements in the cutout area (touch sensitivity is lower there).
- Package: `androidx.compose.foundation.layout` (insets) / `android.view.WindowManager.LayoutParams` (`layoutInDisplayCutoutMode`).

## Related

- [WindowInsets](./window-insets.md)
- [enableEdgeToEdge](./edge-to-edge.md)
