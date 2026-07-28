# Microsoft.Windows.Storage.ApplicationData

Windows App SDK's application data store API. Functionally equivalent to `Windows.Storage.ApplicationData` but works for all packaged apps (not just AppContainer callers) and, via `GetForUnpackaged`, for unpackaged (non-MSIX) apps as well.

## Signature / Usage

```csharp
public sealed class ApplicationData : System.IDisposable   // namespace Microsoft.Windows.Storage

// Packaged app (equivalent to Windows.Storage.ApplicationData.Current)
Microsoft.Windows.Storage.ApplicationData appData = Microsoft.Windows.Storage.ApplicationData.GetDefault();
string localPath = appData.LocalPath;

// Unpackaged app
Microsoft.Windows.Storage.ApplicationData unpackagedData =
    Microsoft.Windows.Storage.ApplicationData.GetForUnpackaged("Contoso", "MyApp");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| LocalFolder / LocalPath | `StorageFolder` / `String` | Local data store, backed up to the cloud. |
| LocalCacheFolder / LocalCachePath | `StorageFolder` / `String` | Local cache data store, excluded from backup/restore. |
| TemporaryFolder / TemporaryPath | `StorageFolder` / `String` | Temporary data store. |
| SharedLocalFolder / SharedLocalPath | `StorageFolder` / `String` | Shared data store. |
| MachineFolder / MachinePath | `StorageFolder` / `String` | Machine-wide data store. |
| IsMachinePathSupported | `bool` | Whether the package family supports the machine data store. |
| LocalSettings | `ApplicationDataContainer` | Settings container for the local data store. |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| GetDefault | `static ApplicationData GetDefault()` | Gets the `ApplicationData` for the current user/package; the App SDK equivalent of `Windows.Storage.ApplicationData.Current`, but usable outside AppContainer. |
| GetForPackageFamily | `static ApplicationData GetForPackageFamily(String packageFamilyName)` | Gets the `ApplicationData` for the given package family for the current user. `GetForPackageFamily(Package.Current.Id.FamilyName)` is equivalent to `GetDefault()`. |
| GetForUnpackaged | `static ApplicationData GetForUnpackaged(String publisher, String product)` | Gets the `ApplicationData` object for an unpackaged app, keyed by publisher and product name. |
| GetForUser | `static ApplicationData GetForUser(User user)` | Gets the `ApplicationData` for the specified user. |
| ClearAsync(ApplicationDataLocality) | `IAsyncAction ClearAsync(ApplicationDataLocality locality)` | Removes all data from the specified store asynchronously. |
| GetPublisherCacheFolder / GetPublisherCachePath | `StorageFolder / String GetPublisherCacheFolder(String)` / `GetPublisherCachePath(String)` | Gets the specified subfolder/path of the shared publisher data store. |
| ClearPublisherCacheFolderAsync | `IAsyncAction ClearPublisherCacheFolderAsync(String folderName)` | Clears files/subfolders from a publisher cache subfolder asynchronously. |
| Close | `void Close()` | Closes the current `ApplicationData` instance. |

## Notes

- Namespace: `Microsoft.Windows.Storage` (Windows App SDK). Distinct from `Windows.Storage.ApplicationData` (classic UWP/WinRT), which is the underlying store this API layers over for packaged apps.
- Has **no `RoamingFolder` / `RoamingSettings`** — this reflects roaming data/settings being unsupported as of Windows 11; there is no App SDK roaming equivalent.
- `GetForUnpackaged(publisher, product)` is the entry point for non-MSIX apps to get an isolated, per-app data store equivalent to what packaged apps get automatically.
- Adds a `MachineFolder` / `MachinePath` data store (machine-wide, not per-user) not present in the classic `Windows.Storage.ApplicationData`.

## Related

- [ApplicationData](./application-data.md)
- [ApplicationDataContainer](./application-data-container.md)
- [Packaged vs unpackaged app data differences](./packaged-vs-unpackaged-app-data.md)
