# widgets

| Name | Description | Path |
|------|-------------|------|
| IWidgetProvider | Interface for widget lifetime callbacks (create/delete/activate/deactivate/action/context-change). | [iwidgetprovider.md](./iwidgetprovider.md) |
| IWidgetProvider2 | Interface for widget customization callbacks (`OnCustomizationRequested`). | [iwidgetprovider2.md](./iwidgetprovider2.md) |
| WidgetManager | Query, update, and delete widgets from a provider. | [widgetmanager.md](./widgetmanager.md) |
| WidgetContext | Widget configuration info (ID, definition ID, active state, size). | [widgetcontext.md](./widgetcontext.md) |
| WidgetInfo | Stored widget status (template, data, custom state, last update time, context). | [widgetinfo.md](./widgetinfo.md) |
| WidgetUpdateRequestOptions | Options passed to `WidgetManager.UpdateWidget`. | [widgetupdaterequestoptions.md](./widgetupdaterequestoptions.md) |
| Widget provider manifest | Package manifest XML format for registering a widget provider (`uap3:AppExtension`). | [widget-provider-manifest.md](./widget-provider-manifest.md) |
| Implement a widget provider | Step-by-step provider implementation (C# / C++/WinRT), packaging, testing, and debugging. | [implement-widget-provider.md](./implement-widget-provider.md) |
| Widget templates (Adaptive Cards) | Adaptive Cards Designer workflow, host properties, `$when` conditional layout, actions. | [widgets-create-a-template.md](./widgets-create-a-template.md) |
