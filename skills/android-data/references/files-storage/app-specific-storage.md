# App-Specific Storage

Dedicated internal and external directories for files that only the app needs, accessed via `Context.filesDir`, `cacheDir`, `getExternalFilesDir()`, and `getDir()`.

## Signature / Usage

```kotlin
// Internal persistent file
val file = File(context.filesDir, filename)

// Internal cache file
val cacheFile = File.createTempFile(filename, null, context.cacheDir)

// Internal nested directory
context.getDir(dirName, Context.MODE_PRIVATE)

// External app-specific persistent file
val extFile = File(context.getExternalFilesDir(null), filename)

// External app-specific cache file
val extCacheFile = File(context.externalCacheDir, filename)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context.filesDir` | `File` | — | Internal directory for persistent app files; encrypted on Android 10+ (API 29+). |
| `context.cacheDir` | `File` | — | Internal cache directory; system may delete files under storage pressure. |
| `context.getExternalFilesDir(type)` | `(String?) -> File?` | `null` | External app-specific persistent directory, optionally scoped to a media type (e.g. `Environment.DIRECTORY_PICTURES`). |
| `context.externalCacheDir` | `File?` | — | External app-specific cache directory. |
| `context.getDir(name, mode)` | `(String, Int) -> File` | — | Creates/returns a nested subdirectory under internal storage. |
| `context.deleteFile(name)` | `(String) -> Boolean` | — | Deletes a file from `filesDir`. |
| `context.fileList()` | `() -> Array<String>` | — | Lists file names in `filesDir`. |

## Notes

- No permissions are required for app-specific storage: internal storage is always private; external app-specific storage needs no permission on Android 4.4+ (API level 19+).
- All app-specific files (internal and external) are removed automatically when the app is uninstalled.
- Android 11+ (API level 30+) apps cannot create their own top-level app-specific directories on external storage beyond what the system provides.
- Verify external storage availability before use: `Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED`.
- Query available space via `StorageManager.getAllocatableBytes()` / `allocateBytes()` before writing large files.

## Related

- [Internal file I/O (openFileOutput / openFileInput)](./internal-file-io.md)
- [Cache management and StorageManager](./cache-management.md)
- [Storage options overview](./storage-overview.md)
