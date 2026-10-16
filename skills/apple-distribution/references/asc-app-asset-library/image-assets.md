# App Asset Library Images

Reserve, upload, and commit an image to the app's asset library, then update, archive, or delete it. Introduced in App Store Connect API 4.5.

## Signature / Usage

```json
// POST https://api.appstoreconnect.apple.com/v1/appAssetLibraryImages
{
  "data": {
    "type": "appAssetLibraryImages",
    "attributes": {
      "fileName": "menu-screen-6-9.png",
      "fileSize": 1284736,
      "category": "APP_SCREENSHOTS_AND_PREVIEWS",
      "referenceName": "Menu screen"
    },
    "relationships": {
      "assetLibrary": { "data": { "type": "appAssetLibraries", "id": "1234567890" } }
    }
  }
}
```

Commit after every part is uploaded:

```json
// PATCH /v1/appAssetLibraryImages/{id}
{ "data": { "type": "appAssetLibraryImages", "id": "f4000005-e036-8f0b-8018-d259974bee61", "attributes": { "uploaded": true } } }
```

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appAssetLibraryImages` | Create (reserve) an image; returns 201 with `uploadOperations` |
| GET | `/v1/appAssetLibraryImages/{id}` | Read an image |
| PATCH | `/v1/appAssetLibraryImages/{id}` | Commit (`uploaded`), change `referenceName`, archive (`archived`) |
| DELETE | `/v1/appAssetLibraryImages/{id}` | Delete; 204 No Content |
| GET | `/v1/appAssetLibraryImages/{id}/placements` | List placements that reuse the image |
| GET | `/v1/appAssetLibraryImages/{id}/relationships/placements` | Placement resource IDs only |
| GET | `/v1/appAssetLibraries/{id}/images` | List images in the library |

### Attributes (`AppAssetLibraryImageCommonAttributes`)

| Name | Type | Description |
|------|------|-------------|
| category | AppAssetLibraryAssetCategory | Determines how the asset can be used across App Store content |
| createdDate | date-time | When App Store Connect created the resource |
| lastModifiedDate | date-time | When App Store Connect last modified the resource |
| fileName | string | Name of the uploaded asset file |
| fileSize | int64 | Size in bytes (minimum 1) |
| imageAsset | ImageAsset | Uploaded image with dimensions and URLs (`templateUrl`, `width`, `height`); `null` until processed |
| referenceName | string | Name identifying the asset within its library |
| specId | string | Specification the asset conforms to; populated after validation, never sent by you |
| state | AppAssetLibraryAssetState | Current state (required) |
| stateDetails | [StateDetail] | Additional details such as validation errors |

### List filters and sorts (`GET /v1/appAssetLibraries/{id}/images`)

`filter[state]`, `filter[category]`, `filter[specId]`, `filter[referenceName]`, `filter[id]`; `sort` by `createdDate`, `lastModifiedDate`, `referenceName` (prefix `-` to reverse). `filter[state]=AWAITING_UPLOAD` finds abandoned reservations.

### Asset state values

`AWAITING_UPLOAD`, `UPLOAD_COMPLETE`, `FAILED`, `COMPLETE`, `PREPARE_FOR_SUBMISSION`, `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `ACCEPTED`, `APPROVED`, `REJECTED`, `ARCHIVED`.

## Notes

- Workflow: reserve (state `AWAITING_UPLOAD`, `imageAsset` and `specId` are `null`) -> PUT each part to `uploadOperations[]` (`method`, `url`, `length`, `offset`, `requestHeaders`; parts concurrent, any order; URLs are unauthenticated and time-limited, send no JWT, do not share) -> commit with `uploaded: true` (state `UPLOAD_COMPLETE`) -> poll `GET` until `PREPARE_FOR_SUBMISSION` (ready to place) or `FAILED` (read `stateDetails`, delete, start a new reservation).
- Unlike the deprecated `appScreenshots` flow, commit takes `uploaded` alone: there is no `sourceFileChecksum`. App Store Connect validates against the `fileSize` declared at reservation; the commit fails if the bytes received do not match.
- Image specifications state exact dimensions, not ranges; resize before reserving. Look up `imageSpecs` in reference data.
- After processing, `specId` reports the matched specification; compare to reference data, because a file that matches a different specification limits which placement groups accept it. `imageAsset.templateUrl` takes width, height, and format substitutions (`{w}x{h}bb.{f}`) to render a thumbnail.
- The image binary is immutable after commit; to change the picture, upload a new asset and replace the placements that use it. PATCH can change only `referenceName` (and archive).
- Archiving works only on an approved asset; otherwise 409 `STATE_ERROR.INVALID_ASSET_STATE` ("Only an approved asset can be archived.").
- Deleting an asset does not cascade: delete its placements first or get 409 `STATE_ERROR.ASSET_HAS_PLACEMENTS`.
- Success response of POST is `AppAssetLibraryImageResponse` (201); errors 400 / 401 / 403 / 409 / 422 / 429.

## Related

- [Understanding the App Asset Library](./understanding-the-app-asset-library.md)
- [App Asset Library Videos](./video-assets.md)
- [App Asset Library Placements and Ordering](./placements.md)
- [App Asset Library Reference Data and Display Classes](./reference-data.md)
- [Uploading Assets to App Store Connect](../asc-api-core/uploading-assets.md)
