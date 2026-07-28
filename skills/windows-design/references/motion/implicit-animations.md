# Implicit Animations

Implicit animations are a simple way to achieve Fluent motion by automatically interpolating between the old and new values of a property when it changes, using standardized timing values — no manual `Storyboard` needed.

## Signature / Usage

```xaml
<Button x:Name="SubmitButton"
        Content="Submit"
        Opacity="{x:Bind OpaqueIfEnabled(SubmitButton.IsEnabled), Mode=OneWay}">
    <Button.OpacityTransition>
        <ScalarTransition />
    </Button.OpacityTransition>
</Button>
```

```csharp
public double OpaqueIfEnabled(bool IsEnabled)
{
    return IsEnabled ? 1.0 : 0.2;
}
```

## Options / Props

| Animated property | Transition property | Implicit transition type |
|---|---|---|
| `UIElement.Opacity` | `OpacityTransition` | `ScalarTransition` |
| `UIElement.Rotation` | `RotationTransition` | `ScalarTransition` |
| `UIElement.Scale` | `ScaleTransition` | `Vector3Transition` |
| `UIElement.Translation` | `TranslationTransition` | `Vector3Transition` |
| `Border.Background` | `BackgroundTransition` | `BrushTransition` |
| `ContentPresenter.Background` | `BackgroundTransition` | `BrushTransition` |
| `Panel.Background` | `BackgroundTransition` | `BrushTransition` |

## Notes

- Each animatable property has a corresponding *transition* property; assign the matching transition type to enable the implicit animation.
- Requires Windows 10, version 1809 (SDK 17763) or later.
- Package: `Microsoft.UI.Xaml.Media.Animation` / `Microsoft.UI.Xaml.Controls` (WinUI 3).
- One of three ways to apply Fluent motion fundamentals in an app, alongside built-in animation (system components that are "Fluent by default") and custom animation following the baseline guidance recommendations.

## Related

- [Motion in Practice](./motion-in-practice.md)
- [Timing and Easing](./timing-and-easing.md)
- [Motion Overview](./motion-overview.md)
