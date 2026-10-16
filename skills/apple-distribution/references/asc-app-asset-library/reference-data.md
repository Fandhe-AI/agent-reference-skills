# App Asset Library Reference Data and Display Classes

Read-only catalog of valid asset specifications, placement groups, and limits, exposed as the `appAssetLibraryRefData` resource. Introduced in App Store Connect API 4.5.

## Signature / Usage

```
GET https://api.appstoreconnect.apple.com/v1/appAssetLibraryRefData?fields[appAssetLibraryRefData]=imageSpecs
```

Single resource: `GET /v1/appAssetLibraryRefData/{id}`.

An image specification entry:

```json
{
  "specId": "f56c777c-99ea-5760-97ae-27c5f8cbb884",
  "shortName": "i1290x2796a0",
  "dimensions": { "minWidth": 1290, "maxWidth": 1290, "minHeight": 2796, "maxHeight": 2796 },
  "aspectRatio": "6:13",
  "compatiblePlacementTypes": ["APP_SCREENSHOT", "IMESSAGE_APP_SCREENSHOT"],
  "alphaAllowed": false,
  "fileExtensions": [".jpg", ".jpeg", ".png"],
  "mimeTypes": ["image/jpeg", "image/png"],
  "maxFileSize": 524288000,
  "universalAsset": false
}
```

## Options / Props

### `AppAssetLibraryRefDatum` attribute arrays

| Name | Description |
|------|-------------|
| features | What each App Store feature supports: placement types and per-group maximum asset counts (`placementPolicies[].groupLimits[].maxCount` per `groupIds`) |
| placementProfileGroups | Every placement group identifier with its platform (`AppAssetLibraryPlacementPlatform`) and display class (`AppAssetLibraryDisplayClass`) |
| imageSpecs | Image requirements: dimensions, aspect ratio, extensions, MIME types, max file size, alpha allowed |
| videoSpecs | Video requirements: same as images plus frame-rate ranges, duration bounds, audio required |
| placementTypes | Per placement type: `acceptsAssetCategories` and `specMappings` (placement group -> `specs` IDs) |
| displayClasses | Each display class with its device family and screen dimensions |

### Query parameters

| Parameter | Description |
|-----------|-------------|
| `filter[features]` | Filter by feature |
| `filter[placementTypes]` | Filter by placement type |
| `filter[placementProfileGroups]` | Filter by placement group |
| `filter[specs]` | Filter by specification |
| `fields[appAssetLibraryRefData]` | Select which attribute arrays to return |

### `AppAssetLibraryDisplayClass` values

| Value | Device family |
|-------|---------------|
| `DEFAULT` | Default |
| `WATCH_ULTRA`, `WATCH_SERIES_10`, `WATCH_SERIES_7`, `WATCH_SERIES_4`, `WATCH_SERIES_3` | Apple Watch |
| `IPHONE_DUO` | iPhone |
| `IPHONE_DYNAMIC_ISLAND_LARGE_DISPLAY`, `IPHONE_DYNAMIC_ISLAND_MEDIUM_DISPLAY` | iPhone (Dynamic Island) |
| `IPHONE_FACE_ID_LARGE_DISPLAY`, `IPHONE_FACE_ID_MEDIUM_DISPLAY` | iPhone (Face ID) |
| `IPHONE_HOME_BUTTON_LARGE_DISPLAY`, `IPHONE_HOME_BUTTON_MEDIUM_DISPLAY`, `IPHONE_HOME_BUTTON_40_DISPLAY`, `IPHONE_HOME_BUTTON_35_DISPLAY` | iPhone (Home button) |
| `IPAD_13_DISPLAY`, `IPAD_11_DISPLAY`, `IPAD_129_DISPLAY`, `IPAD_105_DISPLAY`, `IPAD_97_DISPLAY` | iPad |

## Notes

- Lookup chain: (1) find the feature (e.g. `APP_STORE_VERSIONS`) in `features` for its placement types and `groupLimits`; (2) look up the target group in `placementProfileGroups` for platform and display class (e.g. `IPHONE_DYNAMIC_ISLAND_LARGE_PROFILE`, `MAC_PROFILE`); (3) in `placementTypes`, find the placement type then the group in `specMappings` to get the accepted spec IDs; (4) read each ID from `imageSpecs` / `videoSpecs`.
- Working backward from an existing file, `compatiblePlacementTypes` on a specification lists every placement type that accepts it.
- Identifiers are strings, not enumerations, so new device families can appear without an API change. Do not hard-code them. Fetch the catalog at startup, resolve a returned `specId` by lookup, and treat an unknown placement group or spec ID as a signal to refresh.
- Screenshots and previews have exact dimensions (min equals max); resize to match before uploading. A specification with `universalAsset: true` satisfies several placement types (see `compatiblePlacementTypes`).
- For `APP_STORE_VERSIONS` the limits are 10 screenshots, 3 app previews, 1 product page header asset per group; in-app events allow a single asset per placement type. Custom product pages and product page optimizations carry their own policies that may differ.
- Each placement type's `acceptsAssetCategories`: `APP_SCREENSHOT` and `IMESSAGE_APP_SCREENSHOT` accept `APP_SCREENSHOTS_AND_PREVIEWS`; creative types such as `EVENT_CARD_ASSET` and `PRODUCT_PAGE_HEADER_ASSET` accept `CREATIVE_ASSETS`. An asset's category is fixed at reservation.
- `AppAssetLibraryFeature` enumerates more features than the reference data currently returns; iterate over the `features` array received and treat an absent feature as unavailable for the app.
- `IPHONE_DUO` is listed in the display class enumeration; the App Store Connect source gives no iOS version for it, so none is stated here.

## Related

- [Understanding the App Asset Library](./understanding-the-app-asset-library.md)
- [App Asset Library Images](./image-assets.md)
- [App Asset Library Videos](./video-assets.md)
- [App Asset Library Placements and Ordering](./placements.md)
