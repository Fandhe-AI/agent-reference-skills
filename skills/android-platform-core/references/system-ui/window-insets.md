# WindowInsets

Provides information about system UI (status bar, navigation bar, display cutouts, IME) so an app draws in the correct area and content isn't obscured. On Android 15 (API 35)+, apps draw underneath system bars by default (edge-to-edge is enforced); on API 34 and lower, apps don't draw under system bars by default.

## Signature / Usage

```kotlin
Box(Modifier.windowInsetsPadding(WindowInsets.safeDrawing)) {
    // content
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WindowInsets.safeDrawing` | `WindowInsets` | — | Prevents content from being obscured by system UI. Most common inset to use. |
| `WindowInsets.safeGestures` | `WindowInsets` | — | Protects gesture-based content from conflicting with system gesture areas. |
| `WindowInsets.safeContent` | `WindowInsets` | — | Union of `safeDrawing` and `safeGestures`. |
| `WindowInsets.statusBars` / `statusBarsIgnoringVisibility` | `WindowInsets` | — | Top system bar (notifications, indicators). |
| `WindowInsets.navigationBars` / `navigationBarsIgnoringVisibility` | `WindowInsets` | — | Bottom/side navigation bar. |
| `WindowInsets.systemBars` / `systemBarsIgnoringVisibility` | `WindowInsets` | — | Union of status, navigation, and caption bars. |
| `WindowInsets.ime` | `WindowInsets` | — | Space occupied by the on-screen keyboard. |
| `WindowInsets.displayCutout` | `WindowInsets` | — | Space around a notch or pinhole camera. |
| `WindowInsets.waterfall` | `WindowInsets` | — | Curved edge areas of waterfall displays. |
| `WindowInsets.tappableElement` / `systemGestures` | `WindowInsets` | — | Navigation gesture areas. |
| `WindowInsets.mandatorySystemGestures` | `WindowInsets` | — | System gestures that cannot be opted out of. |

## Notes

- Use `WindowInsets.safeDrawing` for most cases; `safeGestures` for interactive/gesture content; `safeContent` for both.
- Material 3 `Scaffold` reduces the work required for Android 15 edge-to-edge compatibility via its `contentWindowInsets` parameter.
- On Android 15+, edge-to-edge is enforced when targeting SDK 35 — unhandled insets may hide portions of the app.
- Package: `androidx.compose.foundation.layout`.

## Related

- [Modifier.windowInsetsPadding and friends](./window-insets-modifiers.md)
- [Material3 insets](./material3-insets.md)
- [Edge-to-edge](./edge-to-edge.md)
- [Display cutout](./display-cutout.md)
