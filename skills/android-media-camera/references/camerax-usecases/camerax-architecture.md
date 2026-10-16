# CameraX architecture

Overview of CameraX structure (use cases), the API model (CameraController vs CameraProvider), lifecycle binding, concurrent use cases, requirements, dependency declaration, and Camera2 interop. Source: https://developer.android.com/media/camera/camerax/architecture

## Signature / Usage

```kotlin
// CameraController: simplest way to use CameraX
val previewView: PreviewView = viewBinding.previewView
var cameraController = LifecycleCameraController(baseContext)
cameraController.bindToLifecycle(this)
cameraController.cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
previewView.controller = cameraController
```

```kotlin
// CameraProvider: more flexibility
val preview = Preview.Builder().build()
val viewFinder: PreviewView = findViewById(R.id.previewView)

// The use case is bound to an Android Lifecycle with the following code
val camera = cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview)

// PreviewView creates a surface provider and is the recommended provider
preview.setSurfaceProvider(viewFinder.getSurfaceProvider())
```

```kotlin
// Bind multiple use cases in a single call, with one lifecycle owner
val camera = cameraProvider.bindToLifecycle(
        this as LifecycleOwner, cameraSelector, preview, imageCapture)
```

```kotlin
// Custom LifecycleOwner
class CustomLifecycle : LifecycleOwner {
    private val lifecycleRegistry: LifecycleRegistry

    init {
        lifecycleRegistry = LifecycleRegistry(this);
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }
    ...
    fun doOnResume() {
        lifecycleRegistry.markState(State.RESUMED)
    }
    ...
    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}
```

```kotlin
// Camera2 interop: set the underlying Camera2 stream use case
Camera2Interop.Extender(previewBuilder).setStreamUseCase(videoCallStreamId)
```

```kotlin
// Dependencies (module build.gradle, Kotlin DSL)
dependencies {
    // CameraX core library using the camera2 implementation
    val camerax_version = "1.7.0-alpha03"
    // The following line is optional, as the core library is included indirectly by camera-camera2
    implementation("androidx.camera:camera-core:${camerax_version}")
    implementation("androidx.camera:camera-camera2:${camerax_version}")
    // If you want to additionally use the CameraX Lifecycle library
    implementation("androidx.camera:camera-lifecycle:${camerax_version}")
    // If you want to additionally use the CameraX VideoCapture library
    implementation("androidx.camera:camera-video:${camerax_version}")
    // If you want to additionally use the CameraX View class
    implementation("androidx.camera:camera-view:${camerax_version}")
    // If you want to additionally add CameraX ML Kit Vision Integration
    implementation("androidx.camera:camera-mlkit-vision:${camerax_version}")
    // If you want to additionally use the CameraX Extensions library
    implementation("androidx.camera:camera-extensions:${camerax_version}")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Preview | use case | Accepts a surface for displaying a preview, such as a `PreviewView`. |
| ImageAnalysis | use case | Provides CPU-accessible buffers for analysis, such as machine learning. |
| ImageCapture | use case | Captures and saves a photo. |
| VideoCapture | use case | Captures video and audio. |
| CameraController | API model | Provides most core functionality in one class; handles initialization, use case management, target rotation, tap-to-focus, pinch-to-zoom. Concrete class: `LifecycleCameraController`. Default use cases: `Preview`, `ImageCapture`, `ImageAnalysis`; change with `setEnabledUseCases()`. Requires `PreviewView`. |
| CameraProvider | API model | Developer handles more setup (output image rotation, `ImageAnalysis` output format, custom `Surface`). Use cases configured with `set()` methods and finalized with `build()`. |
| Camera2CameraInfo | interop | Reads the underlying `CameraCharacteristics`. |
| Camera2CameraControl | interop | Sets properties on the underlying `CaptureRequest`, such as the auto-focus mode. |
| Camera2Interop.Extender | interop | Extends a CameraX `UseCase` to set `CaptureRequest` properties and extra controls such as the stream use case. |

## Notes

- Requirements: Android API level 21 and Android Architecture Components 1.1.1. For lifecycle-aware activities, use `FragmentActivity` or `AppCompatActivity`.
- Permissions: `CAMERA`; saving images to files also requires `WRITE_EXTERNAL_STORAGE`, except on devices running Android 10 or later.
- Dependencies: add the `google()` repository in `settings.gradle`; the source page also adds Java 1.8 `compileOptions` (and `kotlinOptions { jvmTarget = "1.8" }` for Kotlin projects) to the `android` block. The artifact version shown on the source page is `1.7.0-alpha03` (alpha at time of retrieval, 2026-10); check the CameraX release notes for the current stable version.
- Lifecycles: CameraX observes a lifecycle to decide when to open the camera, create a capture session, and stop/shut down. For use cases that cannot be combined, group compatible use cases into separate fragments and switch between them, or create a custom lifecycle component to control the camera manually.
- If view and camera use case lifecycle owners are decoupled (custom lifecycle or retained fragment), unbind all use cases with `ProcessCameraProvider.unbindAll()` or individually.
- Concurrent use cases: it is better to bind all use cases with a single `bindToLifecycle()` call. CameraX allows simultaneous use of one instance each of `Preview`, `VideoCapture`, `ImageAnalysis`, and `ImageCapture`. Every use case can work on its own (e.g. record video without preview).
- With extensions enabled, only the `ImageCapture` + `Preview` combination is guaranteed; adding `ImageAnalysis` may be impossible depending on OEM implementation, and extensions cannot be enabled for `VideoCapture`.
- Some cameras support a combination at lower resolutions but not at higher ones.
- On devices with camera hardware level `FULL` or lower, combining `Preview`, `VideoCapture`, and either `ImageCapture` or `ImageAnalysis` may force CameraX to duplicate the `PRIV` stream (stream sharing), at the cost of slightly higher latency and reduced battery life. The hardware level can be read via `Camera2CameraInfo` (`INFO_SUPPORTED_HARDWARE_LEVEL`).
- An incompatible combination throws a runtime error the first time `createCaptureSession()` is called; adding use cases to a running session may require reconfiguration and cause a visible glitch.
- Camera2 interop APIs are marked Experimental (`ExperimentalCamera2Interop`); values set override any values CameraX sets. Use only when necessary and test additionally.
- The Java samples in the source page contain typos (e.g. escaped generics); prefer the Kotlin snippets.

## Related

- [ProcessCameraProvider](./process-camera-provider.md)
- [CameraController / LifecycleCameraController](./camera-controller.md)
- [PreviewView](./preview-view.md)
- [Camera permissions](./camera-permissions.md)
- [Migrate Camera1 to CameraX](./camera1-to-camerax.md)
