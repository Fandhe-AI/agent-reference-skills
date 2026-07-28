# Storage Files

| Name | Description | Path |
|------|-------------|------|
| StorageFile | Represents a file; get/copy/move/delete/open, content properties | [storage-file.md](./storage-file.md) |
| StorageFolder | Manages folders; get/create/enumerate files and folders | [storage-folder.md](./storage-folder.md) |
| IStorageItem | Base interface shared by StorageFile and StorageFolder | [istorage-item.md](./istorage-item.md) |
| FileIO | Static helpers to read/write text, lines, buffers, bytes for a StorageFile | [file-io.md](./file-io.md) |
| PathIO | Static helpers to read/write files directly by path or URI | [path-io.md](./path-io.md) |
| CachedFileManager | Manage real-time updates to files from other apps/cloud providers | [cached-file-manager.md](./cached-file-manager.md) |
| StorageStreamTransaction | Transacted (commit-or-discard) writes to a random-access stream | [storage-stream-transaction.md](./storage-stream-transaction.md) |
| IRandomAccessStream | Seekable stream interface for input/output over storage items | [irandom-access-stream.md](./irandom-access-stream.md) |
| DataReader / DataWriter | Typed read/write of primitives, strings, and buffers over a stream | [data-reader-writer.md](./data-reader-writer.md) |
| StorageItemThumbnail | Thumbnail image stream for a file, folder, or other resource | [storage-item-thumbnail.md](./storage-item-thumbnail.md) |
| System.IO vs Windows.Storage | When to use WinRT storage APIs vs .NET System.IO, stream interop | [system-io-vs-windows-storage.md](./system-io-vs-windows-storage.md) |
