# JsonValue

Implements the `IJsonValue` interface which represents a single JSON value. A `JsonValue` can represent the primitive types Boolean, Number, and String, and can also expose the complex types Array and Object through accessor methods.

## Signature / Usage

```csharp
public sealed class JsonValue : IJsonValue, IStringable
```

```csharp
if (JsonValue.TryParse(jsonText, out JsonValue value))
{
    switch (value.ValueType)
    {
        case JsonValueType.String:
            string s = value.GetString();
            break;
        case JsonValueType.Number:
            double n = value.GetNumber();
            break;
    }
}

JsonValue boolValue = JsonValue.CreateBooleanValue(true);
string json = boolValue.Stringify(); // "true"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ValueType` | `JsonValueType` (property) | Type of the encapsulated JSON value (`Null`, `Boolean`, `Number`, `String`, `Array`, `Object`). |
| `CreateBooleanValue(Boolean)` | static method | Creates a `JsonValue` from a `Boolean`. |
| `CreateNumberValue(Double)` | static method | Creates a `JsonValue` from a `Double`. |
| `CreateStringValue(String)` | static method | Creates a `JsonValue` from a `String`. |
| `CreateNullValue()` | static method | Creates a `JsonValue` with a `NULL` value. |
| `Parse(String)` | static method | Parses a JSON string into a `JsonValue`. Throws on invalid JSON. |
| `TryParse(String, out JsonValue)` | static method | Parses a JSON string; returns `bool` for success instead of throwing. |
| `GetString()` / `GetNumber()` / `GetBoolean()` | method | Gets the primitive value if `ValueType` matches. |
| `GetObject()` / `GetArray()` | method | Gets the value as `JsonObject` / `JsonArray` if `ValueType` matches. |
| `Stringify()` / `ToString()` | method | Retrieves the JSON text representation. |

## Notes

- Package: `Windows.Data.Json` (WinRT).
- The default constructor produces a `JsonValue` with `ValueType` of `Null`.
- `Parse` throws on invalid JSON; use `TryParse` (recommended) or `JsonObject.TryParse` for the top-level document.

## Related

- [JsonObject](./json-object.md)
- [JsonArray](./json-array.md)
