# Implement a widget provider

Guide for implementing a Windows widget provider as a packaged Win32 app, in either C# or C++/WinRT, and testing/debugging it once deployed.

## Signature / Usage

```csharp
// WidgetProvider.cs
internal class WidgetProvider : IWidgetProvider
{
    public static Dictionary<string, CompactWidgetInfo> RunningWidgets = new();

    public void CreateWidget(WidgetContext widgetContext)
    {
        var widgetId = widgetContext.Id;
        var widgetName = widgetContext.DefinitionId;
        RunningWidgets[widgetId] = new CompactWidgetInfo { widgetId = widgetId, widgetName = widgetName };
        UpdateWidget(RunningWidgets[widgetId]);
    }

    void UpdateWidget(CompactWidgetInfo localWidgetInfo)
    {
        var updateOptions = new WidgetUpdateRequestOptions(localWidgetInfo.widgetId);
        updateOptions.Template = weatherWidgetTemplate;
        updateOptions.Data = "{}";
        WidgetManager.GetDefault().UpdateWidget(updateOptions);
    }
}
```

## Options / Props

| Step | Description |
|------|-------------|
| Implement `IWidgetProvider` | Handle `CreateWidget`, `DeleteWidget`, `OnActionInvoked`, `OnWidgetContextChanged`, `Activate`, `Deactivate`. |
| Register a COM class factory | C#: implement `IClassFactory` manually and call `CoRegisterClassObject`. C++/WinRT: use WRL (`Microsoft::WRL::Module`) `CoRegisterClassObject` registration. Widget providers must run as an out-of-process COM server. |
| Generate a CLSID | Create a GUID (Visual Studio **Tools > Create GUID**) used both for COM registration and the manifest `CreateInstance ClassId`. |
| Package the app | Add an MSIX packaging project, reference the Windows App SDK NuGet package, and add `com:Extension` (ComServer) plus `uap3:Extension` (widget provider) declarations to `Package.appxmanifest`. See widget-provider-manifest. |
| Deploy and test | Build, deploy the packaging project, open the **Widgets Board**, select **Add widgets**, and pin the widget to test it. |
| Debug | Attach: **Debug > Attach to process**, filter for the provider exe. Auto-attach: **Debug > Other Debug Targets > Debug Installed App Package**, select the package, check **Do not launch, but debug my code when it starts**, click **Attach**. |
| Widget customization (SDK 1.4+) | Implement `IWidgetProvider2.OnCustomizationRequested`, set `IsCustomizable="true"` in the manifest `Definition`, and send a customization JSON template from `UpdateWidget` while a per-widget "in customization" flag is set. |

## Notes

- Only packaged apps can currently register as widget providers; unpackaged/plain Win32 exes are not supported.
- The widget host activates the provider on demand via `CoCreateInstance` (recommended `CreateInstance` activation) or via command-line `ActivateApplication`; provider process lifetime is independent of individual widgets' lifetimes.
- On provider startup, call `WidgetManager.GetDefault().GetWidgetInfos()` to recover state for widgets that were already pinned before the process (re)started.
- C++/WinRT implementation follows the same `IWidgetProvider` callback structure as C#; the primary differences are COM class-factory registration (WRL module) and language syntax. See "Implement a widget provider in a win32 app (C++/WinRT)" on Microsoft Learn for the full C++ listing.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [IWidgetProvider2](./iwidgetprovider2.md)
- [widget-provider-manifest](./widget-provider-manifest.md)
- [widgets-create-a-template](./widgets-create-a-template.md)
