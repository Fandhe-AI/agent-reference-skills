# AmbientMode

Sealed model representing whether the device is in interactive mode or always-on ambient (low-power) display mode, with the constraints ambient rendering must respect.

## Signature / Usage

```kotlin
public abstract class AmbientMode private constructor()

public object Interactive : AmbientMode()

public class Ambient(
    public val isBurnInProtectionRequired: Boolean,
    public val isLowBitAmbientSupported: Boolean,
) : AmbientMode()
```

```kotlin
when (val mode = LocalAmbientModeManager.current.ambientMode) {
    is AmbientMode.Interactive -> { /* full-color, full-refresh UI */ }
    is AmbientMode.Ambient -> {
        if (mode.isBurnInProtectionRequired) {
            // periodically shift composables to avoid burn-in
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Interactive` | `object : AmbientMode` | The user is actively interacting with the device. |
| `Ambient.isBurnInProtectionRequired` | `Boolean` | When `true`, ambient composables must be shifted periodically to prevent screen burn-in. |
| `Ambient.isLowBitAmbientSupported` | `Boolean` | When `true`, the display supports fewer bits per color in ambient mode (avoid anti-aliased/gradient content). |

## Notes

- Read the current mode via `LocalAmbientModeManager` (composition local) rather than constructing `AmbientMode` instances directly.
- In ambient mode, avoid animations and limit redraws to conserve battery; respect `isBurnInProtectionRequired` and `isLowBitAmbientSupported` when styling ambient content.
- Package: `androidx.wear.compose.foundation` (artifact `androidx.wear.compose:compose-foundation`).

## Related

- [AppScaffold / ScreenScaffold / PagerScaffold](./scaffold.md)
