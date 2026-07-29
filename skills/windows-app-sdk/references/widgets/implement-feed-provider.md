# Implement a feed provider

Guide for implementing a Windows feed provider as a packaged Win32 app, in either C# or C++/WinRT, and packaging/testing/debugging it once deployed. A feed provider registers one or more content feeds that appear as pivots above the Widgets Board's Dashboard/Feeds section.

## Signature / Usage

```csharp
// FactoryHelper.cs — class factory boilerplate, registered with CoRegisterClassObject
internal class FeedProviderFactory<T> : Com.IClassFactory where T : IFeedProvider, new()
{
    public int CreateInstance(IntPtr pUnkOuter, ref Guid riid, out IntPtr ppvObject)
    {
        ppvObject = MarshalInspectable<IFeedProvider>.FromManaged(new T());
        return 0;
    }
}

// Program.cs
static void Main(string[] args)
{
    if (args.Length > 0 && args[0] == "-RegisterProcessAsComServer")
    {
        WinRT.ComWrappersSupport.InitializeComWrappers();
        var factory = new FeedProviderFactory<FeedProvider>();
        Com.ClassObject.Register(typeof(FeedProvider).GUID, factory, out uint registrationHandle);
    }
}
```

## Options / Props

| Step | Description |
|------|-------------|
| Implement `IFeedProvider` | Handle `OnFeedProviderEnabled`, `OnFeedProviderDisabled`, `OnFeedEnabled`, `OnFeedDisabled`, `OnCustomQueryParametersRequested`. |
| Register a COM class factory | C#: implement `IClassFactory` manually and call `CoRegisterClassObject`. Same pattern as widget providers — feed providers must run as an out-of-process COM server. |
| Generate a CLSID | Create a GUID (Visual Studio **Tools > Create GUID**) used both for COM registration and the manifest `Activation > CreateInstance ClassId`. |
| Package the app | Add an MSIX packaging project, reference the Windows App SDK NuGet package, and add `com:Extension` (ComServer) plus `uap3:Extension Category="windows.appExtension"` (`Name="com.microsoft.windows.widgets.feeds"`) declarations to `Package.appxmanifest`. See feed-provider-manifest. |
| Deploy and test | Build, deploy the packaging project, open the **Widgets Board**, and check the Dashboard/Feeds section for the new feed tabs. |
| Debug | Attach: **Debug > Attach to process**, filter for the provider exe. Auto-attach: **Debug > Other Debug Targets > Debug Installed App Package**, select the package, check **Do not launch, but debug my code when it starts**, click **Attach**. |

## Notes

- Only packaged apps can currently register as feed providers; unpackaged/plain Win32 exes are not supported.
- The feed providers feature is in preview and, per the official docs, is available only to users in the European Economic Area (EEA); it requires the latest Windows App SDK.
- C++/WinRT implementation follows the same `IFeedProvider` callback structure as C#; the primary differences are COM class-factory registration (WRL module) and language syntax. See "Implement a feed provider in a win32 app (C++/WinRT)" on Microsoft Learn for the full C++ listing.
- Structurally parallel to widget providers (`IWidgetProvider`) on the same Widgets Board surface, but a distinct interface, manifest extension name, and app-manifest namespace (`com.microsoft.windows.widgets.feeds` vs `com.microsoft.windows.widgets`).

## Related

- [IFeedProvider](./ifeedprovider.md)
- [FeedManager](./feedmanager.md)
- [feed-provider-manifest](./feed-provider-manifest.md)
- [implement-widget-provider](./implement-widget-provider.md)
