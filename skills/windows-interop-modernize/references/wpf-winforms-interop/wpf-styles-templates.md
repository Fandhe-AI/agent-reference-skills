# Style / ControlTemplate

`System.Windows.Style` applies a reusable set of property values (and optional triggers) to elements of a given type. `System.Windows.Controls.ControlTemplate` replaces a control's entire visual tree while keeping its behavior/API intact.

## Signature / Usage

```xaml
<Window.Resources>
    <Style TargetType="Button" x:Key="GreenButtonStyle">
        <Setter Property="Background" Value="Green"/>
        <Style.Triggers>
            <Trigger Property="IsMouseOver" Value="True">
                <Setter Property="Background" Value="DarkGreen"/>
            </Trigger>
        </Style.Triggers>
    </Style>
</Window.Resources>

<Button Style="{StaticResource GreenButtonStyle}" Content="I am green"/>
```

```xaml
<!-- ControlTemplate replaces the visual tree, keeping Button's behavior -->
<Style TargetType="Button">
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="Button">
                <Border Background="{TemplateBinding Background}" CornerRadius="4">
                    <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
                </Border>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Style.TargetType` | `Type` | Element type the style applies to |
| `Style.BasedOn` | `Style` | Inherit setters from another style |
| `Setter.Property` / `Value` | — | Property value applied when the style is used |
| `Style.Triggers` | collection | `Trigger` / `MultiTrigger` / `DataTrigger` / `EventTrigger` that conditionally change properties or run storyboards |
| `ControlTemplate.TargetType` | `Type` | Control type the template applies to |
| `TemplateBinding` | markup extension | Optimized binding from a template part to a control property |
| `DataTemplate` | class | Defines the visual representation of bound data (not a control) |

## Notes

- A style declared with no `x:Key` and a `TargetType` applies implicitly to all elements of that type in scope; a style with `x:Key` must be referenced explicitly via `{StaticResource}`.
- Changing a `ControlTemplate` requires replacing it wholesale — WPF has no partial visual-tree template patching.
- WinUI 3 (`Microsoft.UI.Xaml.Style` / `ControlTemplate`) uses the same `Style`/`Setter`/`ControlTemplate`/`TemplateBinding` concepts, but replaces WPF's inline `Trigger`/`DataTrigger` with `VisualStateManager` states plus the Community Toolkit's `Behaviors` package (`DataTriggerBehavior`) — see `wpf-vs-winui3.md`. WinForms has no style/template system; visuals are set imperatively via `Control` properties (`BackColor`, `Font`, owner-draw) or the Designer.

## Related

- [wpf-basic-controls.md](./wpf-basic-controls.md)
- [wpf-dependency-property.md](./wpf-dependency-property.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
