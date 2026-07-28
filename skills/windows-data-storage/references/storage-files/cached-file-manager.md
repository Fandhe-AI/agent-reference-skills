# CachedFileManager

Static helper class that lets apps manage real-time updates to files provided by other apps or remote/cloud providers (e.g. files obtained through a file picker).

## Signature / Usage

```csharp
public static class CachedFileManager

// Defer implicit updates while making multiple changes
CachedFileManager.DeferUpdates(file);

await FileIO.AppendTextAsync(file, "Swift as a shadow");

// Let Windows know we're done; may prompt the providing app/server to sync
FileUpdateStatus status = await CachedFileManager.CompleteUpdatesAsync(file);
switch (status)
{
    case FileUpdateStatus.Complete:
        break;
    case FileUpdateStatus.CompleteAndRenamed:
        // file may have been renamed by the remote provider
        break;
    default:
        // update failed or was incomplete
        break;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeferUpdates(IStorageFile)` | static method | Defers real-time updates for the specified file until `CompleteUpdatesAsync` is called. |
| `CompleteUpdatesAsync(IStorageFile)` | static method | Initiates updates for the file, contacting the app/provider that supplied it; returns a `FileUpdateStatus`. |

## Notes

- Namespace `Windows.Storage`. Static class — cannot be instantiated.
- Windows implicitly initiates updates for files provided by other apps when they change; `DeferUpdates` lets the app batch multiple writes and control exactly when the remote provider is notified via `CompleteUpdatesAsync`.
- Commonly paired with `FileSavePicker` / `FileOpenPicker` workflows where the picked file may live in a cloud-backed location.

## Related

- [StorageFile](./storage-file.md)
- [FileIO](./file-io.md)
