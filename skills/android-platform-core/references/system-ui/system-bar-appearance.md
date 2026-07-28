# System bar appearance and immersive mode

Controls the appearance (icon color/contrast) and visibility (show/hide, immersive mode) of the status bar and navigation bar via `WindowInsetsControllerCompat`.

## Signature / Usage

```kotlin
val windowInsetsController = WindowCompat.getInsetsController(window, window.decorView)

// Hide system bars (immersive mode)
windowInsetsController.hide(WindowInsetsCompat.Type.systemBars())

// Show system bars
windowInsetsController.show(WindowInsetsCompat.Type.systemBars())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WindowInsetsControllerCompat.hide(types: Int)` | `Unit` | — | Hides the given system bar types (e.g. `WindowInsetsCompat.Type.systemBars()`). |
| `WindowInsetsControllerCompat.show(types: Int)` | `Unit` | — | Shows the given system bar types. |
| `WindowInsetsControllerCompat.systemBarsBehavior` | `Int` | `BEHAVIOR_DEFAULT` | Controls how hidden bars reappear on user swipe; `BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE` gives an immersive-sticky style. |
| `isAppearanceLightStatusBars` | `Boolean` | theme-derived | `true` renders dark (light-appearing-bar) status bar icons; `false` renders light icons. |
| `window.isNavigationBarContrastEnforced` | `Boolean` | `true` | Set `false` to remove the scrim behind a 3-button navigation bar for full transparency. |

```kotlin
// Set status bar icons to dark
WindowCompat.getInsetsController(window, window.decorView)
    .isAppearanceLightStatusBars = true

// Fully transparent 3-button navigation bar
window.isNavigationBarContrastEnforced = false
```

## Notes

- `WindowCompat.setDecorFitsSystemWindows(window, false)` is the pre-`enableEdgeToEdge()` way to opt into edge-to-edge; superseded by `enableEdgeToEdge()` in `androidx.activity`, which also sets bar styles/contrast for you.
- Immersive mode (`hide(systemBars())`) is commonly used for video/map content; combine with `systemBarsBehavior` for swipe-to-reveal.
- Desktop windowing apps always show a caption bar, even in immersive mode.
- Package: `androidx.core.view` (`WindowCompat`, `WindowInsetsControllerCompat`).

## Related

- [enableEdgeToEdge](./edge-to-edge.md)
- [WindowInsets](./window-insets.md)
