# EasingFunctionBase (Easing Functions)

Base class for all easing functions, which apply custom mathematical formulas (e.g. bounce, spring) to the pace of an animation.

## Signature / Usage

```csharp
public class EasingFunctionBase : DependencyObject
```

```xaml
<DoubleAnimation.EasingFunction>
    <BackEase Amplitude="0.5" EasingMode="EaseOut" />
</DoubleAnimation.EasingFunction>
```

```xaml
<CubicEase EasingMode="EaseInOut" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| EasingMode | `EasingMode` (`EaseIn`, `EaseOut`, `EaseInOut`) | Specifies how the animation interpolates: accelerating in, decelerating out, or both. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- Not extensible (`EasingFunctionBase` itself is sealed against custom derivation); use one of the built-in derived classes.
- Derived classes: `BackEase` (overshoots then settles), `BounceEase` (bounces), `CircleEase`, `CubicEase`, `ElasticEase` (spring-like oscillation), `ExponentialEase`, `PowerEase`, `QuadraticEase`, `QuarticEase`, `QuinticEase`, `SineEase`.
- `BackEase` has an `Amplitude` property; `BounceEase` has `Bounces` and `Bounciness`; `ElasticEase` has `Oscillations` and `Springiness`; `PowerEase` has `Power` — each derived class adds properties beyond `EasingMode`.
- Assign to `DoubleAnimation.EasingFunction`, `ColorAnimation.EasingFunction`, or an individual key frame's `EasingFunction` (e.g. `EasingDoubleKeyFrame`).
- Call `Ease(double)` to transform normalized time (0-1) directly, useful for custom composition scenarios.

## Related

- [DoubleAnimation](./double-animation.md)
- [ColorAnimation](./color-animation.md)
- [RepeatBehavior](./repeat-behavior.md)
