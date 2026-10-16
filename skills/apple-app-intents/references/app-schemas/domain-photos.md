---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-photos
---

# Photos domain

Make your photo and video app's actions available to Apple Intelligence and Siri by adopting schemas for common photo and video actions.

## Signature / Usage

```swift
var editAsset: some AppSchemaIntent
```

## Options / Props

| Schema | Kind | Description | Example phrases |
|--------|------|-------------|-----------------|
| `addAssetsToAlbum` | Intent (`AppSchema.PhotosIntent`) | Adds the provided photos to the provided album. | "Add DSC_001.JPEG to the 2024 album." |
| `cleanupPhoto` | Intent (`AppSchema.PhotosIntent`) | Removes distracting objects in a photo. | "Clean up." / "Remove the clutter." |
| `copyEdits` | Intent (`AppSchema.PhotosIntent`) | Copies edits from the provided photo. | (none listed) |
| `createAlbum` | Intent (`AppSchema.PhotosIntent`) | Creates an album. | "Create a new album named pics." |
| `createAssets` | Intent (`AppSchema.PhotosIntent`) | Creates photos from the provided files. | "Save these to my photos." |
| `crop` | Intent (`AppSchema.PhotosIntent`) | Crops a photo. | "Crop this photo." / "Trim a bit off the borders." |
| `deleteAlbum` | Intent (`AppSchema.PhotosIntent`) | Deletes the provided albums. | "Trash this album." / "Get rid of vacation 2024." |
| `deleteAssets` | Intent (`AppSchema.PhotosIntent`) | Deletes the provided photos. | "Delete this photo." / "Get rid of the three most recent photos." |
| `duplicateAssets` | Intent (`AppSchema.PhotosIntent`) | Duplicates the selected photos. | "Duplicate DSC_001.JPEG." / "Make a copy of DSC_0123.JPEG." |
| `editAsset` | Intent (`AppSchema.PhotosIntent`) | Opens a photo for editing. | "Edit this photo." |
| `openAlbum` | Intent (`AppSchema.PhotosIntent`) | Opens the provided album. | "Open the 2024 album." / "Show me 2024." |
| `openAsset` (deprecated) | Intent (`AppSchema.PhotosIntent`) | Opens the app to a photo. | "Open DSC_0123.JPEG." / "Play IMG_4567.MOV." |
| `pasteEdits` | Intent (`AppSchema.PhotosIntent`) | Pastes edits to the provided photo. | (none listed) |
| `postToSharedAlbum` | Intent (`AppSchema.PhotosIntent`) | Posts the provided photos or files and optional comment to the provided shared album. | "Share DSC_001.JPEG to the baby shared album." |
| `removeAssetsFromAlbum` | Intent (`AppSchema.PhotosIntent`) | Removes the provided photos from the provided album. | "Remove this photo from my shared album." |
| `setDepth` | Intent (`AppSchema.PhotosIntent`) | Sets the depth value of a photo. | (none listed) |
| `setExposure` | Intent (`AppSchema.PhotosIntent`) | Configures the exposure for a photo. | (none listed) |
| `setFilter` | Intent (`AppSchema.PhotosIntent`) | Applies a filter to a photo. | "Apply the dramatic effect." / "Remove the filter." |
| `setRotation` | Intent (`AppSchema.PhotosIntent`) | Rotates a photo. | "Rotate this photo clockwise." / "Rotate this photo left." |
| `setSaturation` | Intent (`AppSchema.PhotosIntent`) | Configures the saturation for a photo. | (none listed) |
| `setWarmth` | Intent (`AppSchema.PhotosIntent`) | Configures the warmth for a photo. | "Apply a warmth value of negative fifty." |
| `straighten` | Intent (`AppSchema.PhotosIntent`) | Straightens a photo. | "Straighten this photo." / "Make this photo straight." |
| `toggleDepth` | Intent (`AppSchema.PhotosIntent`) | Toggles depth effect for a photo. | (none listed) |
| `toggleSuggestedEdits` | Intent (`AppSchema.PhotosIntent`) | Enhances a photo. | "Enhance this photo." / "Make this photo better." |
| `updateAlbum` | Intent (`AppSchema.PhotosIntent`) | Renames the provided album. | "Rename vacation 2024 to trip." |
| `updateAsset` | Intent (`AppSchema.PhotosIntent`) | Updates an existing photo's properties. | "Favorite this photo." / "Hide this photo." |
| `updateRecognizedPerson` | Intent (`AppSchema.PhotosIntent`) | Updates the provided person with new properties. | (none listed) |
| `search` (deprecated) | Intent (`AppSchema.PhotosIntent`) | Navigates to search results. | (none listed) |
| `album`, `asset`, `recognizedPerson` | Entity (`AppSchema.PhotosEntity`) | Content and parameter types. | — |
| `albumType`, `assetType`, `filterType`, `rotationDirection` | Enum (`AppSchema.PhotosEnum`) | Types for static parameters. | — |

## Notes

- The `.photos` domain: protocols `AppSchema.PhotosIntent`, `AppSchema.PhotosEntity`, `AppSchema.PhotosEnum`. Most schemas operate on assets already in the app's library; the exception is `createAssets`, which adds new assets from an external source.
- The domain page carries no platform metadata; check the member pages (`appschema/photosintent/<schema>`) for introduction versions.
- Deprecated schemas: `openAsset` and `search` are flagged deprecated in the documentation index (the page lists `search` under "Deprecated schemas"). No replacement is stated on the domain page. For in-app search and opening items the `.system` domain offers `searchInApp` and `open`.
- Xcode generates a template implementation when you type `photos_` and select a schema from the suggestions list.
- Related sample article: "Integrating your photo app with Apple Intelligence".
- No code listing was fetched for this domain; only a schema declaration is shown.
- Distinct from the PhotoKit / Photos framework and Vision image analysis; this page only declares App Intents schemas.

## Related

- [AppIntent(schema:)](./appintent-schema-macro.md)
- [AppEntity(schema:)](./appentity-schema-macro.md)
- [AppEnum(schema:)](./appenum-schema-macro.md)
- [System and in-app search domain](./domain-system-and-in-app-search.md)
- [Camera domain](./domain-camera.md)
