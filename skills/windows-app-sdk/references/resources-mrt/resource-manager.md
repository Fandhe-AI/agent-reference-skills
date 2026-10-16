# ResourceManager

Provides access to app resource maps and more advanced resource functionality, such as enumeration and inspection of resources beyond what `ResourceLoader` provides.

## Signature / Usage

```csharp
public sealed class ResourceManager

var resourceManager = new Microsoft.Windows.ApplicationModel.Resources.ResourceManager();
var resourceContext = resourceManager.CreateResourceContext();
resourceContext.QualifierValues["Language"] = "de-DE";
var resourceMap = resourceManager.MainResourceMap.GetSubtree("Resources");
string value = resourceMap.GetValue("Farewell", resourceContext).ValueAsString;
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `ResourceManager()` | constructor | Creates a `ResourceManager` using the default settings. |
| `ResourceManager(String)` | constructor | Creates a `ResourceManager` for the given `.pri` file path. Required for unpackaged apps, which have no default package view. |
| `MainResourceMap` | property (`ResourceMap`) | The `ResourceMap` associated with the main package of the currently running app. |
| `CreateResourceContext()` | method → `ResourceContext` | Creates a `ResourceContext` with the default settings. |
| `ResourceNotFound` | event | Occurs when an attempt to get a resource fails because the specified resource was not found. |

## Notes

- Package: `Microsoft.Windows.ApplicationModel.Resources` (Windows App SDK). In releases before Windows App SDK 1.0 Preview 1, this namespace was `Microsoft.ApplicationModel.Resources`. Distinct from the UWP `Windows.ApplicationModel.Resources.Core.ResourceManager`.
- For unpackaged applications, use the `ResourceManager(String)` overload to pass the app's `.pri` file path explicitly, since there is no default view in unpackaged scenarios.
- `MainResourceMap` excludes any referenced framework packages; it corresponds only to the current app package.
- Windows App SDK 2.2.0 fixed sparse-packaged apps being unable to discover module-specific PRI files (RuntimeCompatibilityChange: `MRTCore_SparsePackagedPriFallback`).
- Windows App SDK 2.4.0 fixed `MICROSOFT_WINDOWSAPPRUNTIME_BASE_DIRECTORY` being inherited by child processes, which disrupted MRT Core and catalog lookups (RuntimeCompatibilityChange: `WindowsAppRuntime_BaseDirectoryIsolation`).
- Windows App SDK 2.4.0 also fixed a regression where `MrmGetFilePathFromName` returned `ERROR_FILE_NOT_FOUND` when the PRI file didn't exist, instead of the documented fallback path (RuntimeCompatibilityChange: `ResourceManager_RestoreDefaultFallbackPath`).
- Source (2.2.0 / 2.4.0 fixes): https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-notes/windows-app-sdk-2-0

## Related

- [ResourceMap](./resource-map.md)
- [ResourceContext](./resource-context.md)
- [ResourceLoader](./resource-loader.md)
