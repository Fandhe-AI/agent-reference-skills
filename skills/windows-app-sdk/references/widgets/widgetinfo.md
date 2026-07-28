# WidgetInfo

Sealed class containing status information for a widget, including the visual template, data template, custom state, last update time, and host context.

## Signature / Usage

```csharp
public sealed class WidgetInfo
```

```csharp
var runningWidgets = WidgetManager.GetDefault().GetWidgetInfos();
foreach (var widgetInfo in runningWidgets)
{
    var widgetContext = widgetInfo.WidgetContext;
    var widgetId = widgetContext.Id;
    var customState = widgetInfo.CustomState;
}
```

## Options / Props

| Property | Type | Description |
|------|------|-------------|
| `CustomState` | `String` | The current custom state string stored for the widget. |
| `Data` | `String` | The current Adaptive Card JSON data template for the widget. |
| `IsPlaceholderContent` | `Boolean` | Whether the content of the update is placeholder content. |
| `LastUpdateTime` | `DateTimeOffset` | The time the widget was last updated. |
| `Rank` | `Int32` | The rank of the widget relative to other widgets from the same package identity. |
| `Template` | `String` | The current Adaptive Card JSON visual template for the widget. |
| `WidgetContext` | `WidgetContext` | Configuration information about the widget within the widget host. |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers`.
- Obtained via `WidgetManager.GetWidgetInfo(String)` or `WidgetManager.GetWidgetInfos()`.

## Related

- [WidgetManager](./widgetmanager.md)
- [WidgetContext](./widgetcontext.md)
- [WidgetUpdateRequestOptions](./widgetupdaterequestoptions.md)
