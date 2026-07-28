# ResourceLoader

Provides simplified access to app resources such as app UI strings. `ResourceLoader` encapsulates a particular `ResourceMap` and `ResourceContext`, combined in a simple API. It's the simplest way to programmatically access string resources.

## Signature / Usage

```csharp
public sealed class ResourceLoader

var resourceLoader = new Microsoft.Windows.ApplicationModel.Resources.ResourceLoader();
this.myXAMLTextBlockElement.Text = resourceLoader.GetString("Farewell");
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `ResourceLoader()` | constructor | Loader for the `"Resources"` subtree of the currently running app's main `ResourceMap` (i.e. `Resources.resw`). |
| `ResourceLoader(String)` | constructor | Loader for the specified `ResourceMap` name. |
| `ResourceLoader(String, String)` | constructor | Loader for a given `.pri` file path and resource map name — the two-parameter form to use when loading a named subtree (e.g. from a separate `.resw`) with the default `.pri`. |
| `GetDefaultResourceFilePath()` | static method → `string` | Gets the default resource file path used when no custom path is specified. |
| `GetString(String)` | method → `string` | Returns the most appropriate string value of a resource, specified by resource identifier, for the default context. |
| `GetStringForUri(Uri)` | method → `string` | Returns the most appropriate string value of a resource, specified by a URI resource identifier, for the default context. |

## Notes

- Package: `Microsoft.Windows.ApplicationModel.Resources` (Windows App SDK). In releases before Windows App SDK 1.0 Preview 1, this API was in `Microsoft.ApplicationModel.Resources`.
- The single-parameter `ResourceLoader(String)` constructor takes a `.pri` file path, not a resource map name. To load a named resource subtree using the default `.pri`, use the two-parameter constructor: `ResourceLoader(ResourceLoader.GetDefaultResourceFilePath(), "YourResourceMap")`.
- Segmented resource names (containing `.`) must have their dots replaced with `/` when passed to `GetString`, e.g. `"Fare.Well"` → `resourceLoader.GetString("Fare/Well")`.
- A `ResourceLoader` obtained inside a class library loads resources from the app hosting it at runtime; a library typically should not bundle its own resources unless it gives the hosting app a way to override them.
- For advanced scenarios (enumeration, inspection, explicit context override), use `ResourceManager` / `ResourceMap` / `ResourceContext` instead.

## Related

- [ResourceManager](./resource-manager.md)
- [ResourceMap](./resource-map.md)
- [Localization](./localize-strings.md)
