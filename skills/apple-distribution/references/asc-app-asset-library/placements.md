# App Asset Library Placements and Ordering

Create placements that link one library asset to one App Store surface, then set their display order within a localization and placement group. Introduced in App Store Connect API 4.5.

## Signature / Usage

```json
// POST https://api.appstoreconnect.apple.com/v1/appAssetLibraryPlacements
{
  "data": {
    "type": "appAssetLibraryPlacements",
    "attributes": {
      "placementType": "APP_SCREENSHOT",
      "placementGroup": "IPHONE_DYNAMIC_ISLAND_LARGE_PROFILE"
    },
    "relationships": {
      "image": { "data": { "type": "appAssetLibraryImages", "id": "f4000005-e036-8f0b-8018-d259974bee61" } },
      "appStoreVersionLocalization": { "data": { "type": "appStoreVersionLocalizations", "id": "b3a9b4c2-d2de-43f4-ad8c-71c5ebe301d1" } }
    }
  }
}
```

Ordering request:

```json
// POST https://api.appstoreconnect.apple.com/v1/appAssetLibraryPlacementOrderingRequests
{
  "data": {
    "type": "appAssetLibraryPlacementOrderingRequests",
    "attributes": { "placementGroup": "IPHONE_DYNAMIC_ISLAND_LARGE_PROFILE" },
    "relationships": {
      "orderedPlacements": {
        "data": [
          { "type": "appAssetLibraryPlacements", "id": "1e800005-e036-8f0b-8f37-9c5cc67e23a1" },
          { "type": "appAssetLibraryPlacements", "id": "2e000005-e036-8f0b-8f25-6dbc2baa784a" }
        ]
      },
      "appStoreVersionLocalization": { "data": { "type": "appStoreVersionLocalizations", "id": "b3a9b4c2-d2de-43f4-ad8c-71c5ebe301d1" } }
    }
  }
}
```

## Options / Props

### Create request

| Name | Type | Description |
|------|------|-------------|
| placementType (attribute) | AppAssetLibraryPlacementType | Kind of slot |
| placementGroup (attribute) | string | Device family; read valid identifiers from reference data (not an enumeration) |
| image / video (relationship) | exactly one | `appAssetLibraryImages` or `appAssetLibraryVideos` |
| target surface (relationship) | exactly one | `appStoreVersionLocalization`, `appCustomProductPageLocalization`, `appEventLocalization`, or `appStoreVersionExperimentTreatmentLocalization` |

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appAssetLibraryPlacements` | Create a placement |
| GET | `/v1/appAssetLibraryPlacements/{id}` | Read a placement |
| DELETE | `/v1/appAssetLibraryPlacements/{id}` | Delete; 204 No Content |
| GET | `/v1/appStoreVersionLocalizations/{id}/placements` | List placements on a surface (each surface has a `placements` relationship) |
| POST | `/v1/appAssetLibraryPlacementOrderingRequests` | Set display order within one placement group of one localization |

### Placement type (`AppAssetLibraryPlacementType`)

`APP_SCREENSHOT`, `IMESSAGE_APP_SCREENSHOT`, `APP_PREVIEW`, `PRODUCT_PAGE_HEADER_ASSET`, `APP_STORE_SEARCH_RESULTS_ASSET`, `SEARCH_RESULTS_ADS_ASSET`, `TODAY_TAB_ADS_ASSET`, `EVENT_CARD_ASSET`, `EVENT_DETAILS_PAGE_ASSET`, `RETENTION_MESSAGE_ASSET`.

### Placement state (`AppAssetLibraryPlacementState`)

`ASSET_PROCESSING`, `FAILED`, `PARENT_PREPARE_FOR_SUBMISSION`, `PARENT_READY_FOR_REVIEW`, `PARENT_WAITING_FOR_REVIEW`, `PARENT_IN_REVIEW`, `PARENT_APPROVED`.

### Response attributes (example)

| Attribute | Description |
|-----------|-------------|
| `mediaType` | `IMAGE` or `VIDEO`, derived from the asset relationship sent |
| `placementType` | The placement type |
| `placementGroup` | The placement group |
| `createdDate` | Creation date |
| `lastModifiedDate` | Last modification date |
| `state` | The placement state |
| `stateDetails` | Details about the state |

## Notes

- Combine `include` and `fields` to fetch placements with assets, e.g. `GET /v1/appStoreVersionLocalizations/{id}/placements?filter[placementType]=APP_SCREENSHOT&filter[placementGroup]=IPHONE_DYNAMIC_ISLAND_LARGE_PROFILE&sort=placementGroupPosition&include=image&fields[appAssetLibraryImages]=referenceName,state,imageAsset`.
- `placementGroupPosition` exists only as a sort key (not a readable attribute); the response sequence is the display order.
- A placement is immutable: asset, type, group, and surface are fixed at creation. To change the displayed asset, delete the placement, create a new one, then reorder the group.
- Deleting a placement leaves the asset (and other placements that reuse it) intact; deleting an asset that still has placements fails. Delete placements first.
- One asset can back many placements (e.g. `IMESSAGE_APP_SCREENSHOT` with group `IMESSAGE_IPHONE_DYNAMIC_ISLAND_LARGE_PROFILE` for the same image).
- Common 409 errors: `ENTITY_ERROR.ATTRIBUTE.INVALID` when `placementType`/`placementGroup`/asset category do not agree (e.g. `CREATIVE_ASSETS` placement type with an `APP_SCREENSHOTS_AND_PREVIEWS` asset); `STATE_ERROR.INVALID_STATE` when the parent (e.g. custom product page version or App Store version) is already approved.
- Per-group limits come from reference data `features[].placementPolicies[].groupLimits[].maxCount`; for App Store versions: 10 screenshots, 3 app previews, 1 product page header asset per group. Read the limit before creating placements in a loop.
- Ordering targets `appStoreVersionLocalization`, `appCustomProductPageLocalization`, or `appStoreVersionExperimentTreatmentLocalization`. In-app event localizations are not orderable (each in-app event placement type allows a single asset per group). Ordering is scoped to one placement group per localization; reorder each group separately. Add `?include=orderedPlacements` to echo the new sequence.
- Placements go through App Review as part of their parent surface; `state` follows the parent's review state to `PARENT_APPROVED`. If the linked asset is not processed yet, a placement starts in `ASSET_PROCESSING`.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/placing-assets-on-your-app-store-surfaces , https://developer.apple.com/documentation/appstoreconnectapi/app-asset-library-placements , https://developer.apple.com/documentation/appstoreconnectapi/app-asset-library-placement-ordering-requests

## Related

- [Understanding the App Asset Library](./understanding-the-app-asset-library.md)
- [App Asset Library Images](./image-assets.md)
- [App Asset Library Videos](./video-assets.md)
- [App Asset Library Reference Data and Display Classes](./reference-data.md)
- [Migrating to the App Asset Library](./migrating-to-the-app-asset-library.md)
