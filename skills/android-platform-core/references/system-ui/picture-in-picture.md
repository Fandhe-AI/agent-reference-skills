# Picture-in-Picture (PiP)

A multi-window mode, primarily for video playback, that lets a user watch a small pinned video window while navigating other apps. Requires Android 7.0 (API 24)+ multi-window support.

## Signature / Usage

```kotlin
@Composable
fun rememberIsInPipMode(): Boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val activity = LocalContext.current.findActivity()
        var pipMode by remember { mutableStateOf(activity.isInPictureInPictureMode) }
        DisposableEffect(activity) {
            val observer = Consumer<PictureInPictureModeChangedInfo> { info ->
                pipMode = info.isInPictureInPictureMode
            }
            activity.addOnPictureInPictureModeChangedListener(observer)
            onDispose { activity.removeOnPictureInPictureModeChangedListener(observer) }
        }
        return pipMode
    } else {
        return false
    }
}
```

## Notes

- Google recommends the Jetpack Picture-in-Picture library to streamline integration and reduce common issues, over hand-rolling `PictureInPictureParams` calls.
- The entire UI enters the PiP window by default; use PiP-mode detection to conditionally hide non-essential UI and keep video playback running.
- Track PiP transitions with `Activity.addOnPictureInPictureModeChangedListener` (`OnPictureInPictureModeChangedProvider`).
- Package: `android.app.PictureInPictureParams`, `androidx.core.util.Consumer`.

## Related

- [PiP setup](./pip-setup.md)
