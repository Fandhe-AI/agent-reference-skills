# ControlTemplate

Defines the element tree used as the visual structure (`Control.Template`) of a `Control`. Almost always defined as a XAML resource with an implicit `TargetType` key, set via a `Style` `Setter` for the `Template` property.

## Signature / Usage

```xaml
<Style TargetType="local:BgLabelControl">
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="local:BgLabelControl">
                <Grid Width="100" Height="100" Background="{TemplateBinding Background}">
                    <TextBlock HorizontalAlignment="Center" VerticalAlignment="Center"
                               Text="{TemplateBinding Label}"/>
                </Grid>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

```csharp
// Templated control declares a DefaultStyleKey so the framework finds
// the default style/template in \Themes\Generic.xaml
public BgLabelControl()
{
    this.DefaultStyleKey = typeof(BgLabelControl);
}

protected override void OnApplyTemplate()
{
    base.OnApplyTemplate();
    // retrieve template parts via GetTemplateChild, wire event handlers
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TargetType | `TypeName` | The `Control`-derived type this template applies to. |
| (content) | element tree | The root visual element and its children that become the control's visual structure when the template is applied. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3, `ControlTemplate`). Distinct from `System.Windows.Controls.ControlTemplate` (WPF) and unrelated to `apple-swiftui` view builders.
- Applies only to a true `Control` subclass (which exposes `Control.Template`); `DataTemplate` and `ItemsPanelTemplate` cover the other `FrameworkTemplate` cases.
- For a custom templated control, the default template must live in a `ResourceDictionary` named `Generic.xaml` inside a `Themes` folder in the project, and the `Style` `TargetType` must match the value passed to `DefaultStyleKey`.
- Use `{TemplateBinding}` inside the template to bind template parts to the control's own dependency properties (e.g. `Background`, custom properties like `Label`).
- `OnApplyTemplate` is invoked when the template is applied to a control instance; override it to look up template parts with `GetTemplateChild` and wire up event handlers or `VisualStateManager` logic.
- Control templates commonly declare `VisualStateManager.VisualStateGroups` inside the root element to drive state-based visuals (e.g. `PointerOver`, `Pressed`, `Disabled`).
- Avoid re-templating built-in controls where possible — prefer `Style`/lightweight styling to stay current with future default template changes.

## Related

- [Style, Setter, BasedOn](./style-setter.md)
- [VisualStateManager, VisualState, VisualStateGroup, VisualTransition](./visual-state-manager.md)
- [ResourceDictionary](./resource-dictionary.md)
