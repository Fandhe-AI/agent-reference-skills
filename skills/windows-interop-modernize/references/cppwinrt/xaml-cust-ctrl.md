# XAML Custom (Templated) Controls with C++/WinRT

Authors a custom control by deriving a runtime class from `Microsoft.UI.Xaml.Controls.Control` in IDL, declaring dependency properties, and supplying a default `ControlTemplate` in `Themes/Generic.xaml`. UI-authoring topic, adjacent to this skill's interop/migration focus rather than core to it.

## Signature / Usage

Declare the runtime class and its dependency property in IDL:

```idl
// BgLabelControl.idl
namespace BgLabelControlApp
{
    runtimeclass BgLabelControl : Microsoft.UI.Xaml.Controls.Control
    {
        BgLabelControl();
        static Microsoft.UI.Xaml.DependencyProperty LabelProperty{ get; };
        String Label;
    }
}
```

Implement it, registering the dependency property and setting the default style key:

```cppwinrt
// BgLabelControl.h
struct BgLabelControl : BgLabelControlT<BgLabelControl>
{
    BgLabelControl() { DefaultStyleKey(winrt::box_value(L"BgLabelControlApp.BgLabelControl")); }

    winrt::hstring Label() { return winrt::unbox_value<winrt::hstring>(GetValue(m_labelProperty)); }
    void Label(winrt::hstring const& value) { SetValue(m_labelProperty, winrt::box_value(value)); }
    static Microsoft::UI::Xaml::DependencyProperty LabelProperty() { return m_labelProperty; }

private:
    static Microsoft::UI::Xaml::DependencyProperty m_labelProperty;
};
```

```cppwinrt
// BgLabelControl.cpp
Microsoft::UI::Xaml::DependencyProperty BgLabelControl::m_labelProperty =
    Microsoft::UI::Xaml::DependencyProperty::Register(
        L"Label",
        winrt::xaml_typename<winrt::hstring>(),
        winrt::xaml_typename<BgLabelControlApp::BgLabelControl>(),
        Microsoft::UI::Xaml::PropertyMetadata{ winrt::box_value(L"default label") });
```

```xaml
<!-- Themes/Generic.xaml — the default style/template, required for a templated control -->
<Style TargetType="local:BgLabelControl">
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="local:BgLabelControl">
                <Grid Background="{TemplateBinding Background}">
                    <TextBlock Text="{TemplateBinding Label}"/>
                </Grid>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

## Options / Props

| Concept | Description |
|------|-------------|
| Dependency property (DP) declaration | Two IDL members per DP: a read-only static `DependencyProperty` accessor (`<Name>Property`) plus a read-write instance property (`<Name>`). |
| `DependencyProperty::Register` | Registers the DP at static-init time; takes the name, `xaml_typename<T>()` for the value type, `xaml_typename<OwnerType>()`, and `PropertyMetadata` (default value + optional changed callback). |
| `DefaultStyleKey` | Set in the constructor to the fully-qualified type name string; tells the XAML framework which style key to look up in `Themes/Generic.xaml`. |
| `Themes/Generic.xaml` | Folder/file name is fixed — the XAML framework only finds the default style there. |
| Floating-point DP type | Must be declared `Double` in MIDL, not `Single`/`float` — a `float` DP set from XAML markup throws `Failed to create a 'Windows.Foundation.Single' from the text '<NUMBER>'`. |

## Notes

- This is a UI-authoring topic (custom control templates), distinct from this skill's primary interop/migration scope — included here because it's cataloged alongside the other C++/WinRT authoring pages in the official docs.
- Overriding methods like `MeasureOverride`/`OnApplyTemplate` uses the same base-type-calling pattern as any other C++/WinRT composable class (see Author APIs and IDL).
- To bind a XAML items control to a C++/WinRT collection, see Collections with C++/WinRT — the collection's element type must be `IInspectable` (or an interop type) for `ItemsControl.ItemsSource` to accept it.

## Related

- [Author APIs and IDL](./author-apis.md)
- [XAML x:Bind](./xaml-binding.md)
- [Collections with C++/WinRT](./collections.md)
