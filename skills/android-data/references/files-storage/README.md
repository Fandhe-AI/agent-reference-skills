# files-storage

| Name | Description | Path |
|------|-------------|------|
| Storage Options Overview | Internal / external / scoped storage concepts and how to choose between them. | [storage-overview.md](./storage-overview.md) |
| App-Specific Storage | `Context.filesDir` / `cacheDir` / `getExternalFilesDir()` / `getDir()`. | [app-specific-storage.md](./app-specific-storage.md) |
| Internal File I/O | `openFileOutput` / `openFileInput` stream helpers. | [internal-file-io.md](./internal-file-io.md) |
| SharedPreferences | `getSharedPreferences`, `SharedPreferences.Editor`, key-value storage. | [shared-preferences.md](./shared-preferences.md) |
| MediaStore | Querying and inserting images, video, and audio via `MediaStore`. | [mediastore.md](./mediastore.md) |
| Storage Access Framework | `ACTION_OPEN_DOCUMENT` / `ACTION_CREATE_DOCUMENT` / `ACTION_OPEN_DOCUMENT_TREE` / `DocumentFile`. | [storage-access-framework.md](./storage-access-framework.md) |
| Photo Picker | `ActivityResultContracts.PickVisualMedia` / `PickMultipleVisualMedia`. | [photo-picker.md](./photo-picker.md) |
| FileProvider and File Sharing | `<provider>` manifest declaration, `file_paths.xml`, `FileProvider.getUriForFile`. | [file-provider.md](./file-provider.md) |
| Uri Permission Grants | `FLAG_GRANT_READ_URI_PERMISSION` and persistable Uri permissions. | [uri-permissions.md](./uri-permissions.md) |
| Scoped Storage and MANAGE_EXTERNAL_STORAGE | Scoped storage rules and the `MANAGE_EXTERNAL_STORAGE` special permission. | [scoped-storage.md](./scoped-storage.md) |
| Cache Management and StorageManager | Cache directories, quota, and free-space allocation via `StorageManager`. | [cache-management.md](./cache-management.md) |
| ActivityResultContracts for File Selection | `GetContent` and related file-picking activity result contracts. | [activity-result-contracts-files.md](./activity-result-contracts-files.md) |
| Assets and AssetManager | Reading bundled read-only files from `assets/` via `AssetManager`. | [assets.md](./assets.md) |
