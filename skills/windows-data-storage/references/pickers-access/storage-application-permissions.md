# StorageApplicationPermissions

Static class providing an app's future-access list and most-recently-used list, letting an app retain access to files/folders picked by the user beyond the current session.

## Signature / Usage

```csharp
using Windows.Storage.AccessCache;

StorageFile file = await savePicker.PickSaveFileAsync();
if (file != null)
{
    // Add to MRU with metadata (e.g. a date string)
    string mruToken = StorageApplicationPermissions.MostRecentlyUsedList.Add(file, "20120716");

    // Add to Future Access List without metadata
    string faToken = StorageApplicationPermissions.FutureAccessList.Add(file);
}

// Later, retrieve the item back using the stored token:
StorageFile restoredFile = await StorageApplicationPermissions.FutureAccessList.GetFileAsync(faToken);
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `FutureAccessList` | `StorageItemAccessList` (static) | List an app maintains to store files/folders and access them again later, keyed by a token string returned from `Add`. |
| `MostRecentlyUsedList` | `StorageItemMostRecentlyUsedList` (static) | List an app can use to track recently accessed files/folders. |

## Methods

| Name | Description |
|------|--------------|
| `GetFutureAccessListForUser(User)` | Scoped future-access list for a specific user (multi-user apps). |
| `GetMostRecentlyUsedListForUser(User)` | Scoped MRU list for a specific user. |

## Notes

- Namespace: `Windows.Storage.AccessCache`. Access members statically — the class cannot be instantiated.
- Both lists have a maximum capacity (`MaximumItemsAllowed`, historically 1000 for `FutureAccessList` and 25 for `MostRecentlyUsedList`); adding beyond capacity evicts the oldest entry.
- Store the token string returned by `Add` — it's required to retrieve (`GetFileAsync`/`GetFolderAsync`), remove (`Remove`), or check (`ContainsItem`) the entry later.
- Items added via a picker are the common source: the picker itself doesn't persist access automatically — the app must explicitly add the returned `StorageFile`/`StorageFolder` to `FutureAccessList` to survive process restarts.
- Works for both files and folders (including all subfolder contents when a folder is picked).

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
- [File Access Permissions](./file-access-permissions.md)
