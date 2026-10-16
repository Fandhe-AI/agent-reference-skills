# Calling and Overriding Your Base Type with C++/WinRT

How to override XAML overridable methods (`MeasureOverride`, `OnApplyTemplate`, `GoToStateCore`, ...) in a C++/WinRT runtime class and how to call base-class members through the `base_type` alias.

## Signature / Usage

```cppwinrt
struct BgLabelControl : BgLabelControlT<BgLabelControl>
{
...
    // Control overrides.
    void OnPointerPressed(Microsoft::UI::Xaml::Input::PointerRoutedEventArgs const& /* e */) const { ... };

    // FrameworkElement overrides.
    Windows::Foundation::Size MeasureOverride(Windows::Foundation::Size const& /* availableSize */) const { ... };
    void OnApplyTemplate() const { ... };

    // UIElement overrides.
    Microsoft::UI::Xaml::Automation::Peers::AutomationPeer OnCreateAutomationPeer() const { ... };
...
};
```

Overriding while keeping the method out of the IDL, and calling the base implementation:

```idl
namespace Example
{
    runtimeclass CustomVSM : Microsoft.UI.Xaml.VisualStateManager
    {
        CustomVSM();
        // note that we don't declare GoToStateCore here
    }
}
```

```cppwinrt
namespace winrt::Example::implementation
{
    struct CustomVSM : CustomVSMT<CustomVSM>
    {
        CustomVSM() {}

        bool GoToStateCore(winrt::Microsoft::UI::Xaml::Controls::Control const& control, winrt::Microsoft::UI::Xaml::FrameworkElement const& templateRoot, winrt::hstring const& stateName, winrt::Microsoft::UI::Xaml::VisualStateGroup const& group, winrt::Microsoft::UI::Xaml::VisualState const& state, bool useTransitions) {
            return base_type::GoToStateCore(control, templateRoot, stateName, group, state, useTransitions);
        }
    };
}
```

Calling any base class member:

```cppwinrt
struct MyDerivedRuntimeClass : MyDerivedRuntimeClassT<MyDerivedRuntimeClass>
{
    ...

    void Foo()
    {
        // Call my base type's Bar method.
        base_type::Bar();
    }
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `base_type` | type alias | Alias for the base type of your implementation; use `base_type::Member()` to call any base class member, not just overridden methods. |

## Notes

- Extension points include `MeasureOverride`, `OnApplyTemplate`, and `GoToStateCore`; they live on `Control`, `FrameworkElement`, `UIElement`, and `VisualStateManager`.
- In C#, overridable methods appear as protected virtual methods. In C++/WinRT they are neither virtual nor protected, but you can still override them by providing your own implementation as shown above.
- If you override one of these overridable methods, the `runtimeclass` IDL must not declare that method.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/base-type (en-us, fetched 2026-10-16)

## Related

- [XAML Custom (Templated) Controls](./xaml-cust-ctrl.md)
- [Author APIs](./author-apis.md)
- [Consume APIs](./consume-apis.md)
