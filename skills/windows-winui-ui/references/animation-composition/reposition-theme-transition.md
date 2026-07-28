# RepositionThemeTransition

Reacts to layout position changes (moves) of an element, animating it to its new location instead of having it jump.

## Signature / Usage

```csharp
public sealed class RepositionThemeTransition : Transition
```

```xaml
<Button Content="Click to reposition" Click="Button_Clicked" x:Name="animatedButton">
    <Button.Transitions>
        <TransitionCollection>
            <RepositionThemeTransition/>
        </TransitionCollection>
    </Button.Transitions>
</Button>
```

```csharp
private void Button_Clicked(object sender, RoutedEventArgs e)
{
    animatedButton.Margin = new Thickness(100);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsStaggeringEnabled | bool | Whether the transition staggers rendering of multiple items, or renders all at once. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- Commonly set on `ItemsControl.ItemContainerTransitions` so remaining items smoothly re-flow when one is added/removed from a panel like `WrapGrid`.
- Not designed for use with panels that perform UI virtualization, such as the default panel of `ListView` or `GridView`.

## Related

- [EntranceThemeTransition](./entrance-theme-transition.md)
- [AddDeleteThemeTransition](./add-delete-theme-transition.md)
- [Transitions Property](./transitions-property.md)
