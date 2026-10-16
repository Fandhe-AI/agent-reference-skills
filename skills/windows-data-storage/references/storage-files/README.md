# storage-files

| Name | Description | Path |
|------|-------------|------|
| Accessing the SD card | Reads and writes non-essential data on an optional removable SD card via `KnownFolders.RemovableDevices`, which is the logical root `StorageFolder` for currently connected removable devices. | [access-sd-card.md](./access-sd-card.md) |
| CachedFileManager | Static helper class that lets apps manage real-time updates to files provided by other apps or remote/cloud providers (e.g. files obtained through a file picker). | [cached-file-manager.md](./cached-file-manager.md) |
| DataReader / DataWriter | Typed read/write of primitives, strings, buffers over a stream | [data-reader-writer.md](./data-reader-writer.md) |
| DownloadsFolder | Static class that creates files and folders inside the Downloads folder. | [downloads-folder.md](./downloads-folder.md) |
| FileIO | Static helper class that provides methods for reading and writing files represented by `IStorageFile` (i.e. `StorageFile`) objects, without manually opening streams. | [file-io.md](./file-io.md) |
| File properties (BasicProperties / RetrievePropertiesAsync) | Get top-level, basic, and extended properties for a file represented by a `StorageFile`. | [file-properties.md](./file-properties.md) |
| IRandomAccessStream | Interface supporting random (seekable) access to data in input and output streams. | [irandom-access-stream.md](./irandom-access-stream.md) |
| IStorageItem | Base interface implemented by both `StorageFile` and `StorageFolder`. | [istorage-item.md](./istorage-item.md) |
| PathIO | Static helper class that provides methods for reading and writing a file directly by its absolute path or URI, without first obtaining a `StorageFile` object. | [path-io.md](./path-io.md) |
| StorageFile | Represents a file. | [storage-file.md](./storage-file.md) |
| StorageFile Streamed Content (CreateStreamedFileAsync) | Static `StorageFile` methods that let an app produce or download a file's content lazily, only when the returned `StorageFile` is first accessed, instead of writing the data up front. | [streamed-file-content.md](./streamed-file-content.md) |
| StorageFolder | Manages folders and their contents and provides information about them. | [storage-folder.md](./storage-folder.md) |
| StorageItemThumbnail | Represents the thumbnail image associated with a system resource such as a file or folder. | [storage-item-thumbnail.md](./storage-item-thumbnail.md) |
| StorageLibrary | Represents a virtual collection of folders — a known folder (Music/Pictures/Videos) plus any additional folders the user has added. | [storage-library.md](./storage-library.md) |
| StorageLibraryChangeTracker | Tracks add/delete/modify/rename/move operations on files and folders under a `StorageLibrary` (or any local folder) in the background, even while the app isn't running. | [storage-library-change-tracker.md](./storage-library-change-tracker.md) |
| StorageProviderSyncRootManager | Registers or unregisters a Cloud Storage Provider "sync root" — a folder tree that File Explorer renders with placeholder files and sync-status badges (as used by OneDrive, Dropbox, etc.) — with the operating system. | [storage-provider-sync-root-manager.md](./storage-provider-sync-root-manager.md) |
| StorageStreamTransaction | Represents a write transaction for a random-access stream, obtained via `StorageFile.OpenTransactedWriteAsync()`. | [storage-stream-transaction.md](./storage-stream-transaction.md) |
| System.IO vs Windows.Storage | Guidance on choosing between the WinRT `Windows.Storage` / `Windows.Storage.Streams` APIs and the .NET `System.IO` APIs when building packaged Windows apps (UWP or WinUI 3 / Windows App SDK desktop apps). | [system-io-vs-windows-storage.md](./system-io-vs-windows-storage.md) |
</content>
