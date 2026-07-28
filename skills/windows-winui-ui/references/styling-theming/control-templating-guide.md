# Building Templated Controls (Control Restyling Workflow)

Step-by-step procedure for creating a custom `Control` subclass with a replaceable `ControlTemplate`, and for replacing an existing control's template. Covers `DefaultStyleKey`, the `Themes/Generic.xaml` convention, `TemplateBinding`, and `OnApplyTemplate`.

## Signature / Usage

```csharp
// 1. In the control's constructor, set DefaultStyleKey to the control's own type
public BgLabelControl()
{
    this.DefaultStyleKey = typeof(BgLabelControl);
}
```

```xaml
<!-- 2. \Themes\Generic.xaml: default style/template, keyed implicitly by TargetType -->
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:BgLabelControlApp">

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
</ResourceDictionary>
```

```csharp
// 3. Retrieve template parts and wire up behavior once the template is applied
protected override void OnApplyTemplate()
{
    base.OnApplyTemplate();
    // e.g. var part = GetTemplateChild("PartName") as FrameworkElement;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Control.DefaultStyleKey | `object` (usually `typeof(TControl)`) | Identifies which implicit `Style`/`ControlTemplate` the control looks up when no explicit template is set. |
| Themes/Generic.xaml | file convention | Required folder+file name for a project's default templated-control styles to be discovered by the XAML framework. |
| {TemplateBinding} | markup extension | Inside a `ControlTemplate`, binds a template part's property to the templated control's own dependency property (e.g. `Background`, custom DPs). |
| Control.OnApplyTemplate() | method (override) | Invoked once the template is applied to an instance; use `GetTemplateChild` here to look up named parts and attach event handlers. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3, `Control`/`ControlTemplate` restyling conventions). Distinct from `apple-swiftui` view composition and Jetpack Compose slot APIs, which don't use a template/`TemplateBinding` model.
- To replace an **existing** control's template (rather than authoring a new templated control), set `Control.Template` directly or declare a new implicit `Style` keyed by the control's `TargetType` — in both cases you must reproduce every named `VisualState` the control's own code calls via `GoToState`, or visual feedback for those states silently disappears.
- Visual Studio's "Edit a Copy" template-editing action starts from a copy of the current default template, which is the safest way to avoid missing required visual states.
- Custom dependency properties are declared via `DependencyProperty.Register` (C#) or the IDL DP pattern (C++/WinRT) and exposed as a `<name>` + `<name>Property` pair.
- Prefer using WinUI's existing lightweight-styling resource keys/`BasedOn` over full re-templating where possible, to keep pace with future default template changes (see `Style, Setter, BasedOn`).

## Related

- [ControlTemplate](./control-template.md)
- [Style, Setter, BasedOn](./style-setter.md)
- [VisualStateManager, VisualState, VisualStateGroup, VisualTransition](./visual-state-manager.md)
