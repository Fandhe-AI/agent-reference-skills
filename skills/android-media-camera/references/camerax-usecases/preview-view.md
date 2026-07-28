# PreviewView

A `View` that displays the camera feed for `Preview`, handling cropping, scaling, and rotation of the output automatically.

## Signature / Usage

```xml
<androidx.camera.view.PreviewView
    android:id="@+id/previewView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

```kotlin
previewView.implementationMode = PreviewView.ImplementationMode.PERFORMANCE
previewView.scaleType = PreviewView.ScaleType.FIT_CENTER

preview.setSurfaceProvider(previewView.surfaceProvider)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `implementationMode` | `PreviewView.ImplementationMode` | `PERFORMANCE` | `PERFORMANCE` uses `SurfaceView` (hardware overlay, lower power/latency) with fallback to `TextureView`; `COMPATIBLE` always uses `TextureView`, enabling extra processing like scaling/rotation. |
| `scaleType` | `PreviewView.ScaleType` | `FILL_CENTER` | `FIT_*` letterboxes to show the full frame; `FILL_*` crops to fill the view. `*_CENTER`/`*_START`/`*_END` control alignment. |
| `surfaceProvider` | `Preview.SurfaceProvider` (read-only) | — | Obtained via `previewView.surfaceProvider`, passed to `Preview.setSurfaceProvider()`. |
| `viewPort` | `ViewPort` (read-only) | — | Obtained via `previewView.viewPort`; use to build a `UseCaseGroup` so other use cases match what is shown. |
| `controller` | `CameraController?` | `null` | Assign a `CameraController`/`LifecycleCameraController` to drive this view instead of manual `Preview` binding. |

## Notes

- `FIT_*` scale = `min(dst.width/src.width, dst.height/src.height)`; `FILL_*` scale = `max(...)`.
- Cannot combine manual `SurfaceTexture`/`TextureView`/`SurfaceView` handling with `PreviewView`'s own `SurfaceProvider`.
- Artifact: `androidx.camera:camera-view`.

## Related

- [Preview](./preview.md)
- [Compose viewfinder](./camera-compose-viewfinder.md)
- [UseCaseGroup and ViewPort](./use-case-group-viewport.md)
- [CameraController](./camera-controller.md)
