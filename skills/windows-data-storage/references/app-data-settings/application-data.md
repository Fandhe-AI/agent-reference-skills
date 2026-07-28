# ApplicationData

Provides access to the per-user application data store: files and settings that are local, roaming (deprecated), or temporary. `Windows.Storage.ApplicationData` is the UWP/classic WinRT API; see `Microsoft.Windows.Storage.ApplicationData` for the Windows App SDK equivalent that also supports unpackaged apps.

## Signature / Usage

```csharp
public sealed class ApplicationData : System.IDisposable

Windows.Storage.ApplicationData appData = Windows.Storage.ApplicationData.Current;
Windows.Storage.StorageFolder localFolder = appData.LocalFolder;
Windows.Storage.ApplicationDataContainer localSettings = appData.LocalSettings;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Current | `ApplicationData` (static) | The app's `ApplicationData` instance for the app package. |
| LocalFolder | `StorageFolder` | Root folder in the local app data store. Backed up to the cloud, persists across updates. |
| LocalCacheFolder | `StorageFolder` | Local folder not included in backup/restore. Persistent across sessions, use for caches, logs, tokens. |
| TemporaryFolder | `StorageFolder` | Root folder in the temporary app data store. Can be deleted by the system at any time. |
| RoamingFolder | `StorageFolder` | Root folder in the roaming app data store. Deprecated — see Notes. |
| SharedLocalFolder | `StorageFolder` | Root folder in the shared app data store, persistent across app user accounts. Requires extra setup. |
| LocalSettings | `ApplicationDataContainer` | Settings container in the local app data store. |
| RoamingSettings | `ApplicationDataContainer` | Settings container in the roaming app data store. Deprecated — see Notes. |
| RoamingStorageQuota | `uint` | Maximum size of data synchronized to the cloud from the roaming store. |
| Version | `uint` | Version number of the application data in the store. |

## Notes

- Namespace: `Windows.Storage` (UWP/classic WinRT). Distinct from `Microsoft.Windows.Storage.ApplicationData` (Windows App SDK), which adds `GetDefault()` / `GetForPackageFamily()` / `GetForUnpackaged()` and drops `RoamingFolder` / `RoamingSettings`.
- Roaming data and settings are no longer supported as of Windows 11; the recommended replacement is Azure App Service. `RoamingSettings` may also fail to persist through Microsoft Store app updates even on Windows 10 — use `LocalSettings` for anything that must survive updates.
- `ApplicationData` does not provide access to files inside the app package; use `Windows.ApplicationModel.Package.InstalledLocation` for that.
- These APIs target packaged apps. Unpackaged apps have no access to the system-managed app data stores via `Windows.Storage.ApplicationData` and must use direct file I/O, the registry, or `Microsoft.Windows.Storage.ApplicationData.GetForUnpackaged`.
- `ClearAsync()` and `ClearAsync(ApplicationDataLocality)` fail if there are open file handles in the target store; close files before calling.

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| ClearAsync() | `IAsyncAction ClearAsync()` | Removes all application data from local, roaming, and temporary stores. |
| ClearAsync(ApplicationDataLocality) | `IAsyncAction ClearAsync(ApplicationDataLocality locality)` | Removes all application data from the specified store. |
| SetVersionAsync | `IAsyncAction SetVersionAsync(uint32_t desiredVersion, ApplicationDataSetVersionHandler handler)` | Sets the version number of the application data in the store, invoking `handler` to migrate data. |
| SignalDataChanged() | `void SignalDataChanged()` | Sends a `DataChanged` event to all registered handlers. |
| GetPublisherCacheFolder(String) | `StorageFolder GetPublisherCacheFolder(String folderName)` | Gets the specified subfolder of the shared publisher storage folder. |
| ClearPublisherCacheFolderAsync(String) | `IAsyncAction ClearPublisherCacheFolderAsync(String folderName)` | Clears files/subfolders from the specified publisher cache subfolder. |
| GetForUserAsync(User) | `static IAsyncOperation<ApplicationData> GetForUserAsync(User user)` | Static method returning the `ApplicationData` for a specific `User`. |

## Events

| Name | Description |
|------|-------------|
| DataChanged | Occurs when roaming application data is synchronized. |

## Related

- [ApplicationDataContainer](./application-data-container.md)
- [ApplicationDataCompositeValue](./application-data-composite-value.md)
- [Windows App SDK ApplicationData (Microsoft.Windows.Storage)](./windows-app-sdk-application-data.md)
- [App data versioning and migration](./app-data-versioning-and-migration.md)
- [Settings size limits and roaming deprecation](./settings-limits-and-roaming.md)
