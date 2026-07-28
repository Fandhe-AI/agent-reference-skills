# CameraXConfig

Interface for customizing CameraX's default configuration for the lifetime of a `ProcessCameraProvider`: camera enumeration limits, executors, scheduler handler, logging level, and camera provider init retry policy. Provided at app startup via `CameraXConfig.Provider` on the `Application` class.

## Signature / Usage

```kotlin
class CameraApplication : Application(), CameraXConfig.Provider {
    override fun getCameraXConfig(): CameraXConfig {
        return CameraXConfig.Builder.fromConfig(Camera2Config.defaultConfig())
            .setAvailableCamerasLimiter(CameraSelector.DEFAULT_BACK_CAMERA)
            .setMinimumLoggingLevel(Log.ERROR)
            .build()
    }
}
```

```xml
<application android:name=".CameraApplication" ... />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Builder.fromConfig(configuration: CameraXConfig)` | static factory | — | Starts from a camera implementation config, typically `Camera2Config.defaultConfig()` or `CameraPipeConfig.defaultConfig()`. |
| `setCameraExecutor(executor: Executor)` | `Builder` | internal executor | Custom executor for internal Camera platform API calls; must not run on the main thread. |
| `setSchedulerHandler(handler: Handler)` | `Builder` | internal `HandlerThread` | Replaces the handler used to schedule internal fixed-interval tasks (e.g. camera-open retries). |
| `setMinimumLoggingLevel(logLevel: Int)` | `Builder` | `Log.DEBUG` | Filters logcat output; one of `Log.DEBUG`, `Log.INFO`, `Log.WARN`, `Log.ERROR`. |
| `setAvailableCamerasLimiter(availableCameraSelector: CameraSelector)` | `Builder` | none | Restricts camera enumeration to cameras matching the selector, reducing startup latency. |
| `setCameraProviderInitRetryPolicy(retryPolicy: RetryPolicy)` | `Builder` | default `RetryPolicy` | Customizes retry behavior when `ProcessCameraProvider` initialization fails. |
| `Provider.getCameraXConfig()` | `CameraXConfig` | — | Implemented on `Application` to supply configuration before first use. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- Two camera implementations can be selected via `fromConfig()`: `Camera2Config` (`androidx.camera:camera-camera2`, stable) or `CameraPipeConfig` (`androidx.camera:camera-camera2-pipe-integration`).
- Register the `Application` subclass implementing `CameraXConfig.Provider` in `AndroidManifest.xml` via `android:name`.
- Artifact: `androidx.camera:camera-core` (interface), `androidx.camera:camera-camera2` (`Camera2Config`).

## Related

- [CameraFilter](./camera-filter.md)
- [CameraSelector](../camerax-usecases/camera-selector.md)
- [CameraState](./camera-state.md)
