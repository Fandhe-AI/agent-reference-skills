# ApplicationDataContainer

Represents a container for app settings. Supports creating, deleting, enumerating, and traversing a hierarchy of settings containers. Obtained from `ApplicationData.LocalSettings` / `ApplicationData.RoamingSettings`, or from a parent container's `Containers` property.

## Signature / Usage

```csharp
public sealed class ApplicationDataContainer : System.IDisposable

Windows.Storage.ApplicationDataContainer localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

// Create a setting in a container
Windows.Storage.ApplicationDataContainer container =
   localSettings.CreateContainer("exampleContainer", Windows.Storage.ApplicationDataCreateDisposition.Always);

if (localSettings.Containers.ContainsKey("exampleContainer"))
{
   localSettings.Containers["exampleContainer"].Values["exampleSetting"] = "Hello, Windows!";
}

// Delete a container
localSettings.DeleteContainer("exampleContainer");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Values | `ApplicationDataContainerSettings` (IPropertySet-like map) | The settings stored directly in this container, as key/value pairs. |
| Containers | `IMapView<String, ApplicationDataContainer>` | The child settings containers of this container. |
| Locality | `ApplicationDataLocality` | Whether this container is associated with local or roaming app data. |
| Name | `String` | Name of the current settings container. |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| CreateContainer | `ApplicationDataContainer CreateContainer(String name, ApplicationDataCreateDisposition disposition)` | Creates or opens the named container. `ApplicationDataCreateDisposition.Always` creates it if it doesn't exist; `Existing` returns an existing one only. |
| DeleteContainer | `void DeleteContainer(String name)` | Deletes the named container, its subcontainers, and all settings in that hierarchy. |

## Notes

- Namespace: `Windows.Storage`. There is no settings container for the temporary app data store.
- Containers can be nested up to 32 levels deep.
- Each setting name can be up to 255 characters; each setting value up to 8K bytes; each composite setting up to 64K bytes — see Settings size limits and roaming deprecation.

## Related

- [ApplicationData](./application-data.md)
- [ApplicationDataCompositeValue](./application-data-composite-value.md)
- [Settings size limits and roaming deprecation](./settings-limits-and-roaming.md)
