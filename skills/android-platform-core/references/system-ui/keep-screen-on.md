# Keep screen on

Prevents the device screen from dimming/locking while specific content (e.g. video playback, active gameplay) is on screen, via the `FLAG_KEEP_SCREEN_ON` window flag, its XML equivalent, or the newer Compose modifier.

## Signature / Usage

```kotlin
class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }
}
```

```kotlin
// Compose: toggle the flag for the composable's lifetime
DisposableEffect(Unit) {
    val window = (view.context as Activity).window
    window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    onDispose {
        window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON` | window flag | unset | Set on an activity's `Window` only (never a service). Prevents the screen from sleeping. |
| `android:keepScreenOn` | `Boolean` (view XML attr) | `false` | Equivalent to `FLAG_KEEP_SCREEN_ON`, applied declaratively on a view, without programmatic toggling. |
| `Modifier.keepScreenOn()` | `Modifier` | — | Declarative Compose modifier (`androidx.compose.ui`) that keeps the screen on while the modified node is part of the composition; added as an alternative to manual `DisposableEffect` + `FLAG_KEEP_SCREEN_ON`. |

## Notes

- Keeping the screen on drains the battery — scope it to the shortest time necessary (e.g. only while a video is actively playing).
- The system automatically allows the screen to turn off once the app goes to background, regardless of the flag.
- `Modifier.keepScreenOn()` is a newer, more composable alternative to manually managing `FLAG_KEEP_SCREEN_ON` via `DisposableEffect`; verify availability against the `androidx.compose.ui` version in use.
- On TV, `FLAG_KEEP_SCREEN_ON` also prevents entering Ambient Mode during video playback.

## Related

- [Picture-in-Picture (PiP)](./picture-in-picture.md)
