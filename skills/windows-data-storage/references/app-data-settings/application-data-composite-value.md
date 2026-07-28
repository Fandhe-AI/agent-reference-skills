# ApplicationDataCompositeValue

Represents a set of related app settings that must be serialized and deserialized atomically. Implements `IPropertySet` / `IDictionary<string, object>`. Insert it into an `ApplicationDataContainer.Values` map to persist it; the system guarantees atomic integrity of a composite value during concurrent access and roaming.

## Signature / Usage

```csharp
public sealed class ApplicationDataCompositeValue :
    IDictionary<string,object>, IEnumerable<KeyValuePair<string,object>>,
    IObservableMap<string,object>, IPropertySet

Windows.Storage.ApplicationDataContainer localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

// Create a composite setting
Windows.Storage.ApplicationDataCompositeValue composite = new Windows.Storage.ApplicationDataCompositeValue();
composite["intVal"] = 1;
composite["strVal"] = "string";
localSettings.Values["exampleCompositeSetting"] = composite;

// Read a composite setting
var read = (Windows.Storage.ApplicationDataCompositeValue)localSettings.Values["exampleCompositeSetting"];

// Delete a composite setting
localSettings.Values.Remove("exampleCompositeSetting");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Size | `uint` | Number of related application settings in the composite value. |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| Insert | `bool Insert(String key, Object value)` | Creates or replaces a setting inside the composite value. |
| Lookup | `Object Lookup(String key)` | Retrieves the specified setting. |
| HasKey | `bool HasKey(String key)` | Determines whether the composite value has a setting with the given key. |
| Remove | `void Remove(String key)` | Removes the setting with the specified key. |
| Clear | `void Clear()` | Removes all settings, returning the object to its empty state. |
| GetView | `IMapView<String, Object> GetView()` | Returns a read-only snapshot of the composite value's contents. |

## Notes

- Namespace: `Windows.Storage`. Composite settings are optimized for small amounts of data; performance can be poor for large data sets.
- A composite setting counts toward the 64K bytes per-composite-setting limit — see Settings size limits and roaming deprecation.
- Fires a `MapChanged` event when the map changes.

## Related

- [ApplicationDataContainer](./application-data-container.md)
- [ApplicationData](./application-data.md)
- [Settings size limits and roaming deprecation](./settings-limits-and-roaming.md)
