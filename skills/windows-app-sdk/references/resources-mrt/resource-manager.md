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

## Related

- [ResourceMap](./resource-map.md)
- [ResourceContext](./resource-context.md)
- [ResourceLoader](./resource-loader.md)
