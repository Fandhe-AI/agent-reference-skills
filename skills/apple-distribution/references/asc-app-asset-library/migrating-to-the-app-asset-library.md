# Migrating to the App Asset Library

Move screenshots, app previews, and in-app event media from the deprecated set-based resources to the App Asset Library.

## Signature / Usage

New upload sequence (steps 1-4 once per distinct file, step 5 per place the file appears):

```
1. GET  /v1/apps/{id}/assetLibrary                 # cache the library id
2. POST /v1/appAssetLibraryImages | /v1/appAssetLibraryVideos   # reserve, related to the library
3. PUT  uploadOperations[] parts                   # same as before
4. PATCH ... { "attributes": { "uploaded": true } } # commit; nothing else
5. POST /v1/appAssetLibraryPlacements              # placementType, placementGroup, asset, target localization
```

## Options / Props

### Mapping from deprecated resources

| Asset library | Deprecated resource |
|---------------|---------------------|
| Placement type and placement group on a placement | `app-screenshot-sets` |
| `AppAssetLibraryImage` plus a placement | `app-screenshots` |
| Placement type and placement group on a placement | `app-preview-sets` |
| `AppAssetLibraryVideo` plus a placement | `app-previews` |
| `AppAssetLibraryImage` plus a placement | `app-event-screenshots` |
| `AppAssetLibraryVideo` plus a placement | `app-event-video-clips` |
| Placement type and placement group on a placement | `app-custom-product-page-screenshot-sets` |
| `AppAssetLibraryImage` plus a placement | `app-custom-product-page-screenshots` |
| Placement type and placement group on a placement | `app-custom-product-page-app-preview-sets` |
| `AppAssetLibraryVideo` plus a placement | `app-custom-product-page-app-previews` |

### Conceptual shifts

| Change | Description |
|--------|-------------|
| Sets disappear | A placement carries `placementType` and `placementGroup` directly; no container to create first |
| Assets separate from position | Previously a screenshot record was its position; now an asset lives in the library and a placement points at it |
| Display targets become placement groups | Group identifiers read from reference data replace the old display-type enumeration values |
| Checksums go away | Commit takes `uploaded` alone; no `sourceFileChecksum` |
| Ordering is explicit | Post an ordering request naming placements in sequence instead of patching an ordered relationship on a set |

## Notes

- Previous flow: find or create the screenshot set, reserve the screenshot against the set, upload parts, commit with filename, size, and checksum.
- Replace a hard-coded table of display types with a runtime lookup of `placementProfileGroups` and `placementTypes` from reference data; Apple adds device families without an API version change. You no longer choose a specification: App Store Connect matches the file and reports `specId`; read it back and confirm.
- Deduplication is manual-free: upload each file once, create a placement per surface; no hashing or tracking which localizations already have it. Track "which library asset backs which placements" by querying `GET /v1/appAssetLibraryImages/{id}/placements`.
- Deletion order is reversed: deleting a set used to delete its media; asset library deletes do not cascade. An asset with placements cannot be deleted (`STATE_ERROR.ASSET_HAS_PLACEMENTS`). Delete placements first, then the asset; carried-over cleanup code fails on the asset delete.
- Suggested one-pass-per-app plan: read reference data and build a device-family-to-placement-group map; read the library ID; upload each distinct file once and record the asset ID against your own file identifier; create placements for each localization and display target previously populated; post an ordering request per placement group; verify with each localization's `placements` relationship and `sort=placementGroupPosition`.
- Placements can only be created while the parent surface is editable; migrate against an App Store version in `PREPARE_FOR_SUBMISSION`, not an approved one.
- A partial migration is harmless: uploaded assets without placements can be resumed by creating the missing placements rather than re-uploading.
- The set-based resources listed above are deprecated (per the official article).

## Related

- [Understanding the App Asset Library](./understanding-the-app-asset-library.md)
- [App Asset Library Images](./image-assets.md)
- [App Asset Library Videos](./video-assets.md)
- [App Asset Library Placements and Ordering](./placements.md)
- [App Asset Library Reference Data and Display Classes](./reference-data.md)
- [Uploading Assets to App Store Connect](../asc-api-core/uploading-assets.md)
