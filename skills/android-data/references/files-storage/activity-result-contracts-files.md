# ActivityResultContracts for File Selection

Prebuilt `ActivityResultContract` classes in `androidx.activity.result.contract.ActivityResultContracts` that wrap common file/content-picking intents for use with `registerForActivityResult()`.

## Signature / Usage

```kotlin
// Pick a single piece of content by MIME type
val getContent = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
    // Handle the returned Uri
}
getContent.launch("image/*")

// Pick visual media (image/video) via the Photo Picker
val pickMedia = registerForActivityResult(
    ActivityResultContracts.PickVisualMedia()) { uri: Uri? -> }
pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageOnly))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ActivityResultContracts.GetContent` | `ActivityResultContract<String, Uri?>` | — | Input is a MIME type filter (e.g. `"image/*"`); returns the selected item's `Uri`, or `null`. |
| `ActivityResultContracts.PickVisualMedia` / `PickMultipleVisualMedia` | contract | — | Wraps the [Photo Picker](./photo-picker.md); see that page for details. |
| `ActivityResultContracts.StartActivityForResult` | `ActivityResultContract<Intent, ActivityResult>` | — | Generic contract for launching any `Intent` (e.g. a manually built `ACTION_OPEN_DOCUMENT` / `ACTION_CREATE_DOCUMENT` / `ACTION_OPEN_DOCUMENT_TREE` intent) and receiving its result. |

## Notes

- `androidx.activity` ships dedicated contracts (`OpenDocument`, `OpenMultipleDocuments`, `CreateDocument`, `OpenDocumentTree`) that wrap the raw intents described in [Storage Access Framework](./storage-access-framework.md); when a dedicated contract isn't needed, `StartActivityForResult` can launch the same intents directly, as shown on that page.
- `registerForActivityResult()` must be called unconditionally during Activity/Fragment initialization (before `STARTED`), not inside a click listener.
- Prefer `PickVisualMedia` over `GetContent` for images/video: it does not require a storage permission and offers a safer, curated system UI.

## Related

- [Storage Access Framework](./storage-access-framework.md)
- [Photo Picker](./photo-picker.md)
