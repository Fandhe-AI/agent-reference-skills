# File properties (BasicProperties / RetrievePropertiesAsync)

Get top-level, basic, and extended properties for a file represented by a `StorageFile`. Top-level properties are members of `StorageFile`, basic properties come from `GetBasicPropertiesAsync`, and extended properties are retrieved by name with `RetrievePropertiesAsync`.

## Signature / Usage

```csharp
const string dateAccessedProperty = "System.DateAccessed";
const string fileOwnerProperty = "System.FileOwner";

// Enumerate all files in the Pictures library.
var folder = KnownFolders.PicturesLibrary;
var query = folder.CreateFileQuery();
var files = await query.GetFilesAsync();

foreach (Windows.Storage.StorageFile file in files)
{
    // Top-level properties
    string name = file.Name;
    string type = file.FileType;

    // Basic properties
    Windows.Storage.FileProperties.BasicProperties basicProperties =
        await file.GetBasicPropertiesAsync();
    string fileSize = string.Format("{0:n0}", basicProperties.Size);
    var modified = basicProperties.DateModified;

    // Extended properties
    var propertyNames = new List<string>();
    propertyNames.Add(dateAccessedProperty);
    propertyNames.Add(fileOwnerProperty);
    IDictionary<string, object> extraProperties =
        await file.Properties.RetrievePropertiesAsync(propertyNames);
    var propValue = extraProperties[dateAccessedProperty];
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `StorageFile` members (e.g. `Name`, `FileType`) | properties | Top-level properties: attributes, content type, creation date, display name, file type, and so on. |
| `StorageFile.GetBasicPropertiesAsync` | method | Returns a `BasicProperties` object defining the item's size and last-modified date (`Size`, `DateModified`). Works for files and folders. |
| `StorageFile.Properties` | `StorageItemContentProperties` | Gives access to content properties; its `RetrievePropertiesAsync` retrieves extended properties. |
| `RetrievePropertiesAsync(IEnumerable<String>)` | method | Takes the property names to retrieve and returns an `IDictionary` of values; each is read by name or index. |

## Notes

- Prerequisites: understand async programming for WinUI apps, and have access permissions to the location. The examples require the `picturesLibrary` capability; other locations may need a different capability or none (see File access permissions).
- Extended property names are Windows Core Properties canonical names such as `System.DateAccessed` and `System.FileOwner`; see the Windows Core Properties list for all of them.
- The official page shows a complete sample in the File access sample.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/files/file-properties

## Related

- [StorageFile](./storage-file.md)
- [StorageItemThumbnail](./storage-item-thumbnail.md)
- [IStorageItem](./istorage-item.md)
