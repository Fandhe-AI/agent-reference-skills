# Large data handling and caching strategy

Guidance for storing large or regenerable data sets (downloaded images, parsed API responses, computed indexes) without bloating cloud backups or exhausting user disk space, using `ApplicationData.LocalCacheFolder` and `ApplicationData.TemporaryFolder`.

## Signature / Usage

```csharp
using Windows.Storage;

StorageFolder cacheFolder = ApplicationData.Current.LocalCacheFolder;

async Task<StorageFile> CacheDownloadAsync(string fileName, byte[] data)
{
    StorageFile file = await cacheFolder.CreateFileAsync(
        fileName, CreationCollisionOption.ReplaceExisting);
    await FileIO.WriteBytesAsync(file, data);
    return file;
}
```

## Options / Props

| Location | Persistence | Backed up | Best for |
|----------|-------------|-----------|----------|
| `LocalCacheFolder` | Persists across app sessions and updates | No | Larger caches that should survive restarts (thumbnails, downloaded content, computed indexes, logs, auth tokens). |
| `TemporaryFolder` | May be cleared by the OS at any time (System Maintenance, Disk Cleanup) | No | Very short-lived scratch data needed only during the current session. |
| `LocalFolder` | Persists, backed up to the cloud | Yes | Not recommended for large caches — backup/restore cost grows with data size; reserve for durable user data. |

## Notes

- Prefer `LocalCacheFolder` over `LocalFolder` for large regenerable data sets: it is excluded from backup/restore, keeping cloud backup size and restore time small.
- Data in `TemporaryFolder` has no persistence guarantee — the system can reclaim the space at any time, so treat it as a true cache with no assumption that entries survive between launches.
- If writing large amounts of data to `TemporaryFolder`, proactively clear stale entries at app startup rather than relying on the system to do so, to avoid unnecessary disk pressure.
- For structured large data (rather than blobs/files), prefer a SQLite database (via `Microsoft.Data.Sqlite` or the EF Core SQLite provider) placed under `LocalFolder` or `LocalCacheFolder` over ad hoc JSON/XML files — SQLite scales to large record counts with indexed queries, whereas parsing a large JSON/XML document into memory on every read does not.
- Use `Windows.Storage.Search` (`StorageFileQueryResult`, `QueryOptions`) with indexer-backed queries to enumerate large cache folders efficiently instead of listing all files manually.

## Related

- [Application data storage locations](./application-data-storage.md)
- [SQLite data access (Microsoft.Data.Sqlite)](./sqlite-data-access.md)
- [StorageFileQueryResult](./storage-file-query-result.md)
