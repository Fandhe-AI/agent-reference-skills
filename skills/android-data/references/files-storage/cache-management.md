# Cache Management and StorageManager

APIs for creating and clearing app cache files, and for querying available/allocatable device storage via `StorageManager`.

## Signature / Usage

```kotlin
// Internal cache
val cacheFile = File.createTempFile(filename, null, context.cacheDir)
cacheFile.delete()

// Query and allocate space
val storageManager = context.getSystemService<StorageManager>()!!
val uuid = storageManager.getUuidForPath(context.filesDir)
val availableBytes = storageManager.getAllocatableBytes(uuid)

if (availableBytes >= NUM_BYTES_NEEDED) {
    storageManager.allocateBytes(uuid, NUM_BYTES_NEEDED)
} else {
    startActivity(Intent(ACTION_MANAGE_STORAGE))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context.cacheDir` / `externalCacheDir` | `File` | — | Internal / external app-specific cache directories. |
| `File.createTempFile(prefix, suffix, dir)` | function | — | Creates a uniquely named cache file. |
| `context.deleteFile(name)` | function | — | Deletes a file from `filesDir`. |
| `StorageManager.getCacheQuotaBytes(uuid)` | function | — | Returns the cache quota allotted to the app for a storage volume. |
| `StorageManager.getAllocatableBytes(uuid)` | function | — | Returns bytes available for allocation, accounting for reclaimable cache from other apps. |
| `StorageManager.allocateBytes(uuid, bytes)` | function | — | Requests the system free up the given number of bytes, clearing other apps' cache if needed. |

## Notes

- The system may delete cache files automatically when device storage runs low; do not rely on cache files persisting.
- Cache files still count toward the app's storage usage as shown to the user in system settings.
- Use `Intent.ACTION_MANAGE_STORAGE` to direct the user to free up space when `allocateBytes()` cannot satisfy the request.

## Related

- [App-specific storage](./app-specific-storage.md)
- [Internal file I/O](./internal-file-io.md)
