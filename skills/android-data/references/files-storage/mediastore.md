# MediaStore

Content-provider-backed index of shared media (images, video, audio, downloads) used to query, open, insert, and update media files on external storage.

## Signature / Usage

```kotlin
val projection = arrayOf(
    MediaStore.Video.Media._ID,
    MediaStore.Video.Media.DISPLAY_NAME
)
val collection = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
    MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL)
} else {
    MediaStore.Video.Media.EXTERNAL_CONTENT_URI
}

contentResolver.query(collection, projection, null, null, null)?.use { cursor ->
    val idColumn = cursor.getColumnIndexOrThrow(MediaStore.Video.Media._ID)
    while (cursor.moveToNext()) {
        val id = cursor.getLong(idColumn)
        val contentUri = ContentUris.withAppendedId(
            MediaStore.Video.Media.EXTERNAL_CONTENT_URI, id)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MediaStore.Images` / `Video` / `Audio` / `Downloads` | table | — | Collections for the corresponding media type. |
| `contentResolver.query(uri, projection, selection, selectionArgs, sortOrder)` | function | — | Queries a media collection; use `?` placeholders in `selection` to avoid SQL injection. |
| `contentResolver.insert(collection, ContentValues)` | function | — | Adds a new media item; returns its content `Uri`. |
| `ContentValues.IS_PENDING` | `Int` (0/1) | — | Marks a media item as not-yet-visible to other apps while its content is being written. |
| `contentResolver.update(uri, values, selection, selectionArgs)` | function | — | Updates metadata of an existing media item. |
| `MediaStore.createWriteRequest()` / `createFavoriteRequest()` / `createTrashRequest()` / `createDeleteRequest()` | function (API 30+) | — | Builds a `PendingIntent` for batch edit/trash/delete of multiple items with a single user confirmation. |

## Notes

- No storage permission is needed to access media the app itself created (Android 10+).
- Reading other apps' media requires `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` / `READ_MEDIA_AUDIO` (Android 13+) or `READ_EXTERNAL_STORAGE` on Android 9 and lower.
- `ACCESS_MEDIA_LOCATION` is required to read unredacted EXIF location metadata.
- Always run queries on a worker thread and cache column indices instead of calling `getColumnIndexOrThrow()` repeatedly.
- For privacy-preserving media selection prefer the [Photo Picker](./photo-picker.md) over broad `MediaStore` queries where possible.

## Related

- [Photo Picker](./photo-picker.md)
- [Scoped storage and MANAGE_EXTERNAL_STORAGE](./scoped-storage.md)
- [Storage-specific permissions](./storage-overview.md)
