# Understanding the App Asset Library

Upload an image or video once, then reuse it across your app's App Store surfaces with per-surface placements. Introduced in App Store Connect API 4.5 (release notes 4.5.1).

## Signature / Usage

```
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/assetLibrary
```

```json
{
  "data" : {
    "type" : "appAssetLibraries",
    "id" : "1234567890",
    "relationships" : {
      "images" : { "links" : { "related" : "https://api.appstoreconnect.apple.com/v1/appAssetLibraries/1234567890/images" } },
      "videos" : { "links" : { "related" : "https://api.appstoreconnect.apple.com/v1/appAssetLibraries/1234567890/videos" } }
    }
  }
}
```

## Options / Props

| Resource | Description |
|----------|-------------|
| Asset library (`appAssetLibraries`) | Per-app container holding every reusable asset; exactly one per app, reached via the app's `assetLibrary` relationship |
| Image / video assets | `AppAssetLibraryImage` / `AppAssetLibraryVideo`; uploaded once, processed once, independent of where they appear |
| Placements | `AppAssetLibraryPlacement`; positions one asset on one surface (App Store version localization, custom product page localization, in-app event localization, or App Store version experiment treatment localization) |
| Ordering requests | One request that sets the display order of placements within one localization and placement group |
| Reference data | Machine-readable catalog of dimensions, aspect ratios, formats, placement groups, per-placement limits; query it instead of hard-coding |

### Placement vocabulary

| Value | Description |
|-------|-------------|
| Placement type | Kind of slot: `APP_SCREENSHOT`, `APP_PREVIEW`, `PRODUCT_PAGE_HEADER_ASSET`, `EVENT_CARD_ASSET`, ... (supplied by you) |
| Placement group | Narrows the slot to a device family, e.g. `IPHONE_DYNAMIC_ISLAND_LARGE_PROFILE`, `MAC_PROFILE`; read from reference data at runtime, not an enumeration (supplied by you) |
| Specification | Exact dimensions, aspect ratio, formats, max size; App Store Connect matches the file during processing and reports it as `specId` |

### Asset state (`AppAssetLibraryAssetState`)

| Value | Description |
|-------|-------------|
| `AWAITING_UPLOAD` | Start of the progression |
| `UPLOAD_COMPLETE` | After `AWAITING_UPLOAD` |
| `PREPARE_FOR_SUBMISSION` | After `UPLOAD_COMPLETE` |
| `READY_FOR_REVIEW` | Reached by submitting the parent surface |
| `WAITING_FOR_REVIEW` | Following `READY_FOR_REVIEW` |
| `IN_REVIEW` | Following `WAITING_FOR_REVIEW` |
| `ACCEPTED` | Following `IN_REVIEW` |
| `APPROVED` | End of the progression |
| `FAILED` | Outside the progression; read `stateDetails` |
| `REJECTED` | Outside the progression; App Review declined |
| `ARCHIVED` | Outside the progression; approved asset retired |
| `COMPLETE` | Listed in the enumeration |

### Asset category (`AppAssetLibraryAssetCategory`)

| Value | Description |
|-------|-------------|
| `APP_SCREENSHOTS_AND_PREVIEWS` | Screenshots and app previews for product pages |
| `CREATIVE_ASSETS` | Other marketing media, such as in-app event artwork and product page header assets |

## Notes

- End-to-end flow: read the library (`GET /v1/apps/{id}/assetLibrary`, note `id`) -> check specifications (`GET /v1/appAssetLibraryRefData`) -> reserve/upload/commit each asset -> create placements and order them -> submit the parent surface for review (placements travel with their parent; placement `state` mirrors the parent's review state).
- The category determines which placement types an asset is eligible for; each placement type lists `acceptsAssetCategories` in reference data, and a mismatch returns an error.
- Required user role for managing the library via API: `ACCOUNT_HOLDER`, `ADMIN`, or `APP_MANAGER`.
- Query parameter `fields[appAssetLibraries]` accepts `images`, `videos`.
- Placement state: `ASSET_PROCESSING` through `PARENT_APPROVED` (see placements page).

## Related

- [App Asset Library Images](./image-assets.md)
- [App Asset Library Videos](./video-assets.md)
- [App Asset Library Placements and Ordering](./placements.md)
- [App Asset Library Reference Data and Display Classes](./reference-data.md)
- [Migrating to the App Asset Library](./migrating-to-the-app-asset-library.md)
- [Uploading Assets to App Store Connect](../asc-api-core/uploading-assets.md)
