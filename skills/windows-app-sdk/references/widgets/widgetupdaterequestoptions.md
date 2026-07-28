# WidgetUpdateRequestOptions

Sealed class providing data for calls to `WidgetManager.UpdateWidget`, used to push an updated visual template, data, custom state, and rank for a widget.

## Signature / Usage

```csharp
public sealed class WidgetUpdateRequestOptions
```

```csharp
WidgetUpdateRequestOptions updateOptions = new WidgetUpdateRequestOptions(widgetId);
updateOptions.Template = templateJson;
updateOptions.Data = dataJson;
updateOptions.CustomState = customState.ToString();
WidgetManager.GetDefault().UpdateWidget(updateOptions);
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `WidgetUpdateRequestOptions(String widgetId)` (constructor) | — | Initializes a new instance for the widget with the given ID. |
| `WidgetId` | `String` | The ID of the widget to be updated (read-only, set via constructor). |
| `CustomState` | `String` | Custom state string for the widget. |
| `Data` | `String` | Adaptive Card data template for the widget. |
| `IsPlaceholderContent` | `Boolean` | Whether the content of the update is placeholder content. |
| `Rank` | `Int32` | Rank of the widget relative to other widgets from the same package identity. |
| `Template` | `String` | Adaptive Card visual template for the widget. |
| `UnsetValue` | (sentinel) | Sentinel value indicating that the associated property is unset. |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers`.
- Any property not set on an instance is left unmodified on the widget host — only set the properties you intend to update.
- Setting a property to an empty string clears the stored value (e.g. setting `CustomState = ""` erases the widget's stored custom state).

## Related

- [WidgetManager](./widgetmanager.md)
- [WidgetInfo](./widgetinfo.md)
