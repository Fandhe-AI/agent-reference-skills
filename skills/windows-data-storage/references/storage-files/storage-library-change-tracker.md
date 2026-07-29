# StorageLibraryChangeTracker

Tracks add/delete/modify/rename/move operations on files and folders under a `StorageLibrary` (or any local folder) in the background, even while the app isn't running. Implemented on the system as a circular buffer of recent file-system operations that the app reads and then marks as processed.

## Signature / Usage

```csharp
using Windows.Storage;

StorageLibrary videosLibrary = await StorageLibrary.GetLibraryAsync(KnownLibraryId.Videos);
StorageLibraryChangeTracker tracker = videosLibrary.ChangeTracker;

// 1. Enable tracking (idempotent, thread-safe, call again before every read)
tracker.Enable();

// 2. Read the batch of changes since the last accepted position
StorageLibraryChangeReader reader = tracker.GetChangeReader();
IReadOnlyList<StorageLibraryChange> changes = await reader.ReadBatchAsync();

foreach (StorageLibraryChange change in changes)
{
    if (change.ChangeType == StorageLibraryChangeType.ChangeTrackingLost)
    {
        // Circular buffer overflowed — recrawl the library from scratch
        tracker.Reset();
        break;
    }
    // Process change.Path / change.ChangeType / change.IsOfType(...)
}

// 3. Accept the changes so they are never returned again
await reader.AcceptChangesAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Enable()` | method | Starts (or resumes) recording changes for the folder/library. Thread-safe, does not reset the read position; call it again before every enumeration to guard against a race where the user adds a folder mid-read. |
| `Enable(StorageLibraryChangeTrackerOptions)` | method | Enables change tracking, selecting whether tracking starts from all existing changes or only the latest, based on a change ID. |
| `Disable()` | method | Disables change tracking for the `StorageFolder` or `StorageLibrary`. |
| `GetChangeReader()` | method | Returns a `StorageLibraryChangeReader` positioned at the last accepted change. |
| `Reset()` | method | Clears tracking state after a `ChangeTrackingLost` overflow; moves the pointer to the most recent change and resumes tracking. |
| `StorageLibraryChangeReader.ReadBatchAsync()` | method | Reads the next batch of `StorageLibraryChange` entries since the last accept. |
| `StorageLibraryChangeReader.AcceptChangesAsync()` | method | Marks all changes returned by the most recent `ReadBatchAsync()` as processed; the pointer advances only as far as the changes the app has actually seen. |
| `StorageLibraryChange.ChangeType` | `StorageLibraryChangeType` | Created / Deleted / MovedOrRenamed / ContentsChanged / MovedOutOfLibrary / MovedIntoLibrary / ContentsReplaced / IndexingStatusChanged / EncryptionChanged / `ChangeTrackingLost` (buffer overflow). |
| `StorageLibraryChange.Path` | `string` | Full path of the file or folder that changed. |
| `StorageLibraryChange.PreviousPath` | `string` | Full path of the item before it was moved or renamed. |
| `StorageLibraryChange.GetStorageItemAsync()` | method | Gets the storage item (`IStorageItem`) that changed. |
| `StorageLibraryChange.IsOfType(StorageItemTypes)` | method | Tests whether the change applies to a file, folder, or (for deletions) an item whose type can no longer be determined. |

## Notes

- Namespace `Windows.Storage`. Introduced in Windows 10 Anniversary Update (build 10.0.14393.0, version 1607) via `Windows.Foundation.UniversalApiContract` v3.0.
- Works for user libraries and any local-machine folder, including secondary or removable drives — but not NAS or network drives.
- Obtain an instance either from `StorageLibrary.ChangeTracker` (scoped to a whole library) or `StorageFolder.TryGetChangeTracker()` (scoped to a single folder) — both return this same `StorageLibraryChangeTracker` class, not a separate type.
- Not accepting changes causes the next `ReadBatchAsync()` to return the same set again; accept only after the app has durably processed them.
- Adding/removing a library's root folders (`RequestAddFolderAsync`/`RequestRemoveFolderAsync`) does **not** produce a change-tracker entry — observe `StorageLibrary.DefinitionChanged` for that. If a folder already containing files is added to the library, no entries are generated for its pre-existing content; only subsequent changes are tracked.
- On `ChangeTrackingLost` (the circular buffer overwrote itself before the app read it — e.g. during a large backup restore or photo sync), any partial information is unreliable: recrawl the library and call `Reset()`.
- Pair with `StorageLibraryContentChangedTrigger` to run a background task whenever the tracked library changes while the app isn't running.

## Related

- [StorageLibrary](./storage-library.md)
- [StorageFolder](./storage-folder.md)
