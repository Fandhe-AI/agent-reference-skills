# StorageProviderSyncRootManager

Registers or unregisters a Cloud Storage Provider "sync root" — a folder tree that File Explorer renders with placeholder files and sync-status badges (as used by OneDrive, Dropbox, etc.) — with the operating system. Part of the `Windows.Storage.Provider` namespace's Cloud Files API.

## Signature / Usage

```csharp
using Windows.Storage.Provider;

if (StorageProviderSyncRootManager.IsSupported())
{
    var info = new StorageProviderSyncRootInfo
    {
        Id = "MyCloudProvider!user@example.com",
        Path = await StorageFolder.GetFolderFromPathAsync(syncRootPath),
        DisplayNameResource = "My Cloud Provider",
        IconResource = @"C:\Program Files\MyApp\app.ico,0",
        Version = "1.0.0",
        ProviderId = providerGuid,
        HydrationPolicy = StorageProviderHydrationPolicy.Full,
        PopulationPolicy = StorageProviderPopulationPolicy.Full,
        InSyncPolicy = StorageProviderInSyncPolicy.FileCreationTime
            | StorageProviderInSyncPolicy.DirectoryCreationTime,
        HardlinkPolicy = StorageProviderHardlinkPolicy.None,
        AllowPinning = true,
    };

    StorageProviderSyncRootManager.Register(info);
}

// Later, to remove the registration:
StorageProviderSyncRootManager.Unregister(info.Id);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IsSupported()` | static method | Verifies the OS supports registering cloud-files sync roots (Windows 10, version 2004+). |
| `Register(StorageProviderSyncRootInfo)` | static method | Registers a sync root with the operating system so File Explorer shows placeholders/badges for it. |
| `Unregister(string id)` | static method | Unregisters the sync root with the given `Id`. |
| `GetCurrentSyncRoots()` | static method | Returns all sync roots currently registered by the calling package. |
| `GetSyncRootInformationForFolder(IStorageFolder)` / `GetSyncRootInformationForId(string)` | static method | Looks up a `StorageProviderSyncRootInfo` by folder or by `Id`. |
| `StorageProviderSyncRootInfo.Id` | `string` | Unique identifier for this sync root, used to manage it throughout its lifecycle. |
| `StorageProviderSyncRootInfo.Path` | `IStorageFolder` | Root folder of the cloud-backed folder tree. |
| `StorageProviderSyncRootInfo.HydrationPolicy` | `StorageProviderHydrationPolicy` | How placeholder content is fetched on access (`Full`, `Progressive`, `OnDemand`, ...). |
| `StorageProviderSyncRootInfo.PopulationPolicy` | `StorageProviderPopulationPolicy` | How the provider populates placeholders for the folder tree (`Full` vs `AlwaysFull`). |
| `StorageProviderSyncRootInfo.InSyncPolicy` | `StorageProviderInSyncPolicy` | Which file/directory attributes the provider keeps in sync (creation time, last-write time, etc.). |
| `StorageProviderSyncRootInfo.HardlinkPolicy` | `StorageProviderHardlinkPolicy` | Whether hard links are permitted on a placeholder file/folder (disallowed by default). |
| `StorageProviderSyncRootInfo.ProviderId` | `Guid` | GUID identifying the storage provider. |
| `StorageProviderSyncRootInfo.AllowPinning` | `bool` | Enables the "Always keep on this device" / pin-offline UI for items under the root. |
| `StorageProviderSyncRootInfo.ShowSiblingsAsGroup` | `bool` | Groups sibling sync roots together under one entry in File Explorer's nav pane. |
| `StorageProviderSyncRootInfo.RecycleBinUri` | `Uri` | URI of the provider's own cloud recycle bin. |

## Notes

- Namespace `Windows.Storage.Provider`. Registration requires the Windows Desktop Extension SDK (packaged desktop apps); the API surface targets sync/cloud-storage providers (OneDrive-style apps), not typical file-consuming apps.
- The registered provider must also implement placeholder I/O callbacks via the Cloud Filter API (`CfRegisterSyncRoot` family, Win32) or the higher-level `CldApi`/`Windows.Storage.Provider` callback interfaces (`IStorageProviderItemPropertySource`, etc.) to actually hydrate/dehydrate file content — `StorageProviderSyncRootManager` only handles the registration/metadata side.
- `StorageFile`/`StorageFolder`'s `IsAvailable` property (see StorageFile) reflects whether a placeholder under a registered sync root is locally available or needs to be downloaded.
- Several sibling types in `Windows.Storage.Provider` (`StorageProviderError`, `StorageProviderStatus`, `IStorageProviderHandlerFactory`, `IStorageProviderStatusSource`) are documented as superseded — prefer `StorageProviderStatusUI`/`IStorageProviderStatusUISource` and related "UI" types for status/flyout scenarios.

## Related

- [StorageFile](./storage-file.md)
- [StorageFolder](./storage-folder.md)
- [CachedFileManager](./cached-file-manager.md)
