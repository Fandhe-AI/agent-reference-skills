# Compose viewfinder

Displaying the CameraX preview in Jetpack Compose, either via the dedicated `CameraXViewfinder` composable or by wrapping `PreviewView` with `AndroidView`.

## Signature / Usage

```kotlin
// Recommended: CameraXViewfinder (androidx.camera:camera-compose)
CameraXViewfinder(
    modifier = Modifier.fillMaxSize(),
    controller = cameraController,
    implementationMode = PreviewView.ImplementationMode.COMPATIBLE,
    scaleType = PreviewView.ScaleType.FILL_CENTER
)
```

```kotlin
// Alternative: wrap PreviewView with AndroidView
AndroidView(
    modifier = Modifier.fillMaxSize(),
    factory = { context ->
        PreviewView(context).apply {
            implementationMode = PreviewView.ImplementationMode.PERFORMANCE
            scaleType = PreviewView.ScaleType.FIT_CENTER
            controller = cameraController
        }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `controller` | `CameraController` | — | Drives the viewfinder; typically a `LifecycleCameraController`. |
| `implementationMode` | `PreviewView.ImplementationMode` | `PERFORMANCE` | Same semantics as `PreviewView.implementationMode`. |
| `scaleType` | `PreviewView.ScaleType` | `FILL_CENTER` | Same semantics as `PreviewView.scaleType`. |

## Notes

- `CameraXViewfinder` is provided by the `androidx.camera:camera-compose` artifact and is the recommended Compose-native path (no `AndroidView` interop layer).
- The `AndroidView` approach wraps the View-based `PreviewView` and is useful when a `CameraController` or manual `Preview.setSurfaceProvider` binding is already in place.
- Artifact: `androidx.camera:camera-compose` (for `CameraXViewfinder`) or `androidx.camera:camera-view` (for `PreviewView`).

## Related

- [PreviewView](./preview-view.md)
- [CameraController](./camera-controller.md)
