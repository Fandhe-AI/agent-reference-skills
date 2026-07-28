# JsonArray

Represents a JSON array. Inherits the `IVector<IJsonValue>` (`IList<IJsonValue>` in C#) and `IIterable<IJsonValue>` (`IEnumerable<IJsonValue>`) interfaces, providing methods to iterate through and update the elements in the array.

## Signature / Usage

```csharp
public sealed class JsonArray : IEnumerable<IJsonValue>, IList<IJsonValue>, IStringable
```

```csharp
if (JsonArray.TryParse(jsonArrayString, out JsonArray jsonArray))
{
    foreach (IJsonValue item in jsonArray)
    {
        if (item.ValueType == JsonValueType.String)
        {
            string s = item.GetString();
        }
    }
}

var array = new JsonArray();
array.Append(JsonValue.CreateStringValue("one"));
array.Append(JsonValue.CreateNumberValue(2));
string json = array.Stringify();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Size` | `uint` (property) | Size (count) of the array. |
| `ValueType` | `JsonValueType` (property) | Type of the values within the array. |
| `Parse(String)` | static method | Parses a JSON string into a `JsonArray`. Throws on invalid JSON. |
| `TryParse(String, out JsonArray)` | static method | Parses a JSON string; returns `bool` for success instead of throwing. |
| `Append(IJsonValue)` | method | Adds a new item to the end of the array. |
| `GetAt(UInt32)` | method | Returns the item at the specified index. |
| `GetStringAt(UInt32)` / `GetNumberAt(UInt32)` / `GetBooleanAt(UInt32)` / `GetObjectAt(UInt32)` / `GetArrayAt(UInt32)` | method | Gets a typed value at the specified index. |
| `InsertAt(UInt32, IJsonValue)` | method | Inserts a value at the specified index. |
| `SetAt(UInt32, IJsonValue)` | method | Sets the value at the specified index. |
| `RemoveAt(UInt32)` / `RemoveAtEnd()` | method | Removes an item at an index, or the last item. |
| `IndexOf(IJsonValue, out UInt32)` | method | Finds the zero-based index of the first occurrence of a value. |
| `Stringify()` / `ToString()` | method | Retrieves the JSON text representation. |

## Notes

- Package: `Windows.Data.Json` (WinRT).
- `JsonArray` is enumerable; in C# use `foreach` directly without needing to cast to `IEnumerable<IJsonValue>`.
- Prefer `TryParse` over `Parse` to avoid exceptions on malformed input.

## Related

- [JsonObject](./json-object.md)
- [JsonValue](./json-value.md)
