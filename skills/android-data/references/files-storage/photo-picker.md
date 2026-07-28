# Photo Picker

Built-in system UI (`ActivityResultContracts.PickVisualMedia` / `PickMultipleVisualMedia`) that lets users grant access to selected images and videos without a broad storage permission.

## Signature / Usage

```kotlin
// Single item
val pickMedia = registerForActivityResult(PickVisualMedia()) { uri: Uri? ->
    if (uri != null) {
        Log.d("PhotoPicker", "Selected URI: $uri")
    }
}
pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageOnly))

// Multiple items (max 5)
val pickMultipleMedia = registerForActivityResult(PickMultipleVisualMedia(5)) { uris ->
    Log.d("PhotoPicker", "Number of items selected: ${uris.size}")
}
pickMultipleMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageAndVideo))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PickVisualMedia` | `ActivityResultContract<PickVisualMediaRequest, Uri?>` | — | Contract for selecting a single image/video. |
| `PickMultipleVisualMedia(maxItems)` | `ActivityResultContract<PickVisualMediaRequest, List<Uri>>` | — | Contract for selecting multiple items, capped by `maxItems`. |
| `PickVisualMedia.ImageOnly` / `VideoOnly` / `ImageAndVideo` | media type | — | Restricts selectable media type. |
| `PickVisualMedia.SingleMimeType(mimeType)` | media type | — | Restricts to one specific MIME type (e.g. `"image/gif"`). |
| `PickVisualMediaRequest.Builder().setMediaCapabilitiesForTranscoding(...)` | builder (API 33+) | — | Requests HDR video transcoding to a target capability set. |
| `PickVisualMedia.isPhotoPickerAvailable(context)` | `(Context) -> Boolean` | — | Checks whether the system photo picker is available on-device. |

## Notes

- Native availability: Android 11+ (API level 30+) with Modular System Components; backported to Android 4.4+ (API level 19+) via Google Play services.
- If the photo picker is unavailable, the contract automatically falls back to `ACTION_OPEN_DOCUMENT`.
- Requires `androidx.activity` v1.7.0+ (v1.11.0-alpha01+ for HDR transcoding support).
- Persist access to a returned `Uri` with `contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)`; capped at 5,000 media grants per app.
- No `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` permission is required since access is scoped to user-selected items.

## Related

- [MediaStore](./mediastore.md)
- [Storage Access Framework](./storage-access-framework.md)
- [Uri permission grants](./uri-permissions.md)
