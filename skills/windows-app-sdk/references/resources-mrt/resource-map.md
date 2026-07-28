# ResourceMap

A collection of related resources, typically either for a particular app package, or a resource file for a particular package. Resources available to an app are stored in hierarchical collections accessed through `ResourceMap`.

## Signature / Usage

```csharp
public sealed class ResourceMap

var resourceMap = resourceManager.MainResourceMap.GetSubtree("Resources");
ResourceCandidate candidate = resourceMap.GetValue("Farewell", resourceContext);
string text = candidate.ValueAsString;
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `ResourceCount` | property (`uint`) | Gets the number of resources in the `ResourceMap`. |
| `GetSubtree(String)` | method → `ResourceMap` | Returns a `ResourceMap` representing part of another `ResourceMap` (subtree, ancestor, sibling, cousin, or top-level map), typically used to access a particular resource file within an app package. |
| `TryGetSubtree(String)` | method → `ResourceMap` | Same as `GetSubtree`, but returns `null` instead of throwing when not found. |
| `GetValue(String)` | method → `ResourceCandidate` | Returns the most appropriate candidate for a resource specified by identifier, within the default context. |
| `GetValue(String, ResourceContext)` | method → `ResourceCandidate` | Returns the most appropriate candidate for a resource specified by identifier, for the supplied context. |
| `TryGetValue(String)` / `TryGetValue(String, ResourceContext)` | method → `ResourceCandidate` | Same as `GetValue`, but returns `null` instead of throwing when not found. |
| `GetValueByIndex(UInt32)` / `GetValueByIndex(UInt32, ResourceContext)` | method → `ResourceCandidate` | Returns the resource at the specified index, in the default or supplied context. |

## Notes

- Package: `Microsoft.Windows.ApplicationModel.Resources` (Windows App SDK).
- Resource identifiers are treated as URI fragments (URI semantics apply): `GetValue("Caption%20")` is treated as `GetValue("Caption ")`. Don't use `?` or `#` in resource identifiers, since they terminate path evaluation.
- `ResourceManager.MainResourceMap` is the top-level `ResourceMap` for the current app package; each `ResourceMap` is named for the package name in the package's manifest. Within a `ResourceMap`, subtrees typically correspond to the resource files (`.resw`) that contain the resources.
- Indexed file resources reside within a reserved `"Files"` subtree to avoid collisions with other resources (e.g. `\Images\logo.png` → resource name `Files/images/logo.png`).

## Related

- [ResourceManager](./resource-manager.md)
- [ResourceCandidate](./resource-candidate.md)
- [ResourceContext](./resource-context.md)
