# Tile animations (AnimationSpec, DefaultContentTransitions, Transformation, Lottie)

Tiles support three animation mechanisms: tween/sweep animations driven by dynamic values (`AnimationSpec`/`AnimationParameters`), enter/exit content transitions (`DefaultContentTransitions` + `AnimatedVisibility`), static or dynamic geometric transforms (`ModifiersBuilders.Transformation`), and Lottie vector animations (`AndroidLottieResourceByResId`). All animated elements share a hard limit of 4 concurrent animations per tile.

## Signature / Usage

```kotlin
// 1. Sweep/tween animation on a dynamic value
CircularProgressIndicator.Builder()
    .setProgress(
        FloatProp.Builder(0.25f)
            .setDynamicValue(
                DynamicFloat.animate(
                    startValue,
                    endValue,
                    AnimationSpec.Builder()
                        .setAnimationParameters(
                            AnimationParameters.Builder()
                                .setDurationMillis(2000L)
                                .build()
                        )
                        .build()
                )
            )
            .build()
    )
    .build()

// 2. Fade/slide content-update transition
Text.Builder(this, tileText)
    .setModifiers(
        Modifiers.Builder()
            .setContentUpdateAnimation(
                AnimatedVisibility.Builder()
                    .setEnterTransition(DefaultContentTransitions.fadeIn())
                    .setExitTransition(DefaultContentTransitions.fadeOut())
                    .build()
            )
            .build()
    )
    .build()

// 3. Rotation transform
Modifiers.Builder()
    .setTransformation(
        ModifiersBuilders.Transformation.Builder()
            .setPivotX(dp(50f))
            .setPivotY(dp(100f))
            .setRotation(degrees(45f))
            .build()
    )
    .build()

// 4. Lottie animation resource
val lottieImage = ResourceBuilders.ImageResource.Builder()
    .setAndroidLottieResourceByResId(
        ResourceBuilders.AndroidLottieResourceByResId.Builder(R.raw.lottie)
            .setStartTrigger(createOnVisibleTrigger())
            .build()
    )
    .build()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AnimationParameters.Builder().setDurationMillis` | `Long` | Duration of a tween animation driving a `DynamicFloat.animate(start, end, spec)` value. |
| `AnimationSpec.Builder().setAnimationParameters` | `AnimationParameters` | Wraps timing parameters for use with `DynamicFloat.animate`/similar dynamic-value animators. |
| `DefaultContentTransitions.fadeIn()` / `.fadeOut()` | `ModifiersBuilders.EnterTransition` / `ModifiersBuilders.ExitTransition` | Preset fade transitions for `AnimatedVisibility.setEnterTransition`/`setExitTransition`; each returns an `EnterTransition`/`ExitTransition` wrapping a `FadeInTransition`/`FadeOutTransition` payload internally. |
| `DefaultContentTransitions.slideIn(direction)` / `.slideOut(direction)` | `ModifiersBuilders.EnterTransition` / `ModifiersBuilders.ExitTransition` | Preset slide transitions (wrap a `SlideInTransition`/`SlideOutTransition` payload); `direction` is a `ModifiersBuilders.SLIDE_DIRECTION_*` constant (e.g. `SLIDE_DIRECTION_LEFT_TO_RIGHT`). |
| `Modifiers.Builder().setContentUpdateAnimation` | `AnimatedVisibility` | Attaches enter/exit transitions that play when the element's content changes between timeline updates. |
| `ModifiersBuilders.Transformation.Builder().setRotation` | `DegreesProp` | Clockwise rotation around `(setPivotX, setPivotY)`; pivot values are `DimensionBuilders.dp(...)`. |
| `ModifiersBuilders.Transformation.Builder().setScaleX` / `.setScaleY` | `FloatProp` | Horizontal/vertical scale factors around the same pivot. |
| `ModifiersBuilders.Transformation.Builder().setTranslationX` / `.setTranslationY` | `DpProp` | Geometric offset in dp; independent of pivot. |
| `ResourceBuilders.AndroidLottieResourceByResId.Builder(resId)` | builder | Loads a Lottie raw resource; `.setStartTrigger(Trigger)` controls when playback starts (e.g. `createOnVisibleTrigger()`). |
| `ResourceBuilders.ImageResource.Builder().setAndroidResourceByResId` | `AndroidImageResourceByResId` | Static-image fallback rendered when the device's renderer doesn't support the Lottie animation. |

## Notes

- All `Transformation` float/dp properties accept dynamic expressions (`DynamicFloat.animate(...)`), so rotation/scale/translation can themselves be animated rather than static.
- Maximum 4 concurrent animations per tile: if more than 4 elements would animate at once, the excess elements skip animation and render at their end state. Renderers may also globally disable tile animations.
- Never rely on animation duration or motion itself to convey information — when animations are disabled, elements immediately show the animation's end value.
- Lottie playback requires renderer schema 1.500+; validate the Lottie JSON with the Skottie validator (skottie.skia.org, "Low Power Profile" checks) before shipping, and always provide `setAndroidResourceByResId` as a static fallback for older renderers.
- Package: `androidx.wear.protolayout.expression.AnimationParameterBuilders.AnimationParameters` / `.AnimationSpec`, `androidx.wear.protolayout.ModifiersBuilders.DefaultContentTransitions` / `.AnimatedVisibility` / `.EnterTransition` / `.ExitTransition` / `.Transformation`, `androidx.wear.protolayout.ResourceBuilders.AndroidLottieResourceByResId`.

## Related

- [tile-builders](./tile-builders.md)
- [platform-data](./platform-data.md)
- [versioning](./versioning.md)
