# WidgetContext

Sealed class providing information about the configuration of a widget within the widget host (ID, definition ID, active state, size).

## Signature / Usage

```csharp
public sealed class WidgetContext
```

```csharp
public void CreateWidget(WidgetContext widgetContext)
{
    var widgetId = widgetContext.Id;
    var widgetName = widgetContext.DefinitionId;
    // ...
}
```

## Options / Props

| Property | Type | Description |
|------|------|-------------|
| `DefinitionId` | `String` | The identifier registered by the widget provider to categorize the widget (matches the `Definition` `Id` attribute in the manifest). |
| `Id` | `String` | The ID of the widget associated with this `WidgetContext`. |
| `IsActive` | `Boolean` | The activation state of the widget. |
| `Size` | `WidgetSize` | The currently displayed size of the widget (`small`, `medium`, `large`). |

## Notes

- Package: `Microsoft.Windows.Widgets.Providers`.
- Obtained via the `CreateWidget` and `OnWidgetContextChanged` callback methods of `IWidgetProvider`, or via `WidgetInfo.WidgetContext`.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [WidgetInfo](./widgetinfo.md)
