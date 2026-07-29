# EntranceThemeTransition

Provides the animated transition behavior on controls when they first appear. Can be used on individual objects or on containers, in which case child elements animate into view in sequence rather than all at once.

## Signature / Usage

```csharp
public sealed class EntranceThemeTransition : Transition
```

```xaml
<Button Content="EntranceThemeTransition Button">
    <Button.Transitions>
        <TransitionCollection>
            <EntranceThemeTransition />
        </TransitionCollection>
    </Button.Transitions>
</Button>
```

```xaml
<StackPanel x:Name="panel1">
    <StackPanel.ChildrenTransitions>
        <TransitionCollection>
            <EntranceThemeTransition
                FromHorizontalOffset="200"
                FromVerticalOffset="-200"/>
        </TransitionCollection>
    </StackPanel.ChildrenTransitions>
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| FromHorizontalOffset | double | Distance the target is translated horizontally when the animation is active. |
| FromVerticalOffset | double | Distance the target is translated vertically when the animation is active. |
| IsStaggeringEnabled | bool | Whether multiple items' rendering is staggered, or all rendered at once. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- Apply directly via `UIElement.Transitions`, via `Panel.ChildrenTransitions` (staggers children as they enter), or through a `Style` setter for reuse across controls.
- Default behavior animates the element into view from the right; use `FromHorizontalOffset`/`FromVerticalOffset` to change direction/distance.

## Related

- [RepositionThemeTransition](./reposition-theme-transition.md)
- [AddDeleteThemeTransition](./add-delete-theme-transition.md)
- [Theme Transitions](./theme-transitions.md)
- [Transitions Property](./transitions-property.md)
- [Theme Animations](./theme-animations.md)
