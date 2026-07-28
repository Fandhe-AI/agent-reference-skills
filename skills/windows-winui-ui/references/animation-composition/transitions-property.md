# UIElement.Transitions

Gets or sets the collection of `Transition` style elements that apply to a `UIElement`, used to animate reactions to changes such as first appearance, layout moves, and add/delete.

## Signature / Usage

```csharp
public TransitionCollection Transitions { get; set; }
```

```xaml
<Grid.Resources>
    <Style x:Key="DefaultButtonStyle" TargetType="Button">
        <Setter Property="Transitions">
            <Setter.Value>
                <TransitionCollection>
                    <EntranceThemeTransition/>
                </TransitionCollection>
            </Setter.Value>
        </Setter>
    </Style>
</Grid.Resources>
<Button Style="{StaticResource DefaultButtonStyle}" Content="Animated button" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Transitions | `TransitionCollection` | Collection of `Transition` objects (e.g. `EntranceThemeTransition`, `RepositionThemeTransition`, `AddDeleteThemeTransition`, `ContentThemeTransition`, `EdgeUIThemeTransition`, `PopupThemeTransition`, `ReorderThemeTransition`). |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3), property on `UIElement`.
- Since Windows 10 SDK 17763, `TransitionCollection` supports implicit collection syntax, so the explicit `<TransitionCollection>` element can be omitted in XAML.
- Usually set through a `Style`/`Setter` or `VisualState`/template rather than directly on an inline element.
- Related but distinct collections on specific types: `Panel.ChildrenTransitions`, `ItemsControl.ItemContainerTransitions`, `Popup.ChildTransitions`.
- `VisualTransition` (used by `VisualStateGroup.Transitions`) is a different concept and is **not** placed in `UIElement.Transitions`.

## Related

- [EntranceThemeTransition](./entrance-theme-transition.md)
- [RepositionThemeTransition](./reposition-theme-transition.md)
- [AddDeleteThemeTransition](./add-delete-theme-transition.md)
- [Storyboard](./storyboard.md)
