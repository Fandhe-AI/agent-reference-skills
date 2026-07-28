# ResourceContext

Encapsulates all of the factors that might affect resource selection, such as language, scale, and contrast. A `ResourceContext` is a collection of resource qualifier values used when resolving a `ResourceCandidate` from a `ResourceMap`.

## Signature / Usage

```csharp
public sealed class ResourceContext

var resourceContext = resourceManager.CreateResourceContext();
resourceContext.QualifierValues["Language"] = "de-DE";
// Shortcut for the Language qualifier specifically:
resourceContext.Languages = new string[] { "de-DE" };
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `QualifierValues` | property (map, indexed by qualifier name) | Gets a map of all supported qualifiers, indexed by name (e.g. `"Language"`, `"Scale"`, `"Contrast"`, `"Theme"`). |

## Notes

- Package: `Microsoft.Windows.ApplicationModel.Resources` (Windows App SDK).
- A default context uses the app's current runtime configuration for each qualifier value unless overridden. Each application view has its own distinct default context because qualifiers such as scale can vary per view/monitor.
- Construct a new `ResourceContext` (via `ResourceManager.CreateResourceContext()`) and override `QualifierValues` to be explicit about which language, scale, contrast, or other qualifier to use, instead of relying on system settings.
- Methods of this class can be called on any thread (except where otherwise noted).

## Related

- [ResourceManager](./resource-manager.md)
- [ResourceMap](./resource-map.md)
- [ResourceQualifiers](./resource-qualifiers.md)
