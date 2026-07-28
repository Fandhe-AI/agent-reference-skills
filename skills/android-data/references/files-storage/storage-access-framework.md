# Storage Access Framework

System file-picker framework (`ACTION_OPEN_DOCUMENT`, `ACTION_CREATE_DOCUMENT`, `ACTION_OPEN_DOCUMENT_TREE`) plus the `DocumentFile` wrapper for accessing documents and other non-media files across providers, including cloud storage.

## Signature / Usage

```kotlin
// Pick a single file to open
val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
    addCategory(Intent.CATEGORY_OPENABLE)
    type = "application/pdf"
}
startActivityForResult(intent, PICK_PDF_FILE)

// Create a new file
val createIntent = Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
    addCategory(Intent.CATEGORY_OPENABLE)
    type = "application/pdf"
    putExtra(Intent.EXTRA_TITLE, "invoice.pdf")
}
startActivityForResult(createIntent, CREATE_FILE)

// Grant access to a whole directory tree
val treeIntent = Intent(Intent.ACTION_OPEN_DOCUMENT_TREE)
startActivityForResult(treeIntent, PICK_DIRECTORY)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Intent.ACTION_OPEN_DOCUMENT` | intent action | — | Opens the system picker to select an existing file; returns a persistable content `Uri`. |
| `Intent.ACTION_CREATE_DOCUMENT` | intent action | — | Opens a "save as" style picker; cannot overwrite an existing file (system appends a numeric suffix). |
| `Intent.ACTION_OPEN_DOCUMENT_TREE` | intent action | — | Grants access to an entire directory and its subdirectories (Android 5.0+). |
| `DocumentsContract.EXTRA_INITIAL_URI` | `Uri` | — | Optional hint for the picker's initial location. |
| `DocumentsContract.deleteDocument(resolver, uri)` | function | — | Deletes a document at the given `Uri`. |
| `DocumentFile` | class | — | Convenience wrapper around a document `Uri`; note `canWrite()` also returns `true` when only `FLAG_SUPPORTS_DELETE` is set — query `FLAG_SUPPORTS_WRITE` directly for real edit capability. |

## Notes

- On Android 11+ (API level 30+), `ACTION_OPEN_DOCUMENT` cannot access `Android/data/` or `Android/obb/` subdirectories.
- `ACTION_OPEN_DOCUMENT_TREE` on Android 11+ cannot request the root of internal storage, root of reliable SD cards, the `Download` directory, or individual files inside `Android/data/` / `Android/obb/`.
- Persist access across restarts with `contentResolver.takePersistableUriPermission(uri, flags)`; persistence is lost if the underlying document is moved or deleted.
- Files may be "virtual" (no direct byte stream, e.g. Google Docs); detect via `DocumentsContract.Document.FLAG_VIRTUAL_DOCUMENT` and use `getStreamTypes()` / `openTypedAssetFileDescriptor()` to read them.
- Prefer the [Photo Picker](./photo-picker.md) for image/video selection instead of `ACTION_OPEN_DOCUMENT`.

## Related

- [ActivityResultContracts for file selection](./activity-result-contracts-files.md)
- [Uri permission grants](./uri-permissions.md)
- [Photo Picker](./photo-picker.md)
