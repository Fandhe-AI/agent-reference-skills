# Storyboard

Controls animations with a timeline, and provides object and property targeting information for its child animations.

## Signature / Usage

```csharp
public sealed class Storyboard : Timeline
```

```xaml
<StackPanel.Resources>
    <Storyboard x:Name="myStoryboard">
        <DoubleAnimation From="1" To="6" Duration="00:00:6"
            Storyboard.TargetName="rectScaleTransform"
            Storyboard.TargetProperty="ScaleY">
            <DoubleAnimation.EasingFunction>
                <BounceEase Bounces="2" EasingMode="EaseOut" Bounciness="2" />
            </DoubleAnimation.EasingFunction>
        </DoubleAnimation>
    </Storyboard>
</StackPanel.Resources>
```

```csharp
myStoryboard.Begin();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Children | `TimelineCollection` | Collection of child `Timeline` objects (content property). |
| `Storyboard.TargetName` (attached) | string | Name of the object to animate; targets an element by its `x:Name`. |
| `Storyboard.TargetProperty` (attached) | string | Property path of the property to animate on the target. |
| AutoReverse, BeginTime, Duration, FillBehavior, RepeatBehavior, SpeedRatio | inherited from `Timeline` | Standard timeline controls. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3). Distinct from `System.Windows.Media.Animation.Storyboard` (WPF) and unrelated to any JS/React "storyboard" concept.
- Control playback with `Begin()`, `Pause()`, `Resume()`, `Stop()`, `Seek(TimeSpan)`, `SkipToFill()`.
- Typically declared as a XAML resource (`Application.Resources`, `FrameworkElement.Resources`) and given an `x:Name` so it can be referenced from code-behind.
- Theme animations have no innate trigger, so they must be hosted inside a `Storyboard` (as `VisualState.Storyboard` or `VisualTransition.Storyboard`, or a loose resource `Begin()` explicitly).
- Fires a single `Completed` event (inherited from `Timeline`) when playback finishes.

## Related

- [DoubleAnimation](./double-animation.md)
- [ColorAnimation](./color-animation.md)
- [DoubleAnimationUsingKeyFrames](./double-animation-using-keyframes.md)
- [RepeatBehavior](./repeat-behavior.md)
