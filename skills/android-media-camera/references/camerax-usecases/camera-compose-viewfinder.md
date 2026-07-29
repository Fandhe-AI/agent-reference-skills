# Compose viewfinder

Displaying the CameraX preview in Jetpack Compose, either via the dedicated `CameraXViewfinder` composable or by wrapping `PreviewView` with `AndroidView`.

## Signature / Usage

```kotlin
// Recommended: CameraXViewfinder (androidx.camera:camera-compose)
val surfaceRequest by produceState<SurfaceRequest?>(initialValue = null) {
    val preview = Preview.Builder().build()
    preview.setSurfaceProvider { request -> value = request }
    cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview)
}

surfaceRequest?.let { request ->
    CameraXViewfinder(
        surfaceRequest = request,
        modifier = Modifier.fillMaxSize()
    )
}
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
| `surfaceRequest` | `SurfaceRequest` | — | Required. Frame surface request published via `Preview.setSurfaceProvider { request -> ... }`; there is no `controller: CameraController` parameter/overload. |
| `modifier` | `Modifier` | `Modifier` | Standard Compose modifier. |
| `implementationMode` | `androidx.camera.viewfinder.core.ImplementationMode` | Chosen automatically (prefers `EXTERNAL`, falls back to `EMBEDDED` on `LEGACY` hardware level or known-incompatible devices) | Rendering strategy; this is a distinct type from `PreviewView.ImplementationMode`. |
| `contentScale` | `androidx.compose.ui.layout.ContentScale` | `ContentScale.Crop` | How the camera feed is scaled to fit the viewfinder bounds; replaces `PreviewView.ScaleType` in this composable (there is no `scaleType` parameter). |
| `alignment` | `androidx.compose.ui.Alignment` | `Alignment.Center` | How the camera feed is aligned within the viewfinder bounds. |

## Notes

- `CameraXViewfinder` is provided by the `androidx.camera:camera-compose` artifact and is the recommended Compose-native path (no `AndroidView` interop layer). It takes a `SurfaceRequest` directly and has no `CameraController`-driven overload; collect the `SurfaceRequest` from `Preview.setSurfaceProvider { request -> ... }` (e.g. into a `State` via `produceState`) and pass it as `surfaceRequest`.
- The `AndroidView` approach wraps the View-based `PreviewView` and is useful when a `CameraController` or manual `Preview.setSurfaceProvider` binding is already in place; `PreviewView.ImplementationMode` and `PreviewView.ScaleType` only apply to that path, not to `CameraXViewfinder`.
- Artifact: `androidx.camera:camera-compose` (for `CameraXViewfinder`) or `androidx.camera:camera-view` (for `PreviewView`).

## Related

- [PreviewView](./preview-view.md)
- [CameraController](./camera-controller.md)
