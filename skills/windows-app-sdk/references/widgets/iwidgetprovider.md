# IWidgetProvider

Interface implemented by Windows Widget providers to receive callbacks from the widget host for widget lifetime events (create, delete, activate, deactivate, action invocation, context change).

## Signature / Usage

```csharp
public interface IWidgetProvider
```

```csharp
internal class WidgetProvider : IWidgetProvider
{
    public void CreateWidget(WidgetContext widgetContext) { /* ... */ }
    public void DeleteWidget(string widgetId, string customState) { /* ... */ }
    public void OnActionInvoked(WidgetActionInvokedArgs actionInvokedArgs) { /* ... */ }
    public void OnWidgetContextChanged(WidgetContextChangedArgs contextChangedArgs) { /* ... */ }
    public void Activate(WidgetContext widgetContext) { /* ... */ }
    public void Deactivate(string widgetId) { /* ... */ }
}
```

## Options / Props

| Method | Description |
|------|-------------|
| `Activate(WidgetContext)` | Notifies the provider that the widget host is currently interested in receiving updated content. |
| `CreateWidget(WidgetContext)` | Notifies the provider that a new widget has been created (e.g. user pinned a widget). |
| `Deactivate(String)` | Notifies the provider that the widget host is no longer actively requesting updates. |
| `DeleteWidget(String widgetId, String customState)` | Notifies the provider that a widget has been deleted (e.g. user unpinned it). |
| `OnActionInvoked(WidgetActionInvokedArgs)` | Called when an action is invoked on a widget, such as clicking a button. |
| `OnWidgetContextChanged(WidgetContextChangedArgs)` | Called when the widget's configuration within the host changes (e.g. size change). |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers` (Windows App SDK, WinRT). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.
- Must be implemented as an Out-of-process COM Server; the lifetime of the provider is independent from its widgets' lifetimes.
- Objects passed into callback methods are only valid within the callback — do not store references to them.
- Multiple providers from the same app run in a shared process; providers from different apps run in separate processes.

## Related

- [IWidgetProvider2](./iwidgetprovider2.md)
- [WidgetManager](./widgetmanager.md)
- [WidgetContext](./widgetcontext.md)
- [WidgetUpdateRequestOptions](./widgetupdaterequestoptions.md)
