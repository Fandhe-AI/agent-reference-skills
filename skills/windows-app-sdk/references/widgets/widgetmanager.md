# WidgetManager

Sealed class providing methods for querying, updating, and deleting widgets from within a widget provider.

## Signature / Usage

```csharp
public sealed class WidgetManager : IWidgetManager, IWidgetManager2
```

```csharp
// Get the default instance
var manager = WidgetManager.GetDefault();

// Query existing widgets on startup
var runningWidgets = manager.GetWidgetInfos();

// Push an update
var updateOptions = new WidgetUpdateRequestOptions(widgetId);
updateOptions.Template = templateJson;
updateOptions.Data = dataJson;
manager.UpdateWidget(updateOptions);
```

## Options / Props

| Method | Description |
|------|-------------|
| `GetDefault()` (static) | Gets the `WidgetManager` instance for the calling app. |
| `DeleteWidget(String widgetId)` | Requests removal of a widget from the widget host. |
| `GetWidgetIds()` | Gets all widget IDs associated with the calling provider app. |
| `GetWidgetInfo(String widgetId)` | Gets a `WidgetInfo` for the widget with the given ID. |
| `GetWidgetInfos()` | Gets stored `WidgetInfo` for all widgets associated with the calling app. |
| `SendMessageToContent(String widgetId, String message)` | Sends a string message to a widget's web content. |
| `UpdateWidget(WidgetUpdateRequestOptions)` | Provides updated content (template/data/custom state) for a widget to the widget host. |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers`.
- This class can only perform operations on existing widgets — it cannot create new widgets (widgets are created by the user pinning them in the Widgets Board).
- On provider startup, call `GetWidgetInfos()` to recover the previous state of running widgets after a process restart or crash.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [WidgetInfo](./widgetinfo.md)
- [WidgetUpdateRequestOptions](./widgetupdaterequestoptions.md)
