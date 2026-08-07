# Uploading Assets to App Store Connect

Upload screenshots, app previews, App Review attachments, and routing app coverage files to App Store Connect using a four-step reservation-and-upload workflow.

## Signature / Usage

```
POST /v1/appScreenshots
{
    "data": {
        "type": "appScreenshots",
        "attributes": {
            "fileSize": 11097,
            "fileName": "my_screenshot.png"
        },
        "relationships": {
            "appScreenshotSet": {
                "data": { "type": "appScreenshotSets", "id": "54594240-5c4c-4a0f-add1-b4cb7e52d166" }
            }
        }
    }
}
```

```json
{
    "data" : {
        "type" : "appScreenshots",
        "id" : "4d62262c-4ec1-4d89-b82c-c7b7a402e866",
        "attributes" : {
            "fileSize" : 11097,
            "fileName" : "my_screenshot.png",
            "assetToken" : "PurpleSource62/v4/c4/c6/5f/...",
            "assetType" : "SCREENSHOT",
            "uploadOperations" : [ {
                "method" : "PUT",
                "url" : "https://store-030.blobstore.apple.com/assets-massilia-030001/...",
                "length" : 11097,
                "offset" : 0,
                "requestHeaders" : [ { "name" : "Content-Type", "value" : "image/png" } ]
            } ],
            "assetDeliveryState" : { "errors" : [ ], "state" : "AWAITING_UPLOAD" }
        }
    }
}
```

## Options / Props

### Supported Asset Types and API Resources

| Asset Type | API Resource |
|------|-------------|
| App Store screenshots | `app-screenshot-sets`, `app-screenshots` |
| App event screenshots | `app-event-screenshots` |
| App previews | `app-preview-sets`, `app-previews` |
| App Clip card images | `app-clip-header-images`, `advanced-app-clip-experience-images` |
| Attachments for App Review | `app-store-review-attachments` |
| Game Center activity images | `game-center-activity-images` |
| Game Center challenge images | `game-center-challenge-images` |
| In-app purchase App Store review screenshots | `in-app-purchase-app-store-review-screenshots` |
| In-app purchase images | `in-app-purchase-images` |
| Subscription App Store review screenshots | `subscription-app-store-review-screenshots` |
| Subscription images | `subscription-images` |
| Routing app coverage files | `routing-app-coverages` |

### Asset Delivery States

| State | Description |
|------|-------------|
| `AWAITING_UPLOAD` | Reservation created; parts not yet all uploaded |
| `UPLOAD_COMPLETE` | Commit succeeded; App Store Connect is processing the asset |
| `COMPLETE` | Final state for a successfully processed asset |
| `FAILED` | Terminal state; processing failed |

### Commit Request Attributes

| Field | Type | Description |
|------|------|-------------|
| `uploaded` | boolean | Set to `true` to signal all parts are uploaded |
| `sourceFileChecksum` | string | MD5 checksum of the original, entire asset file |

## Notes

- Four steps: make an asset reservation, upload the asset (potentially in multiple parts), commit the upload, verify processing succeeded
- For large files, split the binary into parts sized per each `uploadOperations[].length`; upload parts concurrently and in any order
- Upload URLs are unauthenticated and time-limited (about one week from reservation, per the `Expires` param) — do not send a JWT and do not share the URL
- If a part fails, resend it before committing; once committed, individual parts can no longer be uploaded — delete and start a new reservation to update an asset
- App Store Connect validates the committed `sourceFileChecksum` against the final asset and checks file format/dimensions; on `FAILED` state, delete the asset record and retry with a new reservation

## Related

- [Error Handling](./error-handling.md)
- [Generating Tokens](./generating-tokens.md)
- [App Store Versions](./app-store-versions.md)
