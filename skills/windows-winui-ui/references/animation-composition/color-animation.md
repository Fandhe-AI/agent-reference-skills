# ColorAnimation

Animates the value of a `Color` property between two target values using linear interpolation over a specified `Duration`.

## Signature / Usage

```csharp
public sealed class ColorAnimation : Timeline
```

```xaml
<Storyboard x:Name="colorStoryboard">
    <ColorAnimation Storyboard.TargetName="mySolidColorBrush"
        Storyboard.TargetProperty="Color" From="Red" To="Blue" Duration="0:0:4"/>
</Storyboard>

<StackPanel.Background>
    <SolidColorBrush x:Name="mySolidColorBrush" Color="Red" />
</StackPanel.Background>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| From | `Color?` | Starting color. |
| To | `Color?` | Ending color. |
| By | `Color?` | Color amount added to the starting value. |
| EasingFunction | `EasingFunctionBase` | Easing function applied to the animation. |
| EnableDependentAnimation | bool | Whether this animation may target a dependent property. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- Most UI color properties are of type `Brush`, not `Color`; target the `Color` sub-property of a `SolidColorBrush` via indirect targeting, e.g. `Storyboard.TargetProperty="(Panel.Background).(SolidColorBrush.Color)"`.
- Linear interpolation treats each ARGB channel as a byte; best results when at least one RGB component is close between start and end.
- `From`/`By`/`To` are nullable `Color` values; default `null` means unset.

## Related

- [Storyboard](./storyboard.md)
- [DoubleAnimation](./double-animation.md)
- [DoubleAnimationUsingKeyFrames](./double-animation-using-keyframes.md)
