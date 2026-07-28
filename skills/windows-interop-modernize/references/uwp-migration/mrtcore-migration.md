# MRT to MRT Core migration

Migration guidance for moving from UWP's Resource Management System (MRT), in `Windows.ApplicationModel.Resources.Core`, to the Windows App SDK's streamlined MRT Core, in `Microsoft.Windows.ApplicationModel.Resources`.

## Signature / Usage

```csharp
// UWP app
using Windows.ApplicationModel.Resources.Core;
var currentResourceManager = ResourceManager.Current;
```

```csharp
// Windows App SDK app
using Microsoft.Windows.ApplicationModel.Resources;
var currentResourceManager = new ResourceManager();
var resourceContext = currentResourceManager.CreateResourceContext();
int scaleFactor = Convert.ToInt32(layoutRoot.XamlRoot.RasterizationScale * 100);
resourceContext.QualifierValues[KnownResourceQualifierName.Scale] = scaleFactor.ToString();
string s = resourceContext.QualifierValues[KnownResourceQualifierName.Scale];
```

## Options / Props

| UWP (MRT) | Windows App SDK (MRT Core) |
|------|-------------|
| `Windows.ApplicationModel.Resources.Core` (namespace) | `Microsoft.Windows.ApplicationModel.Resources` |
| `ResourceManager.Current` (property) | `new ResourceManager()` (construct an instance) |
| `ResourceContext.GetForCurrentView` | `ResourceManager.CreateResourceContext` |
| `ResourceContext.GetForViewIndependentUse` | `ResourceManager.CreateResourceContext` |
| `ResourceQualifierObservableMap.MapChanged` | No replacement — detect environment changes yourself |

## Notes

- Not all MRT APIs exist in MRT Core, but everything needed for basic resource-loading functionality is included.
- In UWP's MRT, resource-context qualifier values are determined for the app automatically. In MRT Core, **only the language value is populated** — your app must set other qualifier values itself (for example `Scale`, derived from `XamlRoot.RasterizationScale`).
- MRT Core provides no notification mechanism for qualifier/environment changes (no `MapChanged` equivalent) — implement your own change detection if resources need to update live.
- Applies to `Microsoft.Windows.ApplicationModel.Resources` — not to be confused with .NET resource APIs (`System.Resources.ResourceManager`), which are a separate, unrelated API family.

## Related

- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
