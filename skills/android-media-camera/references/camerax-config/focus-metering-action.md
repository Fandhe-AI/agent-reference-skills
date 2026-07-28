# FocusMeteringAction

A configuration used to trigger a focus and/or metering (3A) action on a camera, typically for tap-to-focus. Built with one or more `MeteringPoint`s and passed to `CameraControl.startFocusAndMetering()`.

## Signature / Usage

```kotlin
val factory = SurfaceOrientedMeteringPointFactory(1.0f, 1.0f)
// or, mapped from a View's touch coordinates:
val factory = DisplayOrientedMeteringPointFactory(
    display, cameraInfo, previewView.width.toFloat(), previewView.height.toFloat()
)
val point = factory.createPoint(x, y)

val action = FocusMeteringAction.Builder(point, FocusMeteringAction.FLAG_AF or FocusMeteringAction.FLAG_AE)
    .setAutoCancelDuration(5, TimeUnit.SECONDS)
    .build()

val future = cameraControl.startFocusAndMetering(action)
future.addListener({
    val result = future.get()
    val focused = result.isFocusSuccessful
}, ContextCompat.getMainExecutor(context))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Builder(point: MeteringPoint)` | constructor | — | Creates a builder with the default metering mode (`FLAG_AF or FLAG_AE or FLAG_AWB`). |
| `Builder(point: MeteringPoint, meteringMode: Int)` | constructor | — | Creates a builder with an explicit combination of `FLAG_AF` / `FLAG_AE` / `FLAG_AWB`. |
| `addPoint(point: MeteringPoint)` / `addPoint(point, meteringMode)` | `Builder` | — | Adds an additional metering point. |
| `setAutoCancelDuration(duration: Long, unit: TimeUnit)` | `Builder` | 5s | Time after which the action auto-cancels and resumes continuous AF. |
| `disableAutoCancel()` | `Builder` | — | Disables auto-cancel entirely. |
| `setLockingMode(lockingMode: Int)` | `Builder` | `AUTO_CANCEL_DURATION_ENABLED` behavior | Sets which 3A components remain locked after the action completes. |
| `removePoints(meteringMode: Int)` | `Builder` | — | Removes all previously added points for the given mode. |
| `FLAG_AF` / `FLAG_AE` / `FLAG_AWB` | `Int` constants | — | Enables auto-focus / auto-exposure / auto-white-balance metering regions respectively. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- `FocusMeteringResult.isFocusSuccessful()` returns `false` if AF was not requested, or if the device does not support AF.
- `MeteringPoint` instances are created via a `MeteringPointFactory`, most commonly `DisplayOrientedMeteringPointFactory` (View coordinates) or `SurfaceOrientedMeteringPointFactory` (normalized `[0,1]` coordinates).
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraControl](./camera-control.md)
