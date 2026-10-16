# App Asset Library Videos

Reserve, upload, and commit a video (for example an app preview) to the app's asset library, set its preview frame, then update, archive, or delete it. Introduced in App Store Connect API 4.5.

## Signature / Usage

```json
// POST https://api.appstoreconnect.apple.com/v1/appAssetLibraryVideos
{
  "data": {
    "type": "appAssetLibraryVideos",
    "attributes": {
      "fileName": "ync-preview.mp4",
      "fileSize": 31457280,
      "category": "APP_SCREENSHOTS_AND_PREVIEWS",
      "previewFrameTimeCode": "00:00:03:00",
      "referenceName": "Fall campaign preview"
    },
    "relationships": {
      "assetLibrary": { "data": { "type": "appAssetLibraries", "id": "1234567890" } }
    }
  }
}
```

Commit after every part is uploaded:

```json
// PATCH /v1/appAssetLibraryVideos/{id}
{ "data": { "type": "appAssetLibraryVideos", "id": "c2d3e4f5-6789-01ab-cdef-234567890abc", "attributes": { "uploaded": true } } }
```

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appAssetLibraryVideos` | Create (reserve) a video |
| GET | `/v1/appAssetLibraryVideos/{id}` | Read a video |
| PATCH | `/v1/appAssetLibraryVideos/{id}` | Commit (`uploaded`), change `referenceName` / `previewFrameTimeCode`, archive (`archived`) |
| DELETE | `/v1/appAssetLibraryVideos/{id}` | Delete; 204 No Content |
| GET | `/v1/appAssetLibraryVideos/{id}/placements` | List placements that reuse the video |
| GET | `/v1/appAssetLibraryVideos/{id}/relationships/placements` | Placement resource IDs only |
| GET | `/v1/appAssetLibraries/{id}/videos` | List videos in the library |

### Attributes (`AppAssetLibraryVideoCommonAttributes`)

| Name | Type | Description |
|------|------|-------------|
| category | AppAssetLibraryAssetCategory | Determines how the asset can be used across App Store content |
| createdDate | date-time | When App Store Connect created the resource |
| lastModifiedDate | date-time | When App Store Connect last modified the resource |
| fileName | string | Name of the uploaded asset file |
| fileSize | int64 | Size in bytes (minimum 1) |
| previewFrameImage | PreviewFrameImage | Still image representing the video before playback |
| previewFrameTimeCode | string | Timecode of the frame used as the preview image |
| referenceName | string | Name identifying the asset within its library |
| specId | string | Specification the asset conforms to; populated after validation |
| state | AppAssetLibraryAssetState | Current state (required) |
| stateDetails | [StateDetail] | Additional details such as validation errors |
| videoAsset | uri | URL for uploading or downloading the video file |

### Video specification fields (from `videoSpecs` reference data)

```json
{
  "specId": "1861fdcb-eb99-59e6-8c6c-5a07479d9a84",
  "shortName": "v1920x886f23~30t15~30u1",
  "dimensions": { "minWidth": 1920, "maxWidth": 1920, "minHeight": 886, "maxHeight": 886 },
  "aspectRatio": "13:6",
  "compatiblePlacementTypes": ["APP_PREVIEW"],
  "frameRates": [{ "minFps": 23, "maxFps": 30 }],
  "duration": { "min": "PT15S", "max": "PT30S" },
  "audioRequired": true,
  "fileExtensions": [".mp4", ".m4v", ".mov"],
  "mimeTypes": ["video/quicktime", "video/mp4", "video/x-m4v"],
  "maxFileSize": 524288000
}
```

## Notes

- Same reserve-upload-commit flow as images; commit takes `uploaded` alone (no `sourceFileChecksum`, unlike the deprecated `appPreviews` flow). The commit fails if received bytes do not match the declared `fileSize`.
- App Store Connect does not validate footage until after upload: a video with the wrong duration, or no audio track where `audioRequired` is `true`, fails processing (`FAILED`) rather than being rejected up front. Check `frameRates`, `duration` (ISO 8601), and `audioRequired` beforehand.
- `videoAsset`, `previewFrameImage`, and `specId` are `null` until processing finishes. `previewFrameImage` carries a nested `state` (`PROCESSING`, `COMPLETE`, `FAILED`), `errors`, `warnings`, and an `image` with `templateUrl`, `width`, `height`.
- Pick a `previewFrameTimeCode` inside the video's duration; the frame is generated asynchronously. The preview frame belongs to the video, not to a placement: changing it changes what every placement of that video displays.
- The video binary is immutable after commit; upload a new asset and replace placements to change footage. Archiving works only on an approved asset (409 `STATE_ERROR.INVALID_ASSET_STATE` otherwise). Deleting an asset with placements returns 409 `STATE_ERROR.ASSET_HAS_PLACEMENTS`.
- List filters and sorts match images: `filter[state]`, `filter[category]`, `filter[specId]`, `filter[referenceName]`, `filter[id]`, `sort` by `createdDate` / `lastModifiedDate` / `referenceName`.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/uploading-and-managing-video-assets , https://developer.apple.com/documentation/appstoreconnectapi/app-asset-library-videos

## Related

- [Understanding the App Asset Library](./understanding-the-app-asset-library.md)
- [App Asset Library Images](./image-assets.md)
- [App Asset Library Placements and Ordering](./placements.md)
- [App Asset Library Reference Data and Display Classes](./reference-data.md)
- [Uploading Assets to App Store Connect](../asc-api-core/uploading-assets.md)
