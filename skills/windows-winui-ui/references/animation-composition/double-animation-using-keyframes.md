# DoubleAnimationUsingKeyFrames

Animates the value of a `Double` property along a set of key frames.

## Signature / Usage

```csharp
public sealed class DoubleAnimationUsingKeyFrames : Timeline
```

```xaml
<DoubleAnimationUsingKeyFrames
    Storyboard.TargetName="MyAnimatedTranslateTransform"
    Storyboard.TargetProperty="X"
    Duration="0:0:10" EnableDependentAnimation="True">

    <LinearDoubleKeyFrame Value="500" KeyTime="0:0:3" />
    <DiscreteDoubleKeyFrame Value="400" KeyTime="0:0:4" />
    <SplineDoubleKeyFrame KeySpline="0.6,0.0 0.9,0.00" Value="0" KeyTime="0:0:6" />

</DoubleAnimationUsingKeyFrames>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| KeyFrames | `DoubleKeyFrameCollection` | Collection of `DoubleKeyFrame` objects that define the animation (content property). |
| EnableDependentAnimation | bool | Whether this animation may target a dependent property. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- Three key frame types: `LinearDoubleKeyFrame` (smooth linear transition), `DiscreteDoubleKeyFrame` (sudden jump), `SplineDoubleKeyFrame` (variable pace controlled by `KeySpline`).
- Each key frame's `KeyTime` is relative to the start of the animation, not to the previous key frame.
- `ColorAnimationUsingKeyFrames` and `ObjectAnimationUsingKeyFrames` follow the same key-frame pattern for `Color` and arbitrary object values respectively.

## Related

- [Storyboard](./storyboard.md)
- [DoubleAnimation](./double-animation.md)
- [ColorAnimation](./color-animation.md)
