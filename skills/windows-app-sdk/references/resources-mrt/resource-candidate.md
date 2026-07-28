# ResourceCandidate

Represents a single possible value for a given resource, the qualifiers associated with that resource, and how well those qualifiers match the context against which it was resolved. For example, the string "Hello World" for English, or `logo.scale-100.jpg` as an image resource qualified for the scale-100 resolution.

## Signature / Usage

```csharp
public sealed class ResourceCandidate

ResourceCandidate candidate = resourceMap.GetValue("Farewell", resourceContext);
string text = candidate.ValueAsString;
ResourceCandidateKind kind = candidate.Kind;
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `ResourceCandidate(Byte[])` | constructor | Creates a `ResourceCandidate` with the specified binary value. |
| `ResourceCandidate(ResourceCandidateKind, String)` | constructor | Creates a `ResourceCandidate` with the specified kind and string value. |
| `Kind` | property (`ResourceCandidateKind`) | The type of resource encapsulated in this `ResourceCandidate` (e.g. string, file path, embedded data). |
| `QualifierValues` | property | Gets the qualifiers associated with this `ResourceCandidate`. |
| `ValueAsString` | property (`string`) | Gets the value of the `ResourceCandidate` represented as a string. |
| `ValueAsBytes` | property (`byte[]`) | Gets the value of the `ResourceCandidate` represented in bytes. |

## Notes

- Package: `Microsoft.Windows.ApplicationModel.Resources` (Windows App SDK).
- Returned by `ResourceMap.GetValue` / `TryGetValue` / `GetValueByIndex`, resolved against a supplied or default `ResourceContext`.

## Related

- [ResourceMap](./resource-map.md)
- [ResourceContext](./resource-context.md)
