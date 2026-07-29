# IWidgetProvider2

Interface implemented by Windows widget providers to receive callbacks from the widget host for widget customization events. Requires Windows App SDK 1.4+.

## Signature / Usage

```csharp
public interface IWidgetProvider2
```

```csharp
internal class WidgetProvider : IWidgetProvider, IWidgetProvider2
{
    public void OnCustomizationRequested(WidgetCustomizationRequestedArgs customizationInvokedArgs)
    {
        var widgetId = customizationInvokedArgs.WidgetContext.Id;
        // set an internal "in customization" flag and send the customization
        // JSON template the next time UpdateWidget is called
    }
}
```

## Options / Props

| Method | Description |
|------|-------------|
| `OnCustomizationRequested(WidgetCustomizationRequestedArgs)` | Raised when the user has requested widget customization through the widget host UI (the "Customize widget" ellipsis menu item). |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers`. Requires the widget's manifest `Definition` element to set `IsCustomizable="true"`.
- Widget provider apps must still implement `IWidgetProvider` for the base widget lifetime events; `IWidgetProvider2` is additive.
- Customization flow: `OnCustomizationRequested` sets an internal flag → provider sends the customization JSON template instead of the regular template on subsequent updates → `OnActionInvoked` receives verbs from the customization UI → an app-defined "exit customization" verb resets the flag.
- If the user closes the customization UI without an explicit exit action, `IWidgetProviderAnalytics.OnAnalyticsInfoReported` is raised with `AnalyticsJson` containing `interactionKind: "exitCustomization"`.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [Widget provider error and analytics reporting](./widget-provider-error-analytics-reporting.md)
- [implement-widget-provider](./implement-widget-provider.md)
