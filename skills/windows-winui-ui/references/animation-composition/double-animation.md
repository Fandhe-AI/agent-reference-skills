# DoubleAnimation

Animates the value of a `Double` property between two target values using linear interpolation over a specified `Duration`.

## Signature / Usage

```csharp
public sealed class DoubleAnimation : Timeline
```

```xaml
<Storyboard x:Name="myStoryboard">
    <DoubleAnimation
        Storyboard.TargetName="MyAnimatedRectangle"
        Storyboard.TargetProperty="Opacity"
        From="1.0" To="0.0" Duration="0:0:3"
        AutoReverse="True" RepeatBehavior="Forever" />
</Storyboard>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| From | `double?` | Starting value. |
| To | `double?` | Ending value. |
| By | `double?` | Amount added to the starting value. |
| EasingFunction | `EasingFunctionBase` | Easing function applied to the animation. |
| EnableDependentAnimation | bool | Whether this animation may target a dependent ("layout-affecting") property. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- At most two of `From`/`To`/`By` are normally set together (never all three); combinations determine the interpolation range.
- `From`, `By`, `To` are nullable doubles — the default `null` (not `0`) tells the animation system the value wasn't explicitly set.
- Cannot animate `Point.X`/`Point.Y` (use `PointAnimation`) or `int`/`byte` values (use `ObjectAnimationUsingKeyFrames`).
- Use indirect property targeting (e.g. `(UIElement.RenderTransform).(TranslateTransform.X)`) to animate sub-properties.

## Related

- [Storyboard](./storyboard.md)
- [ColorAnimation](./color-animation.md)
- [DoubleAnimationUsingKeyFrames](./double-animation-using-keyframes.md)
- [Easing Functions](./easing-functions.md)
