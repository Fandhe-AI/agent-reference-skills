# PiP setup

Manifest and `PictureInPictureParams.Builder` configuration required to make an activity support Picture-in-Picture, auto-enter it, and set its source rect / aspect ratio.

## Signature / Usage

```xml
<activity
    android:name=".SnippetsActivity"
    android:exported="true"
    android:supportsPictureInPicture="true"
    android:configChanges="orientation|screenLayout|screenSize|smallestScreenSize"
    android:theme="@style/Theme.Snippets" />
```

```kotlin
val pipModifier = modifier.onGloballyPositioned { layoutCoordinates ->
    val builder = PictureInPictureParams.Builder()
    if (shouldEnterPipMode && player != null && player.videoSize != VideoSize.UNKNOWN) {
        val sourceRect = layoutCoordinates.boundsInWindow().toAndroidRectF().toRect()
        builder.setSourceRectHint(sourceRect)
        builder.setAspectRatio(Rational(player.videoSize.width, player.videoSize.height))
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        builder.setAutoEnterEnabled(shouldEnterPipMode)
    }
    context.findActivity().setPictureInPictureParams(builder.build())
}
VideoPlayer(pipModifier)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:supportsPictureInPicture` | `Boolean` (manifest) | `false` | Declares that the activity supports PiP. |
| `android:configChanges` | flags (manifest) | — | Set to `orientation\|screenLayout\|screenSize\|smallestScreenSize` to avoid activity relaunch on layout changes while in PiP. |
| `PictureInPictureParams.Builder.setAutoEnterEnabled(Boolean)` | `Builder` | — | API 31 (S)+. Automatically enters PiP when the user leaves the activity. |
| `PictureInPictureParams.Builder.setSourceRectHint(Rect)` | `Builder` | — | Hints the region of the screen the PiP window should animate from. |
| `PictureInPictureParams.Builder.setAspectRatio(Rational)` | `Builder` | — | Aspect ratio of the PiP window; must be between 2.39:1 and 1:2.39 inclusive or the app crashes. |
| `Activity.enterPictureInPictureMode(params)` | `Boolean` | — | Manually enters PiP (used pre-Android 12 via `addOnUserLeaveHintListener`). |

## Notes

- Pre-Android 12 (API < 31): enter PiP manually inside an `Activity.addOnUserLeaveHintListener` callback.
- Android 12 (API 31)+: prefer `setAutoEnterEnabled(true)` combined with `setPictureInPictureParams()`.
- Aspect ratio bounds violation (`setAspectRatio`) crashes the app — always stay within 2.39:1–1:2.39.
- Package: `android.app.PictureInPictureParams`.

## Related

- [Picture-in-Picture (PiP)](./picture-in-picture.md)
