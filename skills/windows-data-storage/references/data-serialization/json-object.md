# JsonObject

Represents a JSON object containing a collection of name and `JsonValue` pairs. Implements `IJsonValue` and `IMap<String, IJsonValue>` (`IDictionary<string, IJsonValue>` in C#), so its name/value pairs can be manipulated like a dictionary.

## Signature / Usage

```csharp
public sealed class JsonObject : IDictionary<string, IJsonValue>, IEnumerable<KeyValuePair<string, IJsonValue>>, IStringable
```

```csharp
// Parse a JSON string into a JsonObject
if (JsonObject.TryParse(jsonString, out JsonObject jsonObject))
{
    string name = jsonObject.GetNamedString("name");
    double age = jsonObject.GetNamedNumber("age", 0);
}

// Build and serialize a JsonObject
var obj = new JsonObject();
obj.SetNamedValue("name", JsonValue.CreateStringValue("Contoso"));
string json = obj.Stringify();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Size` | `uint` (property) | Size (count) of the collection. |
| `ValueType` | `JsonValueType` (property) | Type of the encapsulated JSON value. |
| `Parse(String)` | static method | Parses a JSON string into a `JsonObject`. Throws if the string is not valid JSON. |
| `TryParse(String, out JsonObject)` | static method | Parses a JSON string; returns `bool` for success instead of throwing. |
| `GetNamedValue(String)` / `GetNamedValue(String, JsonValue)` | method | Gets the `JsonValue` with the specified name, optionally with a default. |
| `GetNamedString(String)` / `GetNamedString(String, String)` | method | Gets a `String` value with the specified name. |
| `GetNamedNumber(String)` / `GetNamedNumber(String, Double)` | method | Gets a number (`Double`) value with the specified name. |
| `GetNamedBoolean(String)` / `GetNamedBoolean(String, Boolean)` | method | Gets a `Boolean` value with the specified name. |
| `GetNamedObject(String)` / `GetNamedObject(String, JsonObject)` | method | Gets a nested `JsonObject` with the specified name. |
| `GetNamedArray(String)` / `GetNamedArray(String, JsonArray)` | method | Gets a nested `JsonArray` with the specified name. |
| `SetNamedValue(String, IJsonValue)` | method | Sets the value of the entry with the specified name, or inserts a new entry if not found. |
| `Insert(String, IJsonValue)` | method | Adds a new name/value entry. |
| `HasKey(String)` | method | Indicates whether an entry with the given key exists. |
| `Remove(String)` | method | Removes a specific entry. |
| `Stringify()` / `ToString()` | method | Retrieves the JSON text representation. |

## Notes

- Package: `Windows.Data.Json` (WinRT). When there are duplicate name/value pairs, the last one is stored.
- `Parse` throws an exception on invalid JSON; `TryParse` is the recommended alternative since it returns a success `bool` instead of throwing.
- For new .NET code that does not need to interoperate with WinRT XAML/JS boundaries, `System.Text.Json` is generally preferred over `Windows.Data.Json` (see json-vs-system-text-json.md).

## Related

- [JsonArray](./json-array.md)
- [JsonValue](./json-value.md)
- [Windows.Data.Json vs System.Text.Json](./json-vs-system-text-json.md)
