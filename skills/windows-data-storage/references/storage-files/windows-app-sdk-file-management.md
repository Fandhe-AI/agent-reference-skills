---
source: https://learn.microsoft.com/en-us/windows/apps/develop/files/
---

# File Management in Windows App SDK (overview)

Overview of the APIs a packaged Windows App SDK app uses to read, write and manage files and folders: the `Windows.Storage` / `Windows.Storage.Streams` WinRT APIs, the `Microsoft.Windows.Storage.Pickers` picker APIs (Windows App SDK 1.8+), and the .NET `System.IO` APIs.

## Signature / Usage

The `Package.appxmanifest` of a new WinUI project declares the restricted capability that gives .NET file APIs the same file system access as any other .NET desktop app:

```xml
<Capabilities>
  <rescap:Capability Name="runFullTrust" />
</Capabilities>
```

## Options / Props

| Need | API family | Page |
|------|------------|------|
| Let users open or save files and folders | `Microsoft.Windows.Storage.Pickers` (1.8+) | Microsoft.Windows.Storage.Pickers (Windows App SDK) in `pickers-access` |
| Read and write via `StorageFile` | `Windows.Storage` WinRT | StorageFile, FileIO |
| Read and write via paths | .NET `System.IO` | System.IO vs Windows.Storage |
| Enumerate and query folders, libraries, devices, network locations | `Windows.Storage` queries | `data-serialization` query pages |
| Track recently used files and folders (MRU, 25-item limit) | `StorageApplicationPermissions` | StorageApplicationPermissions in `pickers-access` |
| Track file system changes in the background | `StorageLibraryChangeTracker` | StorageLibraryChangeTracker |
| SD card access | `KnownFolders.RemovableDevices` | Accessing the SD card |
| Fast access to file properties | indexer-backed queries | File Properties, and the fast-file-enumeration sample |

## Notes

- Packaged apps have access to all the WinRT storage APIs available to UWP apps, whether migrating a UWP app or creating a new app.
- Packaged desktop apps can also use `System.IO`; the `runFullTrust` restricted capability above provides full access to the file system, registry and other restricted capabilities.
- The official overview also lists topics on best practices for writing to files (`FileIO` / `PathIO`), accessing HomeGroup content (HomeGroup is not supported starting in Windows 10 and is excluded from the new `PickerLocationId`), determining availability of OneDrive files (`StorageFile.IsAvailable`), and libraries (Music, Pictures, Videos). Only the topics covered by pages in this skill are summarized in the table above.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/files/ (ms.date 2025-09-10, updated 2026-04-04, retrieved 2026-11-14)

## Related

- [System.IO vs Windows.Storage](./system-io-vs-windows-storage.md)
- [StorageFile](./storage-file.md)
- [StorageFolder](./storage-folder.md)
- [StorageLibraryChangeTracker](./storage-library-change-tracker.md)
- [Accessing the SD card](./access-sd-card.md)
