# Widget provider error and analytics reporting

Optional interfaces a Windows widget provider can implement to receive callbacks from the widget host for widget errors (`IWidgetProviderErrors`) and analytics events tied to user interaction with a widget (`IWidgetProviderAnalytics`). Both are supported by the Windows Widgets Board starting with Windows 11, Build 26900.

## Signature / Usage

```csharp
public interface IWidgetProviderErrors
{
    void OnErrorInfoReported(WidgetErrorInfoReportedArgs args);
}

public interface IWidgetProviderAnalytics
{
    void OnAnalyticsInfoReported(WidgetAnalyticsInfoReportedArgs args);
}
```

```csharp
internal class WidgetProvider : IWidgetProvider, IWidgetProviderErrors, IWidgetProviderAnalytics
{
    public void OnErrorInfoReported(WidgetErrorInfoReportedArgs args)
    {
        var widgetId = args.WidgetContext.Id;
        // args.ErrorJson describes the error the widget host reported
    }

    public void OnAnalyticsInfoReported(WidgetAnalyticsInfoReportedArgs args)
    {
        var widgetId = args.WidgetContext.Id;
        // args.AnalyticsJson describes the user interaction, e.g. interactionKind
    }
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `IWidgetProviderErrors.OnErrorInfoReported(WidgetErrorInfoReportedArgs)` | method | Raised when the widget host reports a widget error. |
| `WidgetErrorInfoReportedArgs.ErrorJson` | `string` | JSON string describing the error that triggered the event. |
| `WidgetErrorInfoReportedArgs.WidgetContext` | `WidgetContext` | The widget's configuration context associated with the error. |
| `IWidgetProviderAnalytics.OnAnalyticsInfoReported(WidgetAnalyticsInfoReportedArgs)` | method | Raised when the widget host reports analytics data associated with a user interaction with a widget. |
| `WidgetAnalyticsInfoReportedArgs.AnalyticsJson` | `string` | JSON string describing the user interaction that triggered the analytics event (e.g. `interactionKind`). |
| `WidgetAnalyticsInfoReportedArgs.WidgetContext` | `WidgetContext` | The widget's configuration context associated with the analytics info. |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers`. Both interfaces are optional and additive — a provider still implements the base `IWidgetProvider` (and optionally `IWidgetProvider2`) for the widget lifetime and customization callbacks.
- Requires the Windows Widgets Board on Windows 11, Build 26900 or later; available since Windows App SDK 1.4.
- `IWidgetProvider2`'s customization flow already reports one analytics case: if the user closes the customization UI without an explicit exit action, `IWidgetProviderAnalytics.OnAnalyticsInfoReported` is raised with `AnalyticsJson` containing `interactionKind: "exitCustomization"`.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [IWidgetProvider2](./iwidgetprovider2.md)
- [implement-widget-provider](./implement-widget-provider.md)
