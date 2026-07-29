# ResolutionSelector

A set of requirements and priorities used to select a resolution for a `UseCase` (`Preview`, `ImageCapture`, `ImageAnalysis`, `VideoCapture`). Set via each use case's `Builder.setResolutionSelector()`, and is the recommended replacement for the deprecated `setTargetResolution()`/`setTargetAspectRatio()`. Selection combines an `AspectRatioStrategy`, a `ResolutionStrategy`, and an optional `ResolutionFilter`; the aspect ratio strategy takes precedence over the resolution strategy when sorting candidates.

## Signature / Usage

```kotlin
val resolutionSelector = ResolutionSelector.Builder()
    .setAspectRatioStrategy(AspectRatioStrategy.RATIO_16_9_FALLBACK_AUTO_STRATEGY)
    .setResolutionStrategy(
        ResolutionStrategy(Size(1920, 1080), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
    )
    .build()

val preview = Preview.Builder()
    .setResolutionSelector(resolutionSelector)
    .build()
```

```kotlin
class ResolutionSelector.Builder {
    fun setAspectRatioStrategy(aspectRatioStrategy: AspectRatioStrategy): Builder
    fun setResolutionStrategy(resolutionStrategy: ResolutionStrategy): Builder
    fun setResolutionFilter(resolutionFilter: ResolutionFilter): Builder
    fun setAllowedResolutionMode(mode: Int): Builder
    fun build(): ResolutionSelector
}

// AspectRatioStrategy
class AspectRatioStrategy(preferredAspectRatio: Int, fallbackRule: Int) {
    companion object {
        val RATIO_4_3_FALLBACK_AUTO_STRATEGY: AspectRatioStrategy
        val RATIO_16_9_FALLBACK_AUTO_STRATEGY: AspectRatioStrategy
        const val FALLBACK_RULE_NONE: Int
        const val FALLBACK_RULE_AUTO: Int
    }
}

// ResolutionStrategy
class ResolutionStrategy(boundSize: Size, fallbackRule: Int) {
    companion object {
        val HIGHEST_AVAILABLE_STRATEGY: ResolutionStrategy
        const val FALLBACK_RULE_NONE: Int
        const val FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER: Int
        const val FALLBACK_RULE_CLOSEST_HIGHER: Int
        const val FALLBACK_RULE_CLOSEST_LOWER_THEN_HIGHER: Int
        const val FALLBACK_RULE_CLOSEST_LOWER: Int
    }
}

// ResolutionFilter (functional interface)
fun interface ResolutionFilter {
    fun filter(supportedSizes: List<Size>, rotationDegrees: Int): List<Size>
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setAspectRatioStrategy(aspectRatioStrategy)` | `Builder` | `RATIO_4_3_FALLBACK_AUTO_STRATEGY` | Sequence of aspect ratios tried; CameraX only natively supports 4:3 and 16:9. |
| `setResolutionStrategy(resolutionStrategy)` | `Builder` | none (works with `AspectRatioStrategy` alone) | Bound size and fallback rule for resolution sorting. |
| `setResolutionFilter(resolutionFilter)` | `Builder` | none | Custom filter/sort applied last, after aspect-ratio and resolution-strategy sorting. |
| `setAllowedResolutionMode(mode)` | `Builder` | `PREFER_CAPTURE_RATE_OVER_HIGHER_RESOLUTION` | `PREFER_CAPTURE_RATE_OVER_HIGHER_RESOLUTION` (normal output sizes only) or `PREFER_HIGHER_RESOLUTION_OVER_CAPTURE_RATE` (also considers high-resolution sizes, may be slower to capture). |
| `AspectRatioStrategy(preferredAspectRatio, fallbackRule)` | constructor | — | `preferredAspectRatio` is `AspectRatio.RATIO_4_3` or `AspectRatio.RATIO_16_9`; `fallbackRule` is `FALLBACK_RULE_NONE` (throws `IllegalArgumentException` if unavailable, no fallback) or `FALLBACK_RULE_AUTO` (falls back to the aspect ratio with the closest sensor field of view). |
| `ResolutionStrategy(boundSize, fallbackRule)` | constructor | — | `fallbackRule` is one of `FALLBACK_RULE_NONE`, `FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER`, `FALLBACK_RULE_CLOSEST_HIGHER`, `FALLBACK_RULE_CLOSEST_LOWER_THEN_HIGHER`, `FALLBACK_RULE_CLOSEST_LOWER`. |
| `ResolutionStrategy.HIGHEST_AVAILABLE_STRATEGY` | static | — | No bound size; selects available resolutions in descending order starting from the highest. |
| `ResolutionFilter.filter(supportedSizes, rotationDegrees)` | interface method | — | Receives sizes already sorted by aspect-ratio/resolution strategy; returns the desired ordered subset. `rotationDegrees` lets the filter reason about sizes in the use case's target orientation. |

## Notes

- Overly restrictive settings (e.g. `FALLBACK_RULE_NONE` on either strategy) can leave no resolution selectable, throwing `IllegalArgumentException` on `bindToLifecycle()`; CameraX recommends `FALLBACK_RULE_AUTO` / `FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER` to avoid this.
- `ResolutionStrategy` works together with `AspectRatioStrategy`, not instead of it — pair a `1920x1080` bound size with `RATIO_16_9_FALLBACK_AUTO_STRATEGY` rather than leaving the default 4:3 strategy in place.
- If a `UseCaseGroup` binds a `ViewPort`, its aspect ratio should match the `AspectRatioStrategy` used by the bound use cases, otherwise the output crop rectangle can be double-cropped.
- Each use case builder (`Preview.Builder`, `ImageCapture.Builder`, `ImageAnalysis.Builder`, `VideoCapture` via `Recorder`) exposes its own `setResolutionSelector()`; there is no single global default.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraXConfig](./camerax-config.md)
- [Preview](../camerax-usecases/preview.md)
- [ImageAnalysis](../camerax-usecases/image-analysis.md)
