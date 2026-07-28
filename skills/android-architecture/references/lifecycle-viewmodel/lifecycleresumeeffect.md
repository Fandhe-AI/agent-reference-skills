# LifecycleResumeEffect

Composable effect for paired resume/pause operations: the effect body runs on `ON_RESUME`, and the mandatory `onPauseOrDispose` block runs on `ON_PAUSE` or when the composable leaves the composition. Suited to resources only needed during active user interaction (camera preview, animations).

## Signature / Usage

```kotlin
@Composable
fun LifecycleResumeEffect(
    key1: Any?,
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current,
    effects: LifecycleResumePauseEffectScope.() -> LifecyclePauseOrDisposeEffectResult,
)
// overloads also accept key2, key3, or vararg keys
```

```kotlin
@Composable
fun CameraPreview(cameraController: CameraController) {
    LifecycleResumeEffect(cameraController) {
        cameraController.startPreview()

        onPauseOrDispose {
            cameraController.stopPreview()
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key1` (`key2`, `key3`, `keys`) | `Any?` | — | Restart the effect when any key changes. |
| `lifecycleOwner` | `LifecycleOwner` | `LocalLifecycleOwner.current` | Lifecycle to observe. |
| `effects` | `LifecycleResumePauseEffectScope.() -> LifecyclePauseOrDisposeEffectResult` | — | Body executed on `ON_RESUME`; must end with `onPauseOrDispose { ... }`. |

## Notes

- `onPauseOrDispose` is mandatory; if no cleanup is needed, use `LifecycleEventEffect` instead.
- Package: `androidx.lifecycle.compose` (module `lifecycle-runtime-compose`).

## Related

- [LifecycleStartEffect](./lifecyclestarteffect.md)
- [LifecycleEventEffect](./lifecycleeventeffect.md)
