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

## Notes

- Methods: `GetFutureAccessListForUser(User)` returns a scoped future-access list for a specific user (multi-user apps); `GetMostRecentlyUsedListForUser(User)` returns a scoped MRU list for a specific user.
- Namespace: `Windows.Storage.AccessCache`. Access members statically — the class cannot be instantiated.
- `MostRecentlyUsedList` holds up to 25 items. The platform sorts by last access and, when the limit is reached, automatically removes the item accessed the longest time ago, so you never need to `Remove` before `Add`. All apps have their own MRU.
- `FutureAccessList` holds up to 1000 items (files and folders). "The platform never removes items from the FutureAccessList for you": once 1000 is reached, you can't `Add` another until you make room with `Remove`.
- MRU `Add` is overloaded: `Add(IStorageItem)` and `Add(IStorageItem, String)`; the metadata string records the item's purpose (e.g. "profile pic"). `Add` returns a token, which you should persist (e.g. in app data) because it's needed to retrieve the item later.
- MRU retrieval: `GetFileAsync` (StorageFile), `GetFolderAsync` (StorageFolder), `GetItemAsync` (generic `IStorageItem`). `Entries` returns an `AccessListEntryView`; each `AccessListEntry` has `Token` and `Metadata`.
- `FutureAccessList` entries are also removed (`Remove`) or checked (`ContainsItem`) by token.
- Items added via a picker are the common source: the picker itself doesn't persist access automatically — the app must explicitly add the returned `StorageFile`/`StorageFolder` to `FutureAccessList` to survive process restarts.
- Works for both files and folders (including all subfolder contents when a folder is picked).

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
- [File Access Permissions](./file-access-permissions.md)
