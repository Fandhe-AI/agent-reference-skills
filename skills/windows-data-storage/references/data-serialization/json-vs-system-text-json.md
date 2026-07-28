# Windows.Data.Json vs System.Text.Json

Guidance on choosing between the WinRT `Windows.Data.Json` namespace and the .NET `System.Text.Json` namespace for JSON handling in a Windows app.

## Signature / Usage

```csharp
// Windows.Data.Json — WinRT DOM-style API, useful when interoperating with
// other WinRT APIs that accept/return IJsonValue (e.g. some Windows.Web,
// notification payload, or JS/WinRT-projection scenarios).
JsonObject.TryParse(jsonString, out JsonObject obj);
string name = obj.GetNamedString("name");

// System.Text.Json — modern .NET serializer, recommended for typical
// app data (settings files, API payloads, POCO (de)serialization).
using System.Text.Json;

var settings = JsonSerializer.Deserialize<AppSettings>(jsonString);
string json = JsonSerializer.Serialize(settings);
```

## Options / Props

| Aspect | Windows.Data.Json | System.Text.Json |
|--------|-------------------|-------------------|
| Namespace | `Windows.Data.Json` (WinRT) | `System.Text.Json` (.NET) |
| Style | DOM-like (`JsonObject`/`JsonArray`/`JsonValue`), manual key lookup | Serializer-first (`JsonSerializer.Serialize`/`Deserialize`), also has `JsonDocument`/`JsonNode` DOM APIs |
| Typed (de)serialization to POCOs | Not built-in; values are read manually via `GetNamed*` | Built-in via `JsonSerializer<T>` and source generators |
| Performance | Adequate for small WinRT interop payloads | High-performance, low-allocation, UTF-8 native |
| Interop | Required when a WinRT API surface expects/returns `IJsonValue` | N/A (pure .NET types) |
| Availability | UWP / WinRT projections | Any .NET (Windows App SDK, .NET on Windows) app |

## Notes

- For general-purpose app data (settings files, local caches, network payloads, or POCO round-tripping), `System.Text.Json` is the recommended choice for .NET code: it is built-in, actively maintained, and higher performance than the WinRT JSON DOM.
- `Windows.Data.Json` remains relevant when interoperating with WinRT APIs that specifically consume or produce `IJsonValue`/`JsonObject` (for example, certain notification payload or `Windows.Web` scenarios), or when writing C++/WinRT or JS/WinRT code that has no access to `System.Text.Json`.
- Both approaches can coexist in the same app; convert at the boundary with `.ToString()` / `JsonObject.Parse` when a WinRT API requires the WinRT JSON types.

## Related

- [JsonObject](./json-object.md)
- [JsonArray](./json-array.md)
- [JsonValue](./json-value.md)
